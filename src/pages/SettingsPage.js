// src/ProductsPage.js
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Promotions from "../components/Promotions";
import Invoices from "../components/Invoices";

const ProductsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/promotions`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    };
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/invoices`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    };
    fetchPromotions();
    fetchInvoices();
  }, []);

  const handleProducts = () => {
    navigate("/");
  };

  const handleEdit = (promotion) => {
    // navigate("/promotion/");
  };

  return (
    <Container>
      <h1>Promotions</h1>
      <Row>
        <Col sm={10}>
          <h2>Promotions</h2>
          <Promotions promotions={promotions} handleEdit={handleEdit} />
          <h2>Invoices</h2>
          <Invoices invoices={invoices}/>
        </Col>
        <Col sm={2}>
          
          <div>
            <Button variant="primary" size="sm" onClick={handleProducts}>
              Products
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
