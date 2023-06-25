import { Expense, expense_db } from "../expenses";
import { determine_category, determine_application, determine_filter, determine_place, unformat_date } from "../../util";
import { getFilteredData } from "../api_helpers";
import config from "../../config";

const Airtable = require("airtable");

export default {
  findAll_expenses_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["date_of_purchase", "expense_name", "place_of_purchase", "card", "category", "amount"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "expense_name" });
      const expenses = await expense_db.findAll_expenses_db(filter, sort, limit, page);
      const count = await expense_db.count_expenses_db(filter);
      return {
        data: expenses,
        total_count: count,
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllByDate_expenses_s: async (body: any) => {
    try {
      const filter = {
        deleted: false,
        date_of_purchase: {
          $gte: new Date(body.date_1),
          $lt: new Date(body.date_2)
        }
      };
      const sort = { date_of_purchase: 1 };

      return await expense_db.findAll_expenses_db(filter, sort, "0", "1");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_expenses_s: async (params: any) => {
    try {
      return await expense_db.findById_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_expenses_s: async (body: any) => {
    try {
      return await expense_db.create_expenses_db(body);
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
  //       return new Promise<void>((resolve, reject) => {
  //         base(name)
  //           .select({
  //             // Add any filters or sorting here
  //           })
  //           .eachPage(
  //             async function page(records: any, fetchNextPage: any) {
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
  //             function done(err: any) {
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
      { base: new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base("app1s1rBexc8nLb9s"), name: "2023 Expenses" }
    ];

    try {
      // Create a Promise for each base
      const promises = bases.map(({ base, name }) => {
        return new Promise<void>((resolve, reject) => {
          base(name)
            .select({
              // maxRecords: 10
              /* Add any filters or sorting here */
            })
            .eachPage(
              async function page(records: any, fetchNextPage: any) {
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
                  // console.log({ airtable_invoice_links });
                  console.log({ record });

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
                    deleted: record["Return Issues"] || false
                  });
                  // Save the Expense
                  await newExpense.save();
                }

                // To fetch the next page of records, call `fetchNextPage`.
                fetchNextPage();
              },
              function done(err: any) {
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
      console.log({ get_airtable_expenses_s: error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_all_expenses_s: async (body: any) => {
    const { data, card, properties } = body;
    try {
      const expenses: any = [];
      for (let line = 1; line < data.length; line++) {
        const object: any = {};
        for (let i = 0; i < data[line].length; i++) {
          object[properties[i]] = data[line][i];
        }
        expenses.push(object);
      }

      const payment_check = ["AUTOPAY PAYMENT - THANK YOU", "CUSTOMER SERVICE PAYMENT - THANK YOU", "RETURNED AUTOPAY (DEORY)"];

      expenses.forEach(async (expense: any) => {
        if (!payment_check.includes(expense.description)) {
          const row = {
            date_of_purchase: unformat_date(expense.date),
            expense_name: expense.description,
            place_of_purchase: determine_place(expense.description),
            card: card,
            url: "",
            application: determine_application(expense.description),
            category: determine_category(expense.description),
            amount: card === "GL AMEX" ? Math.abs(parseFloat(expense.amount)) * -1 : parseFloat(expense.amount)
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
  update_expenses_s: async (params: any, body: any) => {
    try {
      return await expense_db.update_expenses_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_expenses_s: async (params: any) => {
    try {
      return await expense_db.remove_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
