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

  const customerFirstName = $("h1").first().text().trim().split(",")[0];
  const toMatch = content.match(/To:\s*(.*)/);
  const email = toMatch ? toMatch[1].trim() : null;

  const shippingDetailsHtml = $('h4:contains("Shipping:")').parent().next().find("p").first().html();
  let shippingAddress = null;
  if (shippingDetailsHtml) {
    shippingAddress = extractShippingAddress(shippingDetailsHtml);
  }

  const paymentMethod = $('h4:contains("Payment:")').parent().next().text();
  // const last4 = paymentMethod.match(/ending with (\d{4})/)?.[1];
  const last4 = extractLast4Digits(paymentMethod);

  const dupOrderItems = extractProductInfo(content);
  const orderItems = removeDuplicates(dupOrderItems);

  const subtotal = extractPrice('span:contains("Subtotal")', $) || extractPrice('span:contains("New Subtotal")', $);
  const taxPrice = extractPrice('span:contains("Taxes")', $);
  const shippingPrice = extractPrice('span:contains("Shipping")', $);
  const totalPrice = extractPrice('span:contains("Total")', $);

  const { code: discountCode, amount: discountAmount } = extractDiscountInfo($);

  const orderNote = $('strong:contains("Order Note:")').parent().text().replace("Order Note:", "").trim();

  return {
    orderNumber,
    createdAt: orderDate,

    shipping: {
      first_name: shippingAddress?.shippingFirstName || toCapitalize(customerFirstName),
      last_name: shippingAddress?.shippingLastName,
      address_1: shippingAddress?.address1,
      city: shippingAddress?.city,
      state: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
      email,
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

export const findMatchingPayment = (orderData, payments) => {
  // Filter payments by email
  const candidatePayments = payments.filter(payment => payment.email === orderData?.shipping.email?.toLowerCase());

  // Further filter by amount
  const amountMatchPayments = candidatePayments.filter(payment => payment.amount === orderData.totalPrice);

  // Further filter by last4 digits
  const last4MatchPayments = amountMatchPayments.filter(payment => payment.last4 === orderData.payment.last4);
  // console.log({ orderData, last4MatchPayments });
  // Find the closest date
  let bestMatch = null;
  let minTimeDiff = Infinity;
  last4MatchPayments.forEach(payment => {
    const timeDiff = Math.abs(payment.createdAt - new Date(orderData.createdAt));
    if (timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      bestMatch = payment;
    }
  });
  return bestMatch;
};

export const findMatchingPaymentIntent = (orderData, paymentIntentData, matchingPayment) => {
  if (!matchingPayment || !matchingPayment.payment_method) {
    console.warn("No matching payment or payment method found");
    return null;
  }

  // Find the payment intent that matches the payment method from the charge
  const matchingIntent = paymentIntentData.find(
    intent => intent.payment_method && intent.payment_method.id === matchingPayment.payment_method
  );

  if (!matchingIntent) {
    console.warn("No matching payment intent found");
    return null;
  }

  // Verify the amount matches
  if (matchingIntent.amount !== orderData.totalPrice * 100) {
    // Convert to cents for Stripe
    console.warn("Payment intent amount does not match order total");
    return null;
  }

  // Verify the last4 matches if available
  if (matchingIntent.payment_method && matchingIntent.payment_method.card) {
    if (matchingIntent.payment_method.card.last4 !== orderData.payment.last4) {
      console.warn("Payment method last4 does not match order data");
      return null;
    }
  }

  return matchingIntent;
};

export const findMatchingShipment = (orderData, shipments) => {
  // Filter shipments by email
  const candidateShipments = shipments.filter(shipment => shipment.email === orderData?.shipping.email?.toLowerCase());
  // Further filter by address
  const addressMatchShipments = candidateShipments.filter(shipment => {
    const addr = shipment.to_address;
    return (
      addr.city.toLowerCase() === orderData.shipping.city.toLowerCase() &&
      addr.state.toLowerCase() === orderData.shipping.state.toLowerCase() &&
      addr.zip.split("-")[0] === orderData.shipping.postalCode
    );
  });

  // Find the closest date
  let bestMatch = null;
  let minTimeDiff = Infinity;
  addressMatchShipments.forEach(shipment => {
    const timeDiff = Math.abs(shipment.createdAt - new Date(orderData.createdAt));
    if (timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      bestMatch = shipment;
    }
  });

  return bestMatch;
};

export const extractShipmentDetails = shipment => {
  if (!shipment) return {};
  return {
    email: shipment.email,
    shipment_id: shipment.id,
    shipping_rate: shipment.selected_rate,
    shipping_label: shipment.postage_label,
    shipment_tracker: shipment.tracker,
    tracking_number: shipment.tracking_code,
    tracking_url: shipment.tracker.public_url,
    // Add other fields as needed
  };
};

export const preprocessPayments = paymentsData => {
  // Preprocess payments
  const payments = paymentsData.map(payment => {
    const email = payment?.customer?.email?.toLowerCase();
    const last4 = payment.payment_method_details?.card?.last4;
    const amount = payment.amount / 100; // Stripe amounts are in cents
    const createdAt = new Date(payment.created * 1000); // Stripe timestamps are in seconds
    return { ...payment, email, last4, amount, createdAt };
  });
  return payments;
};

export const preprocessShipments = shipmentsData => {
  // Preprocess shipments
  const shipments = shipmentsData.map(shipment => {
    const email = shipment.to_address.email?.toLowerCase();
    const name = shipment.to_address.name;
    const address = shipment.to_address;
    const shipment_tracker = shipment.tracker.id;
    const shipping_label = shipment.postage_label;
    const selected_rate = shipment.selected_rate;
    const tracking_number = shipment?.tracking_code;
    const tracking_url = shipment?.tracker?.public_url;
    const createdAt = new Date(shipment.created_at);
    return {
      ...shipment,
      email,
      name,
      address,
      createdAt,
      tracking_number,
      tracking_url,
      shipping_label,
      selected_rate,
      shipment_tracker,
    };
  });
  return shipments;
};

// // Import the 'he' library
// import { promises as fs } from "fs";
// import { JSDOM } from "jsdom";
// import * as cheerio from "cheerio";
// import he from "he"; // Import 'he' for decoding HTML entities
// import { toCapitalize } from "../utils/util";

// function decodeQuotedPrintable(str) {
//   return str
//     .replace(/=\r\n/g, "") // Remove soft line breaks (Windows)
//     .replace(/=\n/g, "") // Remove soft line breaks (Unix)
//     .replace(/=([0-9A-F]{2})/gi, (match, hex) => {
//       return String.fromCharCode(parseInt(hex, 16));
//     });
// }

// export const extractShippingAddress = html => {
//   // Decode HTML entities
//   const decodedHtml = he.decode(html);

//   // Remove any soft line breaks and encoded spaces
//   const cleanHtml = decodedHtml
//     .replace(/=\r\n/g, "") // Remove soft line breaks (Windows)
//     .replace(/=\n/g, "")
//     .replace(/=20/g, " ")
//     .replace(/=09/g, " ")
//     .replace(/=/g, "") // Remove any remaining '='
//     .replace(/[\s]+/g, " "); // Replace multiple spaces with a single space

//   // Load the clean HTML into cheerio
//   const $ = cheerio.load(cleanHtml);

//   // Extract text content and split by line breaks
//   const textContent = $.text();
//   const lines = textContent
//     .split(/\r?\n/)
//     .map(line => line.trim())
//     .filter(line => line.length > 0);

//   // Parse the lines to extract address components
//   const address = {};

//   if (lines.length >= 5) {
//     // Name
//     const nameParts = lines[0].split(" ");
//     address.shippingFirstName = nameParts[0];
//     address.shippingLastName = nameParts.slice(1).join(" ");

//     // Address1
//     address.address1 = lines[1];

//     // Check if lines[2] is address2 or city
//     if (lines.length >= 6) {
//       // There is an address2
//       address.address2 = lines[2];
//       address.city = lines[3].replace(/,\s*$/, "");
//       address.state = lines[4];
//       const zipCountry = lines[5];
//       const zipCountryParts = zipCountry.split(" ");
//       address.postalCode = zipCountryParts[0];
//       address.country = zipCountryParts[1] || "";
//     } else {
//       // No address2
//       address.city = lines[2].replace(/,\s*$/, "");
//       address.state = lines[3];
//       const zipCountry = lines[4];
//       const zipCountryParts = zipCountry.split(" ");
//       address.post
