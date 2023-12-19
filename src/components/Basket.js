import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Basket = ({ basketData }) => {
  return (
    <div>
      <h2>Your Basket</h2>
      <ListGroup>
        {basketData.products.map((item, index) => (
          <ListGroup.Item key={index}>
            <div>
              <strong>{item.product.name}</strong> (Code: {item.product.code})
              <div>Quantity: {item.quantity}</div>
              <div>Total Price: €{item.total_price}</div>
              {Object.keys(item.total_discount).length > 0 && (
                <div>
                  Discounts Applied:
                  {Object.entries(item.total_discount).map(([key, value], idx) => (
                    <div key={idx}>{key}: €{value}</div>
                  ))}
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div>
        <strong>Total Price:</strong> €{basketData.price}
      </div>
      <div>
        <strong>Discounts:</strong> €{basketData.discounts}
      </div>
      <div>
        <strong>Final Price:</strong> €{basketData.final_price}
      </div>
    </div>
  );
};

export default Basket;
