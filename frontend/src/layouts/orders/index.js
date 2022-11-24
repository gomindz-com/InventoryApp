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
import { useReactToPrint } from "react-to-print";
import { SignalCellularNull } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

function Orders() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
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
            setShowAddForm(true);
            console.log(item);
            setOrderData(item);
            setProductInputRow([]);
            setOrderTotalPrice(0);
            setViewOrderActive(true);

            item.products.map((obj, i) => {
              console.log("productInputRow[row]?.id");
              console.log(obj.id);

              setProductInputRow((current) => [
                ...current,
                { row: i, amount: obj.quantity, price: obj.amount, id: obj.id - 1 },
              ]);
            });

            setOrderTotalPrice(item.total_price);

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


              console.log("product input rows")
              console.log(productInputRow)
              console.log(otherProducts)


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
              } 
              
              
              
              else {
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
              if(productInputRow[row]?.price != undefined){
                setOrderTotalPrice(parseFloat(ordertotalPrice) - productInputRow[row]?.price); 
              }
              

              const newProductInputRow = [];
              const newProductInputRowUpdated = [];

              let i = 0;
              let j = 0;
              productInputRow.map((obj) => {
                if(obj.row == i && obj.row != row){
                  newProductInputRow.push({
                    row: i,
                    amount: obj.amount,
                    productprice: obj.price,
                    price: obj.price,
                  });
                }
                i = i + 1;
                
              });
              console.log("New Product Input Row")
              console.log(newProductInputRow)

              newProductInputRow.map((obj) => {
                  newProductInputRowUpdated.push({
                    row: j,
                    amount: obj.amount,
                    productprice: obj.price,
                    price: obj.price,
                  });
                j = j + 1;
              });

              console.log("New Product Input Row Updated")
              console.log(newProductInputRowUpdated)
              setProductInputRow(newProductInputRowUpdated)


              const newotherProducts = [];
              const newotherProductsUpdated = [];

              let x = 0;
              let y = 0;
              otherProducts.map((obj) => {
                if(obj.row == x && obj.row != row){
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
              console.log("New Other Products Input Row")
              console.log(newotherProducts)

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

              console.log("New Other Products Input Row Updated")
              console.log(newotherProductsUpdated)
              setOtherProducts(newotherProductsUpdated)





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
        {!showAddForm ? (
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
                    setShowAddForm(!showAddForm);
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
        ) : (

          <>

<ArgonBox  mb={3} pb={20}>

<section ref={componentRef} className="h-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-10 col-xl-8">
        <div className="card" style={{borderRadius: 10}}  /* style="border-radius: 10px;" */>
          <div className="card-header px-4 py-5">
            <h5 className="text-muted mb-0">Thanks for your Order, <span  style={{color: '#a8729a'}}/* style="color: #a8729a;" */>Anna</span>!</h5>

          </div>
          <hr className="mb-4"  style={{backgroundColor: '#e0e0e0',opacity: 1}}/* style="background-color: #e0e0e0; opacity: 1;" *//>

          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0"  style={{color: '#a8729a'}} /* style="color: #a8729a;" */>Receipt</p>
              <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p>
            </div>
            <div className="card shadow-0 border mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2" style={{textAlign: "center"}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp" 
                      width={200} height={100} 
                      className="img-fluid" alt="Phone"/>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0">Samsung Galaxy</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">White</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Capacity: 64GB</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: 1</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">$499</p>
                  </div>
                </div>
                <hr className="mb-4"  style={{backgroundColor: '#e0e0e0',opacity: 1}}/* style="background-color: #e0e0e0; opacity: 1;" *//>
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div className="col-md-10">
                    <div className="progress" style={{height: 6, borderRadius: 16}} /* style="height: 6px; border-radius: 16px;" */>
                      <div className="progress-bar" role="progressbar" style={{width: '65%', borderRadius: 16, backgroundColor: '#a8729a'}}
                        /* style="width: 65%; border-radius: 16px; background-color: #a8729a;"  */aria-valuenow="65"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-around mb-1">
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-0 border mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2" style={{textAlign: "center"}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                     width={200} height={100}  className="img-fluid" alt="Phone"/>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0">iPad</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Pink rose</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Capacity: 32GB</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: 1</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">$399</p>
                  </div>
                </div>
                <hr className="mb-4" style={{backgroundColor: '#e0e0e0', opacity: 1}}/* style="background-color: #e0e0e0; opacity: 1;" *//>
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div className="col-md-10">
                    <div className="progress" style={{height: 6, borderRadius: 16}} /* style="height: 6px; border-radius: 16px;" */>
                      <div className="progress-bar" role="progressbar" style={{width: '65%', borderRadius: 16, backgroundColor: '#a8729a'}}
                        /* style="width: 20%; border-radius: 16px; background-color: #a8729a;" */ aria-valuenow="20"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-around mb-1">
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between pt-2">
              <p className="fw-bold mb-0">Order Details</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> $898.00</p>
            </div>

            <div className="d-flex justify-content-between pt-2">
              <p className="text-muted mb-0">Invoice Number : 788152</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> $19.00</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p>
            </div>

            <div className="d-flex justify-content-between mb-5">
              <p className="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
            </div>
          </div>
          <div className="card-footer border-0 px-4 py-5" style={{backgroundColor: '#a8729a', borderBottomRightRadius: 10, 
                borderBottomLeftRadius: 10,
        }}
           /*  style="background-color: #a8729a; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" */>
            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
              paid: <span className="h2 mb-0 ms-2">$1040</span></h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</ArgonBox>
          
          <ArgonBox  mb={3} pb={20}>
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
                              if(productInputRow.length == 0  ){
                                setOrderTotalPrice((quantity + 1) * parseFloat(firstProductPrice));
                                
                              }
                              else{
                                setOrderTotalPrice(( parseFloat(firstProductPrice)) + 
                                parseFloat(ordertotalPrice));
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
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
