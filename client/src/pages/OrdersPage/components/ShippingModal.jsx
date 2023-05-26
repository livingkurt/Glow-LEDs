import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { closeShippingModal } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { chooseShippingRate, reChooseShippingRate } from "../../../slices/shippingSlice";
import { Loading } from "../../../shared/SharedComponents";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import LoadingInside from "../../../shared/SharedComponents/LoadingInside";

const ShippingModal = () => {
  const dispatch = useDispatch();

  const orderPage = useSelector(state => state.orders.orderPage);
  const { shippingModal, order } = orderPage;
  const shippingSlice = useSelector(state => state.shipping);
  const { shippingRates, shippingRate, hideLabelButton, rate, shipment_id, loading } = shippingSlice;

  useEffect(() => {
    if (order.shipping.first_name.length > 0) {
      dispatch(API.differentShippingRates(order));
    }
  }, [dispatch, order]);

  const sortedRates = [...shippingRates].sort((a, b) => {
    if (a.retail_rate && b.retail_rate) {
      return parseFloat(a.retail_rate) - parseFloat(b.retail_rate);
    } else if (a.retail_rate) {
      return -1;
    } else if (b.retail_rate) {
      return 1;
    } else {
      return parseFloat(a.rate) - parseFloat(b.rate);
    }
  });

  return (
    <div>
      <GLModal
        isOpen={shippingModal}
        onConfirm={() => {
          // if (order.shipping.shipping_label) {
          //   console.log("refund label");
          //   dispatch(API.refundLabel({ orderId: order._id, isReturnTracking: false }));
          // }
          dispatch(
            API.saveOrder({
              ...order,
              shipping: {
                ...order.shipping,
                shipping_rate: shippingRate,
                shipment_id,
                shipping_label: null,
                shipment_tracker: null
              },
              tracking_number: "",
              tracking_url: ""
            })
          );
        }}
        onCancel={() => {
          dispatch(closeShippingModal());
        }}
        title={"Choose New Shipping Rate"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <LoadingInside loading={loading} />
        {hideLabelButton &&
          sortedRates?.map((rate, index) => {
            return (
              <div className=" mv-1rem jc-b  ai-c" key={index}>
                <div className="shipping_rates jc-b w-100per wrap ">
                  <div className="service">{rate.carrier}</div>
                  <div className="service">{rate.service}</div>

                  <div>${parseFloat(rate.rate).toFixed(2)}</div>
                  <div>
                    {rate.delivery_days} {rate.delivery_days === 1 ? "Day" : "Days"}
                  </div>
                </div>
                <GLButton className="rates" onClick={() => dispatch(chooseShippingRate({ rate, speed: rate.service }))}>
                  Select
                </GLButton>
              </div>
            );
          })}
        {!hideLabelButton && rate.hasOwnProperty("speed") && (
          <div className=" mv-1rem jc-b ai-c w-100per">
            <div className="shipping_rates jc-b w-100per ">
              <div>
                {rate.speed} ${parseFloat(rate.rate.rate)}
                {rate.rate.delivery_days} {rate.rate.delivery_days === 1 ? "Day" : "Days"}
              </div>
            </div>
            <GLButton className="rates w-10rem" onClick={() => dispatch(reChooseShippingRate())}>
              Change
            </GLButton>
          </div>
        )}
      </GLModal>
    </div>
  );
};

export default ShippingModal;
