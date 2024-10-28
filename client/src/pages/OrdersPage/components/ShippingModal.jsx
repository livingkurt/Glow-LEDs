import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { closeShippingModal } from "../../../slices/orderSlice";
import * as API from "../../../api";
import { chooseShippingRate, reChooseShippingRate } from "../../../slices/shippingSlice";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import LoadingInside from "../../../shared/SharedComponents/LoadingInside";
import { showConfirm } from "../../../slices/snackbarSlice";

const ShippingModal = () => {
  const dispatch = useDispatch();

  const orderPage = useSelector(state => state.orders.orderPage);
  const { shippingModal, order } = orderPage;
  const shippingSlice = useSelector(state => state.shipping.shippingPage);
  const { shippingRates, shippingRate, hideLabelButton, rate, shipment_id, loading } = shippingSlice;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    if (shippingModal && order.shipping.first_name.length > 0) {
      dispatch(API.differentShippingRates(order));
    }
  }, [dispatch, order, shippingModal]);

  const sortedRates = [...shippingRates].sort((a, b) => {
    if (a.list_rate && b.list_rate) {
      return parseFloat(a.list_rate) - parseFloat(b.list_rate);
    } else if (a.list_rate) {
      return -1;
    } else if (b.list_rate) {
      return 1;
    } else {
      return parseFloat(a.rate) - parseFloat(b.rate);
    }
  });

  return (
    <div>
      <GLActionModal
        isOpen={shippingModal}
        onConfirm={() => {
          dispatch(
            showConfirm({
              title: "Are you sure you want to change shipping rate for this Order?",
              inputLabel: "Describe the why you made this change to the order",
              onConfirm: inputText => {
                dispatch(
                  API.saveOrder({
                    ...order,
                    isUpdated: true,
                    shipping: {
                      ...order.shipping,
                      shipping_rate: shippingRate,
                      shipment_id,
                      shipping_label: null,
                      shipment_tracker: null,
                    },
                    tracking_number: "",
                    tracking_url: "",
                    change_log: [
                      ...order.change_log,
                      {
                        change: inputText,
                        changedAt: new Date(),
                        changedBy: current_user,
                      },
                    ],
                  })
                );
                dispatch(closeShippingModal());
                dispatch(reChooseShippingRate());
              },
            })
          );
        }}
        onCancel={() => {
          dispatch(closeShippingModal());
        }}
        title="Choose New Shipping Rate"
        confirmLabel="Save"
        confirmColor="primary"
        cancelLabel="Cancel"
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

                  <div>
                    {"$"}
                    {parseFloat(rate.rate).toFixed(2)}
                  </div>
                  <div>
                    {rate.delivery_days} {rate.delivery_days === 1 ? "Day" : "Days"}
                  </div>
                </div>
                <GLButton className="rates" onClick={() => dispatch(chooseShippingRate({ rate, speed: rate.service }))}>
                  {"Select"}
                </GLButton>
              </div>
            );
          })}
        {!hideLabelButton && rate.hasOwnProperty("speed") && (
          <div className=" mv-1rem jc-b ai-c w-100per">
            <div className="shipping_rates jc-b w-100per ">
              <div>
                {rate.speed}
                {" $"}
                {parseFloat(rate.rate.rate)}
                {rate.rate.delivery_days} {rate.rate.delivery_days === 1 ? "Day" : "Days"}
              </div>
            </div>
            <GLButton className="rates w-10rem" onClick={() => dispatch(reChooseShippingRate())}>
              {"Change"}
            </GLButton>
          </div>
        )}
      </GLActionModal>
    </div>
  );
};

export default ShippingModal;
