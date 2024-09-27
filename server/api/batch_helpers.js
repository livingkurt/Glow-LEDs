import { promises as fs } from "fs";
import { JSDOM } from "jsdom";
import * as cheerio from "cheerio";
import { toCapitalize } from "../utils/util";

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

function decodeQuotedPrintable(str) {
  return str
    .replace(/=\r\n/g, "") // Remove soft line breaks (Windows)
    .replace(/=\n/g, "") // Remove soft line breaks (Unix)
    .replace(/=([0-9A-F]{2})/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
}

const extractProductInfo = html => {
  // Decode the HTML
  const decodedHTML = decodeQuotedPrintable(html);

  const dom = new JSDOM(decodedHTML);
  const document = dom.window.document;

  const products = [];
  const productRows = document.querySelectorAll(
    'table[style*="max-width:560px"] > tbody > tr > td > table > tbody > tr'
  );

  productRows.forEach(row => {
    const nameElement = row.querySelector('span[style*="font-size:16px"]');
    const priceElement = row.querySelector("label");

    if (nameElement && priceElement) {
      const name = nameElement.textContent.trim().replace(/\s+/g, " ");
      const price = parseFloat(priceElement.textContent.trim().replace("$", ""));

      const optionsElements = row.querySelectorAll('div[style*="font-size:25px"] span[style*="display: inline-block"]');

      const selectedOptions = Array.from(optionsElements)
        .map(opt => {
          let optionText = opt.textContent.replace(/=\r\n/g, "").replace(/=\n/g, "").replace(/=/g, "").trim();
          const [option, value] = optionText.split(":").map(s => s.trim());
          return { option, value };
        })
        .filter(option => option.option && option.value); // Filter out any invalid options

      products.push({
        quantity: 1,
        name: name,
        selectedOptions: selectedOptions,
        price: isNaN(price) ? 0 : price,
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
  const orderItems = removeDuplicates(dupOrderItems);
  // console.log({ orderItems });

  const subtotal = extractPrice('span:contains("Subtotal")', $) || extractPrice('span:contains("New Subtotal")', $);
  const taxPrice = extractPrice('span:contains("Taxes")', $);
  const shippingPrice = extractPrice('span:contains("Shipping")', $);
  const totalPrice = extractPrice('span:contains("Total")', $);

  const { code: discountCode, amount: discountAmount } = extractDiscountInfo($);

  const orderNote = $('strong:contains("Order Note:")').parent().text().replace("Order Note:", "").trim();

  console.log({
    orderNumber,
    createdAt: orderDate,
    email,
    shippingAddress,
    payment: {
      paymentMethod: {},
      last4,
    },
    promo_code: discountCode,
    promo_amount: discountAmount,
    orderItems,
    itemsPrice: subtotal,
    taxPrice,
    shippingPrice,
    totalPrice,
    order_note: orderNote,
  });
  return {
    orderNumber,
    createdAt: orderDate,
    email,
    shipping: {
      first_name: shippingAddress?.shippingFirstName || toCapitalize(customerFirstName),
      last_name: shippingAddress?.shippingLastName,
      address_1: shippingAddress?.address1,
      city: shippingAddress?.city,
      state: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
    },
    payment: {
      paymentMethod: {},
      last4,
    },
    promo_code: discountCode,
    promo_amount: discountAmount,
    orderItems,
    itemsPrice: subtotal,
    taxPrice,
    shippingPrice,
    totalPrice,
    order_note: orderNote,
  };
};
