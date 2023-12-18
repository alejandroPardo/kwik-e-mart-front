import React from 'react';
import { Table, ListGroup, Card } from 'react-bootstrap';


const CheckoutInvoice = ({ checkoutData }) => {
  return (
    <Card>
      <Card.Header as="h2">Invoice</Card.Header>
      <Card.Body>
        <h3>Items</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {checkoutData.products.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>€{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>€{item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3>Discounts</h3>
        <ListGroup>
          {checkoutData.products.map((item, index) =>
            Object.entries(item.total_discount).map(([discountName, discountValue]) => (
              <ListGroup.Item key={`${index}-${discountName}`}>
                {discountName}: -€{discountValue}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>

        <div className="mt-3">
          <p><strong>Total Price:</strong> €{checkoutData.price}</p>
          <p><strong>Total Discounts:</strong> -€{checkoutData.discounts}</p>
          <p><strong>Final Price:</strong> €{checkoutData.final_price}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CheckoutInvoice;
