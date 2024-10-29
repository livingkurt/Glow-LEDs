import { promises as fs } from "fs";
import { JSDOM } from "jsdom";
import * as cheerio from "cheerio";
import { toCapitalize } from "../utils/util.js";
import { simpleParser } from "mailparser";
import parseAddress from "parse-address";
import he from "he";

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
    .replace(/=\n/g, "")
    .replace(/=([0-9A-F]{2})/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
}

const removeDuplicates = products => {
  const productMap = new Map();

  products.forEach(product => {
    const key = `${product.name}-${product.price}-${JSON.stringify(product.selectedOptions)}`;
    if (productMap.has(key)) {
      // Sum the quantities for duplicate products
      productMap.get(key).quantity;
    } else {
      productMap.set(key, { ...product });
    }
  });

  return Array.from(productMap.values());
};

const extractProductInfo = html => {
  // Decode the HTML
  const decodedHTML = decodeQuotedPrintable(html);

  const dom = new JSDOM(decodedHTML);
  const document = dom.window.document;

  const products = [];
  // Select each product table using the unique style attribute
  const productTables = document.querySelectorAll('table[style*="border-bottom: 1px white solid;"]');

  productTables.forEach(table => {
    // Extract product name
    const nameElement = table.querySelector('span[style*="font-size:16px"]');
    const priceElement = table.querySelector("label");

    if (nameElement && priceElement) {
      let nameText = nameElement.textContent.trim().replace(/\s+/g, " ");
      let priceText = priceElement.textContent.trim();

      let quantity = 1;

      // Extract quantity from the name (e.g., "2x Frosted Dome Diffusers - Classic Style")
      let nameMatch = nameText.match(/^(\d+)x\s+(.*)/);
      if (nameMatch) {
        quantity = parseInt(nameMatch[1], 10);
        nameText = nameMatch[2].trim();
      } else {
        // If quantity not in name, check in price (e.g., "2x $39.98")
        let priceMatch = priceText.match(/^(\d+)x\s+\$(.*)/);
        if (priceMatch) {
          quantity = parseInt(priceMatch[1], 10);
          priceText = `$${priceMatch[2].trim()}`;
        }
      }

      const name = nameText;
      const price = parseFloat(priceText.replace("$", ""));

      // Extract selected options (if any)
      const optionsElements = table.querySelectorAll(
        'div[style*="font-size:25px"] span[style*="display: inline-block"]'
      );

      const selectedOptions = Array.from(optionsElements)
        .map(opt => {
          let optionText = opt.textContent.replace(/=\r\n/g, "").replace(/=\n/g, "").replace(/=/g, "").trim();
          const [option, value] = optionText.split(":").map(s => s.trim());
          return { option, value };
        })
        .filter(option => option.option && option.value)
        // Remove duplicate options within the same product
        .reduce((acc, current) => {
          if (!acc.some(item => item.option === current.option)) {
            acc.push(current);
          }
          return acc;
        }, []);

      products.push({
        quantity: quantity,
        name: name,
        selectedOptions: selectedOptions,
        price: isNaN(price) ? 0 : price,
      });
    }
  });

  const orderItems = removeDuplicates(products);

  return orderItems;
};

const extractShippingAddress = html => {
  const cheer = cheerio.load(html);

  const shippingDetailsHtml = cheer('h4:contains("Shipping:")').parent().next().find("p").first().html();
  // Decode HTML entities
  const decodedHtml = he.decode(shippingDetailsHtml);

  // Remove any soft line breaks and encoded spaces
  const cleanHtml = decodedHtml
    .replace(/=\r\n/g, "")
    .replace(/=\n/g, "")
    .replace(/=20/g, " ")
    .replace(/=09/g, " ")
    .replace(/=/g, "")
    .replace(/[\s]+/g, " ");

  // Load the clean HTML into cheerio
  const $ = cheerio.load(cleanHtml);

  // Extract text content and remove extra spaces
  const textContent = $.text().replace(/\s+/g, " ").trim();

  // Find the index of the first digit (assuming address starts with a number)
  const firstDigitIndex = textContent.search(/\d/);

  // Extract name and address
  const name = textContent.substring(0, firstDigitIndex).trim();
  const addressText = textContent.substring(firstDigitIndex).trim();

  // Parse the address using parse-address
  const parsedAddress = parseAddress.parseLocation(addressText);

  // console.log({ parsedAddress });

  // Extract first name and last name
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return {
    shippingFirstName: firstName || "",
    shippingLastName: lastName || "",
    address1: `${parsedAddress.number || ""} ${parsedAddress.street || ""} ${parsedAddress.type || ""}`.trim(),
    address2: parsedAddress.sec_unit_type ? `${parsedAddress.sec_unit_type} ${parsedAddress.sec_unit_num}` : "",
    city: parsedAddress.city || "",
    state: parsedAddress.state || "",
    postalCode: parsedAddress.zip || "",
    country: parsedAddress.country || "US", // Default to US if not specified
    address_string: textContent,
  };
};

export const parseOrderEmail = async filePath => {
  const content = await fs.readFile(filePath);
  const parsedEmail = await simpleParser(content);

  const emailContent = parsedEmail.html || parsedEmail.text;
  if (!emailContent || typeof emailContent !== "string") {
    console.error("Email content is not a string or is empty");
    return;
  }

  const $ = cheerio.load(emailContent);

  const orderNumberElement = $('strong:contains("Order #:")').parent();
  const orderNumberText = orderNumberElement.text().trim();
  const orderNumber = orderNumberText.split(":")[1]?.trim().split("<")[0].trim() || "";
  const orderDate = parsedEmail.date ? parsedEmail.date.toISOString() : null;

  const customerFirstName = $("h1").first().text().trim().split(",")[0];
  const email = parsedEmail.to?.value?.[0]?.address || "";

  // const shippingDetailsHtml = $('h4:contains("Shipping:")').parent().next().find("p").first().html();
  // let shippingAddress = null;
  // if (shippingDetailsHtml) {
  const shippingAddress = extractShippingAddress(emailContent);
  // console.log({ shippingAddress });
  // }

  const paymentMethod = $('h4:contains("Payment:")').parent().next().text();
  const last4 = extractLast4Digits(paymentMethod);

  const orderItems = extractProductInfo(emailContent);

  const subtotal = extractPrice('span:contains("Subtotal")', $) || extractPrice('span:contains("New Subtotal")', $);
  const taxPrice = extractPrice('span:contains("Taxes")', $);
  const shippingPrice = extractPrice('span:contains("Shipping")', $);
  const totalPrice = extractPrice('span:contains("Total")', $);

  const { code: discountCode, amount: discountAmount } = extractDiscountInfo($);

  const orderNote = $('strong:contains("Order Note:")').parent().text().replace("Order Note:", "").trim();

  console.log({
    orderItemsPrice: orderItems.reduce((a, c) => a + c.price * c.quantity, 0),
    subtotal: subtotal - discountAmount,
    discountAmount,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  return {
    orderNumber,
    createdAt: orderDate,

    shipping: {
      first_name: shippingAddress?.shippingFirstName || toCapitalize(customerFirstName),
      last_name: shippingAddress?.shippingLastName,
      address_1: shippingAddress?.address1,
      address_2: shippingAddress?.address2 || "",
      city: shippingAddress?.city,
      state: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
      address_string: shippingAddress?.address_string,
      email,
    },
    payment: {
      paymentMethod: {},
      last4,
    },
    promo_code: discountCode,
    promo_amount: discountAmount,
    orderItems,
    itemsPrice: subtotal - discountAmount,
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
  const amountMatchPayments = candidatePayments.filter(payment => payment.amount / 100 === orderData.totalPrice);

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

export const findMatchingPaymentMethod = (orderData, paymentMethodData, matchingPayment) => {
  if (!matchingPayment || !matchingPayment.payment_method) {
    console.warn("No matching payment or payment method found");
    return null;
  }

  // Find the payment method that matches the payment method ID from the charge
  const matchingPaymentMethod = paymentMethodData.find(
    payment_method => payment_method.id && payment_method.id === matchingPayment.payment_method
  );

  return matchingPaymentMethod;
};

export const findMatchingShipment = (orderData, shipments) => {
  // Filter shipments by email
  const candidateShipments = shipments.filter(shipment => shipment.email === orderData?.shipping.email?.toLowerCase());
  // console.log({ FoundCandidateShipments: !!candidateShipments });
  // Further filter by address
  const addressMatchShipments = candidateShipments.filter(shipment => {
    const addr = shipment.to_address;
    const noSpecialCharsAddress = orderData.shipping.address_string
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace("  ", " ");
    // console.log({
    //   // addr,
    //   shipping: noSpecialCharsAddress,
    //   name: addr.name
    //     .toLowerCase()
    //     .replace(/[^a-z0-9\s]/g, "")
    //     .replace("  ", " "),
    //   street1: addr.street1
    //     .toLowerCase()
    //     .replace(/[^a-z0-9\s]/g, "")
    //     .replace("  ", " "),
    //   city: addr.city
    //     .toLowerCase()
    //     .replace(/[^a-z0-9\s]/g, "")
    //     .replace("  ", " "),
    //   state: addr.state.toLowerCase(),
    //   zip: addr.zip,
    //   country: addr.country
    //     .toLowerCase()
    //     .replace(/[^a-z0-9\s]/g, "")
    //     .replace("  ", " "),
    //   includesName: noSpecialCharsAddress.includes(addr.name.toLowerCase().replace(/[^a-z0-9\s]/g, "")),
    //   includesStreet1: noSpecialCharsAddress.includes(addr.street1.toLowerCase().replace(/[^a-z0-9\s]/g, "")),
    //   includesCity: noSpecialCharsAddress.includes(addr.city.toLowerCase().replace(/[^a-z0-9\s]/g, "")),
    //   includesState: noSpecialCharsAddress.includes(addr.state.toLowerCase().replace(/[^a-z0-9\s]/g, "")),
    //   includesZip: noSpecialCharsAddress.includes(addr.zip.split("-")[0]),
    //   includesCountry: noSpecialCharsAddress.includes(addr.country.toLowerCase().replace(/[^a-z0-9\s]/g, "")),
    // });
    return (
      noSpecialCharsAddress.includes(
        addr.name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace("  ", " ")
      ) &&
      // noSpecialCharsAddress.includes(addr.street1.toLowerCase().replace(/[^a-z0-9\s]/g, "")) &&
      noSpecialCharsAddress.includes(
        addr.city
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace("  ", " ")
      ) &&
      noSpecialCharsAddress.includes(
        addr.state
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace("  ", " ")
      ) &&
      noSpecialCharsAddress.includes(addr.zip.split("-")[0].replace("  ", " "))
      // noSpecialCharsAddress.includes(addr.country.toLowerCase().replace(/[^a-z0-9\s]/g, ""))
    );
  });

  // console.log({ FoundAddressMatchShipments: !!addressMatchShipments, addressMatchShipments });

  // Find the closest date
  let bestMatch = null;
  let minTimeDiff = Infinity;
  addressMatchShipments.forEach(shipment => {
    // console.log({ shipment: shipment.buyer_address.created_at, orderData: orderData.createdAt });
    const timeDiff = Math.abs(new Date(shipment.buyer_address.created_at) - new Date(orderData.createdAt));
    if (timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      bestMatch = shipment;
    }
  });

  // console.log({ FoundBestMatch: !!bestMatch, bestMatch });

  return bestMatch;
};

const toTitleCase = str => {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const extractShipmentDetails = shipment => {
  // console.log({ shipmentExtractShipmentDetails: shipment });
  // console.log({
  //   first_name: toTitleCase(shipment.to_address?.name?.split(" ")[0]),
  //   last_name: toTitleCase(shipment.to_address?.name?.split(" ")[1]),
  //   address_1: toTitleCase(shipment.to_address?.street1),
  //   address_2: shipment.to_address?.street2,
  //   city: toTitleCase(shipment.to_address?.city),
  //   state: shipment.to_address?.state,
  //   postalCode: shipment.to_address?.zip?.split("-")[0],
  //   country: shipment.to_address?.country,
  // });
  if (!shipment) return {};
  return {
    email: shipment.email,
    shipment_id: shipment.id,
    shipping_rate: shipment.selected_rate,
    shipping_label: shipment.postage_label,
    shipment_tracker: shipment.tracker,
    tracking_number: shipment.tracking_code,
    tracking_url: shipment.tracker.public_url,
    first_name: toTitleCase(shipment.to_address?.name?.split(" ")[0]),
    last_name: toTitleCase(shipment.to_address?.name?.split(" ")[1]),
    address_1: toTitleCase(shipment.to_address?.street1),
    address_2: shipment.to_address?.street2,
    city: toTitleCase(shipment.to_address?.city),
    state: shipment.to_address?.state,
    postalCode: shipment.to_address?.zip?.split("-")[0],
    country: shipment.to_address?.country,
  };
};

export const preprocessPayments = paymentsData => {
  // Preprocess payments
  const payments = paymentsData.map(payment => {
    const email = payment?.customer?.email?.toLowerCase();
    const last4 = payment.payment_method_details?.card?.last4;
    const amount = payment.amount; // Stripe amounts are in cents
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
