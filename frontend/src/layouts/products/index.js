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

function Products() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const category_options = [];
  const [editFormActive, setEditFormActive] = useState(false);



  const navigate = useNavigate();

  //START ADDING NEW PRODUCT
  const [productData, setProductData] = useState({
    name: "",
    sortno: "",
    category: "",
    images: "",
    stock: "In Stock",
    label: "",
    price: "",
    tags: "",
    status: "",
  });

  const status_options = [
    {
      value: "In Stock",
      label: "In Stock",
      id: 0,
    },
    {
      value: "Out of Stock",
      label: "Out of Stock",
      id: 1
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


  const handleChangeCategory = async (selectedOption) => {
    setProductData({ ...productData, ["category"]: selectedOption.id });
  };

  //END ADDING NEW PRODUCT

  const handleEdit = async (e) => {
    e.preventDefault();

    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(productData);
    } else {
      console.log(productData);

   

      await editProduct(productData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Product Updated");
            toast.success("product Updated Successfully");
            handleGetProductList();
            console.log(res.data.result);
          } else {
            console.log("product Could Not Be Updated");
            console.log(res.data.result);
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
        if (res.data?.status === "true") {
          handleGetProductList()
        } else {
        }
      })
      .catch((err) => console.log("Error in Deleting Product", err));
  };


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


  //START GET CATEGORY
  const handleGetCategoryList = async () => {
    setCategoryList([]);
    setScreenLoading(true);

    try {
      await getCategories()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {

            console.log("Category List");
            console.log(res.data.result);

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
      category: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.category.name}
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
            setEditFormActive(true)
            setShowAddProductForm(true);
            setProductData(item);

            console.log(item)

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
          <ArgonBox component="i" color="info" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  useEffect(() => {
    handleGetProductList();
    handleGetCategoryList()
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
                <Button onClick={() => {
                  setProductData({
                    id: "",
                    name: "",
                    sortno: "",
                    category: { id: "" },
                    images: "",
                    stock: "In Stock",
                    label: "",
                    price: "",
                    tags: "",
                    status: "",
                  })

                  setShowAddProductForm(!showAddProductForm)
                  setEditFormActive(false)
                }}>
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
                    placeholder="Sort Number"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="tags"
                    name="tags"
                    value={productData.tags}
                    placeholder="Tags"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="images"
                    value={productData.images}
                    placeholder="Images"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="category"
                    placeholder="Category"
                    value={categoryOptions[productData.category - 1]}
                    options={categoryOptions}
                    onChange={handleChangeCategory}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="stock"
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
                    value={ productData.stock > 0  ? status_options[0] : status_options[1]}
                    options={status_options}
                    onChange={handleChangeStatus}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="label"
                    value={productData.label}
                    placeholder="Label"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="price"
                    value={productData.price}
                    placeholder="Price"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>




                <ArgonBox mb={2} mx={5}>
                  <ArgonButton onClick={editFormActive ? handleEdit : handleSubmit} color="info" size="large" fullWidth>
                    {editFormActive ? "Edit Product" : 'Add Product'}
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
