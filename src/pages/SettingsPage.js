// src/ProductsPage.js
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Promotions from "../components/Promotions";
import Invoices from "../components/Invoices";
import PromotionModal from "../components/PromotionModal";
import Products from "../components/Products";
import ProductModal from "../components/ProductModal";

const ProductsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [productLabels, setProductLabels] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState({
    name: "",
    description: "",
    product_id: "",
    discounts: [{ discount_type: "", discount_value: "" }],
    conditions: [{ condition_type: "", condition_value: "" }],
  });
  const [productModalShow, setProductModalShow] = useState(false);
  const [isProductEdit, setIsProductEdit] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    name: "",
    code: "",
    price: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/invoices`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Fetching products failed:", error);
      }
    };
    fetchPromotions();
    fetchInvoices();
    fetchProducts()
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/promotions`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error("Fetching products failed:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data)
      setProductLabels(data.map(obj => ({
        value: obj.id.toString(),
        label: obj.name
      })))
    } catch (error) {
      console.error("Fetching products failed:", error);
    }
  };

  const handleProducts = () => {
    navigate("/");
  };

  const handleModalClose = () => setModalShow(false);

  const handleProductModalClose = () => setProductModalShow(false);

  const handleModalShow = (promotion, isEdit) => {
    if (promotion) {
      setEditingPromotion(promotion);
      setIsEdit(true);
    } else {
      setEditingPromotion({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        product_id: "",
        discounts: [{ discount_type: "", discount_value: "" }],
        conditions: [{ condition_type: "", condition_value: "" }],
      });
      setIsEdit(false);
    }
    setModalShow(true);
  };

  const handleProductModalShow = (product, isEdit) => {
    if (product) {
      setEditingProduct(product);
      setIsProductEdit(true);
    } else {
      setEditingProduct({
        name: "",
        code: "",
        price: ""
      });
      setIsProductEdit(false);
    }
    setProductModalShow(true);
  };

  const handleSubmit = async () => {
    const currentDate = new Date()
    const { discounts, conditions, ...restOfObject } = editingPromotion;
    const promotionToSave = {
      ...restOfObject,
      discounts_attributes: discounts,
      conditions_attributes: conditions,
      start_date: currentDate.toString(),
      end_date: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toString(),
    };
    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit ? `/promotions/${promotionToSave.id}` : "/promotions";
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${url}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(promotionToSave),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
    handleModalClose();
  };

  const handleProductSubmit = async () => {
    const method = isProductEdit ? "PATCH" : "POST";
    const url = isProductEdit ? `/products/${editingProduct.id}` : "/products";
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${url}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
    handleModalClose();
  };

  const handleDelete = async (promotionId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/promotions/${promotionId}`,
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
      fetchPromotions();
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
    handleModalClose();
  };

  const handleProductDelete = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
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
      fetchProducts();
    } catch (error) {
      console.error("Error adding product to basket:", error);
    }
    handleProductModalClose();
  };

  return (
    <Container>
      <h1>Settings</h1>
      <Row>
        <Col sm={10}>
          <h2>Products</h2>
            <Products products={products} handleEdit={handleProductModalShow} />
          <h2>Promotions</h2>
          <Promotions promotions={promotions} handleEdit={handleModalShow} products={productLabels} />
          <h2>Invoices History</h2>
          <Invoices invoices={invoices} />
        </Col>
        <Col sm={2}>
          <Button variant="primary" size="sm" onClick={handleProducts}>
            Back
          </Button>
          <br />
          <br />
          <Button
            variant="success"
            size="sm"
            onClick={() => handleProductModalShow(null)}
          >
            Create Product
          </Button>
          <br />
          <br />
          <Button
            variant="success"
            size="sm"
            onClick={() => handleModalShow(null)}
          >
            Create Promotion
          </Button>
          <PromotionModal
            show={modalShow}
            handleClose={handleModalClose}
            handleSubmit={handleSubmit}
            formData={editingPromotion}
            setFormData={setEditingPromotion}
            isEdit={isEdit}
            handleDelete={handleDelete}
            products={productLabels}
          />

          <ProductModal
            show={productModalShow}
            handleClose={handleProductModalClose}
            handleSubmit={handleProductSubmit}
            formData={editingProduct}
            setFormData={setEditingProduct}
            isEdit={isProductEdit}
            handleDelete={handleProductDelete}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
