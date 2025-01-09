import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationForm() {
  const { formData, setFormData, setIsLogin, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name || formData.name.length > 255) {
      newErrors.name = "Name is required and must be less than 255 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain upper and lower case letters, numbers, and symbols.";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords must match.";
    }

    const mobileRegex = /^\+?\d{1,4}$/;
    if (
      !formData.mobile_country_code ||
      !mobileRegex.test(formData.mobile_country_code)
    ) {
      newErrors.mobile_country_code =
        "Please enter a valid country code (e.g., +20 or 20).";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.mobile || !phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (formData.client_type === "B2B") {
      if (!formData.issuing_authority) {
        newErrors.issuing_authority =
          "Issuing authority is required for B2B clients.";
      }
      if (!formData.company_name) {
        newErrors.company_name = "Company name is required for B2B clients.";
      }
      if (!formData.commercial_license_number) {
        newErrors.commercial_license_number =
          "Commercial license number is required for B2B clients.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post("https://print.trendline.marketing/api/auth/register", formData);
  
      // Extract the token from the response
      const token = response.data.data.token;
  
      // Save the token to localStorage or state
      console.log("Token:", token);
      localStorage.setItem("TOKEN", token);
      setToken(token)
      // Navigate to protected route
      navigate("/test-auth");
      
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Update login state
      setIsLogin(true);    
      await handleRegister();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md mt-2"
    >
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Password Confirmation */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.password_confirmation ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password_confirmation}
          </p>
        )}
      </div>

      {/* Mobile Country Code */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Mobile Country Code
        </label>
        <input
          type="text"
          name="mobile_country_code"
          value={formData.mobile_country_code}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.mobile_country_code ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.mobile_country_code && (
          <p className="text-red-500 text-sm mt-1">
            {errors.mobile_country_code}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.mobile ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none`}
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
        )}
      </div>

      {/* Client Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Client Type</label>
        <select
          name="client_type"
          value={formData.client_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="MY_COMPANY">MY_COMPANY</option>
          <option value="B2C">B2C</option>
          <option value="B2B">B2B</option>
        </select>
      </div>

      {/* Conditional Fields for B2B */}
      {formData.client_type === "B2B" && (
        <>
          {/* Issuing Authority */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Issuing Authority
            </label>
            <input
              type="text"
              name="issuing_authority"
              value={formData.issuing_authority}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.issuing_authority ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
            />
            {errors.issuing_authority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.issuing_authority}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.company_name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
            />
            {errors.company_name && (
              <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
            )}
          </div>

          {/* Commercial License Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Commercial License Number
            </label>
            <input
              type="text"
              name="commercial_license_number"
              value={formData.commercial_license_number}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.commercial_license_number
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none`}
            />
            {errors.commercial_license_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.commercial_license_number}
              </p>
            )}
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default RegistrationForm;
