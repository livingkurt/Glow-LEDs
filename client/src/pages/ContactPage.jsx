import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { Title } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../actions/userActions';
// import "./form.css";

export default function Form() {
  const dispatch = useDispatch();

  const [user_name, set_user_name] = useState('');
  const [user_email, set_user_email] = useState('');
  const [order_number, set_order_number] = useState('');
  const [reason_for_contact, set_reason_for_contact] = useState('');
  const [message, set_message] = useState('');

  const userContact = useSelector(state => state.userContact);
  const { loading, completed, error } = userContact;

  function sendEmail(e) {
    e.preventDefault();
    dispatch(contact({
      user_name, user_email, order_number, reason_for_contact, message
    }));
    e.target.reset();
    set_user_name('')
    set_user_email('')
    set_order_number('')
    set_reason_for_contact('')
    set_message('')
  }


  return (
    <BlockContainer class="main_container">
      <FlexContainer h_center>
        <Title styles={{ fontSize: 40 }} >Contact</Title>
      </FlexContainer>
      <FlexContainer h_center>
        {loading && <Title styles={{ fontSize: 20 }} >Loading...</Title>}
        {error && <Title styles={{ fontSize: 20 }} >{error}</Title>}
        {completed && <Title styles={{ fontSize: 20 }} >{completed}</Title>}
      </FlexContainer>
      <form style={{ display: "flex", flexDirection: "column" }} className="contact-form" onSubmit={sendEmail}>
        {/* <input onChange={(e) => set_contact_number(e.target.value)} className="zoom_f input_i" type="text" name="contact_number" /> */}
        <label>Name</label>
        <input onChange={(e) => set_user_name(e.target.value)} defaultValue={user_name} className="zoom_f input_i" type="text" name="user_name" placeholder="Name" />
        <label>Email</label>
        <input onChange={(e) => set_user_email(e.target.value)} defaultValue={user_email} className="zoom_f input_i" type="email" name="user_email" placeholder="Email" />
        <label>Order Number</label>
        <input onChange={(e) => set_order_number(e.target.value)} defaultValue={order_number} className="zoom_f input_i" type="text" name="order_number" placeholder="Order Number" />
        <label>Reason for Contact</label>
        {/* <input onChange={(e) => set_}defaultValue={} className="zoom_f input_i" type="text" name="order_number" placeholder="Order Number" /> */}
        <select onChange={(e) => set_reason_for_contact(e.target.value)} defaultValue={reason_for_contact} className="input_i" name="reason_for_contact">
          <option defaultValue="">-</option>
          <option defaultValue="order_issues">Order Issues</option>
          <option defaultValue="returns">Returns</option>
          <option defaultValue="technical_support">Technical Support</option>
        </select>
        <label>Message</label>
        <textarea onChange={(e) => set_message(e.target.value)} defaultValue={message} className="zoom_f input_i" name="message" placeholder="Enter Message Here" />
        <input style={{ fontSize: "16px", width: "100px" }} className="zoom_b" id="button" type="submit" value="Send" />
      </form>
    </BlockContainer>
  );
}