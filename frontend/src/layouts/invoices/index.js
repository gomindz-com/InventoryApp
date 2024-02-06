import React, { useState, useEffect, useRef } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import PaidIcon from "@mui/icons-material/Paid";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Button, Modal, Typography, Card, Divider } from "@mui/material";

import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

// Form Validation and Submission
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { AddOrderSchema } from "formValidation/addForm";
import { getOrders, deleteOrder, addOrder, updateOrder } from "apiservices/orderService";
import { getProducts } from "apiservices/productService";

import { toast } from "react-toastify";
import "./index.css";

function Invoices() {
  // USER
  const user = useState(JSON.parse(localStorage.getItem("user")));

  // REFERENCE
  const componentRef = useRef();

  // MODAL VARIABLES
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const [modalAddInvoicOpen, setModalAddInvoicOpen] = useState(false);
  const toggleModalAddInvoice = () => {
    setModalAddInvoicOpen(!modalAddInvoicOpen);
  };
  const [modalPartPaymentOpen, setModalPartPaymentOpen] = useState(false);
  const toggleModalPartPayment = () => {
    setModalPartPaymentOpen(!modalPartPaymentOpen);
  };
  const [modalApproveReceiptOpen, setModalApproveReceiptOpen] = useState(false);
  const toggleModalApproveReceipt = () => {
    setModalApproveReceiptOpen(!modalApproveReceiptOpen);
  };

  // MODAL ITEM
  const [modalItem, setModalItem] = useState(null);

  // TOGGLE VIEWS
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showInvoiceTable, setshowInvoiceTable] = useState(true);
  const [showPrintView, setShowPrintView] = useState(false);
  const [viewOrderActive, setViewOrderActive] = useState(true);

  const product_options = [];
  const [value, setValue] = useState("");

  const [orderList, setOrderList] = useState([]);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [productOptions, setProductOptions] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [selected, setSelected] = useState(false);

  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);
  const [theBuyer, setTheBuyer] = useState("");
  const [theBuyerLocation, setTheBuyerLocation] = useState("");
  const [theBuyerPhone, setTheBuyerPhone] = useState("");

  const [theReceipt, setTheReceipt] = useState("");

  const [firstProductId, setFirstProductId] = useState("");
  const [firstProductPrice, setFirstProductPrice] = useState(null);
  const [firstProductTotalPrice, setFirstProductTotalPrice] = useState(null);

  const [editData, setEditData] = useState({});

  const [totalPriceEditData, setTotalPriceEditData] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);

  const [orderData, setOrderData] = useState({
    buyer: "",
    buyer_phone: "",
    buyer_location: "",
    status: "pending",
    receipt: "",
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
    { name: "buyer_phone", align: "center" },

    { name: "status", align: "center" },
    { name: "Approve As Receipt", align: "center" },
    { name: "View & Print", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];
  const rows = [];





  const columnsToExport = [
    "id",
    "product",
    "total price",
    "buyer_phone",
    "buyer",
    "buyer_location",
  ];

  console.log('Hello')
  
  const rowToExcel = currentOrderList.map(order => {
    
    const row = {};
    columnsToExport.forEach(column => {
      if (column === "product") {
        row[column] = order.products.map(product => product.name).join(", ");
      } else if (column === "total price") {
        row[column] = order.total_price;
      } else {
        row[column] = order[column];
      }
    });
    return row;
  });
  



  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rowToExcel, { header: columnsToExport });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
    XLSX.writeFile(wb, "invoice_report.xlsx");
  };
  
 

  const [idProductRow, setIdProductRow] = useState(0);
  const [productInputRow, setProductInputRow] = useState([]);

  const [productEditRows, setProductEditRows] = useState([]);

  const [otherProducts, setOtherProducts] = useState([]);

  const [partPaymentAmount, setPartPaymentAmount] = useState(null);

  // DOWNLOAD AND PRINT
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    const componentNode = componentRef.current;

    if (componentNode) {
      html2canvas(componentNode).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("component.pdf");
      });
    }
  };


  // SEARCH FUNCTIONALITY
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredOrders = orderList.filter(
      (order) => order.buyer.toLowerCase().includes(query) || order.receipt.includes(query)
    );
    setCurrentOrderList(filteredOrders);
  };

  // GET INVOICES
  const handleGetOrderList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setOrderList([]);

    try {
      const res = await getOrders("invoice");
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

  // GET PRODUCT LIST
  const handleGetProductList = async () => {
    try {
      const res = await getProducts();
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
      } else {
      }
    } catch (error) {}
  };

  // APPROVE AS RECEIPT
  const handleApproveAsReceipt = async () => {
    const newState = modalItem.products.map((obj) => {
      return {
        ...obj,
        amount: obj.quantity,
      };
    });

    const res = await updateOrder(modalItem.id, {
      status: "approved",
      products: newState,
      total_price: modalItem.total_price,
      type: "receipt",
    });

    if (res.status == 201) {
      toast.success("Invoice added as a Receipt Successfully"), { autoClose: 40 };
      handleGetOrderList();
      toggleModalApproveReceipt();
    } else {
      toast.error("Invoice Could Not Be Updated");
    }
  };

  // APPROVE PART PAYMENT
  const handleApprovePartPayment = async () => {
    if (partPaymentAmount == null) {
      toast.error("Amount Undefined");
      return;
    }
    const productsUpdatedWithAmountField = modalItem.products.map((obj) => {
      return {
        ...obj,
        amount: obj.quantity,
      };
    });

    const res = await updateOrder(modalItem.id, {
      products: productsUpdatedWithAmountField,
      status: "incomplete",
      price_paid: partPaymentAmount,
      type: modalItem.type,
    });

    if (res.status == 201) {
      toast.success("Invoice Approved : Incomplete Payment"), { autoClose: 40 };
      handleGetOrderList();
      toggleModalPartPayment();
    } else {
      toast.error(res.data?.message ?? "Invoice Could Not Be Updated");
    }
  };

  // DELETE INVOICE
  const handleDeleteConfirmation = async () => {
    await handleDeleteInvoice(modalItem.id);
    toggleModal();
  };

  const handleDeleteInvoice = async () => {
    await deleteOrder(modalItem.id)
      .then((res) => {
        if (res.status == 204) {
          toast.success("Successfully Deleted");
          handleGetOrderList();
        } else {
          toast.error("Could Not Be Deleted");
        }
      })
      .catch((err) => {});
  };

  // ADD INVOICE
  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleChangeAmount = async (e) => {
    setOrderData({
      ...orderData,
      ["amount"]: e.target.value,
      ["total_price"]: productPrice * e.target.value,
    });
  };

  const handleComfirm = async () => {
    const isValid = await AddOrderSchema.isValid(orderData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      toast.success("Adding Invoice!!", { autoClose: 80 });
      await addOrder("invoice", orderData)
        .then((res) => {
          if (res.status == 201) {
            setFirstProductId("");
            setIdProductRow(0);
            setProductInputRow([]);
            setOrderData({
              buyer: "",
              buyer_location: "",
              buyer_phone: "",
              status: "pending",
              ref: "",
              total_price: "",
              type: "invoice",
              products: [],
            });

            setQuantity(0);
            setShowAddForm(false);
            setshowInvoiceTable(true);
            setValue("");
            toggleModalAddInvoice();

            handleGetOrderList();
          } else {
            toast.error(res.data.message);
            toggleModalAddInvoice();
          }
        })
        .catch((err) => {
          toggleModalAddInvoice();
        });
    }
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

    setOrderData({
      ...orderData,
      ["products"]: resTopics,
      ["total_price"]: ordertotalPrice,
      ["type"]: "invoice",
      ["status"]: "pending",
      ["ref"]: uuid,
      ["userid"]: user.id,
    });

    toggleModalAddInvoice();
  };

  // EDIT INVOICE
  const handleEditOrderInvoice = async (id) => {
    toast.success("Editing Invoice!!", { autoClose: 80 });
    await updateOrder(id, {
      products: productEditRows,
      total_price: totalPriceEditData,
      type: "invoice",
    })
      .then((res) => {
        if (res.data?.status == true) {
          toast.success(" Successfully Editing", { autoClose: 40 });
          handleGetOrderList();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {});
  };

  // TABLE ROWS AND COLUMNS UI

  // const columns = [
  //   { name: "id", align: "left" },
  //   { name: "product", align: "left" },
  //   { name: "order price", align: "center" },
  //   { name: "price paid", align: "center" },
  //   { name: "balance", align: "center" },
  //   { name: "buyer", align: "center" },
  //   { name: "buyer phone", align: "center" },
  //   { name: "status", align: "center" },
  //   { name: "Make Part Payment", align: "center" },
  //   { name: "Approve As Receipt", align: "center" },
  //   { name: "View & Print", align: "center" },
  //   { name: "edit", align: "center" },
  //   { name: "delete", align: "center" },
  // ];
  // const rows = [];

  currentOrderList.map(function (item, i) {
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
      "order price": (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            GMD {item.total_price}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      "price paid": (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            GMD {item.price_paid}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      "buyer phone": (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.buyer_phone ?? "NAN"}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      balance: (
        <ArgonBadge
          variant="gradient"
          badgeContent={"GMD " + (item.total_price - item.price_paid)}
          color="error"
          size="xs"
          container
        />
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
          {item.status == "approved" ? "Partly Paid" : "Pending Payment"}
        </ArgonTypography>
      ),

      "Approve As Receipt": (
        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setModalItem(item);
            toggleModalApproveReceipt();
          }}
        >
          <CheckIcon />
        </ToggleButton>
      ),

      "Make Part Payment": (
        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setModalItem(item);
            toggleModalPartPayment();
          }}
        >
          <PaidIcon />
        </ToggleButton>
      ),

      "View & Print": (
        <Button
          onClick={async () => {
            setShowPrintView(true);
            setShowAddForm(false);
            setshowInvoiceTable(false);

            setOrderData(item);
            setProductInputRow(item.products);

            setOrderTotalPrice(0);
            setViewOrderActive(true);

            setOrderTotalPrice(item.total_price);
            setTheBuyer(item.buyer);
            setTheBuyerPhone(item.buyer_phone);
            setTheBuyerLocation(item.buyer_location);
            setTheReceipt(item.ref);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-down" />
        </Button>
      ),
      edit: (
        <Button
          onClick={async () => {
            i = 0;
            setEditData(item);
            setTotalPriceEditData(item.total_price);

            const updateState = item.products.map((obj) => {
              return {
                ...obj,
                row: i++,
                amount: obj.quantity,
                price: obj.price * obj.quantity,
                productprice: obj.price,
              };
            });

            setProductEditRows(updateState);
            setshowInvoiceTable(false);
            setViewOrderActive(false);
            setShowAddForm(false);
            setShowEditForm(true);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={() => {
            setModalItem(item);
            toggleModal();
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
                toast.error("Please Choose a Product!!", { autoClose: 80 });
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

      if (x == productEditRows[key]?.name) {
        indexx = i;
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
                if (obj.row == key) {
                  return {
                    ...obj,
                    amount: 1,
                    id: selectedOption.id,
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

                const AmountValueUpdate = productEditRows.map((obj) => {
                  if (obj.row == 0) {
                    setTotalPriceEditData(parseFloat(result * obj.productprice));

                    return {
                      ...obj,
                      amount: result,
                      price: result * obj.productprice,
                    };
                  } else if (obj.row == key) {
                    setTotalPriceEditData(
                      parseFloat(productEditRows[key].price) + parseFloat(result * obj.productprice)
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
              if (
                productEditRows[0].amount > 0 &&
                productEditRows[key + 1] == undefined &&
                productEditRows[key].price != undefined
              ) {
                let idp = productEditRows.length;

                setProductEditRows((current) => [...current, { row: idp, amount: 0 }]);
                setIdProductRow(idp + 1);
              } else {
                toast.error("Please Choose a Product!!", { autoClose: 80 });
              }
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {
              if (productEditRows.length <= 1) {
                toast.error("An invoice must always contain at least one Entry", {
                  autoClose: 100,
                });
              } else if (
                productEditRows[key + 1]?.price == undefined &&
                productEditRows[key + 1]?.row == 0
              ) {
                toast.error("An invoice must always contain at least one Entry", {
                  autoClose: 100,
                });
              } else {
                if (productEditRows[key]?.price != undefined) {
                  setTotalPriceEditData(
                    parseFloat(totalPriceEditData) - productEditRows[key]?.price
                  );
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

  // USE EFFECT
  useEffect(() => {
    handleGetOrderList();
    handleGetProductList();
  }, []);

  // RETURN UI
  return (
    <DashboardLayout>
      {/* MODALS */}
      <Modal open={modalOpen} onClose={toggleModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">COMFIRM DELETE</Typography>
          <Divider />
          <Typography>Are you sure you want to delete this item?</Typography>
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={handleDeleteConfirmation}
            color="info"
            size="large"
          >
            Delete
          </ArgonButton>
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={toggleModal}
            color="info"
            size="large"
          >
            Cancel
          </ArgonButton>
        </div>
      </Modal>
      ;
      <Modal open={modalAddInvoicOpen} onClose={toggleModalAddInvoice}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">ADD INVOICE</Typography>
          <Divider />
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={handleComfirm}
            color="info"
            size="large"
          >
            Confirm
          </ArgonButton>
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={toggleModalAddInvoice}
            color="info"
            size="large"
          >
            Cancel
          </ArgonButton>
        </div>
      </Modal>
      ;
      <Modal open={modalPartPaymentOpen} onClose={toggleModalPartPayment}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">MAKE PART PAYMENT</Typography>
          <Divider />

          <ArgonInput
            style={{ flex: 5 }}
            type="number"
            placeholder="Amount"
            size="large"
            onChange={(e) => {
              setPartPaymentAmount(e.target.value);
            }}
          />

          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={handleApprovePartPayment}
            color="info"
            size="large"
          >
            Confirm
          </ArgonButton>
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={toggleModalPartPayment}
            color="info"
            size="large"
          >
            Cancel
          </ArgonButton>
        </div>
      </Modal>
      ;
      <Modal open={modalApproveReceiptOpen} onClose={toggleModalApproveReceipt}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">APPROVE AS RECEIPT</Typography>
          <Divider />
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={handleApproveAsReceipt}
            color="info"
            size="large"
          >
            Confirm
          </ArgonButton>
          <ArgonButton
            style={{ marginRight: "15px", marginTop: "15px" }}
            onClick={toggleModalApproveReceipt}
            color="info"
            size="large"
          >
            Cancel
          </ArgonButton>
        </div>
      </Modal>
      ;
      <DashboardNavbar
        handleClick={(e) => {
          const filteredOrderList = [];
          orderList.map((obj) => {
            if (e.target.value === "") {
              setOrderList(currentOrderList);
            } else if (
              obj.buyer.toLowerCase() === e.target.value.toLowerCase() ||
              obj.receipt.toLowerCase() === e.target.value.toLowerCase()
            ) {
              filteredOrderList.push(obj);
              setOrderList(filteredOrderList);
            }
          });
        }}
      />
      <ArgonBox py={3}>
        {showInvoiceTable && (
          <ArgonBox mb={35}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Invoice List</ArgonTypography>
                <TextField
                  id="outlined-basic"
                  placeholder="Search"
                  style={{ width: "65%" }}
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearch}
                  autoComplete={"off"}
                />

                <Button
                  onClick={() => {
                    setOrderData({
                      buyer: "",
                      buyer_location: "",
                      buyer_phone: "",
                      status: "",
                      ref: "",
                      total_price: "",
                      type: "",
                      products: [],
                    });
                    setViewOrderActive(false);
                    setOtherProducts([]);
                    setProductInputRow([]);
                    setQuantity(0);
                    setOrderTotalPrice(0.0);
                    setFirstProductTotalPrice(null);
                    setShowAddForm(true);
                    setshowInvoiceTable(false);
                  }}
                >
                  <h4 style={{ paddingRight: 10 }}>Add Invoice </h4>
                  <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-fat-add" />
                </Button>
              </ArgonBox>

              <ArgonBox style={{ alignSelf: "flex-end", marginRight: 25 }}>
                <Button onClick={exportToExcel}>
                  <h6 style={{ paddingRight: 10 }}>Export to Excel</h6>
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
          <ArgonBox mb={3} pb={20}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Invoice List</ArgonTypography>
                <Button
                  onClick={() => {
                    setshowInvoiceTable(true);
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
                            }

                            if (firstProductId === "") {
                              toast.error("Please Choose a Product!!", { autoClose: 80 });
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
                                toast.error("Please Choose a Product!!", { autoClose: 80 });
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
                    name="buyer_phone"
                    value={orderData.buyer_phone}
                    placeholder="Buyer Phone  Number"
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
        )}

        {showEditForm && (
          <ArgonBox mb={3} pb={20}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Edit Invoice</ArgonTypography>
                <Button
                  onClick={() => {
                    setshowInvoiceTable(true);
                    setShowAddForm(false);
                    setShowEditForm(false);
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
                    name="buyer_phone"
                    value={editData.buyer_phone}
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
                      handleEditOrderInvoice(editData.id);
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
        )}
      </ArgonBox>
      {showPrintView && (
        <div className="container card">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div style={{ justifyContent: "flex-start" }} className="custom-actions-btns mb-2">
                <a
                  onClick={() => {
                    setShowPrintView(false);
                    setShowAddForm(false);
                    setshowInvoiceTable(true);
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
                    handleDownload();
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

          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              setShowPrintView(false);
              setShowAddForm(false);
              setshowInvoiceTable(true);
            }}
          >
            <h5 style={{ paddingRight: 10 }}>Back </h5>
            <ArgonBox component="i" color="info" fontSize="20px" className="ni ni-bold-right" />
          </Button>

          <div style={{ marginTop: 20 }} ref={componentRef} className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="invoice-container">
                    <div className="invoice-header">
                      <div className="row gutters">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <a href="index.html" className="invoice-logo">
                            Mega Store
                          </a>
                        </div>
                        <div
                          style={{ justifyContent: "flex-end" }}
                          className="col-lg-6 col-md-6 col-sm-6"
                        >
                          <address style={{ textAlign: "end" }} className="text-right">
                            {user?.company_name}

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
                              <br />
                              {theBuyerPhone}
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
