// @mui material components
import Card from "@mui/material/Card";

import { useState, useEffect, useRef } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";

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

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useReactToPrint } from "react-to-print";
import { Navigate } from "react-router-dom";
import { getOrders, deleteOrder, addOrder, editOrder} from "apiservices/orderService";
import { getProducts } from "apiservices/productService";
import {v4 as uuidv4} from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import { item } from "examples/Sidenav/styles/sidenavItem";
import { updateOrder } from "apiservices/orderService";


function Invoices() {

  const product_options = [];

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState([]);

  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOrderTable, setShowOrderTable] = useState(true);

  const [showPrintView, setShowPrintView] = useState(false);

  const [viewOrderActive, setViewOrderActive] = useState(true);
  const [screenloading, setScreenLoading] = useState(true);
  
  const [orderList, setOrderList] = useState([]);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productOptions, setProductOptions] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [selected, setSelected] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openpayment, setOpenPayment] = React.useState(false);

  const [modalItem, setModalItem] = useState();

  const handleOpenPayment = (item) => {
    
    setOpenPayment(true);
    setModalItem(item)
    console.log(item);

  }
  const handleClosePayment = () => setOpenPayment(false);

  
  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);
  const [theBuyer, setTheBuyer] = useState("");
  const [theBuyerLocation, setTheBuyerLocation] = useState("");
  const [theReceipt, setTheReceipt] = useState("");

  const [firstProductId, setFirstProductId] = useState("");
  const [firstProductPrice, setFirstProductPrice] = useState(null);
  const [firstProductTotalPrice, setFirstProductTotalPrice] = useState(null);


  const [editData, setEditData] = useState({});

  const [totalPriceEditData, setTotalPriceEditData] = useState(0);


  const [orderData, setOrderData] = useState({
    buyer: "",
    buyer_location: "",
    status: "pending",
    receipt: '',
    total_price: "",
    type: "",
    products: [],
  });


  const columns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "total price", align: "left" },
    { name: "buyer", align: "center" },
    { name: "buyer_location", align: "center" },
    { name: "status", align: "center" },
    { name: "Approve As Receipt", align: "center" },
    { name: "View & Print", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];
  const rows = [];

  const [idProductRow, setIdProductRow] = useState(0);
  const [productInputRow, setProductInputRow] = useState([]);


  const [productEditRows, setProductEditRows] = useState([]);




  const [otherProducts, setOtherProducts] = useState([]);
  const [otherProductsQuantity, setOtherProductsQuantity] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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
    const user = JSON.parse(localStorage.getItem("user"));


    setOrderList([]);
    setScreenLoading(true);

    try {

      
      const res = await getOrders('invoice');

      
      if (res.data?.status === true) {
        setOrderList(res.data.orders);
        setCurrentOrderList(res.data.orders);
      } else {
        setOrderList([]);
      }
      
    } catch (error) {
      toast.error("Invoice Could Not Be Retrieved");

    }
  };

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

  const handleApproveAsReceipt = async (item) => {


    const newState = item.products.map((obj) => {
      
        return {
          ...obj,
          amount: obj.quantity
        };
      
    });


    // console.log("new state")
    // console.log(newState)
    // console.log(item.products)
    // console.log(item.total_price)
    

    // return false;


    const res = await editOrder(item.id, {
      "products": newState,
      "total_price": item.total_price,
      "type": "receipt" 
    })

    console.log("Respond From Approve Order As Receipt")
    console.log(res)

    if(res.status == 201){
      toast.success("Invoice added as a Receipt Successfully"), { autoClose: 40 };
      handleGetOrderList();
      handleClosePayment();
    }
    else {
      toast.error("Invoice Could Not Be Updated");
    }
  };

  const handleApprovePartPayment = async (item) => {

    const res = await updateOrder(item.id, { 
      "status": "approved"
     })

    console.log("Respond From Approve Part Payment")
    console.log(res)

    if(res.status == 200){
      toast.success("Invoice Partly Approved paid"), { autoClose: 40 };
      handleGetOrderList();
      handleClosePayment();
    }
    else {
      toast.error("Invoice Could Not Be Updated");
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

  const handleDeleteInvoice = async (id) => {
    await deleteOrder(id)
      .then((res) => {

        console.log(res)
        if (res.status == 204) {
          toast.success("Successfully Deleted")
          handleGetOrderList();
        } else {
          toast.error("Could Not Be Deleted")

        }
      })
      .catch((err) => {}
      );
  };

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
      ["type"]: "invoice",
      ["status"]: "pending",
      ["ref"]: uuid,
      ["userid"]: user.id,
    });

    handleOpen();
  };

  const handleComfirm = async () => {

    console.log("Invoice Data Sent To Api")
    console.log(orderData)

    const isValid = await AddOrderSchema.isValid(orderData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      toast.success("Adding Invoice!!", { autoClose: 80 });
      await addOrder("invoice", orderData)
        .then((res) => {

          console.log("Adding Invoice Api Response ---")
          console.log(res.status)

          if (res.status == 201) {
            
            setFirstProductId("");
            setIdProductRow(0);
            setProductInputRow([]);
            setOrderData({
              buyer: "",
              buyer_location: "",
              status: "pending",
              ref: '',
              total_price: "",
              type: "invoice",
              products: [],
            });

            setQuantity(0);
            setShowAddForm(false);
            setShowOrderTable(true);
            setValue("");
            setOpen(false);
            handleGetOrderList();
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

  const handleEditOrderInvoice = async (id) => {

    console.log("Edit Order Data")
    console.log(editData)
    console.log(productEditRows)
    console.log(totalPriceEditData)
    
    toast.success("Editing Invoice!!", { autoClose: 80 });
    await editOrder(id, {
      "products": productEditRows,
      "total_price": totalPriceEditData,
      "type": "invoice" 
    })
      .then((res) => {
        console.log("Edit Invoice Respond")
        console.log(res)

        if (res.data?.status == true) {
          toast.success(" Successfully Editing", { autoClose: 40 });
          handleGetOrderList();
        } else {
          toast.error(res.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        setOpen(false);
      });
    
  };

  useEffect(() => {
    handleGetOrderList();
    handleGetProductList();
  }, []);


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
          {item.status == 'approved' ? 'Partly Paid' : 'Pending Payment'}
        </ArgonTypography>
      ),

      "Approve As Receipt": (
        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            handleOpenPayment(item);
            //setSelected(!selected);
            //handleEdit(item.id);
          }}
        >
          <CheckIcon />
        </ToggleButton>
      ),

      "View & Print": (
        <Button
          onClick={async () => {
            setShowPrintView(true);
            setShowAddForm(false);
            setShowOrderTable(false);

            setOrderData(item);
            setProductInputRow(item.products);

            console.log(item.products)
            setOrderTotalPrice(0);
            setViewOrderActive(true);


            console.log("Product Options")
            console.log(productOptions)
            console.log("Product Items")
            console.log(item.products)

            setOrderTotalPrice(item.total_price);
            setTheBuyer(item.buyer);
            setTheBuyerLocation(item.buyer_location);
            setTheReceipt(item.ref);

            //setIdProductRow(0 + 1);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-down" />
        </Button>
      ),
      edit: (
        <Button
          onClick={async () => {


            console.log("Current Edit Products Input Rows : ");
            i = 0;
            setEditData(item)
            setTotalPriceEditData(item.total_price)
            
            const updateState = item.products.map((obj) => {
              console.log("Current Edit Products Input Rows : ");
              return {
                ...obj,
                row: i++,
                amount: obj.quantity,
                price: obj.price * obj.quantity,
                productprice: obj.price
              };
            });

            setProductEditRows(updateState);

            console.log("updateState")
            console.log(updateState)
            setShowOrderTable(false)
            setViewOrderActive(false)
            setShowAddForm(false);
            setShowEditForm(true);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteInvoice(item.id);
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
        });

        setProductInputRow(newState1);

        const newState = otherProducts.map((obj) => {
          if (obj.row == row) {
            return { ...obj, id: selectedOption.id, price: selectedOption.price };
          } else {
            return { ...obj };
          }
        });

        setOtherProducts(newState);

        setOrderTotalPrice(
          parseFloat(ordertotalPrice) -
            currentprice +
            parseFloat(productInputRow[row].amount * selectedOption.price)
        );
      }
    };

    // OTHER PRODUCT INPUT ROWS
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
  


  const renderEditColumns = productEditRows.map((product, key) => {

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
        });

        setProductInputRow(newState1);

        const newState = otherProducts.map((obj) => {
          if (obj.row == row) {
            return { ...obj, id: selectedOption.id, price: selectedOption.price };
          } else {
            return { ...obj };
          }
        });

        setOtherProducts(newState);

        setOrderTotalPrice(
          parseFloat(ordertotalPrice) -
            currentprice +
            parseFloat(productInputRow[row].amount * selectedOption.price)
        );
      }
    };
    let indexx;

    productOptions.forEach(function (arrayItem, i) {

      var x = arrayItem.value;
      
      if(x == productEditRows[key]?.name){
        indexx = i
      }
    });


    
    
    return (
      <ArgonBox key={key} mb={2} mx={5} display="flex">
        <div style={{ flex: 5, paddingRight: 10 }}>
          <Select
            name="product"
            placeholder="Products"
            defaultValue={productOptions[indexx]}
            options={productOptions}
            onChange={async (selectedOption) => {

              console.log("Selecting A Product For Edit Products Row ")
              console.log(selectedOption)
              console.log("Current Total Price")
              console.log(totalPriceEditData)
              console.log("Current Row Price")
              console.log(productEditRows[key]?.price)


              if (isNaN(productEditRows[key]?.price)) {
                setTotalPriceEditData(
                  parseFloat(totalPriceEditData) + parseFloat(selectedOption.price)
                );
              } else {
                setTotalPriceEditData(

                  parseFloat(totalPriceEditData) +
                    parseFloat(productEditRows[key]?.price) +
                    parseFloat(selectedOption.price)
                );
              }
              
              const ProductUpdate = productEditRows.map((obj) => {
                console.log(obj)
                if (obj.row == key) {
                  console.log('key')
                  console.log(key)
                  return {
                    ...obj,
                    amount: 1,
                    id:selectedOption.id,
                    productprice: selectedOption.price,
                    price: selectedOption.price,
                  };
                } else {
                  return { ...obj };
                }
              });

              setProductEditRows(ProductUpdate);

            }}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <ArgonInput
              style={{ flex: 5 }}
              type="text"
              placeholder="Amount"
              value={productEditRows[key]?.amount}
              size="large"
              onChange={async (e) => {
                const result = e.target.value.replace(/\D/g, "");

                console.log('Edit Products Input Row :', key)
                console.log("Input Value : ", result)
                console.log("Current Edit Products Input Rows State : ")
                console.log(productEditRows)

              
                
                // const updateOnOtherProducts = productEditRows.map((obj) => {

                //   console.log('obj')
                //   console.log(obj)

                //   if(obj.hasOwnProperty('productprice')){

                //     console.log("hasssss  jsdkvsdf")
                //   }

                //   else{


                //     console.log("has noooot")

                //     const ProductUpdate = productEditRows.map((obj) => {

                //       console.log(obj)
                //       if (obj.row == key) {
                //         console.log('key')
                //         console.log(key)
                //         return {
                //           ...obj,
                //           amount: 1,
                //           productprice: obj.price,
                //           price: obj.price,
                //         };
                //       } else {
                //         return { ...obj };
                //       }
                //     });
      
                //     setProductEditRows(ProductUpdate);

                    
                //   }




                //   if (obj.key == key) {
                //     return { ...obj, amount: parseInt(result), price:parseInt(result)  };
                //   } else {
                //     return { ...obj };
                //   }
                // });
                // setProductEditRows(updateOnOtherProducts);

                const AmountValueUpdate = productEditRows.map((obj) => {

                  console.log("fdgdf")
                  console.log(obj.row)

                   
                  if (obj.row == 0) {

                    setTotalPriceEditData( parseFloat((result * obj.productprice)));

                    return {
                      ...obj,
                      amount: result,
                      price: result * obj.productprice,
                    };
                  } 

                 else if (obj.row == key) {

                    setTotalPriceEditData( parseFloat(productEditRows[key].price) + parseFloat((result * obj.productprice)));

                    return {
                      ...obj,
                      amount: result,
                      price: result * obj.productprice,
                    };
                  } else {



                    return { ...obj };
                  }
                });

                setProductEditRows(AmountValueUpdate);

                return false;
              }}
            />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <ArgonInput
            type="name"
            name="price"
            value={productEditRows[key]?.price}
            placeholder="Price"
            size="large"
            onChange={handleChangeAmount}
          />
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {

              console.log('productEditRows[key]')
              console.log(productEditRows[key])
              
              if (productEditRows[0].amount > 0 && productEditRows[key + 1] == undefined && productEditRows[key].price != undefined) {
                let idp = productEditRows.length;

                setProductEditRows((current) => [...current, { row: idp, amount: 0 }]);
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

              console.log('productEditRows.length')
              console.log(productEditRows.length)
              console.log(productEditRows)
              console.log(productEditRows[key +1 ]?.row)

              if(productEditRows.length <= 1 ){
                toast.error("An invoice must always contain at least one Entry", {autoClose: 100});
              }


              else if (productEditRows[key +1 ]?.price == undefined && productEditRows[key +1 ]?.row == 0 ) {
                toast.error("An invoice must always contain at least one Entry", {autoClose: 100});
              }

              else{


              console.log("dfj,asdvsakvskv")
                console.log(productEditRows[key]?.price)

                if (productEditRows[key]?.price != undefined) {
                  setTotalPriceEditData(parseFloat(totalPriceEditData) - productEditRows[key]?.price);
                }
  
                const newProductInputRow = [];
                const newProductInputRowUpdated = [];
  
                let i = 0;
                let j = 0;
                productEditRows.map((obj) => {
                  if (obj.row == i && obj.row != key) {
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
  
                setProductEditRows(newProductInputRowUpdated);
  

                
              }
              
              

            }}
          >
            Remove
          </Button>
        </div>
      </ArgonBox>
    );
  });

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
              Add Invoice
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
            <Button style={{ marginLeft: -11 }} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleComfirm()}>Comfirm</Button>
          </Box>
        </Fade>
      </Modal>



      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openpayment}
        
        onClose={handleClosePayment}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openpayment}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Payment
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}></Typography>
            <Button style={{ marginLeft: -11 }} onClick={() => setOpenPayment(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleApprovePartPayment(modalItem)}>
              Part Payment
            </Button>
            <Button onClick={() => handleApproveAsReceipt(modalItem)}>
              Full Payment
            </Button>
          </Box>
        </Fade>
      </Modal>

      <DashboardNavbar 

        handleClick ={(e) => {
        
          const filteredOrderList = [];
          orderList.map((obj) => {

            if (e.target.value === '') {
              setOrderList(currentOrderList);
            }

            else if(
              obj.buyer.toLowerCase() === e.target.value.toLowerCase() ||
              obj.receipt.toLowerCase() === e.target.value.toLowerCase()
              ) {
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
                <ArgonTypography variant="h6">Invoice List</ArgonTypography>

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
                  <h4 style={{ paddingRight: 10 }}>Add Invoice </h4>
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
                  <ArgonTypography variant="h6">Invoice List</ArgonTypography>
                  <Button
                    onClick={() => {
                      setShowOrderTable(true);
                      setShowAddForm(false);
                    }}
                  >
                    <h4 style={{ paddingRight: 10 }}>Show Invoice List </h4>
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
                      placeholder={`Receipt ID : XxxxxxxxxxX`}
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



        

        {showEditForm && (
          <>
            <ArgonBox mb={3} pb={20}>
              <Card>
                <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <ArgonTypography variant="h6">Edit Invoice</ArgonTypography>
                  <Button
                    onClick={() => {
                      setShowOrderTable(true);
                      setShowAddForm(false);
                      setShowEditForm(false)
                    }}
                  >
                    <h4 style={{ paddingRight: 10 }}>Show Invoice List </h4>
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
                  

                   {renderEditColumns} 

                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="buyer"
                      value={editData.buyer}
                      placeholder="Buyer"
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="buyer_location"
                      value={editData.buyer_location}
                      placeholder="Buyer Location"
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>


                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="total_price"
                      value={`Total Price : ${totalPriceEditData}`}
                      placeholder={`Total Price : ${Math.round(totalPriceEditData * 100) / 100}`}
                      size="large"
                    />
                  </ArgonBox>
                  <ArgonBox mb={2} mx={5}>
                    <ArgonInput
                      type="name"
                      name="ref"
                      placeholder={`Receipt ID : ${editData.receipt}`}
                      readOnly={true}
                      size="large"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mb={"20%"} display="flex" mx={5}>
                    <ArgonButton
                      onClick={async () => {            
                        handleEditOrderInvoice(editData.id)
                      }}
                      color="info"
                      size="large"
                      fullWidth
                    >
                     Edit Invoice
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
                  <i className="icon-printer"></i> Show Invoice List
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
                                    <tr key={i}>
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

export default Invoices;
