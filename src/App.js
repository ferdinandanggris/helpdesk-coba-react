import * as React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ListUser from "./pages/user/ListUser";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<ListUser />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
