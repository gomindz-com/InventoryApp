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

import { useState, useEffect, useRef } from "react";

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
import { useReactToPrint } from "react-to-print";

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

  // SHOWING INVOICE TABLE VARIABLE
  const [showInvoiceTable, setShowInvoiceTable] = useState(true);

  // PRINT RECEIPT VARIABLES
  const [showPrintView, setShowPrintView] = useState(false);
  const [theBuyer, setTheBuyer] = useState("");
  const [theReceipt, setTheReceipt] = useState("");


  // USER VARIABLES
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [viewInvoiceActive, setViewInvoiceActive] = useState(true);

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

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await getInvoices(user.id)
        .then((res) => {
          
          if (res.data?.status === "true") {
            setOrderList(res.data.result);
          } else {
            setOrderList([]);
          }
        })
        .catch((err) => {

        }
        );

      setScreenLoading(false);
    } catch (error) {
    }
  };

  //START GET PRODUCTS
  const handleGetProductList = async () => {
    setProductList([]);
    try {
      await getProducts()
        .then((res) => {
          
          if (res.data?.status === "true") {
  

            res.data.result.map((item) => {
             
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
        .catch((err) => {}
        );

      setScreenLoading(false);
    } catch (error) {
    }
  };
  //END GET PRODUCTS

  const handleGetSupplierList = async () => {
    setSupplierList([]);

    try {
      await getSuppliers()
        .then((res) => {
          
          if (res.data?.status === "true") {
            res.data.result.map((item) => {
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
        .catch((err) => {});

      setScreenLoading(false);
    } catch (error) {
    }
  };

  // GET BUYERS
  const handleGetBuyerList = async () => {
    setBuyerList([]);
    try {
      await getBuyers()
        .then((res) => {
          
          if (res.data?.status === "true") {
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
        .catch((err) => {}
        );

      setScreenLoading(false);
    } catch (error) {
    }
  };

  const handleEdit = async (id) => {
    await editInvoice(id, invoiceData)
      .then((res) => {
        if (res.data?.status === "true") {
          toast.success("Invoice added as an Order Successfully");
          handleGetInvoiceList();

        } else {
          toast.error("Invoice Could Not Be Updated");
        }
      })
      .catch((err) => {
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
    type: "order",
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
      .catch((err) => {

      }
      );
  };

  const columns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "total price", align: "left" },
    { name: "buyer", align: "center" },

    { name: "print receipt", align: "center" },
    { name: "Approve As Order", align: "center" },
    /* { name: "delete", align: "center" }, */
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
            setShowPrintView(true);
            setShowAddForm(false);
            setShowInvoiceTable(false);

            setProductInputRow(item.products);
            setOrderTotalPrice(0);

          

            setOrderTotalPrice(item.total_price);
            setTheBuyer(item.buyer);
                        setTheReceipt(item.receipt)

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
            handleEdit(item.id);
          }}
        >
          <CheckIcon />
        </ToggleButton>
      ),
      /*  delete: (
        <Button
          onClick={async () => {
            handleDeleteOrder(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="34px" className="ni ni-fat-remove" />
        </Button> 
      ),*/
    });
  });

  const [idProductRow, setIdProductRow] = useState(0);
  const [productInputRow, setProductInputRow] = useState([]);

  const [otherProducts, setOtherProducts] = useState([]);
  const [otherProductsQuantity, setOtherProductsQuantity] = useState([]);

  const renderColumns = productInputRow.map(({ row, amount }, key) => {
    const handleChangeOtherProduct = async (selectedOption) => {


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
                

                if (otherProducts[row] == undefined) {
                  toast.error("Please Choose a Product!!");
                } else {
                  

                  setOrderTotalPrice(
                    parseFloat(ordertotalPrice) + parseFloat(productInputRow[row].productprice)
                  );

                  


                  const filtered = otherProducts.filter((entry) => entry.row === row);

                  

                  const newState = productInputRow.map((obj) => {

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
              
              setProductInputRow(productInputRow.filter((a) => a.row !== row));
              setOtherProducts(otherProducts.filter((a) => a.row !== row));

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
    //e.preventDefault();

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


    handleOpen();
  };

  const handleComfirm = async () => {
    const isValid = await AddOrderSchema.isValid(orderData);
    
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await addOrder(orderData)
        .then((res) => {
          if (res.data?.status === "true") {
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
  
          } else {  
            toast.error("Order Could Not Be Added");
            setOpen(false);
          }
        })
        .catch((err) => {
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
        {showInvoiceTable && (
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
        )}

        {/*  { showInvoiceTable &&

          <ArgonBox  ref={componentRef} mb={3} pb={20}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Invoice table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Invoices </h4>
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
                { viewInvoiceActive == false &&
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
                    value={invoiceData.buyer}
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
                    value={invoiceData.receipt}
                    placeholder="Receipt"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={"20%"} display="flex" mx={5}>
                  <ArgonButton onClick={handlePrint} color="info" size="large" fullWidth>
                    Print
                  </ArgonButton>

                </ArgonBox>
              </ArgonBox>
            </Card>
          </ArgonBox>

         } */}

        {showPrintView && (
          <>
            <div className="container">
              <div className="row gutters">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div
                    style={{ justifyContent: "flex-start" }}
                    className="custom-actions-btns mb-2"
                  >
                    <a
                      onClick={() => {
                        setShowInvoiceTable(true);
                        setShowAddForm(false);
                        setShowPrintView(false);
                      }}
                      className="btn btn-secondary"
                    >
                      <i className="icon-printer"></i> Show Invoice Table
                    </a>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="custom-actions-btns mb-2">
                    <a
                      onClick={() => {
                        handlePrint();
                      }}
                      className="btn btn-primary"
                    >
                      <i className="icon-download"></i> Download
                    </a>
                    <a
                      onClick={() => {
                        toast.success("Loading Printer!!");
                        handlePrint();
                      }}
                      className="btn btn-secondary"
                    >
                      <i className="icon-printer"></i> Print
                    </a>
                  </div>
                </div>
              </div>
              <div ref={componentRef} className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="invoice-container">
                        <div className="invoice-header">
                          <div className="row gutters">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                              <a href="index.html" className="invoice-logo">
                                GoMindz Inventory
                              </a>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <address style={{textAlign: 'end'}} className="text-right">
                                {user?.streetAddress}
                                <br />
                                {user?.region}
                                <br />
                                {user?.contact}
                              </address>
                            </div>
                          </div>
                          <div className="row gutters">
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                              <div className="invoice-details">
                                <address>
                                  {theBuyer}
                                  <br />
                                  150-600 Church Street, Florida, USA
                                </address>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                              <div className="invoice-details">
                                <div className="invoice-num">
                                  <div>Invoice - #{theReceipt}</div>
                                  <div>{new Date().toLocaleString() + ""}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="invoice-body">
                          <div className="row gutters">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="table-responsive">
                                <table className="table custom-table m-0">
                                  <thead>
                                    <tr>
                                      <th>Items</th>
                                      <th>Product ID</th>
                                      <th>Quantity</th>
                                      <th>Sub Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {productInputRow?.map((row, i) => {
                                      return (
                                        <tr key={row}>
                                          <td>
                                            {row.name}
                                            <p className="m-0 text-muted">{row.label}</p>
                                          </td>
                                          <td>${row.price}</td>
                                          <td>{row.quantity}</td>
                                          <td>${row.price * row.quantity}</td>
                                        </tr>
                                      );
                                    })}

                                    <tr>
                                      <td>&nbsp;</td>
                                      <td colSpan={2} /* colspan="2" */>
                                        {/* <p>
                                  Subtotal<br/>
                                  Shipping &amp; Handling<br/>
                                  Tax<br/>
                                </p> */}
                                        <h5 className="text-success">
                                          <strong>Grand Total</strong>
                                        </h5>
                                      </td>
                                      <td>
                                        {/* <p>
                                  $5000.00<br/>
                                  $100.00<br/>
                                  $49.00<br/>
                                </p> */}
                                        <h5 className="text-success">
                                          <strong>${ordertotalPrice}</strong>
                                        </h5>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="invoice-footer">Thank you for your Business.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Invoices;
