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
import { getProducts } from "apiservices/productService";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { AddProductSchema } from "formValidation/addForm";
import { toast } from "react-toastify";
import Select from "react-select";
import { deleteProduct } from "apiservices/productService";
import { getCategories } from "apiservices/categoryService";
import { addProduct, editProduct } from "apiservices/productService";
import TextField from "@mui/material/TextField";

// import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';
// import Typography from '@material-ui/core/Typography';

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { baseUrl } from "apiservices/baseURL";
import "react-datetime/css/react-datetime.css";

function Products() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [screenloading, setScreenLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [currentProductList, setCurrentProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const category_options = [];
  const [editFormActive, setEditFormActive] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { name: "product", align: "left" },
    { name: "category", align: "left" },
    { name: "stock", align: "left" },
    { name: "status", align: "center" },
    { name: "price", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  

  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

   
  const handleDeleteConfirmation = async () => {
    if (itemToDelete) {
      // Assuming itemToDelete is the correct variable to use
      await handleDeleteProduct(itemToDelete.id);
      setItemToDelete(null);
    }
    toggleModal();
  };



  const rows = [];

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    stock: "",
    description_color: "",
    price: "",
    status: "in_stock",
    expiry_date: "",
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

  const handleAddProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", productImage == null ? "" : productImage?.image[0]);
    uploadData.append("name", productData.name);
    uploadData.append("userid", user.id);
    uploadData.append("description_color", productData.description_color);
    uploadData.append("status", productData.status);
    uploadData.append("price", productData.price);
    uploadData.append("category", productData.category);
    uploadData.append("stock", productData.stock);
    uploadData.append("expiry_date", productData.expiry_date);

    try {
      const res = await addProduct(uploadData);
      if (res.status == 201) {
        toast.success("Update Successful");
        handleGetProductList();
        setShowAddProductForm(false);
      }
    } catch (error) {
      toast.error("Could Not Be Updated");
    }
  };


  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setProductImage({
        image: e.target.files,
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (event) => {
    setProductData({ ...productData, expiry_date: event.target.value });
  };

  const handleChangeStatus = async (selectedOption) => {
    setProductData({ ...productData, ["status"]: selectedOption.value });
  };

  const handleChangeCategory = async (selectedOption) => {
    setProductData({
      ...productData,
      ["category_id"]: selectedOption.value,
      ["category"]: selectedOption.value,
    });
  };

  const handleEdit = async (e) => {
    delete productData.image;

    const isValid = await AddProductSchema.isValid(productData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await editProduct(productData)
        .then((res) => {
          if (res.status == 400) {
            toast.error(Object.keys(res.data)[0], { autoClose: 300 });
            toast.error(Object.values(res.data)[0][0], { autoClose: 300 });
          } else if (res.status == 200) {
            toast.success("Successfully Updated", { autoClose: 80 });
            handleGetProductList();
            setShowAddProductForm(!showAddProductForm);
          } else {
            toast.error("Error Updating", { autoClose: 80 });
          }
        })
        .catch((err) => {});
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id)
      .then((res) => {
        if (res.status == 204) {
          handleGetProductList();
        } else {
        }
      })
      .catch((err) => {});
  };

  const handleGetProductList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProductList([]);
    try {
      const res = await getProducts();
      if (res.data?.status) {
        setProductList(res.data.products);
        setCurrentProductList(res.data.products);
      } else {
        setProductList([]);
      }
    } catch (error) {}
  };


  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = productList.filter(
      (order) => order.name && order.name.toLowerCase().includes(query)
    );
    setCurrentProductList(filteredProducts);
  };

  const handleGetCategoryList = async () => {
    setCategoryList([]);
    setScreenLoading(true);

    try {
      const res = await getCategories();
      if ((res.status = 200)) {
        res.data?.categories.map((item) => {
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
    } catch (error) {}
  };

  currentProductList?.map(function (item, i) {
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
              {item.description_color}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      stock: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography
            variant="caption"
            fontWeight="medium"
            fontSize="1.75rem"
            color={item.stock >= 50 ? "primary" : "error"}
          >
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

            const index = categoryOptions.findIndex((object) => {
              return object.value === item.category;
            });

            setProductData({
              ...item,
              ["category_id"]: index,
              ["category"]: item.category,
            });
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            console.log("Here  we  go  guys")
            setItemToDelete(item);
            toggleModal();          }}
        >
          <ArgonBox component="i" color="red" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
     
    
  });

  useEffect(() => {
    handleGetProductList();
    handleGetCategoryList();
  }, []);

  
  return (
    <DashboardLayout>


<Modal open={modalOpen} onClose={toggleModal}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h6">Confirm Deletion</Typography>
      <Typography>Are you sure you want to delete this item?</Typography>
      <Button  onClick={handleDeleteConfirmation}>Delete</Button>
      <Button  onClick={toggleModal}>Cancel</Button>
    </div>
  </Modal>


      
      <DashboardNavbar
        handleClick={(e) => {
          const filteredProductList = [];
          productList?.map((obj) => {
            if (e.target.value === "") {
              setProductList(currentProductList);
            } else if (
              obj.name.toLowerCase() === e.target.value.toLowerCase() ||
              obj.category.toLowerCase() === e.target.value.toLowerCase()
            ) {
              filteredProductList.push(obj);
              setProductList(filteredProductList);
            }
          });
        }}
      />
      <ArgonBox py={3}>
        {!showAddProductForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Products</ArgonTypography>

                <TextField
                  id="outlined-basic"
                  placeholder="Search"
                  style={{ width: "65%" }}
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearch}
                />

                <Button
                  onClick={() => {
                    setProductData({
                      id: "",
                      name: "",
                      category: { id: "" },
                      stock: "",
                      description_color: "",
                      price: "",
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
                <ArgonTypography variant="h6">Products List</ArgonTypography>
                <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Product List </h4>
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
                    value={productData?.name}
                    placeholder="Product Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                {!editFormActive && (
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
                )}

                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="category"
                    placeholder="Category"
                    options={categoryOptions}
                    value={categoryOptions[productData?.category_id]}
                    onChange={handleChangeCategory}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="stock"
                    style={{ borderColor: isNaN(productData.stock) && "red" }}
                    value={productData?.stock}
                    placeholder="Stock"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <Select
                    name="status"
                    placeholder="Status"
                    value={productData?.stock > 0 ? status_options[0] : status_options[1]}
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

                {/* <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="description_color"
                    value={productData.description_color}
                    placeholder="Contact"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox> */}
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    style={{ borderColor: isNaN(productData.price) && "red" }}
                    type="name"
                    name="price"
                    value={productData.price}
                    placeholder="unit Price"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                {/* <ArgonBox mb={2} mx={5}>
                  <TextField
                    style={{ width: "100%", paddingTop: "15px" }}
                    label="Added date"
                    type="date"
                    value={productData.created_date}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </ArgonBox> */}

                <ArgonBox mb={2} mx={5}>
                  <TextField
                    style={{ width: "100%", paddingTop: "15px" }}
                    label="Expiry Date"
                    type="date"
                    value={productData.expiry_date}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonButton
                    onClick={editFormActive ? handleEdit : handleAddProduct}
                    color="info"
                    size="large"
                    fullWidth
                  >
                    {editFormActive ? "Save Product" : "Add Product"}
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
