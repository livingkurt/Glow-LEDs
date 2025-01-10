// 20250110T102331 is_direct_expense_business_card

import Expense from "../../expenses/expense.js";

export async function up() {
  try {
    // Update all expenses with specified cards to have is_direct_expense = true
    const result = await Expense.updateMany(
      {
        card: { $in: ["Glow LEDs Checking 0584", "Amazon Business 1004"] },
        deleted: false,
      },
      {
        $set: { is_direct_expense: true },
      }
    );

    console.log(`Updated ${result.modifiedCount} expenses with business cards to have is_direct_expense = true`);
  } catch (error) {
    console.error("Error in migration:", error);
    throw error;
  }
}

export async function down() {
  try {
    // Revert the changes by setting is_direct_expense back to false
    const result = await Expense.updateMany(
      {
        card: { $in: ["Glow LEDs Checking 0584", "Amazon Business 1004"] },
        deleted: false,
        is_direct_expense: true,
      },
      {
        $set: { is_direct_expense: false },
      }
    );

    console.log(`Reverted ${result.modifiedCount} expenses with business cards back to is_direct_expense = false`);
  } catch (error) {
    console.error("Error in migration rollback:", error);
    throw error;
  }
}
