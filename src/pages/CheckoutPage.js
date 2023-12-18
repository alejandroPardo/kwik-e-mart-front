// src/ProductsPage.js
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import CheckoutInvoice from "../components/CheckoutInvoice";
import Alert from "react-bootstrap/Alert";

const CheckoutPage = () => {
  const [basket, setBasket] = useState({ products: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/baskets`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBasket(data);
      
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const handleClearBasket =async () => {
    try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/baskets/empty_basket`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchBasket();
      } catch (error) {
        console.error("Error clearing to basket:", error);
      }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/invoices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      <Alert key='success' variant='success'>
        This is a success alert—check it out!
      </Alert>
      handleClearBasket()
      navigate("/");
      // Additional logic after successful POST request
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
  };

  const handleProducts = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row>
            <h1>Checkout</h1>
            <CheckoutInvoice checkoutData={basket} />
          </Row>
        </Col>
        <Col sm={4} >
          <h2>Actions</h2>
          {basket.products.length > 0 && <Button variant="success" size="sm" onClick={handleSubmit}>
            Submit
          </Button>  } {" "}
          <Button variant="primary" size="sm" onClick={handleProducts}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
