import React, { useState } from "react";
import Receipt from "./Receipt.jsx";
import ProductContext from "../../context/ProductContext.jsx";

const Payment = ({ onclose, grandTotal, total, user }) => {
  const [amount, setAmount] = useState({
    cash: 0,
  });

  const [cashPayable, setCashPayable] = useState("cash");
  const [receipt, setReceipt] = useState(false);

  const handleAmt = (e) => {
    const newAmt = e.target.value;
    setAmount({ ...amount, [e.target.name]: newAmt });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCash = (e) => {
    setCashPayable(e.target.value);
    // console.log(cashPayable);
  };

  const completePayment = () => {
    setReceipt(true);
    console.log(change());
    console.log(cashPayable);
    
  };

  const change = () => {
    if (cashPayable === "cash" && amount.cash > grandTotal) {
      return amount.cash - grandTotal;
    } else if (cashPayable === "cash" && amount.cash < grandTotal) {
      return alert("Insufficient Cash");
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: "block", zIndex: 1050 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Payment Method</h5>
              <button
                type="button"
                onClick={onclose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6 className="text-center">Total: Rs {grandTotal} </h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange={handleCash}
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="cash"
                  checked={cashPayable === "cash"}
                />
                <label className="form-check-label" htmlFor="radioDefault1">
                  Cash
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="card"
                  value="card"
                  onChange={handleCash}
                  checked={cashPayable === "card"}
                />
                <label className="form-check-label" htmlFor="radioDefault2">
                  Card
                </label>
              </div>
              {cashPayable === "cash" && (
                <form action="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Amount Payable
                    </label>
                    <input
                      type="number"
                      name="cash"
                      value={amount.cash}
                      onChange={handleAmt}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  completePayment();
                }}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {receipt && (
        <Receipt
          onclose={onclose}
          grandTotal={grandTotal}
          total={total}
          user={user}
          change={change()}
          cashPayable={cashPayable}
          cash={amount.cash}
        />
      )}
    </div>
  );
};

export default Payment;
