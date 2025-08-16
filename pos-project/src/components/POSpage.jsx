import React, { useState, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProductContext from "../../context/ProductContext";
import "../App.css";
import Payment from "./Payment";

const POSpage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [user, setUser] = useState({
    name: "",
  });

  const [checkout, setCheckout] = useState(false);

  const { products, state, dispatch, fetchProducts } =
    useContext(ProductContext);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category } = product;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:7000/api/product/addProd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
          body: JSON.stringify({ name, price, category }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Product added successfully:", data);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCheckout = () => {
    setCheckout(!checkout);
  };

  const onClose = () => {
    setCheckout(false);
  };

  const Total = () =>
    state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container p-1">
      <h1 className="text-center my-4 fw-bolder">Deutsch Restaurant</h1>

      {/* adding product card */}
      <div className="card shadow p-3 mb-5">
        <div className="card-header text-center">
          <h4 className="fw-bolder">Add a Dish</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mt-3">
              <label htmlFor="name" className="form-label fw-bold">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="form-control"
                id="productName"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="col-md-3 mt-3">
              <label htmlFor="price" className="form-label fw-bold">
                Price (NPR)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="form-control"
                id="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="col-md-3 mt-3">
              <label htmlFor="category" className="form-label fw-bold">
                Category
              </label>
              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleChange}
                id="category"
                required
              >
                <option value="">Select Category</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
            <div className="col-md-2 mt-5">
              <button type="submit" className="btn btn-primary">
                Add a Product
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* displaying products */}
      <div className="row ">
        <div className="col-md-8">
          <h3>Available Products</h3>
          <div className="row row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {products &&
              products.map((prod) => {
                console.log("Product data:", prod); // ✅ Add this debug line
                console.log(
                  "Category value:",
                  prod.category,
                  "Type:",
                  typeof prod.category
                );
                return (
                  <div className="col" key={prod._id}>
                    <div className="card m-3 shadow shadow">
                      <div className="card-body">
                        <h3 className="card-title mt-2">{prod.name}</h3>
                        <div className="mt-3 d-flex justify-content-between">
                          <p className="card-text text-bolder mt-2">
                            Rs. {prod.price}
                          </p>
                          {prod.category === "Main Course" ? (
                            <p className="main-course"> {prod.category}</p>
                          ) : prod.category === "Starter" ? (
                            <p className="starter"> {prod.category}</p>
                          ) : prod.category === "Dessert" ? (
                            <p className="dessert"> {prod.category}</p>
                          ) : prod.category === "Drinks" ? (
                            <p className="drinks"> {prod.category}</p>
                          ) : (
                            <p className="card-text unknown">Unknown</p>
                          )}
                        </div>
                        {state.cart &&
                        state.cart.some((item) => item._id === prod._id) ? (
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE",
                                  payload: prod._id,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch({
                                  type: "ADD",
                                  payload: prod,
                                });
                              }}
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="col-md-4 mt-3 mt-lg-0">
          <div className="card h-auto shadow">
            <div className="card-header text-center">
              <span className="fw-bolder">Total Products</span>
            </div>
            <div className="card-body">
              <label htmlFor="name" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                className="form-control"
                id="name"
                placeholder="Enter customer name"
                required
              />

              <div className="row">
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="card-body">
                    {state.cart.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            {state.cart.map((item) => (
                              <tr key={item._id}>
                                
                                <td>
                                  <span>
                                    {item.name}
                                    <br />
                                    <small className="text-muted">
                                      NPR {item.price}
                                    </small>
                                  </span>
                                </td>
                                <td>
                                  <select
                                    name="qty"
                                    value={item.qty}
                                    onChange={(e) => {
                                      dispatch({
                                        type: "UPDATE_QTY",
                                        payload: {
                                          id: item._id,
                                          qty: e.target.value,
                                        },
                                      });
                                    }}
                                    className="form-select form-select-sm"
                                    style={{ width: "80px" }}
                                  >
                                    {[...Array(10).keys()].map((x) => (
                                      <option key={x} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE",
                                        payload: item._id,
                                      });
                                    }}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center">No items in cart</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bolder">Total</span>
                  <span>NPR {Total()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bolder">Tax (13%)</span>
                  <span>NPR {Total() * 0.13}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bolder">Grand Total</span>
                  <span>NPR {Total() + Total() * 0.13}</span>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-success"
                    onClick={handleCheckout}
                    type="submit"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkout && (
        <Payment
          onclose={onClose}
          total={Total()}
          grandTotal={Total() + Total() * 0.13}
          user={user.name}
        />
      )}
    </div>
  );
};

export default POSpage;
