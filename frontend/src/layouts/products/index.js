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

function Products() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();

  //START ADDING NEW PRODUCT
  const [productData, setProductData] = useState({
    name: "",
    sortno: "",
    category_id: "",
    images: "",
    stock: "",
    label: "",
    price: "",
    tags: "",
    status: "",
  });

  const status_options = [
    {
      value: "In Stock",
      label: "In Stock",
      id: "1",
    },
    {
      value: "Out of Stock",
      label: "Out of Stock",
      id: "2",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(productData);
    } else {
      console.log(productData);
      await addProduct(productData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Product Added");
            toast.success("Product Added Successfully");
            handleGetProductList();
            console.log(res.data.result);
          } else {
            console.log("Product Could Not Be Added");
            console.log(res.data.result);
            toast.error("Product Could Not Be Added");
          }
        })
        .catch((err) => {
          console.log("Error Adding Product", err);
        });
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleChangeStatus = async (selectedOption) => {
    setProductData({ ...productData, ["status"]: selectedOption.value });
  };

  //END ADDING NEW PRODUCT

  //START GET PRODUCTS
  const handleGetProductList = async () => {
    setProductList([]);
    setScreenLoading(true);

    try {
      await getProducts()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Product List");
            console.log(res.data.result);
            setProductList(res.data.result);
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

  const columns = [
    { name: "product", align: "left" },
    { name: "stock", align: "left" },
    { name: "status", align: "center" },
    { name: "price", align: "center" },
    { name: "edit", align: "right" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  productList.map(function (item, i) {
    rows.push({
      product: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar src={logoSpotify} alt={"name"} size="sm" variant="rounded" />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.name}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {item.label}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      stock: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.stock}
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
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
      delete: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Delete
        </ArgonTypography>
      ),
    });
  });

  useEffect(() => {
    handleGetProductList();
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
                <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
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
                    placeholder="Product Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="sortno"
                    placeholder="Sort Number"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="tags"
                    name="tags"
                    placeholder="Tags"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="images"
                    placeholder="Images"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="stock"
                    placeholder="Stock"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="status"
                    placeholder="Status"
                    options={status_options}
                    onChange={handleChangeStatus}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="label"
                    placeholder="Label"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="price"
                    placeholder="Price"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                
                

                <ArgonBox mb={2} mx={5}>
                  <ArgonButton onClick={handleSubmit} color="info" size="large" fullWidth>
                    Add Product
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
