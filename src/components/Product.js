// src/Product.js
import React from "react";
import Card from "react-bootstrap/Card";

const Product = ({ product, onClick }) => {
  return (
    <Card
      onClick={() => onClick(product.id)}
      bg={"secondary"}
      key={product.id}
      text={"white"}
      style={{ width: "10rem", cursor: "pointer" }}
      className="mb-2"
    >
      <Card.Header>{product.name}</Card.Header>
      <Card.Body>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
