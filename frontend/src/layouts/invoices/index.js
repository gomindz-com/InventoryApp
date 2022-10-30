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

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { getInvoices } from "apiservices/invoiceService";

import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { editInvoice } from "apiservices/invoiceService";

function Invoices() {
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

  const [selected, setSelected] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleGetInvoiceList = async () => {
    setOrderList([]);
    setScreenLoading(true);

    try {
      await getInvoices()
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


  const handleEdit = async (id) => {

      console.log(invoiceData);
      await editInvoice(id, invoiceData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Supplier Updated");
            toast.success("Invoice added as an Order Successfully");
            handleGetInvoiceList();
            console.log(res.data.result);
          } else {
            console.log("Supplier Could Not Be Updated");
            console.log(res.data.result);
            toast.error("Invoice Could Not Be Updated");
          }
        })
        .catch((err) => {
          console.log("Error Updating Supplier", err);
        });
    
  };

  //START ADDING NEW PRODUCT

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

  //HANDLING ADD ORDER

  const [invoiceData, setInvoiceData] = useState({
        type: "order"
  });
  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);

  // HANDLING PRODUCT ADDITION AND REMOVAL

  const [products, setProducts] = useState([]);
  const [firstProductId, setFirstProductId] = useState("");
  const [firstProductPrice, setFirstProductPrice] = useState(null);
  const [firstProductTotalPrice, setFirstProductTotalPrice] = useState(null);

  const handleChangeProduct = async (selectedOption) => {
    setFirstProductId(selectedOption.id);
    setFirstProductPrice(selectedOption.price);

    if (firstProductId === "") {
      setQuantity(quantity + 1);
      setFirstProductTotalPrice(selectedOption.price);
      setOrderTotalPrice(selectedOption.price);
    } else {
      setFirstProductTotalPrice(quantity * selectedOption.price);
      setOrderTotalPrice(quantity * parseFloat(selectedOption.price));
    }
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
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

    { name: "print receipt", align: "center" },
    { name: "Approve As Order", align: "center" },
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

      "print receipt": (
        <Button
          onClick={async () => {
            handleDeleteOrder(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="25px" className="ni ni-folder-17" />
        </Button>
      ),
      "Approve As Order": (
        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
            handleEdit(item.id)
          }}
        >
          <CheckIcon />
        </ToggleButton>
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
  const [productInputRow, setProductInputRow] = useState([]);

  const [otherProducts, setOtherProducts] = useState([]);
  const [otherProductsQuantity, setOtherProductsQuantity] = useState([]);

  const renderColumns = productInputRow.map(({ row, amount }, key) => {
    const handleChangeOtherProduct = async (selectedOption) => {
      console.log("THE CURRENT TOTAL ORDER PRICE");
      console.log(ordertotalPrice);

      console.log("ID");
      console.log(selectedOption.value);
      console.log("row");
      console.log(row);
      console.log(amount);
      console.log(productInputRow[row]);

      console.log("ttttttttt");
      if (otherProducts[row] == undefined) {
        setOtherProducts((current) => [
          ...current,
          {
            id: selectedOption.id,
            row: row,
            amount: 1,
            productprice: selectedOption.price,
            price: selectedOption.price,
          },
        ]);

        const newState = productInputRow.map((obj) => {
          // 👇️ if id equals 2, update country property

          if (obj.row == row) {
            return {
              ...obj,
              amount: productInputRow[row].amount + 1,
              productprice: selectedOption.price,
              price: selectedOption.price,
            };
          } else {
            return { ...obj };
          }

          // 👇️ otherwise return object as is
          return obj;
        });

        setProductInputRow(newState);
        setOrderTotalPrice(parseFloat(ordertotalPrice) + parseFloat(selectedOption.price));
      } else {
        const newState1 = productInputRow.map((obj) => {
          // 👇️ if id equals 2, update country property

          if (obj.row == row) {
            return { ...obj, price: productInputRow[row].amount * selectedOption.price };
          } else {
            return { ...obj };
          }

          // 👇️ otherwise return object as is
          return obj;
        });

        setProductInputRow(newState1);

        const newState = otherProducts.map((obj) => {
          // 👇️ if id equals 2, update country property

          if (obj.row == row) {
            return { ...obj, id: selectedOption.id, price: selectedOption.price };
          } else {
            return { ...obj };
          }

          // 👇️ otherwise return object as is
          return obj;
        });

        setOtherProducts(newState);

        setOrderTotalPrice(parseFloat(ordertotalPrice) + parseFloat(selectedOption.price));

        //
      }

      //setProductInputRow(productInputRow.filter((a) => a.name !== name));
      /* 
      let newValues={...productInputRow}
      const requiredFields = Object.keys(newValues).forEach((key) => {
      let field=newValues[key];
      if (field.required === true && field.value.length === 0) {
              field.helperText=`Enter the ${field.label}`;
              field.error = true;
              newValues[key]= field;
          }else{
            newValues[key].error=false;
            newValues[key].helperText='';
          }
      }) */
      //setInpValues(newValues);

      //setOtherProducts(productInputRow.filter((a) => a.name !== name));
    };

    return (
      // OTHER PRODUCT INPUT ROWS
      <ArgonBox key={row} mb={2} mx={5} display="flex">
        <div style={{ flex: 5, paddingRight: 10 }}>
          <Select
            name="product"
            placeholder="Products"
            options={productOptions}
            onChange={handleChangeOtherProduct}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <Button style={{ flex: 1, alignSelf: "center" }} onClick={async () => {}}>
              <ArgonBox component="i" color="info" fontSize="15px" className="ni ni-fat-delete" />
            </Button>
            <ArgonInput
              style={{ flex: 5 }}
              type="name"
              name="quantity"
              value={productInputRow[row]?.amount}
              placeholder="Amount"
              size="large"
              onChange={handleChangeAmount}
            />
            <Button
              style={{ flex: 1, alignSelf: "center" }}
              onClick={async () => {
                console.log("current total price 1");
                console.log(ordertotalPrice);

                if (otherProducts[row] == undefined) {
                  toast.error("Please Choose a Product!!");
                } else {
                  console.log("THE CURRENT TOTAL ORDER PRICE");
                  console.log(ordertotalPrice);

                  console.log("THE SECOND ROW");
                  console.log(
                    (productInputRow[row].amount + 1) * productInputRow[row].productprice
                  );

                  setOrderTotalPrice(
                    parseFloat(ordertotalPrice) + parseFloat(productInputRow[row].productprice)
                  );

                  // setOrderTotalPrice( ((productInputRow[row].amount - 1) * (productInputRow[row].productprice)) + (ordertotalPrice ));

                  //setQuantity(quantity + 1);

                  console.log("Editing amount for the specific row : ");
                  console.log(row);
                  //setOtherProducts((current) => [...current, { id: selectedOption.id }]);

                  //setProductInputRow(productInputRow.filter((a) => a.name !== name));

                  console.log("Product Input Row");
                  console.log(productInputRow);

                  console.log("otherProducts");
                  console.log(otherProducts);

                  const filtered = otherProducts.filter((entry) => entry.row === row);

                  console.log("filtered");
                  console.log(filtered);

                  const newState = productInputRow.map((obj) => {
                    // 👇️ if id equals 2, update country property

                    if (obj.row == row) {
                      return {
                        ...obj,
                        amount: productInputRow[row].amount + 1,
                        price:
                          (productInputRow[row].amount + 1) * productInputRow[row].productprice,
                      };
                    } else {
                      return { ...obj };
                    }

                    // 👇️ otherwise return object as is
                    return obj;
                  });

                  setProductInputRow(newState);

                  const newState1 = otherProducts.map((obj) => {
                    // 👇️ if id equals 2, update country property

                    if (obj.row == row) {
                      return { ...obj, amount: productInputRow[row].amount + 1 };
                    } else {
                      return { ...obj };
                    }

                    // 👇️ otherwise return object as is
                    return obj;
                  });
                  setOtherProducts(newState1);
                }
              }}
            >
              <ArgonBox component="i" color="info" fontSize="15px" className="ni ni-fat-add" />
            </Button>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <ArgonInput
            type="name"
            name="price"
            value={productInputRow[row]?.price}
            placeholder="Price"
            size="large"
            onChange={handleChangeAmount}
          />
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            style={{}}
            onClick={async () => {
              console.log(productInputRow);
              setProductInputRow((current) => [...current, { row: idProductRow, amount: 0 }]);
              setIdProductRow(idProductRow + 1);
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            style={{}}
            onClick={async () => {
              console.log("productInputRow");
              console.log(productInputRow);
              console.log("otherproducts");
              console.log(otherProducts);
              setProductInputRow(productInputRow.filter((a) => a.row !== row));
              setOtherProducts(otherProducts.filter((a) => a.row !== row));

              console.log();
              setOrderTotalPrice(
                parseFloat(ordertotalPrice) - parseFloat(productInputRow[row].productprice)
              );
            }}
          >
            Remove
          </Button>
        </div>
      </ArgonBox>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resTopics = [
      {
        id: firstProductId,
        amount: quantity,
      },
    ];
    for (let topic of otherProducts) {
      resTopics.push({
        id: topic.id,
        amount: topic.amount,
      });
    }

    const firstProduct = {
      id: firstProductId,
      amount: quantity,
    };

    setOrderData({
      ...orderData,
      ["products"]: resTopics,
      ["total_price"]: ordertotalPrice,
    });

    //console.log(otherProducts)

    handleOpen();
    //handleComfirm();
  };

  const handleComfirm = async () => {
    const isValid = await AddOrderSchema.isValid(orderData);
    console.log("Order Data");
    console.log(orderData);
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
            setOrderData({
              buyer: "",
              status: "",
              receipt: "",
              total_price: "",
              type: "invoice",
              products: [],
            });
            setOrderTotalPrice(0);
            setQuantity(0);
            setOtherProducts([]);
            setProductInputRow([]);
            setOpen(false);
            handleGetOrderList();
            console.log(res.data.result);
          } else {
            console.log("Order Could Not Be Added");
            console.log(res.data.result);
            toast.error("Order Could Not Be Added");
            setOpen(false);
          }
        })
        .catch((err) => {
          console.log("Error Adding Order", err);
          setOpen(false);
        });
    }
  };

  useEffect(() => {
    handleGetInvoiceList();
    handleGetProductList();
    handleGetSupplierList();
    handleGetBuyerList();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <DashboardLayout>
      <ToastContainer />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a New Order
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
            <Button style={{ marginLeft: -11 }} onClick={handleComfirm}>
              Add As Invoice
            </Button>
            <Button onClick={handleComfirm}>Add As Order</Button>
          </Box>
        </Fade>
      </Modal>

      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddForm ? (
          <ArgonBox mb={35}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Invoice table</ArgonTypography>
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
                  // 1ST PRODUCT ORDER INPUT ROW
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
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
                              setFirstProductTotalPrice((quantity - 1) * firstProductPrice);
                              setOrderTotalPrice((quantity - 1) * parseFloat(firstProductPrice));
                            }
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
                            if (firstProductId === "") {
                              toast.error("Please Choose a Product!!");
                            } else {
                              setQuantity(quantity + 1);
                              setFirstProductTotalPrice((quantity + 1) * firstProductPrice);
                              setOrderTotalPrice((quantity + 1) * parseFloat(firstProductPrice));
                            }
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
                        value={firstProductTotalPrice}
                        size="large"
                      />
                    </div>
                    <div style={{ alignSelf: "center", flex: 2.3 }}>
                      <Button
                        style={{ flex: 1, alignSelf: "center" }}
                        onClick={async () => {
                          setProductInputRow((current) => [
                            ...current,
                            { row: idProductRow, amount: 0 },
                          ]);
                          setIdProductRow(idProductRow + 1);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </ArgonBox>
                  // 1ST PRODUCT ORDER INPUT ROW
                }

                {renderColumns}

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="buyer"
                    placeholder="Buyer"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="total_price"
                    value={`Total Price : ${Math.round(ordertotalPrice * 100) / 100}`}
                    placeholder={`Total Price : ${Math.round(ordertotalPrice * 100) / 100}`}
                    size="large"
                  />
                </ArgonBox>

                {/* <ArgonBox mb={2} mx={5}>
                  <Select
                    name="status"
                    placeholder="Status"
                    options={status_options}
                    onChange={handleChangeStatus}
                  />
                </ArgonBox> */}

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="receipt"
                    placeholder="Receipt"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={"20%"} display="flex" mx={5}>
                  <ArgonButton onClick={handleSubmit} color="info" size="large" fullWidth>
                    Order
                  </ArgonButton>

                  {/*  <Button onClick={handleOpen}>Open modal</Button> */}
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

export default Invoices;
