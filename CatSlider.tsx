import React, { useState } from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";

const CheckoutModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CheckoutForm = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  color: #fff;
`;

const StepsContainer = styled.div`
  margin-bottom: 40px;
`;

const StepTabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #333;
    z-index: 1;
  }
`;

const StepTab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#00ff88" : "#666")};
  padding: 15px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  width: 33.33%;

  &:hover {
    color: ${(props) => (props.active ? "#00ff88" : "#999")};
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) => (props.active ? "#00ff88" : "transparent")};
    z-index: 2;
    transition: all 0.3s ease;
  }
`;

const StepContent = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
  animation: ${(props) => (props.active ? "fadeIn 0.5s ease" : "none")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  label {
    display: block;
    color: #999;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    background: #222;
    border: 1px solid #333;
    color: #fff;
    padding: 12px 15px;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #00ff88;
      box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.1);
      outline: none;
    }
  }
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const PaymentMethod = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #222;
  border: 1px solid #333;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    background: #2a2a2a;
  }

  img {
    height: 30px;
    object-fit: contain;
  }

  input {
    width: 20px;
    height: 20px;
    accent-color: #00ff88;
  }
`;

const OrderSummary = styled.div`
  background: #222;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const SuccessModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1a1a1a;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  background: #00ff88;
  border: none;
  border-radius: 8px;
  padding: 15px 25px;
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc66;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  &.total {
    font-weight: bold;
  }
`;

const PaymentMethods = styled.div`
  margin-bottom: 20px;
`;

const CatSlider: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsCheckoutOpen(false);
        setCurrentStep(1);
        // Clear cart here if needed
      }, 3000);
    }
  };

  return (
    <>
      <CheckoutModal isOpen={isCheckoutOpen}>
        <CheckoutForm>
          <CloseButton
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              color: "#fff",
            }}
            onClick={() => setIsCheckoutOpen(false)}
          >
            <BsX size={24} />
          </CloseButton>

          <StepsContainer>
            <StepTabs>
              <StepTab
                active={currentStep === 1}
                onClick={() => setCurrentStep(1)}
              >
                CUSTOMER DETAILS
              </StepTab>
              <StepTab
                active={currentStep === 2}
                onClick={() => setCurrentStep(2)}
              >
                PAYMENT METHOD
              </StepTab>
              <StepTab
                active={currentStep === 3}
                onClick={() => setCurrentStep(3)}
              >
                CONFIRMATION
              </StepTab>
            </StepTabs>
          </StepsContainer>

          <StepContent active={currentStep === 1}>
            <FormGroup>
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </FormGroup>
            <FormGroup>
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" />
            </FormGroup>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <FormGroup>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (234) 567-8900" />
              </FormGroup>
              <FormGroup>
                <label>Country</label>
                <select>
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
              </FormGroup>
            </div>
            <FormGroup>
              <label>Street Address</label>
              <input type="text" placeholder="Enter your street address" />
            </FormGroup>
          </StepContent>

          <StepContent active={currentStep === 2}>
            <PaymentMethodGrid>
              <PaymentMethod>
                <input type="radio" name="payment" id="visa" />
                <img src="/path/to/visa.png" alt="Visa" />
                <span>Visa Card</span>
              </PaymentMethod>
              <PaymentMethod>
                <input type="radio" name="payment" id="mastercard" />
                <img src="/path/to/mastercard.png" alt="Mastercard" />
                <span>Mastercard</span>
              </PaymentMethod>
              <PaymentMethod>
                <input type="radio" name="payment" id="paypal" />
                <img src="/path/to/paypal.png" alt="PayPal" />
                <span>PayPal</span>
              </PaymentMethod>
              <PaymentMethod>
                <input type="radio" name="payment" id="cod" />
                <span>Cash on Delivery</span>
              </PaymentMethod>
            </PaymentMethodGrid>

            <FormGroup>
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" />
            </FormGroup>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "20px",
              }}
            >
              <FormGroup>
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" />
              </FormGroup>
              <FormGroup>
                <label>CVC</label>
                <input type="text" placeholder="123" maxLength={3} />
              </FormGroup>
            </div>
          </StepContent>

          <StepContent active={currentStep === 3}>
            <OrderSummary>
              <h3 style={{ marginBottom: "20px", color: "#00ff88" }}>
                Order Summary
              </h3>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    color: "#999",
                  }}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div
                style={{
                  borderTop: "1px solid #333",
                  marginTop: "20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span>Shipping</span>
                  <span>$5.50</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    color: "#00ff88",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <span>Total</span>
                  <span>${(getTotalPrice() + 5.5).toFixed(2)}</span>
                </div>
              </div>
            </OrderSummary>
          </StepContent>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep((prev) => prev + 1);
                } else {
                  setShowSuccess(true);
                  setTimeout(() => {
                    setShowSuccess(false);
                    setIsCheckoutOpen(false);
                    setCurrentStep(1);
                  }, 3000);
                }
              }}
              style={{
                background: "#00ff88",
                border: "none",
                color: "#000",
                padding: "12px 40px",
                borderRadius: "8px",
                cursor: "pointer",
                marginLeft: "auto",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              {currentStep === 3 ? "Place Order" : "Continue"}
            </button>
          </div>
        </CheckoutForm>
      </CheckoutModal>

      <SuccessModal isOpen={showSuccess}>
        <div style={{ fontSize: "50px", marginBottom: "20px" }}>🎉</div>
        <h2 style={{ color: "#00ff88", marginBottom: "15px" }}>
          Order Successful!
        </h2>
        <p style={{ color: "#999", marginBottom: "20px" }}>
          Thank you for your purchase. Your order is being processed.
        </p>
        <div style={{ color: "#666" }}>
          Estimated delivery time: 2-3 business days
        </div>
      </SuccessModal>
    </>
  );
};

export default CatSlider;
