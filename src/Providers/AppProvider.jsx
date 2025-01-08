import { useState } from "react";
import { AppContext } from "../Context/AppContext";
import { authService } from "../backend/authentications";

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLogin,
        setIsLogin,
        formData,
        setFormData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
