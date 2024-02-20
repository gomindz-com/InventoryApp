import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

function Customer() {
  const columns = [
    { name: "id", align: "left" },
    { name: "Name", align: "left" },
    { name: "BUYER_PHONE", align: "center" },
    { name: "Location", align: "center" },
    { name: "Stock In Hand", align: "center" },
    { name: "Invoice", align: "center" },
    { name: "Receipt", align: "center" },
  ];

  const InvoiceColumns = [
    { name: "id", align: "left" },
    { name: "Item", align: "left" },
    { name: "Unit price", align: "center" },
    { name: "Sub Total", align: "center" },
    { name: "Grant Total", align: "center" },
  ];

  const ReceiptColumns = [
    { name: "id", align: "left" },
    { name: "Item", align: "left" },
    { name: "Unit price", align: "center" },
    { name: "Sub Total", align: "center" },
    { name: "Grant Total", align: "center" },
  ];

  const dummyData = [
    {
      id: 1,
      Name: "John Doe",
      BUYER_PHONE: "123-456-7890",
      Location: "City A",
      "Stock In Hand": 50,
    },
    {
      id: 2,
      Name: "Jane Smith",
      BUYER_PHONE: "987-654-3210",
      Location: "City B",
      "Stock In Hand": 30,
    },
  ];

  const invoiceDummyData = [
    { id: 1, Item: "Product 1", "Unit price": 10, "Sub Total": 10, "Grant Total": 10 },
    { id: 2, Item: "Product 2", "Unit price": 20, "Sub Total": 40, "Grant Total": 40 },
    { id: 3, Item: "Product 3", "Unit price": 15, "Sub Total": 45, "Grant Total": 45 },
  ];

  const receiptDummyData = [
    { id: 1, Item: "Service 1", "Unit price": 50, "Sub Total": 50, "Grant Total": 50 },
    { id: 2, Item: "Service 2", "Unit price": 30, "Sub Total": 60, "Grant Total": 60 },
    { id: 3, Item: "Service 3", "Unit price": 25, "Sub Total": 75, "Grant Total": 75 },
  ];

  const [showTableCard, setShowTableCard] = useState(true); // State variable for table card visibility
  const [showInvoiceCard, setShowInvoiceCard] = useState(false); // State variable for invoice card visibility
  const [showReceiptCard, setShowReceiptCard] = useState(false); // State variable for receipt card visibility

  // Function to handle opening the invoice card
  const openInvoiceCard = () => {
    setShowTableCard(false);
    setShowInvoiceCard(true);
    setShowReceiptCard(false); // Close receipt card if open
  };

  // Function to handle opening the receipt card
  const openReceiptCard = () => {
    setShowTableCard(false);
    setShowReceiptCard(true);
    setShowInvoiceCard(false); // Close invoice card if open
  };

  // Function to handle closing all cards and showing the table card
  const closeAllCards = () => {
    setShowTableCard(true);
    setShowInvoiceCard(false);
    setShowReceiptCard(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          {showTableCard && ( // Show the table card only if showTableCard is true
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Customer Details</ArgonTypography>
              </ArgonBox>
              <ArgonBox pl={1}>
                <Table
                  columns={columns}
                  rows={dummyData.map((row) => ({
                    ...row,
                    Invoice: (
                      <Button variant="contained" onClick={openInvoiceCard}>
                        Invoice
                      </Button>
                    ),
                    Receipt: (
                      <Button variant="contained" onClick={openReceiptCard}>
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
            <Button onClick={closeAllCards}>
              <h4 style={{ paddingRight: 10 }}>Customer List </h4>
              <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-right" />
            </Button>
          </ArgonBox>

          <ArgonBox pl={1}>
            <Table columns={InvoiceColumns} rows={invoiceDummyData} />
          </ArgonBox>
        </Card>
      )}
      {showReceiptCard && (
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Customer Receipt</ArgonTypography>
            <Button onClick={closeAllCards}>
              <h4 style={{ paddingRight: 10 }}>Customer List </h4>
              <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-right" />
            </Button>
          </ArgonBox>

          <ArgonBox pl={1}>
            <Table columns={ReceiptColumns} rows={receiptDummyData} />
          </ArgonBox>
        </Card>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Customer;
