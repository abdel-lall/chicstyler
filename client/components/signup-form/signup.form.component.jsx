"use client";
import "./signup.form.scss";
import axios from "axios";
import { APIusersEndPoints } from "@/utils/URL";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import FormInput from "../form-input/form.input.component";
import Button from "../button/button.component";
import { useState } from "react";
const SignupForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [signUpValues, setSignUpValues] = useState({ ...initialValues });
  const [warningValue, setwarningValue] = useState("");
  const { name, email, password, confirmpassword } = signUpValues;

  const signUpInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignUpValues({ ...signUpValues, [name]: value });
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkIfFieldsEmpty = ({ email, password, name, confirmpassword }) => {
    if (name === "") {
      return "name is required";
    } else if (email === "") {
      return "email is required";
    } else if (!isValidEmail(email)) {
      return "please enter a valid email";
    } else if (password === "") {
      return "password is required";
    } else if (confirmpassword === "") {
      return "confirm password is required";
    } else {
      return "";
    }
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    const fieldsCheckMessage = checkIfFieldsEmpty(signUpValues);
    if (fieldsCheckMessage !== "") {
      setwarningValue(fieldsCheckMessage);
    } else {
      if (signUpValues.password !== signUpValues.confirmpassword) {
        setwarningValue("password and confirm password don't match");
      } else {
        setwarningValue("");
        axios
          .post("/api/users/signup", signUpValues)
          .then((response) => {
            if (response.status === 201) {
              dispatch(setUser(response.data));
            }
          })
          .catch((error) => {
            setwarningValue(error.response.data?.errors[0]?.message);
            setSignUpValues({ ...initialValues });
          });
      }
    }
  };

  return (
    <div className="signup-form-section">
      <div className="signup-form-title">sign up</div>
      <div className="signup-form-alert">{warningValue}</div>

      <form className="signup-form">
        <FormInput
          placeholder="Name"
          name="name"
          type="text"
          value={name}
          onChange={signUpInputChange}
        />
        <FormInput
          placeholder="Email"
          name="email"
          type="text"
          value={email}
          onChange={signUpInputChange}
        />
        <FormInput
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={signUpInputChange}
        />
        <FormInput
          placeholder="Confirm Password"
          name="confirmpassword"
          type="password"
          id="confirmpassword"
          value={confirmpassword}
          onChange={signUpInputChange}
        />
        <Button
          text="Sign Up"
          className="signup-button"
          dark={true}
          onClick={signUpSubmit}
        />
      </form>
    </div>
  );
};

export default SignupForm;
