import React from "react";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;

  const { _id, first_name, last_name, email, isVerified, isAdmin, shipping, email_subscription } = user;

  return (
    <div className="">
      {current_user?.isAdmin && (
        <div className="mb-20px">
          <h3>ID</h3>
          <label>{_id}</label>
        </div>
      )}
      <div className="mb-20px">
        <h3>First Name</h3>
        <label>{first_name}</label>
      </div>
      <div className="mb-20px">
        <h3>Last Name</h3>
        <label>{last_name}</label>
      </div>
      <div className="mb-20px">
        <h3>Email</h3>
        <label>{email}</label>
      </div>
      <div className="mb-20px">
        <h3>Password</h3>
        <label>**********</label>
      </div>
      {shipping && shipping.first_name && shipping.last_name && (
        <div className="label">
          <h3>Shipping Address</h3>
          <div>
            <div>
              {shipping.first_name} {shipping.last_name}
            </div>
            <div>
              {shipping.address_1} {shipping.address_2}
            </div>
            <div>
              {shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
            </div>
            <div>{shipping.international && "International"}</div>
            <div>{shipping.email}</div>
          </div>
        </div>
      )}
      <div className="mb-20px">
        <h3>Promotional Emails</h3>
        <label>{email_subscription ? "Subscribed" : "Not Subscribed"}</label>
      </div>
      {current_user?.isAdmin && (
        <>
          <div className="mb-20px">
            <h3>Verified</h3>
            <label>{isVerified === true ? "Verified" : "Not Verified"}</label>
          </div>
          <div className="mb-20px">
            <h3>Admin</h3>
            <label>{isAdmin === true ? "Admin" : "Not Admin"}</label>
          </div>
        </>
      )}
    </div>
  );
};
export default ProfileDetails;
