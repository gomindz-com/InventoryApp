/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

import { useState, useEffect } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Button } from "@mui/material";
import { getProducts, addProduct } from "apiservices/productService";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { AddProductSchema } from "formValidation/addForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { deleteProduct } from "apiservices/productService";
import { getCategories } from "apiservices/categoryService";
import { editProduct } from "apiservices/productService";

import axios from "axios";
import Animation from "components/Animation/Animation";

import { Container, Title, Ul, Cursor } from "components/Animation/StyledAnimation";
import { baseUrl } from "apiservices/baseURL";

function Products() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const category_options = [];
  const [editFormActive, setEditFormActive] = useState(false);

  //INPIT FIELDS VALIDATIONS
  const [errorProductPrice, setErrorProductPrice] = useState(false);

  const navigate = useNavigate();

  //START ADDING NEW PRODUCT
  const [productData, setProductData] = useState({
    name: "",
    sortno: "",
    category: "",
    sku: "",
    stock: "",
    description_color: "",
    price: "",
    label_size: "",
    status: "in_stock",
  });

  const status_options = [
    {
      value: "in_stock",
      label: "in stock",
      id: 0,
    },
    {
      value: "out_of_stock",
      label: "Out of Stock",
      id: 1,
    },
  ];

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      let token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/formdata",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Origin": "http://192.168.1.72:3000",
          "Access-Control-Allow-Credentials": "true",
          Authorization: token ? `Token ${token}` : "",
        },
      };
      const url = `${baseUrl}store/products/`;
      let formData = new FormData();

      formData.append("name", productData.name);
      formData.append("userid", user.id);
      formData.append("description_color", productData.description_color);
      formData.append("status", productData.status);
      formData.append("label_size", productData.label_size);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("sku", productData.sku);
      formData.append("sortno", productData.sortno);
      formData.append("stock", productData.stock);
      formData.append("image", productImage == null ? "" : productImage?.image[0]);

      axios
        .post(url, formData, config)
        .then((res) => {
          if (res.status == 201) {
            toast.success("Successfully Added ");
            handleGetProductList();
            setShowAddProductForm(false);
          } else {
            toast.error(res.data.result[Object.keys(res.data.result)[0]][0]);
          }
        })
        .catch((err) => {
          toast.error("Product Could Not Be Added");
        });
    }
  };

  const [productImage, setProductImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setProductImage({
        image: e.target.files,
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleChangeStatus = async (selectedOption) => {
    setProductData({ ...productData, ["status"]: selectedOption.value });
  };

  const handleChangeCategory = async (selectedOption) => {
    setProductData({ ...productData, ["category"]: selectedOption.value });
  };

  //END ADDING NEW PRODUCT

  const handleEdit = async (e) => {
    //e.preventDefault();

    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await editProduct(productData)
        .then((res) => {
          if (res.data?.status === "true") {
            toast.success("Successfully Updated ");
            handleGetProductList();
          } else {
            toast.error("product Could Not Be Updated");
          }
        })
        .catch((err) => {
          console.log("Error Updating product", err);
        });
    }
  };

  //DELETE SUPPLIER
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id)
      .then((res) => {
        if (res.status == 204) {
          handleGetProductList();
        } else {
        }
      })
      .catch((err) => console.log("Error in Deleting Product", err));
  };

  //START GET PRODUCTS
  const handleGetProductList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    toast.success("Fetching Products!!", { autoClose: 2000 });

    setProductList([]);
    setScreenLoading(true);

    try {
      await getProducts()
        .then((res) => {
          if (res.data.length > 0) {
            setProductList(res.data);
          } else {
            setProductList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Products", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //END GET PRODUCTS

  //START GET CATEGORY
  const handleGetCategoryList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setCategoryList([]);

    setScreenLoading(true);

    try {
      await getCategories()
        .then((res) => {
          if (res.data.status === "true") {
            res.data.result.map((item) => {
              category_options.push({
                value: item.name,
                label: item.name,
                id: item.id,
              });
            });

            setCategoryOptions(category_options);
          } else {
            setCategoryList([]);
          }
        })
        .catch((err) => console.log("Error in Getting setCategoryList", err));
    } catch (error) {
      console.log(error);
    }
  };
  //END GET CATEGORY

  const columns = [
    { name: "product", align: "left" },
    { name: "category", align: "left" },
    { name: "sku", align: "left" },
    { name: "stock", align: "left" },
    { name: "status", align: "center" },
    { name: "price", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  productList.map(function (item, i) {
    rows.push({
      product: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar
              //src={'http://localhost:8000/media/'+ item.image}
              src={logoSpotify}
              alt={"name"}
              size="sm"
              variant="rounded"
            />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium" >
              {item.name}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {item.description_color}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      stock: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" fontSize= "1.75rem" 
              color = {item.stock >= 5 ? "primary" : "error"}>
            {item.stock}
          </ArgonTypography>
        </ArgonBox>
      ),
      category: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.category}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      sku: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.sku}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      status: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.status}
          color="success"
          size="xs"
          container
        />
      ),
      price: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {item.price}
        </ArgonTypography>
      ),
      edit: (
        <Button
          onClick={async () => {
            setEditFormActive(true);
            setShowAddProductForm(true);
            setProductData(item);
            setProductData({
              ...item,
              ["category_id"]: item.category.id,
              ["category"]: item.category.id,
            });
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteProduct(item.id);
          }}
        >
          <ArgonBox component="i" color="red" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  const fakeData = [
    {
      id: 1,
      name: "Palov",
      img: "https://i.ibb.co/5j8yQ3L/pilaf-sm.jpg",
    },
    {
      id: 2,
      name: "Beshbarmok",
      img: "https://i.ibb.co/K0Q78Dy/beshbarmak-sm.jpg",
    },
  ];

  const [position, setPosition] = useState({
    x: "",
    y: "",
  });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    handleGetProductList();
    handleGetCategoryList();
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer />

      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddProductForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Products table</ArgonTypography>
                <Button
                  onClick={() => {
                    setProductData({
                      id: "",
                      name: "",
                      sortno: "",
                      category: { id: "" },
                      stock: "",
                      description_color: "",
                      price: "",
                      label_size: "",
                      status: "in_stock",
                    });

                    setShowAddProductForm(!showAddProductForm);
                    setEditFormActive(false);
                  }}
                >
                  <h4 style={{ paddingRight: 10 }}>Add Product </h4>
                  <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-fat-add" />
                </Button>
              </ArgonBox>
              <ArgonBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={columns} rows={rows} />
              </ArgonBox>
            </Card>
          </ArgonBox>
        ) : (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Products table</ArgonTypography>
                <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Product Table </h4>
                  <ArgonBox
                    component="i"
                    color="info"
                    fontSize="14px"
                    className="ni ni-bold-right"
                  />
                </Button>
              </ArgonBox>
              <ArgonBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="title"
                    name="name"
                    value={productData.name}
                    placeholder="Product Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="sortno"
                    value={productData.sortno}
                    style={{ borderColor: isNaN(productData.sortno) && "red" }}
                    placeholder="Sort Number"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="label_size"
                    name="label_size"
                    value={productData.label_size}
                    placeholder="Label/Size"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="sku"
                    name="sku"
                    value={productData.sku}
                    placeholder="SKU"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="Image"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="category"
                    placeholder="Category"
                    value={categoryOptions[productData?.category - 1]}
                    options={categoryOptions}
                    onChange={handleChangeCategory}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="stock"
                    style={{ borderColor: isNaN(productData.stock) && "red" }}
                    value={productData.stock}
                    placeholder="Stock"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="status"
                    placeholder="Status"
                    value={productData.stock > 0 ? status_options[0] : status_options[1]}
                    options={status_options}
                    onChange={handleChangeStatus}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="description_color"
                    value={productData.description_color}
                    placeholder="Description/Color"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    style={{ borderColor: isNaN(productData.price) && "red" }}
                    type="name"
                    name="price"
                    value={productData.price}
                    placeholder="Price"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonButton
                    onClick={editFormActive ? handleEdit : handleSubmit}
                    color="info"
                    size="large"
                    fullWidth
                  >
                    {editFormActive ? "Edit Product" : "Add Product"}
                  </ArgonButton>
                </ArgonBox>
              </ArgonBox>
            </Card>
          </ArgonBox>
        )}
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
