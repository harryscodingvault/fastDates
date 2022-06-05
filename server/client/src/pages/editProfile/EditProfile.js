import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import { updateUser } from "../../features/user/userSlice";
import "./EditProfile.css";

const EditProfile = () => {
  const { isLoading, error_message, user } = useSelector((store) => store.user);

  const [values, setValues] = useState({
    username: user?.user.username || "",
    email: user?.user.email || "",
    password: "",
    confirm_password: "",
  });

  const [alert, setAlert] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/");
  }, [user]);

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
      dispatch(
        updateUser({
          data: { username, email, password },
        })
      );
    }
  };
  return (
    <div className="edit-profile-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Edit Profile</h3>
        {alert.includes("username") && (
          <div className="alert alert-danger">Check Username</div>
        )}
        <FormInput
          type="text"
          name="username"
          values={values.username}
          handleChange={handleChange}
          placeholder={values.username}
        />
        {alert.includes("email") && (
          <div className="alert alert-danger">Check Email</div>
        )}
        <FormInput
          type="email"
          name="email"
          values={values.email}
          handleChange={handleChange}
          placeholder={values.email}
        />
        {alert.includes("password") && (
          <div className="alert alert-danger">Passwords do not Match</div>
        )}
        <FormInput
          type="password"
          name="password"
          values={values.password}
          handleChange={handleChange}
          placeholder="Password"
        />
        {alert.includes("confirm_password") && (
          <div className="alert alert-danger">Passwords do not Match</div>
        )}
        <FormInput
          type="password"
          name="confirm_password"
          values={values.confirm_password}
          handleChange={handleChange}
          placeholder="Confirm Password"
        />
        {error_message.origin === "updateUser" && (
          <div className="alert alert-danger">{error_message.message}</div>
        )}
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div className="edit-profile-btn-group">
            <button
              className="btn"
              type="button"
              onClick={() => navigate("/profile")}
            >
              <h5>Cancel</h5>
            </button>
            <button className="btn" type="submit">
              <h5>Submit</h5>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
