import { promises as fs } from "fs";
import { JSDOM } from "jsdom";
import * as cheerio from "cheerio";

export const extractShippingAddress = html => {
  // Remove HTML tags and trim whitespace
  const cleanText = html
    ?.replace(/<[^>]*>/g, "\n")
    ?.replace(/=20/g, "")
    ?.split("\n")
    .map(line => line?.trim())
    .filter(line => line.length > 0);
  // Extract information
  const [firstName, lastName, address1, address2, cityWithComma, state, zipCountry] = cleanText;

  // Process city (remove trailing comma)
  const city = cityWithComma ? cityWithComma?.replace(/,\s*$/, "") : "";

  // Process zip and country
  const [postalCode, country] = zipCountry ? zipCountry.split(" ") : ["", ""];

  return {
    shippingFirstName: firstName || "",
    shippingLastName: lastName || "",
    address1: address1 || "",
    address2: address2 === "=09" ? "" : address2 || "",
    city: city,
    state: state || "",
    postalCode: postalCode || "",
    country: country || "",
  };
};

export const extractLast4Digits = str => {
  const match = str.match(/(\d{4})\s*$/);
  return match ? match[1] : null;
};

export const extractPrice = (selector, $) => {
  const element = $(selector);
  if (element.length) {
    const priceText = element.closest("tr").find("strong").text().trim();
    return parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
  }
  return NaN;
};

export const extractDiscountInfo = $ => {
  const discountElement = $('span:contains("Discount")').closest("tr");
  if (discountElement.length) {
    const discountText = discountElement.text();
    const codeMatch = discountText.match(/[A-Z]{2,}/);
    const discountCode = codeMatch ? codeMatch[0] : "";
    const discountAmount = parseFloat(
      discountElement
        .find("strong")
        .text()
        .replace(/[^0-9.-]+/g, "")
    );
    return { code: discountCode, amount: discountAmount };
  }
  return { code: "", amount: 0 };
};

const extractProductInfo = html => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const products = [];
  const productRows = document.querySelectorAll(
    'table[style*="max-width:560px"] > tbody > tr > td > table > tbody > tr'
  );

  productRows.forEach(row => {
    const nameElement = row.querySelector('span[style*="font-size:16px"]');
    const priceElement = row.querySelector("label");

    if (nameElement && priceElement) {
      const name = nameElement.textContent.trim().replace(/=20/g, "").replace(/\s+/g, " ");
      const price = parseFloat(priceElement.textContent.trim().replace("$", ""));

      const optionsElements = row.querySelectorAll('span[style*="display: inline-block"]');
      const selectedOptions = Array.from(optionsElements).map(opt => opt.textContent.trim());

      products.push({
        quantity: 1,
        name: name,
        selectedOptions: selectedOptions,
        price: price,
      });
    }
  });

  return products;
};

const removeDuplicates = products => {
  const productMap = new Map();

  products.forEach(product => {
    const key = `${product.name}-${product.price}-${product.selectedOptions.join(",")}`;
    if (!productMap.has(key)) {
      productMap.set(key, { ...product });
    }
  });

  return Array.from(productMap.values());
};

export const parseOrderItems = $ => {
  const orderItems = new Map(); // Use a Map to avoid duplicates

  $("table").each((i, table) => {
    const $table = $(table);

    const itemText = $table.find('span[style*="font-size:16px;font-weight:600"]').text().trim();
    const price = $table.find('p[style*="color:white;line-height:150%"] label').text().trim();

    if (itemText && price) {
      // console.log("Found item:", itemText, price);

      // Extract quantity if present (assuming it's the first number in the item text)
      const quantityMatch = itemText.match(/^(\d+)x?\s/);
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

      // Remove quantity from the name if present
      let name = itemText
        .replace(/^\d+x?\s/, "")
        .replace(/\s+/g, " ")
        .trim();

      // Remove any trailing '=20' or similar
      name = name.replace(/\s*=\d+\s*$/, "");

      const selectedOptions = [];

      // Parse option chips (if any)
      $table.find('span[style*="display: inline-block"][style*="padding: 4px 8px"]').each((i, elem) => {
        const optionText = $(elem).text().trim();
        const [optionName, optionValue] = optionText.split(":").map(s => s.trim());
        if (optionName && optionValue) {
          selectedOptions.push({ name: optionName, value: optionValue });
        }
      });

      // Use the name and price as a unique key to avoid duplicates
      const key = `${name}-${price}`;
      if (!orderItems.has(key)) {
        orderItems.set(key, {
          quantity,
          name: name.trim(),
          selectedOptions,
          price: parseFloat(price.replace("$", "")),
        });
      }
    }
  });

  const result = Array.from(orderItems.values());
  console.log("Total unique items found:", result.length);
  return result;
};

export const parseOrderEmail = async filePath => {
  const content = await fs.readFile(filePath, "utf-8");
  const $ = cheerio.load(content);

  const orderNumberElement = $('strong:contains("Order #:")').parent();
  const orderNumberText = orderNumberElement.text().trim();
  const orderNumber = orderNumberText.split(":")[1]?.trim().split("<")[0].trim() || "";
  const dateMatch = content.match(/Date:\s*(.*)/);
  const orderDate = dateMatch ? new Date(dateMatch[1]).toISOString() : null;
  // console.log({ orderDate });

  const customerFirstName = $("h1").first().text().trim().split(",")[0];
  // console.log({ customerFirstName });
  const toMatch = content.match(/To:\s*(.*)/);
  const email = toMatch ? toMatch[1].trim() : null;
  // console.log({ email });

  const shippingDetailsHtml = $('h4:contains("Shipping:")').parent().next().find("p").first().html();
  // console.log({ shippingDetailsHtml: shippingDetailsHtml.replace(/<[^>]*>/g, "").trim() });
  let shippingAddress = null;
  if (shippingDetailsHtml) {
    shippingAddress = extractShippingAddress(shippingDetailsHtml);
    // console.log({ result });
  }

  const paymentMethod = $('h4:contains("Payment:")').parent().next().text();
  // const last4 = paymentMethod.match(/ending with (\d{4})/)?.[1];
  const last4 = extractLast4Digits(paymentMethod);
  // console.log({ last4 });

  const dupOrderItems = extractProductInfo(content);
  console.log({ dupOrderItems });
  const orderItems = removeDuplicates(dupOrderItems);
  console.log({ orderItems });

  const subtotal = extractPrice('span:contains("Subtotal")', $) || extractPrice('span:contains("New Subtotal")', $);
  const taxPrice = extractPrice('span:contains("Taxes")', $);
  const shippingPrice = extractPrice('span:contains("Shipping")', $);
  const totalPrice = extractPrice('span:contains("Total")', $);

  const { code: discountCode, amount: discountAmount } = extractDiscountInfo($);

  const orderNote = $('strong:contains("Order Note:")').parent().text().replace("Order Note:", "").trim();

  // console.log({
  //   subtotal,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice,
  //   discount: {
  //     code: discountCode,
  //     amount: discountAmount,
  //   },
  //   orderNote,
  // });

  // return {
  //   orderNumber,
  //   orderDate,
  //   customerFirstName,
  //   email,
  //   shipping: {
  //     first_name: shippingAddress.shippingFirstName,
  //     last_name: shippingAddress.shippingLastName,
  //     address_1: shippingAddress.address1,
  //     city: shippingAddress.city,
  //     state: shippingAddress.state,
  //     postalCode: shippingAddress.postalCode,
  //     country: shippingAddress.country,
  //   },
  //   payment: {
  //     paymentMethod: {},
  //     last4,
  //   },
  //   orderItems,
  //   itemsPrice: subtotal,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice,
  //   order_note: orderNote,
  // };
};
