import { useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    mobile_country_code: "",
    mobile: "",
    client_type: "MY_COMPANY",
    issuing_authority: "",
    company_name: "",
    commercial_license_number: "",
  });
  const [token, setToken] = useState()
  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        formData,
        setFormData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
