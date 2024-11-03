import mongoose from "mongoose";

const giftCardTransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true }, // Amount of transaction
    type: { type: String, enum: ["credit", "debit"], required: true }, // credit for adding funds, debit for using funds
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // Reference to order if used for purchase
    description: { type: String }, // Description of transaction
  },
  {
    timestamps: true,
  }
);

const giftCardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, unique: true, required: true }, // Unique gift card code
    type: { type: String, enum: ["general", "supplies"], required: true },
    initialBalance: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    expirationDate: { type: Date }, // Optional expiration date
    isActive: { type: Boolean, default: true },
    source: {
      type: String,
      enum: ["sponsor_benefit", "purchase", "promotion", "compensation"],
      required: true,
    },
    transactions: [giftCardTransactionSchema], // Track all transactions
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Virtual field to calculate total used amount
giftCardSchema.virtual("usedAmount").get(function () {
  return this.initialBalance - this.currentBalance;
});

// Method to add funds
giftCardSchema.methods.addFunds = async function (amount, description = "") {
  this.currentBalance += amount;
  this.transactions.push({
    amount,
    type: "credit",
    description,
  });
  return this.save();
};

// Method to use funds
giftCardSchema.methods.useFunds = async function (amount, orderId, description = "") {
  if (amount > this.currentBalance) {
    throw new Error("Insufficient funds");
  }
  if (!this.isActive) {
    throw new Error("Gift card is inactive");
  }
  if (this.expirationDate && new Date() > this.expirationDate) {
    throw new Error("Gift card has expired");
  }

  this.currentBalance -= amount;
  this.transactions.push({
    amount,
    type: "debit",
    order: orderId,
    description,
  });
  return this.save();
};

// Method to check if gift card is valid for use
giftCardSchema.methods.isValid = function () {
  return (
    this.isActive &&
    this.currentBalance > 0 &&
    (!this.expirationDate || new Date() <= this.expirationDate) &&
    !this.deleted
  );
};

// Generate a unique gift card code
giftCardSchema.statics.generateCode = async function () {
  const length = 16;
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
      // Add hyphen every 4 characters except at the end
      if ((i + 1) % 4 === 0 && i < length - 1) {
        code += "-";
      }
    }
    // Check if code is unique
    const existingCard = await this.findOne({ code });
    if (!existingCard) {
      isUnique = true;
    }
  }
  return code;
};

const GiftCard = mongoose.model("GiftCard", giftCardSchema);

export default GiftCard;
