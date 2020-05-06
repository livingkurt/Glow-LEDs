// React
import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
// Styles
import './form.css'
import { EditorInput, Title, ButtonWord } from '../index'
import API from '../../../utils/API'


const Form = (props) => {
  const [pet_state, set_pet_state] = useState({
    pet_name: "",
    species: "",
    breed: "",
    sex: "",
    weight: "",
    age: "",
    location: "",
    fee: "",
  })

  const on_change_input = (e) => {
    // const pet_id = pet_state._id
    const pet_data = e.target.value
    const field_name = e.target.name
    console.log(pet_data, field_name)
    set_pet_state({ ...pet_state, [field_name]: pet_data })
  }

  const save_pet = async (e) => {
    e.preventDefault()
    try {
      console.log({ "Save Pet": pet_state })
      const res = await API.post_pet(pet_state)
    }
    catch (err) {
      console.log({ "on_change_pet_editor": err });
    }
    props.history.push('profile')
    // return <Redirect to='/profile' />;
  }



  return (
    <form>
      <Title styles={{ fontSize: "50px", textAlign: "center", width: "100%" }}>Create Pet</Title>
      <EditorInput name="pet_name" id="" on_change_function={on_change_input} label="Pet Name"></EditorInput>
      <EditorInput name="species" id="" on_change_function={on_change_input} label="Species"></EditorInput>
      <EditorInput name="breed" id="" on_change_function={on_change_input} label="Breed"></EditorInput>
      <EditorInput name="sex" id="" on_change_function={on_change_input} label="Sex"></EditorInput>
      <EditorInput name="weight" id="" on_change_function={on_change_input} label="Weight"></EditorInput>
      <EditorInput name="age" id="" on_change_function={on_change_input} label="Estimated Age"></EditorInput>
      <EditorInput name="location" id="" on_change_function={on_change_input} label="Location"></EditorInput>
      <EditorInput name="fee" id="" on_change_function={on_change_input} label="Adoption Fee"></EditorInput>
      <ButtonWord on_click_function={save_pet}>Save Pet!</ButtonWord>
    </form>
  );
}

export default Form;

