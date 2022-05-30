import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FormInput from "../../components/formInput/FormInput";
import { loginUser } from "../../features/user/userSlice";
import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
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
    const { email, password } = values;
    let messageAlert = [];
    if (email === "" || !email.includes("@")) {
      messageAlert.push("email");
    }
    if (password === "" || password.length < 8) {
      messageAlert.push("password");
    }
    setAlert(messageAlert);
    if (!alert.length) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Login</h3>
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
          <div className="alert alert-danger">Check Password</div>
        )}
        <FormInput
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          placeholder="Password"
        />

        <button className="btn btn-block" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
      <div className="check-account">
        <p>Need an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
