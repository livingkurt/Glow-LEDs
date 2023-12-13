import { Expense, expense_db } from "../expenses";
import { determine_filter, unformat_date } from "../../utils/util";
import { getFilteredData } from "../api_helpers";
import config from "../../config";
import {
  determine_application,
  determine_category,
  determine_place,
  normalizeExpenseFilters,
  normalizeExpenseSearch,
} from "./expense_helpers";

const Airtable = require("airtable");

export default {
  findAll_expenses_s: async query => {
    try {
      console.log({ query });
      const sort_options = ["date_of_purchase", "expense_name", "place_of_purchase", "card", "category", "amount"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "expense_name",
        normalizeFilters: normalizeExpenseFilters,
        normalizeSearch: normalizeExpenseSearch,
      });
      const expenses = await expense_db.findAll_expenses_db(filter, sort, limit, page);
      const count = await expense_db.count_expenses_db(filter);
      return {
        data: expenses,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filters_expenses_s: async query => {
    try {
      const availableFilters = {
        place_of_purchase: await Expense.distinct("place_of_purchase"),
        category: await Expense.distinct("category"),
        irs_category: await Expense.distinct("irs_category"),
        card: await Expense.distinct("card"),
        is_subscription: ["only_is_subscription"],
      };
      const booleanFilters = {
        is_subscription: {
          label: "Show Subscriptions",
        },
      };
      return { availableFilters, booleanFilters };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  findAllByDate_expenses_s: async body => {
    try {
      const filter = {
        deleted: false,
        date_of_purchase: {
          $gte: new Date(body.date_1),
          $lt: new Date(body.date_2),
        },
      };
      const sort = { date_of_purchase: 1 };

      return await expense_db.findAll_expenses_db(filter, sort, "0", "1");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_expenses_s: async params => {
    try {
      return await expense_db.findById_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_expenses_s: async body => {
    try {
      return await expense_db.create_expenses_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  bulk_create_expenses_s: async body => {
    const { expenses } = body;
    try {
      return await expense_db.bulk_create_expenses_db(expenses);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  // get_airtable_expenses_s: async () => {
  //   const bases = [
  //     { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appZcHPFoIX7iLJgz"), name: "2019 Expenses" },
  //     { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("app0SsFiabhtaLV2f"), name: "2020 Expenses" },
  //     { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appZpYNucg1uWM2tn"), name: "2021 Expenses" },
  //     { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appdOmbvAUthq73YV"), name: "2022 Expenses" },
  //     { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("app1s1rBexc8nLb9s"), name: "2023 Expenses" }
  //   ];

  //   try {
  //     // Create a Promise for each base
  //     const promises = bases.map(({ base, name }) => {
  //       return new Promise((resolve, reject) => {
  //         base(name)
  //           .select({
  //             // Add any filters or sorting here
  //           })
  //           .eachPage(
  //             async function page(records, fetchNextPage) {
  //               // This function (`page`) will get called for each page of records.

  //               for (const expenseRecord of records) {
  //                 const record = expenseRecord.fields;

  //                 // Process attachments
  //                 const documents = [];
  //                 if (Array.isArray(record.Invoice)) {
  //                   for (const doc of record.Invoice) {
  //                     // Create a new Image for each document
  //                     const newImage = new Image({
  //                       link: doc.url,
  //                       album: record.Expense,
  //                       deleted: false // set other fields as necessary
  //                     });

  //                     // Save the Image
  //                     await newImage.save();

  //                     // Add the new Image's ID to the documents array
  //                     documents.push(newImage._id);
  //                   }
  //                 }

  //                 // Create a new Mongoose document
  //                 const newExpense = new Expense({
  //                   expense_name: record.Expense || "",
  //                   url: record["Invoice URL"],
  //                   place_of_purchase: record["Place of Purchase"],
  //                   date_of_purchase: new Date(record.Date),
  //                   category: record.Category && record.Category.join(", "),
  //                   card: record.Card,
  //                   amount: record.Amount,
  //                   documents,
  //                   deleted: record["Return Issues"] || false
  //                 });

  //                 // Save the Expense
  //                 await newExpense.save();
  //               }

  //               // To fetch the next page of records, call `fetchNextPage`.
  //               fetchNextPage();
  //             },
  //             function done(err) {
  //               if (err) {
  //                 reject(err);
  //                 return;
  //               }
  //               resolve();
  //             }
  //           );
  //       });
  //     });

  //     // Wait for all the Promises to complete
  //     await Promise.all(promises);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },

  get_airtable_expenses_s: async () => {
    const bases = [
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appZcHPFoIX7iLJgz"), name: "2019 Expenses" },
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("app0SsFiabhtaLV2f"), name: "2020 Expenses" },
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appZpYNucg1uWM2tn"), name: "2021 Expenses" },
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("appdOmbvAUthq73YV"), name: "2022 Expenses" },
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("app1s1rBexc8nLb9s"), name: "2023 Expenses" },
    ];

    try {
      // Create a Promise for each base
      const promises = bases.map(({ base, name }) => {
        return new Promise((resolve, reject) => {
          base(name)
            .select({
              // maxRecords: 10
              /* Add any filters or sorting here */
            })
            .eachPage(
              async function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
                for (const expenseRecord of records) {
                  const record = expenseRecord.fields;

                  // Process attachments
                  // const documents = [];
                  // if (Array.isArray(record.Invoice)) {
                  //   for (const doc of record.Invoice) {
                  //     // const imageId = await processInvoice(doc, record);

                  //     if (doc.url) {
                  //       documents.push(doc.url);
                  //     }
                  //     // if (imageId.length > 0) {
                  //     //   documents.push(imageId);
                  //     // }
                  //   }
                  // }
                  const airtable_invoice_links = [];
                  if (Array.isArray(record.Invoice)) {
                    for (const doc of record.Invoice) {
                      // const imageId = await processInvoice(doc, record);

                      if (doc.url) {
                        airtable_invoice_links.push(doc.url);
                      }
                      // if (imageId.length > 0) {
                      //   airtable_invoice_links.push(imageId);
                      // }
                    }
                  }

                  //   // Create a new Mongoose airtable_invoice_link
                  const newExpense = new Expense({
                    expense_name: record.Expense || "",
                    invoice_url: record["Invoice URL"],
                    place_of_purchase: record["Place of Purchase"],
                    date_of_purchase: new Date(record.Date),
                    category: record.Category && record.Category.join(", "),
                    card: record.Card,
                    amount: record.Amount,
                    airtable_id: expenseRecord.id,
                    airtable_invoice_links,
                    deleted: record["Return Issues"] || false,
                  });
                  // Save the Expense
                  await newExpense.save();
                }

                // To fetch the next page of records, call `fetchNextPage`.
                fetchNextPage();
              },
              function done(err) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve();
              }
            );
        });
      });

      // Wait for all the Promises to complete
      await Promise.all(promises);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_all_expenses_s: async body => {
    const { data, card, properties } = body;
    try {
      const expenses = [];
      for (let line = 1; line < data.length; line++) {
        const object = {};
        for (let i = 0; i < data[line].length; i++) {
          object[properties[i]] = data[line][i];
        }
        expenses.push(object);
      }

      const payment_check = [
        "AUTOPAY PAYMENT - THANK YOU",
        "CUSTOMER SERVICE PAYMENT - THANK YOU",
        "RETURNED AUTOPAY (DEORY)",
      ];

      expenses.forEach(async expense => {
        if (!payment_check.includes(expense.description)) {
          const row = {
            date_of_purchase: unformat_date(expense.date),
            expense_name: expense.description,
            place_of_purchase: determine_place(expense.description),
            card: card,
            url: "",
            application: determine_application(expense.description),
            category: determine_category(expense.description),
            amount: card === "GL AMEX" ? Math.abs(parseFloat(expense.amount)) * -1 : parseFloat(expense.amount),
          };
          await expense_db.create_expenses_db(row);
        }
      });

      return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_expenses_s: async (params, body) => {
    try {
      return await expense_db.update_expenses_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_expenses_s: async params => {
    try {
      return await expense_db.remove_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_expenses_s: async body => {
    try {
      return await expense_db.remove_multiple_expenses_db(body.ids);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  subscriptions_expenses_s: async () => {
    try {
      const today = new Date();
      const currentDayOfMonth = String(today.getDate()).padStart(2, "0"); // For monthly frequency
      const currentDayOfWeek = today.toLocaleString("en-US", { weekday: "long" }); // For weekly frequency
      const currentMonth = today.toLocaleString("en-US", { month: "long" }); // For yearly frequency

      const allSubscriptions = await Expense.find({
        is_subscription: true,
        deleted: false,
      });

      const todaysSubscriptions = allSubscriptions.filter(subscription => {
        const validToFormatted = subscription.subscription.valid_to
          ? new Date(subscription.subscription.valid_to).toISOString().split("T")[0]
          : null;

        let isDueToday = false;
        switch (subscription.subscription.frequency) {
          case "Weekly":
            isDueToday = subscription.subscription.repeats_on === currentDayOfWeek;
            break;
          case "Monthly":
            isDueToday = String(subscription.subscription.repeats_on) === currentDayOfMonth;
            break;
          case "Yearly":
            isDueToday = subscription.subscription.repeats_on === currentMonth;
            break;
        }

        return isDueToday && (!validToFormatted || today.toISOString().split("T")[0] <= validToFormatted);
      });

      await Promise.all(
        todaysSubscriptions.map(async subscription => {
          const newExpenseData = {
            expense_name: subscription.expense_name,
            application: subscription.application,
            invoice_url: subscription.invoice_url,
            place_of_purchase: subscription.place_of_purchase,
            date_of_purchase: new Date(), // current date as the purchase date
            category: subscription.category,
            card: subscription.card,
            amount: subscription.subscription.amount, // amount from subscription
            is_subscription: false, // since this is a one-time expense record
            parent_subscription: subscription._id, // reference to the subscription
          };

          return await Expense.create(newExpenseData);
        })
      );

      return "Success";
    } catch (error) {
      console.error("Error processing subscription expenses: ", error);
      throw new Error();
    }
  },
  backfill_subscriptions_expenses_s: async params => {
    const { id } = params;
    try {
      const today = new Date();
      const subscription = await Expense.findById(id);

      if (!subscription || !subscription.is_subscription || subscription.deleted) {
        throw new Error("Subscription not found or invalid");
      }

      const startDate = new Date(subscription.date_of_purchase); // Start date of the subscription
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month
      const validToDate = subscription.subscription.valid_to ? new Date(subscription.subscription.valid_to) : null;

      for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
        const dayOfMonth = parseInt(subscription.subscription.repeats_on, 10) || startDate.getDate();
        const purchaseDate = new Date(date.getFullYear(), date.getMonth(), dayOfMonth);
        // Ensure purchaseDate does not exceed the last day of the month
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (purchaseDate > monthEnd) {
          purchaseDate.setDate(monthEnd.getDate());
        }

        // Check against valid_to date
        if (validToDate && purchaseDate > validToDate) {
          continue; // Skip to next month if purchaseDate is after valid_to date
        }

        const rangeStart = new Date(purchaseDate);
        rangeStart.setDate(purchaseDate.getDate() - 1); // One day before
        rangeStart.setHours(0, 0, 0, 0);

        const rangeEnd = new Date(purchaseDate);
        rangeEnd.setDate(purchaseDate.getDate() + 1); // One day after
        rangeEnd.setHours(23, 59, 59, 999);

        const existingExpense = await Expense.findOne({
          parent_subscription: subscription._id,
          date_of_purchase: {
            $gte: rangeStart,
            $lt: rangeEnd,
          },
          deleted: false,
        });
        if (!existingExpense) {
          // Create a new expense record for this month
          const newExpenseData = {
            expense_name: subscription.expense_name,
            application: subscription.application,
            invoice_url: subscription.invoice_url,
            place_of_purchase: subscription.place_of_purchase,
            date_of_purchase: purchaseDate, // Use the start of the month as the purchase date
            category: subscription.category,
            card: subscription.card,
            amount: subscription.subscription.amount, // amount from subscription
            is_subscription: false, // since this is a one-time expense record
            parent_subscription: subscription._id, // reference to the subscription
          };

          await Expense.create(newExpenseData);
        }
      }

      return "Backfill complete";
    } catch (error) {
      console.error("Error backfilling subscription expenses: ", error);
      throw new Error();
    }
  },
};
