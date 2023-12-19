import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Promotions = ({ promotions, handleEdit, products }) => {

  const productLabel = (productId) => {
    const label = products.find(obj => obj.value === productId.toString())
    return label ? label.label : ''
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Product</th>
          <th>Discounts</th>
          <th>Conditions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {promotions.map((promotion) => (
          <tr key={promotion.id}>
            <td>{promotion.name}</td>
            <td>{promotion.description}</td>
            <td>{productLabel(promotion.product_id)}</td>
            <td>
              {promotion.discounts.map((discount, index) => (
                <div key={index}>
                  {discount.discount_type}: {discount.discount_value}
                </div>
              ))}
            </td>
            <td>
              {promotion.conditions.map((condition, index) => (
                <div key={index}>
                  {condition.condition_type}: {condition.condition_value}
                </div>
              ))}
            </td>
            <td>
              <Button variant="primary" size="sm" onClick={() => {handleEdit(promotion, true)}}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Promotions;
