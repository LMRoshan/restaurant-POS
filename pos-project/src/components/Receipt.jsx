import React, { useContext } from "react";
import ProductContext from "../../context/ProductContext";

const Receipt = ({
  onclose,
  grandTotal,
  total,
  user,
  change,
  cashPayable,
  cash,
}) => {
  const { state } = useContext(ProductContext);

  console.log(cash);
  
  return (
    <div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Receipt</h5>
              <button
                type="button"
                onClick={onclose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <h4 className="text-center">Deutsch Restaurant</h4>

                  <span className="text-center">
                    Date:{" "}
                    <span className="fw-bold">
                      {new Date().toLocaleDateString()}
                    </span>{" "}
                  </span>
                  <span className="text-center mb-2">
                    Customer: <span className="fw-bold">{user}</span>{" "}
                  </span>
                  <hr />

                  {state &&
                    state.cart.map((item) => (
                      <div className="d-flex" key={item.id}>
                        <span>
                          <span className="fw-bold">{item.name} </span> x{" "}
                          {item.qty}
                        </span>
                        <span className="ms-auto fw-bold mb-2">
                          Rs. {item.price * item.qty}
                        </span>
                      </div>
                    ))}

                  <hr />
                  <div className="d-flex mb-2">
                    <span>Subtotal: </span>
                    <span className="ms-auto">Rs. {total}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span>Tax (13%): </span>
                    <span className="ms-auto">Rs. {total * 0.13}</span>
                  </div>

                  <div className="d-flex mb-2">
                    <h6>Total: </h6>
                    <h6 className="ms-auto">Rs. {grandTotal}</h6>
                  </div>
                  <hr />
                  <div className="d-flex mb-2">
                    <span>Payment Method: </span>
                    <span className="ms-auto">{cashPayable}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span>You Paid </span>
                    <span className="ms-auto">
                      Rs. {cashPayable === "cash" ? cash : grandTotal}
                    </span>
                  </div>
                  <div className="d-flex mb-2">
                    <span>Change: </span>
                    <span className="ms-auto">Rs. {change}</span>
                  </div>
                  <hr />
                  <span className="text-center">
                    Thank you for shopping with us!
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close Receipt
              </button>
              <button type="button" className="btn btn-primary">
                Print PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
