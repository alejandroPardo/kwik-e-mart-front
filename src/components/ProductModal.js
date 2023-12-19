import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const ProductModal = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  handleDelete,
  isEdit,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Product" : "Create Product"}</Modal.Title>
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
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step={0.01}
                  name="price"
                  value={formData.price}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
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

export default ProductModal;
