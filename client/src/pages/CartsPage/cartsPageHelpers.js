import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

// cartPageHelpers.js

import { set_cart } from "../../slices/cartSlice";
import { getActiveOptions, getSelectedOptions } from "../ProductPage/productHelpers";

export const determineColor = cart => {
  let result = "";
  if (cart.active) {
    result = tableColors.active;
  }
  if (!cart.active) {
    result = tableColors.inactive;
  }
  return result;
};

export const handleCartProductChange = (index, value, dispatch) => {
  const cart = value; // Use the latest cart state
  const product = cart.cartItems[index].product;

  const updatedCartItems = cart.cartItems.map((item, i) => {
    if (i === index) {
      return {
        itemType: "product",
        product: product,
        name: product.name,
        short_description: product.short_description,
        fact: product.fact,
        images: product.images,
        set_of: product.set_of,
        original_images: product.images,
        display_image_object: product.images[0],
        category: product.category,
        subcategory: product.subcategory,
        product_collection: product.product_collection,
        facts: product.facts,
        included_items: product.included_items,
        price: product.price,
        chips: product.chips,
        tags: product.tags,
        wholesale_price: product.wholesale_price,
        previous_price: product.previous_price,
        sale_price: product.sale_price,
        size: product.size,
        max_display_quantity: product.max_display_quantity,
        max_quantity: product.max_quantity,
        quantity: item.quantity || 1, // Keep existing quantity or default to 1
        count_in_stock: product.count_in_stock,
        pathname: product.pathname,
        sale_start_date: product.sale_start_date,
        sale_end_date: product.sale_end_date,
        dimensions: product.dimensions,
        processing_time: product.processing_time,
        rating: product.rating,
        wholesale_product: product.wholesale_product,
        isPreOrder: product.isPreOrder,
        preOrderReleaseDate: product.preOrderReleaseDate,
        preOrderQuantity: product.preOrderQuantity,
        selectedOptions: getSelectedOptions(product),
        currentOptions: getActiveOptions(product),
      };
    } else {
      return item;
    }
  });

  const finalUpdatedCart = {
    ...cart,
    cartItems: updatedCartItems,
  };

  dispatch(set_cart(finalUpdatedCart));
};

export const handleCartTicketChange = (index, value, dispatch) => {
  const cart = value; // Use the latest cart state

  const ticket = cart.cartItems[index].ticket;

  const updatedCartItems = cart.cartItems.map((item, i) => {
    if (i === index) {
      return {
        itemType: "ticket",
        ticket,
        event: cart?.event?._id,
        quantity: cart.cartItems[index].quantity,
        max_display_quantity: ticket.max_display_quantity,
        max_quantity: ticket.max_quantity,
        price: ticket.price,
        name: ticket.title,
        color: ticket.color,
        finite_stock: ticket.finite_stock,
        ticket_type: ticket.ticket_type,
        display_image_object: ticket?.image,
        count_in_stock: ticket.count_in_stock,
      };
    } else {
      return item;
    }
  });

  const finalUpdatedCart = {
    ...cart,
    cartItems: updatedCartItems,
  };

  dispatch(set_cart(finalUpdatedCart));
};
