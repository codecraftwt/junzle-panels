import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadForm from "./pages/LeadForm.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/leads" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
