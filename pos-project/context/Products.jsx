import React, { useEffect, useState, useReducer } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";
// import { get } from 'mongoose'

const Products = (props) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:7000/api/product/getProd",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": authToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Products fetched successfully:", data);
      console.log("Full backend response:", data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    product: products,
    cart: [],
  });

  const Total = () =>
    state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div>
      <ProductContext.Provider
        value={{ products, state, dispatch, Total, fetchProducts }}
      >
        {props.children}
      </ProductContext.Provider>
    </div>
  );
};

export default Products;
