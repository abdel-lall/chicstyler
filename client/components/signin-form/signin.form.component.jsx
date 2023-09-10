"use client";
import "./signin.form.scss";
import axios from "axios";
import { APIusersEndPoints } from "@/utils/URL";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import FormInput from "../form-input/form.input.component";
import Button from "../button/button.component";
import { useState } from "react";
const SigninForm = ({ buttonId }) => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const [signInValues, setSignInValues] = useState({ ...initialValues });
  const { email, password } = signInValues;
  const [warningValue, setwarningValue] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkIfFieldsEmpty = ({ email, password }) => {
    if (email === "") {
      return "email is required";
    } else if (!isValidEmail(email)) {
      return "please enter a valid email";
    } else if (password === "") {
      return "password is required";
    } else {
      return "";
    }
  };

  const signInInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignInValues({ ...signInValues, [name]: value });
  };
  const SigninSubmit = (e) => {
    e.preventDefault();
    const fieldsCheckMessage = checkIfFieldsEmpty(signInValues);
    if (fieldsCheckMessage !== "") {
      setwarningValue(fieldsCheckMessage);
    } else {
      setwarningValue("");
      axios
        .post("/api/users/signin", signInValues)
        .then((response) => {
          if (response.status === 200) {
            dispatch(setUser(response.data));
          }
        })
        .catch((error) => {
          setwarningValue(error.response.data?.errors[0]?.message);
          setSignInValues({ ...initialValues });
        });
    }
  };

  return (
    <div className="signin-form-section">
      <div className="signin-form-title">sign in</div>
      <div className="signin-form-alert">{warningValue}</div>

      <form className="signin-form">
        <FormInput
          placeholder="Email"
          name="email"
          type="text"
          value={email}
          onChange={signInInputChange}
        />
        <FormInput
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={signInInputChange}
        />

        <Button
          dark={true}
          text="Sign In"
          className="signin-button"
          id={buttonId}
          onClick={SigninSubmit}
        />
      </form>
    </div>
  );
};

export default SigninForm;
