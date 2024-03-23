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
import { Button, Modal, Typography, Card, Divider, Grid } from "@mui/material";

import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

// Form Validation and Submission
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { AddOrderSchema, AddBuyerSchema } from "formValidation/addForm";
import { getOrders, deleteOrder, addOrder, updateOrder } from "apiservices/orderService";
import { getProducts } from "apiservices/productService";

import { toast } from "react-toastify";
import "./index.css";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { getBuyers } from "apiservices/buyerService";
import { addBuyer } from "apiservices/buyerService";
import Spinner from "components/Spinner";



  // Open or create IndexedDB database
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('inventoryDataDB', 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Create object store for user data
        db.createObjectStore('invoiceData', { keyPath: 'id' });
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  
  
  // Add or update user data in IndexedDB
  const saveInvoiceDataToDB = async (invoiceData) => {
    const db = await openDatabase();
    const transaction = db.transaction(['invoiceData'], 'readwrite');
    const store = transaction.objectStore('invoiceData');

    // Iterate over each in the array and store it in the object store
    invoiceData.forEach(invoice => {
      store.put(invoice);
    });

  
    transaction.oncomplete = () => {
      console.log('Invoice data saved to IndexedDB');
    };
  };
  
  
  // Retrieve user data from IndexedDB
  const loadInvoiceDataFromDB = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['invoiceData'], 'readonly');
      const store = transaction.objectStore('invoiceData');
      const request = store.getAll();
      request.onsuccess = (event) => {
        const invoiceData = event.target.result;
        resolve(invoiceData);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  

function Invoices() {
  // USER
  const user = useState(JSON.parse(localStorage.getItem("user")));

  // REFERENCE
  const componentRef = useRef();

  const [loading, setLoading] = useState(true);
  const [loadingBuyers, setLoadingBuyers] = useState(false);

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

  const [modalAddBuyerOpen, setModalAddBuyerOpen] = useState(false);
  const toggleModalAddBuyerOpen = () => {
    setModalAddBuyerOpen(!modalAddBuyerOpen);
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
  const [productOptions, setProductOptions] = useState([]);

  const buyer_options = [];
  const [buyerOptions, setBuyerOptions] = useState([]);

  const [orderList, setOrderList] = useState([]);
  const [currentOrderList, setCurrentOrderList] = useState([]);

  const [ordertotalPrice, setOrderTotalPrice] = useState(0.0);
  const [theBuyer, setTheBuyer] = useState("");
  const [theBuyerLocation, setTheBuyerLocation] = useState("");
  const [theBuyerPhone, setTheBuyerPhone] = useState("");

  const [theReceipt, setTheReceipt] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);

  const [buyerData, setBuyerData] = useState({
    name: "",
    mobile_number: "",
    address: "",
  });

  const [productInputRow, setProductInputRow] = useState([]);
  const [partPaymentAmount, setPartPaymentAmount] = useState(null);

  // DOWNLOAD AND PRINT AND EXPORT
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportRows, {
      header: reportColumns.map((column) => column.name),
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
    XLSX.writeFile(wb, "invoice_report.xlsx");
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

  // GET PRODUCT LIST & PRODUCTS OPTIONS
  const handleGetProductList = async () => {
    try {
      const res = await getProducts();
      if (res.data?.status == true) {
        res.data?.products?.map((item) => {
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

  // GET INVOICES
  const handleGetOrderList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setOrderList([]);

    try {
      const res = await getOrders("invoice");
      if (res.data?.status === true) {
        setOrderList(res.data.orders);
        setCurrentOrderList(res.data.orders);
        saveInvoiceDataToDB(res.data?.orders);
      } else {
        setOrderList([]);
      }
    } catch (error) {
      toast.error("Invoice Could Not Be Retrieved");
    }
  };

  // ADD BUYER
  const handleAddBuyer = async () => {
    const isValid = await AddBuyerSchema.isValid(buyerData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      return;
    }

    setLoadingBuyers(true);
    toast.success("Adding Buyer!!", { autoClose: 80 });
    await addBuyer(buyerData)
      .then((res) => {
        if (res.status == 201) {
          setBuyerData({
            name: "",
            mobile_number: "",
            address: "",
          });
          handleGetBuyerList();
          toggleModalAddBuyerOpen();
          setLoadingBuyers(false);
        } else {
          toast.error(JSON.stringify(res.data) ?? "Error Adding Buyer");
          setLoadingBuyers(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // GET BUYER LIST
  const handleGetBuyerList = async () => {
    try {
      const res = await getBuyers();
      if (res.data?.status == true) {
        res.data?.buyers?.map((item) => {
          buyer_options.push({
            id: item.id,
            value: item.name,
            label: item.name,
            mobile: item.mobile_number,
            address: item.address,
          });
        });

        setBuyerOptions(buyer_options);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {}
  };

  // APPROVE AS RECEIPT
  const handleApproveAsReceipt = async () => {
    const newState = modalItem.products?.map((obj) => {
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

  // HANDLE ADD INVOICE WITH FORM FUNCTIONALITIES
  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    const hasNaNInFirstProduct = firstProduct.amount == null || NaN || "";
    const hasNanInRemainingProducts = remainingProducts.find((item) => item.amount === "");

    if (hasNaNInFirstProduct || hasNanInRemainingProducts) {
      toast.error("Please Make Sure All Fields Are Filled!!", { autoClose: 80 });
      return;
    }

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

    setOrderData({
      ...orderData,
      ["products"]: [firstProduct, ...remainingProducts],
      ["type"]: "invoice",
      ["status"]: "pending",
      ["ref"]: uuid,
      ["userid"]: user.id,
    });

    toggleModalAddInvoice();
  };

  const handleComfirm = async () => {
    if (orderData.products[0].id == "" || null) {
      toast.error("Please Choose A Product!!");
      toggleModalAddInvoice();
      return;
    }
    const isValid = await AddOrderSchema.isValid(orderData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      toggleModalAddInvoice();
    } else {
      setLoading(true)
      toast.success("Adding Invoice!!", { autoClose: 80 });
      await addOrder("invoice", orderData)
        .then((res) => {
          if (res.status == 201) {
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
            setfirstProduct({
              id: null,
              name: null,
              amount: null,
              price: null,
              total_price: null,
            });

            setRemainingProducts([]);
            setShowAddForm(false);
            setshowInvoiceTable(true);
            toggleModalAddInvoice();
            handleGetOrderList();
            setLoading(false)

          } else {
            toast.error(res.data.message);
            setLoading(false)
            toggleModalAddInvoice();
          }
        })
        .catch((err) => {
          setLoading(false)
          toggleModalAddInvoice();
        });
    }
  };

  // HANDLE EDIT INVOICE
  const handleEditOrderInvoice = async (id) => {
    const hasNanInEditableProducts = editableProducts.find((item) => item.amount === "");

    if (hasNanInEditableProducts) {
      toast.error("Please Make Sure All Fields Are Filled!!", { autoClose: 80 });
      return;
    }

    setLoading(true);
    toast.success("Editing Invoice!!", { autoClose: 80 });
    await updateOrder(id, {
      products: editableProducts,
      total_price: editData.total_price,
      type: "invoice",
      status: "pending",
    })
      .then((res) => {
        if (res.data?.status == true) {
          toast.success("Successfully Editing", { autoClose: 40 });
          handleGetOrderList();
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  // TABLE ROWS AND COLUMNS
  const columns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "order price", align: "center" },
    { name: "price paid", align: "center" },
    { name: "balance", align: "center" },
    { name: "buyer", align: "center" },
    { name: "buyer phone", align: "center" },
    { name: "status", align: "center" },
    { name: "Make Part Payment", align: "center" },
    { name: "Approve As Receipt", align: "center" },
    { name: "View & Print", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

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
            {item.buyer_phone ?? "NA"}
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
          selected={true}
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
          selected={true}
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
            setTheReceipt(item.receipt);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-down" />
        </Button>
      ),
      edit: (
        <Button
          onClick={async () => {
            setfirstProduct({
              id: null,
              name: null,
              amount: null,
              price: null,
              total_price: null,
            });

            setRemainingProducts([]);
            setEditData(item);

            const updatedItems = item.products.map((obj, index) => {
              return {
                ...obj,
                row: index,
                amount: obj.quantity,
                total_price: obj.amount,
              };
            });

            setEditableProducts(updatedItems);
            setshowInvoiceTable(false);
            setViewOrderActive(false);
            setShowAddForm(false);
            setShowEditForm(true);

            return;
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

  //REPORT ROWS AND COLUMNS
  const reportColumns = [
    { name: "ID", align: "left" },
    { name: "Product(s)", align: "left" },
    { name: "Order Price", align: "center" },
    { name: "Price Paid", align: "center" },
    { name: "Balance", align: "center" },
    { name: "Buyer Name", align: "center" },
    { name: "Buyer Phone", align: "center" },
    { name: "Order Status", align: "center" },
  ];
  const reportRows = currentOrderList.map((order) => ({
    ID: order.id,
    "Product(s)": order.products.map((product) => product.name).join(", "),
    "Order Price": order.total_price,
    "Price Paid": order.price_paid,
    Balance: order.total_price - order.price_paid,
    "Buyer Name": order.buyer,
    "Buyer Phone": order.buyer_phone,
    "Order Status": order.status,
  }));

  // ADD INVOICE RENDER FIRST PRODUCT ROW | ORDER DATE ETC | PRODUCT ROWS
  const [orderData, setOrderData] = useState({
    buyer: null,
    buyer_phone: null,
    buyer_location: null,
    status: "pending",
    receipt: null,
    total_price: 0,
    type: null,
    products: null,
  });

  const [firstProduct, setfirstProduct] = useState({
    id: null,
    name: null,
    amount: null,
    price: null,
    total_price: null,
  });

  const [remainingProducts, setRemainingProducts] = useState([]);

  const [nextRowId, setNextRowId] = useState(0);

  const renderAddFirstProductRow = (
    <ArgonBox mb={2} mx={5} display="flex">
      <div style={{ flex: 5, paddingRight: 10 }}>
        <Select
          name="product"
          placeholder="Products"
          options={productOptions}
          defaultValue={productOptions.find((option) => option.label === firstProduct.name)}
          onChange={(selectedOption) => {
            const previousTotalPrice = parseFloat(
              firstProduct.total_price == null ? 0 : firstProduct.total_price
            );

            const orderTotalPrice = orderData.total_price == "" ? 0 : orderData.total_price;

            setfirstProduct((prev) => ({
              ...prev,
              id: selectedOption.id,
              name: selectedOption.value,
              amount: 1,
              price: selectedOption.price,
              total_price: selectedOption.price,
            }));

            setOrderData((prev) => ({
              ...prev,
              total_price:
                parseFloat(selectedOption.price) +
                (parseFloat(orderTotalPrice) - parseFloat(previousTotalPrice)),
            }));
          }}
        />
      </div>
      <div style={{ flex: 3, paddingRight: 10 }}>
        <div style={{ display: "flex" }}>
          <ArgonInput
            style={{ flex: 5 }}
            type="number"
            placeholder="Amount"
            value={firstProduct.amount}
            size="large"
            readOnly={firstProduct.id == null}
            onChange={async (e) => {
              const e_amount =
                isNaN(e.target.value) || e.target.value == null || e.target.value == ""
                  ? 0
                  : parseFloat(e.target.value);

              setfirstProduct((prev) => ({
                ...prev,
                amount: e.target.value,
                total_price: e_amount * prev.price,
              }));

              const remainingProductsTotalPrice = remainingProducts.reduce((total, item) => {
                return total + parseFloat(item.amount) * item.price;
              }, 0);

              const e_remainingProductsTotalPrice =
                isNaN(remainingProductsTotalPrice) ||
                remainingProductsTotalPrice == null ||
                remainingProductsTotalPrice == ""
                  ? 0
                  : parseFloat(remainingProductsTotalPrice);

              setOrderData((prev) => ({
                ...prev,
                total_price:
                  parseFloat(e_remainingProductsTotalPrice) +
                  parseFloat(e_amount) * parseFloat(firstProduct.price),
              }));
            }}
          />
        </div>
      </div>
      <div style={{ flex: 3 }}>
        <ArgonInput
          type="name"
          name="price"
          placeholder="Price"
          value={firstProduct.total_price}
          size="large"
          readOnly
        />
      </div>
      <div style={{ alignSelf: "center", flex: 2.3 }}>
        <Button
          style={{ flex: 1, alignSelf: "center" }}
          onClick={
            isNaN(firstProduct.amount) || firstProduct.amount < 1
              ? async () => {
                  toast.error("Please Select Product with Complete Information!!", {
                    autoClose: 80,
                  });
                }
              : async () => {
                  if (remainingProducts.length == 0) {
                    setRemainingProducts((current) => [
                      ...current,
                      {
                        row: nextRowId,
                        id: null,
                        name: null,
                        amount: null,
                        price: null,
                        total_price: null,
                      },
                    ]);
                    setNextRowId((prevId) => prevId + 1);
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
  );

  // ADD INVOICE RENDER REMAINING PRODUCT ROWS
  const renderAddRemaingProductsRows = remainingProducts?.map(({ row }, key) => {
    const index = remainingProducts.findIndex((item) => item.row === row);

    return (
      <ArgonBox key={key} mb={2} mx={5} display="flex">
        <div style={{ flex: 5, paddingRight: 10 }}>
          <Select
            name="product"
            placeholder="Products"
            defaultValue={productOptions.find(
              (option) => option.label === remainingProducts[index]?.name
            )}
            options={productOptions}
            onChange={async (selectedOption) => {
              const previousTotalPrice = parseFloat(
                remainingProducts[index]?.total_price == null
                  ? 0
                  : remainingProducts[index]?.total_price
              );

              const orderTotalPrice = orderData.total_price == "" ? 0 : orderData.total_price;

              const updatedItems = [...remainingProducts];
              updatedItems[index] = {
                ...updatedItems[index],
                id: selectedOption.id,
                name: selectedOption.value,
                amount: 1,
                price: selectedOption.price,
                total_price: selectedOption.price,
              };
              setRemainingProducts(updatedItems);
              setOrderData((prev) => ({
                ...prev,
                total_price:
                  parseFloat(selectedOption.price) +
                  (parseFloat(orderTotalPrice) - parseFloat(previousTotalPrice)),
              }));
            }}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <ArgonInput
              style={{ flex: 5 }}
              type="text"
              placeholder="Amount"
              size="large"
              value={remainingProducts[index]?.amount}
              readOnly={remainingProducts[index]?.id == null}
              onChange={async (e) => {
                const e_amount =
                  isNaN(e.target.value) || e.target.value == null || e.target.value == ""
                    ? 0
                    : parseFloat(e.target.value);

                const updatedItems = [...remainingProducts];
                const index = updatedItems.findIndex((item) => item.row === row);
                updatedItems[index] = {
                  ...updatedItems[index],
                  amount: e.target.value,
                  total_price: parseFloat(e_amount) * parseFloat(updatedItems[index].price),
                };

                setRemainingProducts(updatedItems);

                const remainingProductsTotalPrice = remainingProducts.reduce((total, item) => {
                  return item.row == row
                    ? total + e_amount * item.price
                    : total + parseFloat(item.amount) * item.price;
                }, 0);

                const e_remainingProductsTotalPrice =
                  isNaN(remainingProductsTotalPrice) ||
                  remainingProductsTotalPrice == null ||
                  remainingProductsTotalPrice == ""
                    ? 0
                    : parseFloat(remainingProductsTotalPrice);

                setOrderData((prev) => ({
                  ...prev,
                  total_price:
                    parseFloat(firstProduct.total_price) +
                    parseFloat(e_remainingProductsTotalPrice),
                }));
              }}
            />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <ArgonInput
            type="name"
            name="price"
            value={remainingProducts[index]?.total_price}
            size="large"
          />
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {
              setRemainingProducts((current) => [
                ...current,
                {
                  row: nextRowId,
                  id: null,
                  name: null,
                  amount: null,
                  price: null,
                  total_price: null,
                },
              ]);
              setNextRowId((prevId) => prevId + 1);
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={() => {
              const updatedArray = remainingProducts.filter((item) => item.row !== row);
              setRemainingProducts(updatedArray);
              setOrderData((prev) => ({
                ...prev,
                total_price:
                  parseFloat(prev.total_price) - parseFloat(remainingProducts[index]?.total_price),
              }));
            }}
          >
            Remove
          </Button>
        </div>
      </ArgonBox>
    );
  });

  // EDIT INVOICE RENDER PRODUCT ROWS
  const [editData, setEditData] = useState({});
  const [editableProducts, setEditableProducts] = useState([]);

  const renderEditProductsRows = editableProducts.map(({ row }, key) => {
    const index = editableProducts.findIndex((item) => item.row === row);

    return (
      <ArgonBox key={key} mb={2} mx={5} display="flex">
        <div style={{ flex: 5, paddingRight: 10 }}>
          <Select
            name="product"
            placeholder="Products"
            defaultValue={productOptions.find(
              (option) => option.label === editableProducts[index]?.name
            )}
            options={productOptions}
            onChange={async (selectedOption) => {
              const previousTotalPrice = parseFloat(
                editableProducts[index]?.total_price == null
                  ? 0
                  : editableProducts[index]?.total_price
              );

              const orderTotalPrice = editData.total_price == "" ? 0 : editData.total_price;

              const updatedItems = [...editableProducts];
              updatedItems[index] = {
                ...updatedItems[index],
                id: selectedOption.id,
                name: selectedOption.value,
                amount: 1,
                price: selectedOption.price,
                total_price: selectedOption.price,
              };
              setEditableProducts(updatedItems);
              setEditData((prev) => ({
                ...prev,
                total_price:
                  parseFloat(selectedOption.price) +
                  (parseFloat(orderTotalPrice) - parseFloat(previousTotalPrice)),
              }));
            }}
          />
        </div>
        <div style={{ flex: 3, paddingRight: 10 }}>
          <div style={{ display: "flex" }}>
            <ArgonInput
              style={{ flex: 5 }}
              type="text"
              placeholder="Amount"
              size="large"
              value={editableProducts[index]?.amount}
              readOnly={editableProducts[index]?.id == null}
              onChange={async (e) => {
                const e_amount =
                  isNaN(e.target.value) || e.target.value == null || e.target.value == ""
                    ? 0
                    : parseFloat(e.target.value);

                const updatedItems = [...editableProducts];
                const index = updatedItems.findIndex((item) => item.row === row);
                updatedItems[index] = {
                  ...updatedItems[index],
                  amount: e.target.value,
                  total_price: parseFloat(e_amount) * parseFloat(updatedItems[index].price),
                };

                setEditableProducts(updatedItems);

                const editableProductsTotalPrice = editableProducts.reduce((total, item) => {
                  return item.row == row
                    ? total + e_amount * item.price
                    : total + parseFloat(item.amount) * item.price;
                }, 0);

                const e_editableProductsTotalPrice =
                  isNaN(editableProductsTotalPrice) ||
                  editableProductsTotalPrice == null ||
                  editableProductsTotalPrice == ""
                    ? 0
                    : parseFloat(editableProductsTotalPrice);

                setEditData((prev) => ({
                  ...prev,
                  total_price: parseFloat(e_editableProductsTotalPrice),
                }));
              }}
            />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <ArgonInput
            type="name"
            name="price"
            value={editableProducts[index]?.total_price}
            size="large"
          />
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={async () => {
              const lastObject = editableProducts[editableProducts.length - 1];
              const rowId = lastObject && lastObject.row;
              if (lastObject.id == null || "") {
                toast.error("Please Choose a Product!!", { autoClose: 80 });
                return;
              }

              setEditableProducts((current) => [
                ...current,
                {
                  row: rowId + 1,
                  id: null,
                  name: null,
                  amount: null,
                  price: null,
                  total_price: null,
                },
              ]);
            }}
          >
            Add
          </Button>
        </div>
        <div style={{ alignSelf: "center", flex: 1 }}>
          <Button
            onClick={() => {
              if (editableProducts.length == 1) {
                toast.error("An order must have at least one Product!!", { autoClose: 80 });
                return;
              }
              const updatedArray = editableProducts.filter((item) => item.row !== row);
              setEditableProducts(updatedArray);
              setEditData((prev) => ({
                ...prev,
                total_price:
                  parseFloat(prev.total_price) - parseFloat(editableProducts[index]?.total_price),
              }));
            }}
          >
            Remove
          </Button>
        </div>
      </ArgonBox>
    );
  });


  useEffect(() => {    
    if (navigator.onLine) {
      handleGetOrderList();
      handleGetProductList();
      handleGetBuyerList();
    }

    else{
      loadInvoiceDataFromDB().then((invoiceData) => {
        setCurrentOrderList(invoiceData)
        setLoading(false);        
      }).catch((error) => {
        console.error('Error loading Invoice data from IndexedDB:', error);
      });
    }

  }, []);

  // MAIN UI
  return (
    <DashboardLayout>
      {/* MODALS */}
      <>
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
        <Modal open={modalAddBuyerOpen} onClose={toggleModalAddBuyerOpen}>
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
            <Typography variant="h6">Add Buyer</Typography>
            <Divider />

            <ArgonInput
              style={{ flex: 5 }}
              type="text"
              name="name"
              placeholder="Name *"
              size="large"
              onChange={(e) => {
                setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
              }}
            />

            <ArgonInput
              style={{ flex: 5, marginTop: "20px" }}
              type="number"
              name="mobile_number"
              placeholder="Mobile Number *"
              size="large"
              onChange={(e) => {
                setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
              }}
            />

            <ArgonInput
              style={{ flex: 5, marginTop: "20px" }}
              type="text"
              name="address"
              placeholder="Address *"
              size="large"
              onChange={(e) => {
                setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
              }}
            />

            <ArgonButton
              style={{ marginRight: "15px", marginTop: "15px" }}
              onClick={handleAddBuyer}
              color="info"
              size="large"
            >
              Confirm
            </ArgonButton>
            <ArgonButton
              style={{ marginRight: "15px", marginTop: "15px" }}
              onClick={toggleModalAddBuyerOpen}
              color="info"
              size="large"
            >
              Cancel
            </ArgonButton>
          </div>
        </Modal>
      </>

     

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

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <ArgonBox py={3}>
            {showInvoiceTable && (
              <ArgonBox mb={35}>
                <Card>
                  <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <ArgonTypography variant="h6">Invoice List</ArgonTypography>

                    {/* {JSON.stringify(invoiceData, null, 2)} */}

                    {/* <TextField
                      id="outlined-basic"
                      placeholder="Search"
                      style={{ width: "65%" }}
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearch}
                      autoComplete={"off"}
                    /> */}

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
                        setProductInputRow([]);
                        setOrderTotalPrice(0.0);
                        setShowAddForm(true);
                        setshowInvoiceTable(false);
                      }}
                    >
                      <h4 style={{ paddingRight: 10 }}>Add Invoice </h4>
                      <ArgonBox
                        component="i"
                        color="info"
                        fontSize="14px"
                        className="ni ni-fat-add"
                      />
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
                    {!viewOrderActive && renderAddFirstProductRow}

                    {remainingProducts.length > 0 && renderAddRemaingProductsRows}

                    <ArgonBox mb={2} mx={5}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                          {loadingBuyers ? (
                            <Spinner width="30px" height="30px"></Spinner>
                          ) : (
                            <ArgonBox mb={2}>
                              <Select
                                name="buyer"
                                placeholder="Buyers"
                                options={buyerOptions}
                                onChange={(selectedOption) => {
                                  setOrderData({
                                    ...orderData,
                                    buyer: selectedOption.value,
                                    buyer_phone: selectedOption.mobile,
                                    buyer_location: selectedOption.address,
                                  });
                                }}
                              />
                            </ArgonBox>
                          )}
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <AddCircleOutlinedIcon
                            fontSize="large"
                            color="primary"
                            onClick={() => {
                              setModalAddBuyerOpen(true);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </ArgonBox>

                    <ArgonBox mb={2} mx={5}>
                      <ArgonInput
                        type="name"
                        name="buyer"
                        value={orderData.buyer}
                        placeholder="Buyer"
                        size="large"
                        onChange={handleChange}
                        readOnly
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
                        readOnly
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
                        readOnly
                      />
                    </ArgonBox>

                    <ArgonBox mb={2} mx={5}>
                      <ArgonInput
                        type="name"
                        name="total_price"
                        value={`Total Price : ${Math.round(orderData.total_price * 100) / 100}`}
                        placeholder={`Total Price : ${
                          Math.round(orderData.total_price * 100) / 100
                        }`}
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
                          viewOrderActive ? handlePrint() : handleSubmitForm();
                        }}
                        color="info"
                        size="large"
                        fullWidth
                      >
                        {viewOrderActive ? "Print Invoice" : "Add Invoice"}
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
                    {renderEditProductsRows}

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
                        value={`Total Price : ${editData.total_price}`}
                        placeholder={`Total Price : ${
                          Math.round(editData.total_price * 100) / 100
                        }`}
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
                  <div
                    style={{ justifyContent: "flex-start" }}
                    className="custom-actions-btns mb-2"
                  >
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
                                      <td style={{ borderRight: "0px" }}>&nbsp;</td>
                                      <td colSpan={2} style={{ borderLeft: "0px" }}>
                                        <h5 className="text-success">
                                          <strong>Price Paid</strong>
                                        </h5>
                                      </td>
                                      <td>
                                        <h5 className="text-success">
                                          <strong>D{orderData.price_paid}</strong>
                                        </h5>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td style={{ borderRight: "0px" }}>&nbsp;</td>
                                      <td style={{ borderLeft: "0px" }} colSpan={2}>
                                        <h5 className="text-success">
                                          <strong>Balance</strong>
                                        </h5>
                                      </td>
                                      <td>
                                        <h5 className="text-success">
                                          <strong>
                                            D{orderData.total_price - orderData.price_paid}
                                          </strong>
                                        </h5>
                                      </td>
                                    </tr>

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
        </>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Invoices;
