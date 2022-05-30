import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FormInput from "../../components/formInput/FormInput";
import { registerUser } from "../../features/user/userSlice";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const [alert, setAlert] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });

    let messageAlert = alert;
    for (let i = 0; i < messageAlert.length; i++) {
      if (messageAlert[i] === name) {
        messageAlert.splice(i, 1);
      }
    }
    setAlert(messageAlert);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirm_password } = values;
    let messageAlert = [];
    if (username === "") {
      messageAlert.push("username");
    }
    if (email === "" || !email.includes("@")) {
      messageAlert.push("email");
    }
    if (
      password === "" ||
      password.length < 8 ||
      confirm_password !== password
    ) {
      messageAlert.push("password");
    }
    if (
      confirm_password === "" ||
      confirm_password.length < 8 ||
      confirm_password !== password
    ) {
      messageAlert.push("confirm_password");
    }
    setAlert(messageAlert);
    if (!alert.length) {
      dispatch(registerUser({ username, email, password }));
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Register</h3>
        {alert.includes("username") && (
          <div className="alert alert-danger">Check Username</div>
        )}
        <FormInput
          type="text"
          name="username"
          value={values.username}
          handleChange={handleChange}
          placeholder="Username"
        />
        {alert.includes("email") && (
          <div className="alert alert-danger">Check Email</div>
        )}
        <FormInput
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          placeholder="Email"
        />
        {alert.includes("password") && (
          <div className="alert alert-danger">Passwords do not Match</div>
        )}
        <FormInput
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          placeholder="Password"
        />
        {alert.includes("confirm_password") && (
          <div className="alert alert-danger">Passwords do not Match</div>
        )}
        <FormInput
          type="password"
          name="confirm_password"
          value={values.confirm_password}
          handleChange={handleChange}
          placeholder="Confirm Password"
        />

        <button className="btn btn-block" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
      <div className="check-account">
        <p>Got an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
