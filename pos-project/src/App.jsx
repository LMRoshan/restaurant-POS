import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import POSpage from "./components/POSpage";
import Products from "../context/Products";
import Payment from "./components/Payment";
import Receipt from "./components/Receipt";

function App() {
  return (
    <>
      <Products>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/POS" element={<POSpage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </Products>
    </>
  );
}

export default App;
