import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { getBuyers, getBuyersInvoices } from "apiservices/buyerService";
import { toast } from "react-toastify";
import ArgonBadge from "components/ArgonBadge";
import Spinner from "components/Spinner";
import TextField from "@mui/material/TextField";



function Customer() {
  const [buyerInvoicesList, setBuyerInvoicesList] = useState([]);

  const [loading, setLoading] = useState(true);

  const columns = [
    { name: "id", align: "left" },
    { name: "name", align: "left" },
    { name: "mobile_number", align: "center" },
    { name: "address", align: "center" },
    { name: "Invoice", align: "center" },
    { name: "Receipt", align: "center" },
  ];


  const invoiceRows = [];

  buyerInvoicesList.map(function (item, i) {
    invoiceRows.push({
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
    });
  });


  const [showTableCard, setShowTableCard] = useState(true); 
  const [showInvoiceCard, setShowInvoiceCard] = useState(false); 
  const [showReceiptCard, setShowReceiptCard] = useState(false);

  // Function to handle closing all cards and showing the table card
  const closeAllCards = () => {
    setShowTableCard(true);
    setShowInvoiceCard(false);
    setShowReceiptCard(false);
  };

  const [buyerList, setBuyerList] = useState([]);

  const handleGetBuyersList = async () => {
    toast.success("Fetching Buyers [Customers]!!", { autoClose: 2000 });
    setBuyerList([]);
    try {
      await getBuyers()
        .then((res) => {
          if (res.data.status === true) {
            setBuyerList(res.data.buyers);
            setCurrentBuyerList(res.data.buyers);
            setLoading(false);
          } else {
            setBuyerList([]);
            setLoading(false);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const handleGetBuyersInvoiceList = async (type, username) => {
    setLoading(true);
    try {
      await getBuyersInvoices(type, username)
        .then((res) => {
          if (res.data.status === true) {
            setBuyerInvoicesList(res.data.orders);
            setCurrentBuyerInvoiceList(res.data.orders)
            setLoading(false);
          } else {
            setBuyerInvoicesList([]);
            setLoading(false);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const invoiceColumns = [
    { name: "id", align: "left" },
    { name: "product", align: "left" },
    { name: "order price", align: "center" },
    { name: "price paid", align: "center" },
    { name: "balance", align: "center" },
    { name: "buyer", align: "center" },
    { name: "buyer phone", align: "center" },
    { name: "status", align: "left" },
    { name: "", align: "left" },
  ];


   // SEARCH FUNCTIONALITY
   const [searchQuery, setSearchQuery] = useState(null);
   const [currentBuyerList, setCurrentBuyerList] = useState([]);
   const [currentBuyerInvoiceList, setCurrentBuyerInvoiceList] = useState([]);
   const [currentBuyerReceiptList, setCurrentBuyerReceiptList] = useState([]);

   const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredBuyersList = buyerList.filter(
      (buyer) => buyer.name.toLowerCase().includes(query) || buyer.name.includes(query)
    );
    setCurrentBuyerList(filteredBuyersList);
  };


  const handleInvoiceSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredBuyersInvoiceList = buyerInvoicesList.filter(
      (order) => order.buyer.toLowerCase().includes(query) || order.receipt.includes(query)
    );
    setCurrentBuyerInvoiceList(filteredBuyersInvoiceList);
  };


  useEffect(() => {
    handleGetBuyersList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar/>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <ArgonBox py={3}>
            <ArgonBox mb={3}>
              {showTableCard && ( // Show the table card only if showTableCard is true
                <Card>
                  <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <ArgonTypography variant="h6">Customer Details</ArgonTypography>
                    <TextField
                      id="outlined-basic"
                      placeholder="Search"
                      style={{ width: "65%" }}
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearch}
                      autoComplete={"off"}
                    />
                  </ArgonBox>
                  <ArgonBox pl={1}>
                    <Table
                      columns={columns}
                      rows={currentBuyerList.map((row) => ({
                        ...row,
                        Invoice: (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setShowTableCard(false);
                              setShowInvoiceCard(true);
                              setShowReceiptCard(false);
                              handleGetBuyersInvoiceList("invoice", row.name);
                            }}
                          >
                            Invoice
                          </Button>
                        ),
                        Receipt: (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setShowTableCard(false);
                              setShowReceiptCard(true);
                              setShowInvoiceCard(false);

                              handleGetBuyersInvoiceList("receipt", row.name);
                            }}
                          >
                            Receipt
                          </Button>
                        ),
                      }))}
                    />
                  </ArgonBox>
                </Card>
              )}
            </ArgonBox>
          </ArgonBox>
          {/* Invoice card */}
          {showInvoiceCard && (
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Customer Invoice</ArgonTypography>
                <TextField
                      id="outlined-basic"
                      placeholder="Search"
                      style={{ width: "40%" }}
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleInvoiceSearch}
                      autoComplete={"off"}
                    />
                <Button onClick={closeAllCards}>
                  <h4 style={{ paddingRight: 10 }}>Customer List </h4>
                  
                  <ArgonBox
                    component="i"
                    color="info"
                    fontSize="14px"
                    className="ni ni-bold-right"
                  />
                </Button>
              </ArgonBox>

              <ArgonBox pl={1}>
                {currentBuyerInvoiceList.length == 0 ? (
                  <ArgonTypography style={{ padding: "10px" }} variant="h6">
                    Customer Has No Invoices
                  </ArgonTypography>
                ) : (
                  <Table columns={invoiceColumns} rows={invoiceRows} />
                )}
              </ArgonBox>
            </Card>
          )}
          {showReceiptCard && (
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Customer Receipt(s)</ArgonTypography>
                <TextField
                      id="outlined-basic"
                      placeholder="Search"
                      style={{ width: "40%" }}
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleInvoiceSearch}
                      autoComplete={"off"}
                    />
                <Button onClick={closeAllCards}>
                  <h4 style={{ paddingRight: 10 }}>Customer List </h4>
                  <ArgonBox
                    component="i"
                    color="info"
                    fontSize="14px"
                    className="ni ni-bold-right"
                  />
                </Button>
              </ArgonBox>

              <ArgonBox pl={1}>
                {buyerInvoicesList.length == 0 ? (
                  <ArgonTypography style={{ padding: "10px" }} variant="h6">
                    Customer Has No Receipts
                  </ArgonTypography>
                ) : (
                  <Table columns={invoiceColumns} rows={invoiceRows} />
                )}
              </ArgonBox>
            </Card>
          )}
        </>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Customer;
