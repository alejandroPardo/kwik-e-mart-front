import { Modal, Button, Form, Container, Col, Row } from "react-bootstrap";

const PromotionModal = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  handleDelete,
  isEdit,
  products,
}) => {
  const conditionTypes = [
    { value: "--", label: "--"},
    {value: "min_quantity", label: "Minimum Quantity" }
  ];

  const discountTypes = [
    { value: "--", label: "--"},
    { value: "percentage", label: "Percentage" },
    { value: "fixed_price", label: "Fixed" },
    { value: "free_product", label: "Free Product" },
  ];

  const handleChange = (e, index, field) => {
    if (field) {
      // Handle nested fields (discounts and conditions)
      const updatedField = [...formData[field]];
      updatedField[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [field]: updatedField });
    } else {
      // Handle top-level fields
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Edit Promotion" : "Create Promotion"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Select
                  name="product_id"
                  value={formData.product_id || ''}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.value} value={product.value}>
                      {product.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <h5>Discounts</h5>
              {formData.discounts.map((discount, index) => (
                <Container key={index}>
                  <Row>
                    <Col sm={7}>
                      <Form.Group className="mb-3">
                        <Form.Label>Discount Type</Form.Label>
                        <Form.Select
                          name="discount_type"
                          value={discount.discount_type}
                          onChange={(e) => handleChange(e, index, "discounts")}
                        >
                          {discountTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col sm={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Discount Value</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.01"
                          name="discount_value"
                          value={discount.discount_value}
                          onChange={(e) => handleChange(e, index, "discounts")}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              ))}
              <h5>Conditions</h5>
              {formData.conditions.map((condition, index) => (
                <Container key={index}>
                  <Row>
                    <Col sm={7}>
                      <Form.Group className="mb-3">
                        <Form.Label>Condition Type</Form.Label>
                        <Form.Select
                          name="condition_type"
                          value={condition.condition_type}
                          onChange={(e) => handleChange(e, index, "conditions")}
                        >
                          {conditionTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col sm={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Condition Value</Form.Label>
                        <Form.Control
                          type="number"
                          name="condition_value"
                          value={condition.condition_value}
                          onChange={(e) => handleChange(e, index, "conditions")}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              ))}
              <Button variant="success" size="lg" type="submit">
                {isEdit ? "Update" : "Create"}
              </Button>{" "}
              {isEdit && (
                <Button
                  variant="warning"
                  size="lg"
                  onClick={() => handleDelete(formData.id)}
                >
                  Delete
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PromotionModal;
