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
import { useReactToPrint } from "react-to-print";
import { SignalCellularNull } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, Navigate, useLocation, } from "react-router-dom";


import "./index.css";

function Orders() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOrderTable, setShowOrderTable] = useState(true);

  const [showPrintView, setShowPrintView] = useState(false);

  const [viewOrderActive, setViewOrderActive] = useState(true);
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

  const { v4: uuidv4 } = require("uuid");

  const [uuid, setUuid] = useState(uuidv4().toString());

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(JSON.parse(localStorage.getItem("user")));

  console.log(user)


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return <div ref={ref}>My cool content here!</div>;
  });

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

  const status_options = [
    {
      value: "pending",
      label: "Pending",
      id: "1",
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

  const [orderData, setOrderData] = useState({
    buyer: "",
    status: "pending",
    receipt: uuid,
    total_price: "",
    type: "",
    products: [],
  });

  const [invoiceData, setInvoiceData] = useState({
    buyer: "",
    status: "pending",
    receipt: uuid,
    total_price: "",
    type: "",
    products: [],
  });

  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);
  const [theBuyer, setTheBuyer] = useState("");

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
    { name: "status", align: "center" },
    //{ name: "print receipt", align: "center" },
    { name: "View & Print", align: "center" },
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
      /*  "print receipt": (
        <Button
          onClick={async () => {
            handleDeleteOrder(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="25px" className="ni ni-folder-17" />
        </Button>
      ), */
      "View & Print": (
        <Button
          onClick={async () => {
            setShowPrintView(true);
            setShowAddForm(false);
            setShowOrderTable(false);

            console.log(item);
            setOrderData(item);
            setProductInputRow(item.products);
            setOrderTotalPrice(0);
            setViewOrderActive(true);

            

            console.log("view ");
            console.log(item.products);

            /* item.products.map((obj, i) => {
              console.log("productInputRow[row]?.id");
              console.log(obj.id);

              setProductInputRow((current) => [
                ...current,
                { row: i, amount: obj.quantity, price: obj.amount, id: obj.id - 1 },
              ]);
            }); */

            setOrderTotalPrice(item.total_price);
            setTheBuyer(item.buyer)

            //setIdProductRow(0 + 1);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-down" />
        </Button>
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
        console.log("guuu");
        console.log(productInputRow[row].price);
        const currentprice = productInputRow[row].price;

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

        console.log("ordertooo");
        console.log(ordertotalPrice);
        console.log(currentprice);
        console.log(selectedOption.price);

        setOrderTotalPrice(
          parseFloat(ordertotalPrice) -
            currentprice +
            parseFloat(productInputRow[row].amount * selectedOption.price)
        );

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
            defaultValue={productOptions[productInputRow[row]?.id]}
            options={productOptions}
            onChange={async (selectedOption) => {
              console.log("product input rows");
              console.log(productInputRow);
              console.log(otherProducts);

              const currentordertotalPrice = isNaN(ordertotalPrice)
                ? 0 + firstProductTotalPrice
                : ordertotalPrice;

              if (otherProducts[row] == undefined || productInputRow[row].amount == undefined) {
                console.log("Total Order Price");
                console.log(currentordertotalPrice);
                console.log("First Row Total Order Price");
                console.log(firstProductTotalPrice);

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
                });

                setProductInputRow(newState);
                setOrderTotalPrice(
                  parseFloat(currentordertotalPrice) + parseFloat(selectedOption.price)
                );
              } else {
                console.log("Total Order Price");
                console.log(currentordertotalPrice);
                console.log("First Row Total Order Price");
                console.log(firstProductTotalPrice);
                console.log("Current Row Total Order Price Before Change");
                console.log(productInputRow[row].price);

                setOrderTotalPrice(
                  parseFloat(currentordertotalPrice) -
                    productInputRow[row].price +
                    parseFloat(selectedOption.price)
                );

                const newProductRow = productInputRow.map((obj) => {
                  if (obj.row == row) {
                    return {
                      ...obj,
                      amount: 1,
                      price: selectedOption.price,
                      productPrice: selectedOption.price,
                    };
                  } else {
                    return { ...obj };
                  }
                });

                const newOtherProductRow = otherProducts.map((obj) => {
                  if (obj.row == row) {
                    return { ...obj, id: selectedOption.id, price: selectedOption.price };
                  } else {
                    return { ...obj };
                  }
                });

                setOtherProducts(newOtherProductRow);
                setProductInputRow(newProductRow);
              }
            }}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <Button
              style={{ flex: 1, alignSelf: "center" }}
              onClick={async () => {
                if (productInputRow[row].amount > 1) {
                  console.log("current total price 1");
                  console.log(ordertotalPrice);

                  console.log("yyyyyyyyyyyyyyyyyyyyyyy");
                  console.log(otherProducts);

                  if (otherProducts[row] == undefined) {
                    toast.error("Please Choose a Product!!");
                  } else {
                    console.log("THE CURRENT TOTAL ORDER PRICE");
                    console.log(ordertotalPrice);

                    console.log("THE SECOND ROW");
                    console.log(productInputRow[row].productprice);

                    setOrderTotalPrice(
                      parseFloat(ordertotalPrice) - parseFloat(productInputRow[row].productprice)
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
                          amount: productInputRow[row].amount - 1,
                          price:
                            (productInputRow[row].amount - 1) * productInputRow[row].productprice,
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
                        return { ...obj, amount: productInputRow[row].amount - 1 };
                      } else {
                        return { ...obj };
                      }

                      // 👇️ otherwise return object as is
                      return obj;
                    });
                    setOtherProducts(newState1);
                  }
                }
              }}
            >
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
            onClick={async () => {
              if (productInputRow[row].amount > 0 && productInputRow[row + 1] == undefined) {
                let idp = productInputRow.length;

                setProductInputRow((current) => [...current, { row: idp, amount: 0 }]);
                setIdProductRow(idp + 1);
              } else {
                toast.error("Please Choose a Product!!");
              }
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {
              console.log(productInputRow);
              console.log(otherProducts);
              console.log("The Current Active Row");
              console.log(row);
              console.log("The Price To Be Removed from Total Price");
              console.log(productInputRow[row].price);
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
              console.log("New Product Input Row");
              console.log(newProductInputRow);

              newProductInputRow.map((obj) => {
                newProductInputRowUpdated.push({
                  row: j,
                  amount: obj.amount,
                  productprice: obj.price,
                  price: obj.price,
                });
                j = j + 1;
              });

              console.log("New Product Input Row Updated");
              console.log(newProductInputRowUpdated);
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
              console.log("New Other Products Input Row");
              console.log(newotherProducts);

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

              console.log("New Other Products Input Row Updated");
              console.log(newotherProductsUpdated);
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
      ["type"]: "order",
      ["status"]: "pending",
    });

    setInvoiceData({
      ...orderData,
      ["products"]: resTopics,
      ["total_price"]: ordertotalPrice,
      ["type"]: "invoice",
      ["status"]: "pending",
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
      toast.success("Adding Order!!");
      await addOrder(orderData)
        .then((res) => {
          console.log("Response");
          console.log(res.data);
          if (res.data?.status === "true") {
            console.log("Order Added");
            toast.success("Order Added Successfully");

            setFirstProductId("");
            setIdProductRow(0);
            setProductInputRow([]);
            setOrderData({
              buyer: "",
              status: "pending",
              receipt: uuid,
              total_price: "",
              type: "order",
              products: [],
            });

            setQuantity(0);
            setShowAddForm(false);
            setShowOrderTable(true);
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

  const handleComfirmInvoice = async () => {
    const isValid = await AddOrderSchema.isValid(orderData);
    console.log("invoice Data");
    console.log(invoiceData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(invoiceData);
    } else {
      toast.success("Adding Invoice!!");

      console.log(invoiceData);
      await addOrder(invoiceData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Order Added");
            toast.success("Order Added Successfully");
            setOrderData({
              buyer: "",
              status: "pending",
              receipt: uuid,
              total_price: "",
              type: "order",
              products: [],
            });
            setFirstProductId("");
            setProductInputRow([]);
            setOrderTotalPrice(0);
            setQuantity(0);
            setShowAddForm(false);
            setShowOrderTable(true);
            setOtherProducts([]);
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
    handleGetOrderList();
    handleGetProductList();
    handleGetSupplierList();
    handleGetBuyerList();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

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
              Add a New Order
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
            <Button style={{ marginLeft: -11 }} onClick={() => handleComfirmInvoice()}>
              Add As Invoice
            </Button>
            <Button onClick={() => handleComfirm()}>Add As Order</Button>
          </Box>
        </Fade>
      </Modal>

      <DashboardNavbar />
      <ArgonBox py={3}>
        {showOrderTable && (
          <ArgonBox mb={35}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Order table</ArgonTypography>

                <Button
                  onClick={() => {
                    setOrderData({
                      buyer: "",
                      status: "",
                      receipt: uuid,
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
        )}

        {showAddForm && (
          <>
            <ArgonBox mb={3} pb={20}>
              <Card>
                <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <ArgonTypography variant="h6">Orders table</ArgonTypography>
                  <Button
                    onClick={() => {
                      setShowOrderTable(true);
                      setShowAddForm(false);
                    }}
                  >
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
                  {viewOrderActive == false && (
                    // 1ST PRODUCT ORDER INPUT ROW
                    <ArgonBox mb={2} mx={5} display="flex">
                      <div style={{ flex: 5, paddingRight: 10 }}>
                        <Select
                          name="product"
                          placeholder="Products"
                          options={productOptions}
                          onChange={(selectedOption) => {
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
                                if (productInputRow.length == 0) {
                                  setOrderTotalPrice(
                                    (quantity + 1) * parseFloat(firstProductPrice)
                                  );
                                } else {
                                  setOrderTotalPrice(
                                    parseFloat(firstProductPrice) + parseFloat(ordertotalPrice)
                                  );
                                }
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
                          onClick={
                            firstProductId == ""
                              ? async () => {
                                  toast.error("Please Choose a Product!!");
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
                    // 1ST PRODUCT ORDER INPUT ROW
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
                      name="total_price"
                      value={`Total Price : ${Math.round(ordertotalPrice * 100) / 100}`}
                      placeholder={`Total Price : ${Math.round(ordertotalPrice * 100) / 100}`}
                      size="large"
                    />
                  </ArgonBox>
                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="receipt"
                      placeholder={`Receipt ID : ${uuid}`}
                      readOnly={true}
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mb={"20%"} display="flex" mx={5}>
                    <ArgonButton
                      onClick={
                        /*  firstProductId == "" || orderData.buyer == ""
                        ? async () => {
                            toast.error("Please Fill All Required Fields!!");
                          }
                        : async () => {
                            viewOrderActive ? handlePrint() : handleSubmit();
                          } */

                        async () => {
                          viewOrderActive ? handlePrint() : handleSubmit();
                        }
                      }
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
          <Button
            onClick={() => {
              setShowOrderTable(true);
              setShowAddForm(false);
              setShowPrintView(false);
            }}
          >
            <h4 style={{ paddingRight: 10 }}>Show Order Table </h4>
            <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-right" />
          </Button>
          <div ref={componentRef} className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="invoice-container">
                    <div className="invoice-header">
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="custom-actions-btns mb-5">
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
                      <div className="row gutters">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <a href="index.html" className="invoice-logo">
                            GoMindz Inventory
                          </a>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <address className="text-right">
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
                              <div>Invoice - #009</div>
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
                                      <td>{row.id}</td>
                                      <td>{row.quantity}</td>
                                      <td>${row.price}</td>
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
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
