import "./App.css";
import Home from "./Pages/Home";
import RegistrationForm from "./Pages/RegistrationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import TestAuth from "./Pages/TestAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element= {
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        }
        />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/test-auth"
          element={
            <ProtectedRoute>
              <TestAuth />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
