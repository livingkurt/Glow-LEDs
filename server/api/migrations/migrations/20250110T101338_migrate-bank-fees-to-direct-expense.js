import Expense from "../../expenses/expense.js";

export async function up() {
  try {
    // Update all expenses with category "Bank Fee" to have is_direct_expense = true
    const result = await Expense.updateMany(
      {
        irs_category: "Bank Fees",
        deleted: false,
      },
      {
        $set: { is_direct_expense: true },
      }
    );

    console.log(`Updated ${result.modifiedCount} expenses with category "Bank Fees" to have is_direct_expense = true`);
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
        irs_category: "Bank Fees",
        deleted: false,
        is_direct_expense: true,
      },
      {
        $set: { is_direct_expense: false },
      }
    );

    console.log(
      `Reverted ${result.modifiedCount} expenses with category "Bank Fees" back to is_direct_expense = false`
    );
  } catch (error) {
    console.error("Error in migration rollback:", error);
    throw error;
  }
}
