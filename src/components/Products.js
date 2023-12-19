import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Products = ({ products, handleEdit }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.code}</td>
            <td>€{product.price}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => {handleEdit(product, true)}}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Products;
