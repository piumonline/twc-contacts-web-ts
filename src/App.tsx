import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Routes/ProtectedRoute";

import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Contacts from "./pages/Contacts.tsx";
import AddContacts from "./pages/AddContacts.tsx";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/contacts"
          element={<PrivateRoute element={<Contacts />} />}
        />

        <Route
          path="/contacts/new"
          element={<PrivateRoute element={<AddContacts />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
