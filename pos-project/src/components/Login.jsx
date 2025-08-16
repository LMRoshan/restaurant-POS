import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";
import { FaEye, FaEyeSlash, FaUserNinja, FaUnlockAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const form = {
    username: "",
    password: "",
  };

  const LoginSchema = Yup.object({
    username: Yup.string()
      .min(2, "Invalid username")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: form,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        console.log("onSubmit called!"); 
        console.log(values);
        const { username, password } = values;
        try {
          const response = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const json = await response.json();
          if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            navigate("/POS");
            action.resetForm();
          }
        } catch (error) {
          console.log("Network Error", error);
        }
      },
    });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("submitted");
  // };

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            Welcome Back
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUserNinja />
              </span>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="username"
                autoFocus
                required
              />
            </div>
            {errors.username && touched.username ? (
              <p className="text-danger">{errors.username}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">
                <FaUnlockAlt />
              </span>
              <input
                type={passwordVisibility ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                id="password"
                required
              />
              <span
                className="input-group-text"
                onClick={() => changePasswordVisibility()}
              >
                {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && touched.password ? (
              <p className="text-danger">{errors.password}</p>
            ) : null}
          </div>
          <Link className="mb-2 text-decoration-none" to="/forgot-password">
            Forgot Password
          </Link>
          <button
            type="submit"
            className="btn btn-success w-100 mt-3 mb-3"
            onClick={() => console.log("🖱️ Button clicked!")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
