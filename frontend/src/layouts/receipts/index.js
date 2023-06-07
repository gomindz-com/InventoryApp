// @mui material components
import Card from "@mui/material/Card";
import * as React from "react";
import { useState, useEffect, useRef } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Button } from "@mui/material";
import { AddOrderSchema } from "formValidation/addForm";
import Select from "react-select";
import { getProducts } from "apiservices/productService";
import { ToastContainer, toast } from "react-toastify";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useReactToPrint } from "react-to-print";
import { Navigate, useNavigate } from "react-router-dom";
import { getOrders, addOrder, deleteOrder} from "apiservices/orderService";
import "./index.css";


function Receipts() {

  const product_options = [];

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState([]);

  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOrderTable, setShowOrderTable] = useState(true);

  const [showPrintView, setShowPrintView] = useState(false);

  const [viewOrderActive, setViewOrderActive] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [buyerList, setBuyerList] = useState([]);
  const [productOptions, setProductOptions] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const componentRef = useRef();

  const handleGetProductList = async () => {

    setProductList([]);
    try {
      const res = await getProducts()
      if (res.data?.status == true) {
        res.data?.products.map((item) => {
          product_options.push({
            value: item.name,
            label: item.name,
            price: item.price,
            id: item.id,
          });
        });

        setProductOptions(product_options);
      }

      else {
        setProductList([]);
      }
    } catch (error) {
      
    }
  };


  const [orderData, setOrderData] = useState({
    buyer: "",
    buyer_location: "",
    status: "pending",
    receipt: '',
    total_price: "",
    type: "",
    products: [],
  });

  const [invoiceData, setInvoiceData] = useState({
    buyer: "",
    buyer_location: "",
    status: "pending",
    receipt: '',
    total_price: "",
    type: "",
    products: [],
  });

  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);
  const [theBuyer, setTheBuyer] = useState("");
  const [theBuyerLocation, setTheBuyerLocation] = useState("");
  const [theReceipt, setTheReceipt] = useState("");

  const [products, setProducts] = useState([]);
  const [firstProductId, setFirstProductId] = useState("");
  const [firstProductPrice, setFirstProductPrice] = useState(null);
  const [firstProductTotalPrice, setFirstProductTotalPrice] = useState(null);

  const [idProductRow, setIdProductRow] = useState(0);
  const [productInputRow, setProductInputRow] = useState([]);

  const [otherProducts, setOtherProducts] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "total price", align: "left" },
    { name: "buyer", align: "center" },
    { name: "buyer_location", align: "center" },
    { name: "status", align: "center" },
    { name: "View & Print", align: "center" },
    //{ name: "delete", align: "center" },
  ];
  const rows = [];


  const ComponentToPrint = React.forwardRef((props, ref) => {
    return <div ref={ref}>My cool content here!</div>;
  });

  const navigate = useNavigate();

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

  const handleGetReceiptList = async () => {

    setOrderList([]);
    try {
      const res = await getOrders('receipt');
    
      if (res.data?.status === true) {
        setOrderList(res.data.orders);
        setCurrentOrderList(res.data.orders);

      } else {
        setOrderList([]);
      }
      
    } catch (error) {
      toast.error("Receipt Could Not Be Retrieved");
    }

    
  };


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
  
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


  const handleDeleteReceipt = async (id) => {

    try {
      const res = await deleteOrder(id);
      if(res.status == 204){
        toast.success("Deleted Success");
        await handleGetReceiptList();
      }
    } catch (error) {
      toast.error("Error ");
    }
    

   
  };

  

  orderList.map(function (item, i) {
    rows.push({
      id: (
        <ArgonBox display="flex" alignItems="center" px={3} py={0.5}>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.receipt}
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
      buyer_location: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.buyer_location}
          color="success"
          size="xs"
          container
        />
      ),
      status: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          Paid
        </ArgonTypography>
      ),

      "View & Print": (
        <Button
          onClick={async () => {
            setShowPrintView(true);
            setShowAddForm(false);
            setShowOrderTable(false);
            setOrderData(item);
            setProductInputRow(item.products);
            setOrderTotalPrice(0);
            setViewOrderActive(true);
            setOrderTotalPrice(item.total_price);
            setTheBuyer(item.buyer);
            setTheBuyerLocation(item.buyer_location);
            setTheReceipt(item.receipt);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-down" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteReceipt(item.id);
          }}
        >
          <ArgonBox component="i" color="red" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
      
     
    });
  });

  
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

          return obj;
        });

        setProductInputRow(newState);
        setOrderTotalPrice(parseFloat(ordertotalPrice) + parseFloat(selectedOption.price));
      } else {
        const currentprice = productInputRow[row].price;

        const newState1 = productInputRow.map((obj) => {
          if (obj.row == row) {
            return { ...obj, price: productInputRow[row].amount * selectedOption.price };
          } else {
            return { ...obj };
          }

          return obj;
        });

        setProductInputRow(newState1);

        const newState = otherProducts.map((obj) => {
          if (obj.row == row) {
            return { ...obj, id: selectedOption.id, price: selectedOption.price };
          } else {
            return { ...obj };
          }

          return obj;
        });

        setOtherProducts(newState);

        setOrderTotalPrice(
          parseFloat(ordertotalPrice) -
            currentprice +
            parseFloat(productInputRow[row].amount * selectedOption.price)
        );

        //
      }

      };

    return (
      <ArgonBox key={row} mb={2} mx={5} display="flex">
        <div style={{ flex: 5, paddingRight: 10 }}>
          <Select
            name="product"
            placeholder="Products"
            defaultValue={productOptions[productInputRow[row]?.id]}
            options={productOptions}
            onChange={async (selectedOption) => {
             
              const currentordertotalPrice = isNaN(ordertotalPrice)
                ? 0 + firstProductTotalPrice
                : ordertotalPrice;

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

              const ProductUpdate = productInputRow.map((obj) => {
                if (obj.row == row) {
                  return {
                    ...obj,
                    amount: 1,
                    productprice: selectedOption.price,
                    price: selectedOption.price,
                  };
                } else {
                  return { ...obj };
                }
              });

              setProductInputRow(ProductUpdate);
              setValue1(ProductUpdate);

             

              if (isNaN(productInputRow[row]?.price)) {
                setOrderTotalPrice(
                  parseFloat(currentordertotalPrice) + parseFloat(selectedOption.price)
                );
              } else {
                setOrderTotalPrice(
                  parseFloat(currentordertotalPrice) -
                    parseFloat(productInputRow[row]?.price) +
                    parseFloat(selectedOption.price)
                );
              }
            }}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <ArgonInput
              style={{ flex: 5 }}
              type="text"
              placeholder="Amount"
              value={productInputRow[row]?.amount}
              size="large"
              onChange={async (e) => {
                const result = e.target.value.replace(/\D/g, "");
                
                const updateOnOtherProducts = otherProducts.map((obj) => {
                  if (obj.row == row) {
                    return { ...obj, amount: parseInt(result) };
                  } else {
                    return { ...obj };
                  }
                });
                setOtherProducts(updateOnOtherProducts);

                const AmountValueUpdate = productInputRow.map((obj) => {
                  if (obj.row == row) {
                    setOrderTotalPrice(
                      parseFloat(ordertotalPrice) -
                        productInputRow[row].price +
                        result * obj.productprice
                    );

                    return {
                      ...obj,
                      amount: result,
                      price: result * obj.productprice,
                    };
                  } else {
                    return { ...obj };
                  }
                });

                setProductInputRow(AmountValueUpdate);

                return false;
              }}
            />
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
            onClick={async () => {
              if (productInputRow[row].amount > 0 && productInputRow[row + 1] == undefined) {
                let idp = productInputRow.length;

                setProductInputRow((current) => [...current, { row: idp, amount: 0 }]);
                setIdProductRow(idp + 1);
              } else {
                toast.error("Please Choose a Product!!", {autoClose: 80});
              }
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {
              if (productInputRow[row]?.price != undefined) {
                setOrderTotalPrice(parseFloat(ordertotalPrice) - productInputRow[row]?.price);
              }

              const newProductInputRow = [];
              const newProductInputRowUpdated = [];

              let i = 0;
              let j = 0;
              productInputRow.map((obj) => {
                if (obj.row == i && obj.row != row) {
                  newProductInputRow.push({
                    row: i,
                    amount: obj.amount,
                    productprice: obj.price,
                    price: obj.price,
                  });
                }
                i = i + 1;
              });

              newProductInputRow.map((obj) => {
                newProductInputRowUpdated.push({
                  row: j,
                  amount: obj.amount,
                  productprice: obj.price,
                  price: obj.price,
                });
                j = j + 1;
              });

              setProductInputRow(newProductInputRowUpdated);

              const newotherProducts = [];
              const newotherProductsUpdated = [];

              let x = 0;
              let y = 0;
              otherProducts.map((obj) => {
                if (obj.row == x && obj.row != row) {
                  newotherProducts.push({
                    id: obj.id,
                    row: x,
                    amount: obj.amount,
                    productprice: obj.price,
                    price: obj.price,
                  });
                }
                x = x + 1;
              });

              newotherProducts.map((obj) => {
                newotherProductsUpdated.push({
                  row: y,
                  id: obj.id,
                  amount: obj.amount,
                  productprice: obj.price,
                  price: obj.price,
                });
                j = j + 1;
              });

              setOtherProducts(newotherProductsUpdated);
            }}
          >
            Remove
          </Button>
        </div>
      </ArgonBox>
    );
  });

  const handleSubmit = async (e) => {

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let currentDate = `${day}${month}${year}${hour}${minute}${second}`;

    const uuid = currentDate;

    const user = JSON.parse(localStorage.getItem("user"));

    let resTopics = [
      {
        id: firstProductId,
        amount: parseInt(quantity),
      },
    ];
    for (let topic of otherProducts) {
      resTopics.push({
        id: topic.id,
        amount: parseInt(topic.amount),
      });
    }

    setOrderData({
      ...orderData,
      ["products"]: resTopics,
      ["total_price"]: ordertotalPrice,
      ["type"]: "receipt",
      ["status"]: "pending",
      ["ref"]: uuid,
      ["userid"]: user.id,
    });

    setInvoiceData({
      ...orderData,
      ["products"]: resTopics,
      ["total_price"]: ordertotalPrice,
      ["type"]: "receipt",
      ["status"]: "pending",
      ["ref"]: uuid,
      ["userid"]: user.id,
    });

    handleOpen();
  };

  const handleComfirm = async () => {
    const isValid = await AddOrderSchema.isValid(orderData);

    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {

      toast.success("Adding Receipt!!");
      await addOrder('receipt', orderData)
        .then((res) => {

          if (res.status == 201 ) {
            toast.success("Successfully Added");

            setFirstProductId("");
            setIdProductRow(0);
            setProductInputRow([]);
            setOrderData({
              buyer: "",
              buyer_location: "",
              status: "pending",
              ref: '',
              total_price: "",
              type: "receipt",
              products: [],
            });
 
            setQuantity(0);
            setShowAddForm(false);
            setShowOrderTable(true);
            setOpen(false);
            handleGetReceiptList();
          } else {
            toast.error(res.data.message);
            setOpen(false);
          }
        })
        .catch((err) => {
          setOpen(false);
        });
    }
  };


  useEffect(() => {
    handleGetReceiptList();
    handleGetProductList();
  }, []);

  

  return (
    <DashboardLayout>
      {user == null && <Navigate to="/authentication/sign-in" replace={true} />}
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
              Add Receipt
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
            <Button style={{ marginLeft: -11 }} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleComfirm()}>Comfirm</Button>
          </Box>
        </Fade>
      </Modal>

      <DashboardNavbar
      
      handleClick ={(e) => {
        
        const filteredOrderList = [];
        orderList.map((obj) => {

          if (e.target.value === '') {
            setOrderList(currentOrderList)
          }

          else if(
            obj.buyer.toLowerCase() === e.target.value.toLowerCase() ||
            obj.receipt.toLowerCase() === e.target.value.toLowerCase()) {
            filteredOrderList.push(obj);
            setOrderList(filteredOrderList);
          }
        });
      
      }
    }
    />
      <ArgonBox py={3}>
        {showOrderTable && (
          <ArgonBox mb={35}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Receipt List</ArgonTypography>

                <Button
                  onClick={() => {
                    setOrderData({
                      buyer: "",
                      buyer_location: "",
                      status: "",
                      ref: '',
                      total_price: "",
                      type: "",
                      products: [],
                    });
                    setViewOrderActive(false);
                    setOtherProducts([]);
                    setProductInputRow([]);
                    setQuantity(0);
                    setTotalPrice(0);
                    setOrderTotalPrice(0.0);
                    setFirstProductTotalPrice(null);
                    setShowAddForm(true);
                    setShowOrderTable(false);
                  }}
                >
                  <h4 style={{ paddingRight: 10 }}>Add Receipts </h4>
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
        )}

        {showAddForm && (
          <>
            <ArgonBox mb={3} pb={20}>
              <Card>
                <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <ArgonTypography variant="h6">Receipt</ArgonTypography>
                  <Button
                    onClick={() => {
                      setShowOrderTable(true);
                      setShowAddForm(false);
                    }}
                  >
                    <h4 style={{ paddingRight: 10 }}>Receipt List </h4>
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
                  {viewOrderActive == false && (
                    // 1ST PRODUCT ORDER INPUT ROW
                    <ArgonBox mb={2} mx={5} display="flex">
                      <div style={{ flex: 5, paddingRight: 10 }}>
                        <Select
                          name="product"
                          placeholder="Products"
                          options={productOptions}
                          onChange={(selectedOption) => {
                            setValue(1);

                            const currentfirstProductTotalPrice = firstProductTotalPrice;
                            const currentordertotalPrice = isNaN(ordertotalPrice)
                              ? 0
                              : ordertotalPrice;

                            setFirstProductId(selectedOption.id);
                            setFirstProductPrice(selectedOption.price);
                            setQuantity(1);
                            setFirstProductTotalPrice(selectedOption.price);

                            if (ordertotalPrice == 0) {
                              setOrderTotalPrice(selectedOption.price);
                            } else {
                              setOrderTotalPrice(
                                parseFloat(currentordertotalPrice) -
                                  parseFloat(currentfirstProductTotalPrice) +
                                  parseFloat(selectedOption.price)
                              );
                            }
                          }}
                        />
                      </div>
                      <div style={{ flex: 3, paddingRight: 10 }}>
                        <div style={{ display: "flex" }}>
                          <ArgonInput
                            style={{ flex: 5 }}
                            type="text"
                            placeholder="Amount"
                            value={value}
                            size="large"
                            onChange={async (event) => {
                              if (event.target.value.replace(/\D/g, "") == null) {
                                alert("ddddd");
                              }

                              if (firstProductId === "") {
                                toast.error("Please Choose a Product!!", {autoClose: 80});
                              } else {
                                const result = event.target.value.replace(/\D/g, "");
                                setValue(result);
                                setQuantity(result);
                                setFirstProductTotalPrice(result * firstProductPrice);

                                if (productInputRow.length == 0) {
                                  setOrderTotalPrice(result * parseFloat(firstProductPrice));
                                } else {
                                  const currentfirstProductTotalPrice = firstProductTotalPrice;
                                  const currentordertotalPrice = isNaN(ordertotalPrice)
                                    ? 0
                                    : ordertotalPrice;

                                  setOrderTotalPrice(
                                    parseFloat(currentordertotalPrice) -
                                      parseFloat(currentfirstProductTotalPrice)
                                  );
                                }
                              }
                            }}
                          />
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
                          onClick={
                            firstProductId == ""
                              ? async () => {
                                  toast.error("Please Choose a Product!!", {autoClose: 80});
                                }
                              : async () => {
                                  if (productInputRow.length == 0) {
                                    setProductInputRow((current) => [
                                      ...current,
                                      { row: 0, amount: 0 },
                                    ]);
                                    setIdProductRow(1);
                                  } else {
                                    toast.error("Use The Other Add Button!!");
                                  }
                                }
                          }
                        >
                          Add
                        </Button>
                      </div>
                    </ArgonBox>
                  )}

                  {renderColumns}

                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="buyer"
                      value={orderData.buyer}
                      placeholder="Buyer"
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="buyer_location"
                      value={orderData.buyer_location}
                      placeholder="Buyer Location"
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
                    <ArgonInput
                      type="name"
                      name="ref"
                      placeholder={`Receipt ID : XxxxxxxxxxxxxX`}
                      readOnly={true}
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mb={"20%"} display="flex" mx={5}>
                    <ArgonButton
                      onClick={async () => {
                        viewOrderActive ? handlePrint() : handleSubmit();
                      }}
                      color="info"
                      size="large"
                      fullWidth
                    >
                      {viewOrderActive ? "Print" : "Add"}
                    </ArgonButton>
                  </ArgonBox>
                </ArgonBox>
              </Card>
            </ArgonBox>
          </>
        )}
      </ArgonBox>

      {showPrintView && (
        <div className="container">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div style={{ justifyContent: "flex-start" }} className="custom-actions-btns mb-2">
                <a
                  onClick={() => {
                    setShowPrintView(false);
                    setShowAddForm(false);
                    setShowOrderTable(true);
                  }}
                  className="btn btn-secondary"
                >
                  <i className="icon-printer"></i> Show Receipt List
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

          <div style={{ marginTop: 20 }} ref={componentRef} className="row gutters">
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
                        <div
                          style={{ justifyContent: "flex-end" }}
                          className="col-lg-6 col-md-6 col-sm-6"
                        >
                          <address style={{ textAlign: "end" }} className="text-right">
                            {user?.company_name}
                            <br />
                            {user?.city}
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
                              {theBuyerLocation}
                            </address>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                          <div className="invoice-details">
                            <div className="invoice-num">
                              <div>Order Receipt - #{theReceipt}</div>
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
                                  <th>Unit Price</th>
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
                                      <td>D{row.price}</td>
                                      <td>{row.quantity}</td>
                                      <td>D{row.price * row.quantity}</td>
                                    </tr>
                                  );
                                })}

                                <tr>
                                  <td>&nbsp;</td>
                                  <td colSpan={2}>
                                   
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
                                      <strong>D{ordertotalPrice}</strong>
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
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Receipts;
