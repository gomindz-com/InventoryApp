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
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { getOrders } from "apiservices/orderService";
import { AddOrderSchema } from "formValidation/addForm";
import Select from "react-select";
import { addOrder, deleteOrder } from "apiservices/orderService";
import { getProducts } from "apiservices/productService";
import { getSuppliers } from "apiservices/supplierService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getBuyers } from "apiservices/buyerService";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";


function Orders() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [buyerList, setBuyerList] = useState([]);
  const [productOptions, setProductOptions] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState(null);
  const [buyerOptions, setBuyerOptions] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleGetOrderList = async () => {
    setOrderList([]);
    setScreenLoading(true);

    try {
      await getOrders()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Order List");
            console.log(res.data.result);
            setOrderList(res.data.result);
          } else {
            setOrderList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Orders", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //START GET PRODUCTS
  const handleGetProductList = async () => {
    setProductList([]);
    try {
      await getProducts()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Product List");
            console.log(res.data.result);

            res.data.result.map((item) => {
              console.log("Single Product");
              console.log(item.price);
              product_options.push({
                value: item.name,
                label: item.name,
                price: item.price,
                id: item.id,
              });
            });

            setProductOptions(product_options);
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

  const handleGetSupplierList = async () => {
    setSupplierList([]);

    try {
      await getSuppliers()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Suppliers List");
            res.data.result.map((item) => {
              console.log(item);
              supplier_options.push({
                value: item.companyName,
                label: item.companyName,
                id: item.id,
              });
            });

            setSupplierOptions(supplier_options);
          } else {
            setSupplierList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Suppliers", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // GET BUYERS
  const handleGetBuyerList = async () => {
    setBuyerList([]);
    try {
      await getBuyers()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Buyer List");
            console.log(res.data.result);

            res.data.result.map((item) => {
              buyer_options.push({
                value: item.name,
                label: item.name,
                id: item.id,
              });
            });

            setBuyerOptions(buyer_options);
          } else {
            setBuyerList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Buyers", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //START ADDING NEW PRODUCT
  const [orderData, setOrderData] = useState({
    supplier: "",
    product: "",
    buyer: "",
    status: "",
    receipt: "",
    amount: "",
  });

  const status_options = [
    {
      value: "pending",
      label: "Pending",
      id: "1",
    },
    {
      value: "decline",
      label: "Decline",
      id: "2",
    },
    {
      value: "approved",
      label: "Approved",
      id: "3",
    },
    {
      value: "processing",
      label: "Processing",
      id: "4",
    },
    {
      value: "complete",
      label: "Complete",
      id: "5",
    },
  ];
  const product_options = [];
  const supplier_options = [];
  const buyer_options = [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await AddOrderSchema.isValid(orderData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(orderData);
    } else {
      console.log(orderData);
      await addOrder(orderData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Order Added");
            toast.success("Order Added Successfully");
            handleGetOrderList();
            console.log(res.data.result);
          } else {
            console.log("Order Could Not Be Added");
            console.log(res.data.result);
            toast.error("Order Could Not Be Added");
          }
        })
        .catch((err) => {
          console.log("Error Adding Order", err);
        });
    }
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleChangeProduct = async (selectedOption) => {
    setOrderData({ ...orderData, ["product"]: selectedOption.id });
    console.log("selectedOption.price");
    console.log(selectedOption.price);
    setProductPrice(selectedOption.price);
  };

  const handleChangeSupplier = async (selectedOption) => {
    setOrderData({ ...orderData, ["supplier"]: selectedOption.id });
  };

  const handleChangeBuyer = async (selectedOption) => {
    setOrderData({ ...orderData, ["buyer"]: selectedOption.id });
  };

  const handleChangeAmount = async (e) => {
    setOrderData({
      ...orderData,
      ["amount"]: e.target.value,
      ["total_price"]: productPrice * e.target.value,
    });
    setTotalPrice(productPrice * e.target.value);
  };

  const handleChangeStatus = async (selectedOption) => {
    setOrderData({ ...orderData, ["status"]: selectedOption.value });
  };
  //END ADDING NEW PRODUCT

  //DELETE SUPPLIER
  const handleDeleteOrder = async (id) => {
    await deleteOrder(id)
      .then((res) => {
        if (res.data?.status === "true") {
          handleGetOrderList();
        } else {
        }
      })
      .catch((err) => console.log("Error in Deleting Order", err));
  };

  const columns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "total price", align: "left" },
    { name: "buyer", align: "center" },
    { name: "status", align: "center" },
    { name: "print receipt", align: "center" },
    { name: "edit", align: "right" },
    { name: "delete", align: "center" },
  ];
  const rows = [];

  orderList.map(function (item, i) {
    rows.push({
      id: (
        <ArgonBox display="flex" alignItems="center" px={3} py={0.5}>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.id}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      product: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            <div>
              {item.products.map(function (i, index) {
                return <span key={`demo_snap_${index}`}>{(index ? ", " : "") + i.name}</span>;
              })}
            </div>
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      "total price": (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            D {item.total_price}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      buyer: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.buyer}
          color="success"
          size="xs"
          container
        />
      ),

      status: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {item.status}
        </ArgonTypography>
      ),
      "print receipt": (
        <Button
          onClick={async () => {
            handleDeleteOrder(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="25px" className="ni ni-folder-17" />
        </Button>
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
        <Button
          onClick={async () => {
            handleDeleteOrder(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  


  const [idProductRow, setIdProductRow] = useState(0);
  const [productInputRow, setProductInputRow] = useState([
    
  ]);
 

  const renderColumns = productInputRow.map(({ name, align, width }, key) => {
    
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }
    
    return (
      <ArgonBox key={name} mb={2} mx={5} display="flex">
                    <div style={{ flex: 5, paddingRight: 10 }}>
                      <Select
                        name="product"
                        placeholder="Products"
                        options={productOptions}
                        onChange={handleChangeProduct}
                      />
                    </div>
                    <div style={{ flex: 3, paddingRight: 10 }}>
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{ flex: 1, alignSelf: "center" }}
                          onClick={async () => {
                            setQuantity(quantity - 1);
                          }}
                        >
                          <ArgonBox
                            component="i"
                            color="info"
                            fontSize="15px"
                            className="ni ni-fat-delete"
                          />
                        </Button>
                        <ArgonInput
                          style={{ flex: 5 }}
                          type="name"
                          name="quantity"
                          value={quantity}
                          placeholder="Amount"
                          size="large"
                          onChange={handleChangeAmount}
                        />
                        <Button
                          style={{ flex: 1, alignSelf: "center" }}
                          onClick={async () => {
                            setQuantity(quantity + 1);
                          }}
                        >
                          <ArgonBox
                            component="i"
                            color="info"
                            fontSize="15px"
                            className="ni ni-fat-add"
                          />
                        </Button>
                      </div>
                    </div>
                    <div style={{ flex: 3 }}>
                      <ArgonInput
                        type="name"
                        name="price"
                        placeholder="Price"
                        size="large"
                        onChange={handleChangeAmount}
                      />
                    </div>
                    <div style={{  alignSelf: 'center', flex: 1}}>
                      <Button
                        style={{}}
                        onClick={async () => {
                          console.log(productInputRow)
                          setProductInputRow(current => [...current, { name: idProductRow}]);
                          setIdProductRow(idProductRow+1)
                        }}
                      >
                        Add
                      </Button>
                      
                    </div>
                    <div style={{  alignSelf: 'center', flex: 1}}>
                      <Button
                        style={{}}
                        onClick={async () => {
                          setProductInputRow(
                            productInputRow.filter(a => a.name !== name)
                          );
                          
                        }}
                      >
                        Remove
                      </Button>
                      
                    </div>
      </ArgonBox>
    );
  });

  
  useEffect(() => {
    handleGetOrderList();
    handleGetProductList();
    handleGetSupplierList();
    handleGetBuyerList();
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddForm ? (
          <ArgonBox mb={35}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Order table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Add Orders </h4>
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
          <ArgonBox mb={3} pb={20}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Orders table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Order Table </h4>
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
                {
                  //PRODUCT ORDER INPUT
                  <ArgonBox mb={2} mx={5} display="flex">
                    <div style={{ flex: 5, paddingRight: 10 }}>
                      <Select
                        name="product"
                        placeholder="Products"
                        options={productOptions}
                        onChange={handleChangeProduct}
                      />
                    </div>
                    <div style={{ flex: 3, paddingRight: 10 }}>
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{ flex: 1, alignSelf: "center" }}
                          onClick={async () => {
                            setQuantity(quantity - 1);
                          }}
                        >
                          <ArgonBox
                            component="i"
                            color="info"
                            fontSize="15px"
                            className="ni ni-fat-delete"
                          />
                        </Button>
                        <ArgonInput
                          style={{ flex: 5 }}
                          type="name"
                          name="quantity"
                          value={quantity}
                          placeholder="Amount"
                          size="large"
                          onChange={handleChangeAmount}
                        />
                        <Button
                          style={{ flex: 1, alignSelf: "center" }}
                          onClick={async () => {
                            setQuantity(quantity + 1);
                          }}
                        >
                          <ArgonBox
                            component="i"
                            color="info"
                            fontSize="15px"
                            className="ni ni-fat-add"
                          />
                        </Button>
                      </div>
                    </div>
                    <div style={{ flex: 3 }}>
                      <ArgonInput
                        type="name"
                        name="price"
                        placeholder="Price"
                        size="large"
                        onChange={handleChangeAmount}
                      />
                    </div>
                    <div style={{ alignSelf: 'center', flex: 2.3 }}>
                      <Button
                        style={{ flex: 1, alignSelf: "center" }}
                        onClick={async () => {
                          setProductInputRow(current => [...current, { name: idProductRow }]);
                          setIdProductRow(idProductRow+1)
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    
                  </ArgonBox>
                }


                  {renderColumns}
                

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                        type="name"
                        name="buyer"
                        placeholder="Buyer"
                        size="large"
                        onChange={handleChangeAmount}
                      />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="amount"
                    placeholder="Total Price"
                    size="large"
                    onChange={handleChangeAmount}
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
                    name="receipt"
                    placeholder="Receipt"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={"20%"} display='flex' mx={5}>
                 <div style={{ flex: 1, paddingRight: 10 }}>
                  <ArgonButton onClick={handleSubmit} color="info" size="large" fullWidth>
                    Order
                  </ArgonButton>
                  </div>
                  <div style={{ flex: 1,paddingRight: 10 }}>
                  <ArgonButton onClick={handleSubmit} color="info" size="large" fullWidth>
                    Invoice
                  </ArgonButton>
                  </div>
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

export default Orders;
