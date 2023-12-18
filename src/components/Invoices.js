import React from "react";
import Table from "react-bootstrap/Table";

const InvoicesTable = ({ invoices }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>${invoice.amount}</td>
            <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvoicesTable;
