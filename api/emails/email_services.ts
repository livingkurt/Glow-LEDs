import { determine_filter } from "../../util";
import { user_db } from "../users";
import { email_db } from "../emails";
require("dotenv").config();

export default {
  findAll_emails_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    try {
      const page: number = query.page ? query.page : 1;
      const limit: number = query.limit ? query.limit : 0;
      const search = query.search
        ? {
            email_type: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort: any = { _id: -1 };
      if (sort_query === "email type") {
        sort = { email_type: 1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }

      const emails = await email_db.findAll_emails_db(filter, sort, limit, page);
      const count = await email_db.count_emails_db(filter);
      return {
        emails,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_emails_s: async (params: any) => {
    try {
      return await email_db.findById_emails_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_emails_s: async (body: any) => {
    try {
      return await email_db.create_emails_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_emails_s: async (params: any, body: any) => {
    try {
      return await email_db.update_emails_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_emails_s: async (params: any) => {
    try {
      return await email_db.remove_emails_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  send_emails_s: async (body: any) => {
    const test = ["lavacquek@icloud.com"];
    const email: any = body.test ? test : body.email ? body.email : process.env.INFO_EMAIL;
    const mailOptions = {
      to: email,
      from: process.env.DISPLAY_INFO_EMAIL,
      subject: body.subject,
      html: body.template
    };
    return mailOptions;
  },
  send_all_emails_s: async (body: any) => {
    // const users = await User.find({ deleted: false, email_subscription: true });
    const users = await user_db.findAll_users_db({ deleted: false, email_subscription: true }, {}, 0, 1);
    const all_emails = users
      .filter((user: any) => user.deleted === false)
      .filter((user: any) => user.email_subscription === true)
      .map((user: any) => user.email);

    const test = [
      "lavacquek@icloud.com",
      "lavacquek@gmail.com",
      "livingkurt222@gmail.com",
      "destanyesalinas@gmail.com",
      "zestanye@gmail.com",
      "codychau122@gmail.com"
    ];
    const emails: any = body.test ? test : all_emails;

    const mailOptions = {
      to: body.email ? body.email : process.env.INFO_EMAIL,
      from: process.env.DISPLAY_INFO_EMAIL,
      subject: body.subject,
      html: body.template,
      bcc: emails
    };
    return mailOptions;
  }
};
