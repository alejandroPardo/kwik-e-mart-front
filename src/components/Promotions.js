import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Promotions = ({ promotions, handleEdit }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
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
            <td>{promotion.start_date}</td>
            <td>{promotion.end_date}</td>
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
              <Button variant="primary" size="sm" onClick={handleEdit(promotion.id)}>
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
