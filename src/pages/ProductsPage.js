// src/ProductsPage.js
import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Basket from "../components/Basket";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    };
    fetchProducts();
    setBasketItems(fetchBasket());
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
      setBasketItems(data)
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const handleAddToBasket = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/baskets/${productId}`,
        {
          method: "PATCH",
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
      console.error("Error adding product to basket:", error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleSettings = () => {
    navigate('/settings');
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

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Row>
            <h1>Products</h1>
            {products.map((product) => (
              <Col sm={3} key={product.id}>
                <Product
                  key={product.id}
                  product={product}
                  onClick={handleAddToBasket}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col sm={4}>
          {basketItems.products && <Basket basketData={basketItems} />}
          <div className="mb-2">
            <Button variant="success" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
          <div>
            <Button variant="warning" size="sm" onClick={handleClearBasket}>
              Clear Basket
            </Button>{' '}
            <Button variant="primary" size="sm" onClick={handleSettings}>
              Settings
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
