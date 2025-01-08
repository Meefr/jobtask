import React, { useContext} from "react";
import { AppContext } from "../Context/AppContext";

const TestAuth = () => {
  const { formData } = useContext(AppContext);
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <h1>User Name,  {formData.name}</h1>
      <h1>Email,  {formData.email}</h1>
      <h1>Mobile Country Code,  {formData.mobile_country_code}</h1>
      <h1>Mobile,  {formData.mobile}</h1>
      <h1>Client Type,  {formData.client_type}</h1>
      {formData.client_type === "B2B"?<>
      <h1>Company Name,  {formData.company_name}</h1>
      <h1>Commercial License Number,  {formData.commercial_license_number}</h1>
      </>:<></>}
    </div>
  );
};

export default TestAuth;
