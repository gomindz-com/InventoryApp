import React from "react";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { getSuppliers } from "apiservices/supplierService";
import { Navigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

function Suppliers() {
  const [screenloading, setScreenLoading] = useState(true);
  const [supplierList, setSupplierList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);

  const columns = [
    { name: "ProductName", align: "left" },
    { name: "Category", align: "left" },
    { name: "StockIn", align: "center" },
    { name: "StockOut", align: "center" },
    { name: "Damages", align: "center" },
    { name: "ExpiryDate", align: "center" },
  ];

  const dummyRows = [
    {
      ProductName: "Dummy Product 1",
      Category: "Category A",
      StockIn: 100,
      StockOut: 20,
      Damages: 5,
      ExpiryDate: "2023-12-31",
    },
    {
      ProductName: "Dummy Product 2",
      Category: "Category B",
      StockIn: 150,
      StockOut: 30,
      Damages: 8,
      ExpiryDate: "2023-11-15",
    },
    {
      ProductName: "Dummy Product 3",
      Category: "Category C",
      StockIn: 150,
      StockOut: 30,
      Damages: 8,
      ExpiryDate: "2023-11-15",
    },
    // Add more dummy data as needed
  ];
  const [rows, setRows] = useState(dummyRows);

  useEffect(() => {
    handleGetSupplierList();
  }, []);

  const handleGetSupplierList = async () => {
    setSupplierList([]);
    setScreenLoading(true);

    try {
      const res = await getSuppliers();
      if (res.data?.status === "true") {
        setSupplierList(res.data.result);
      }

      setScreenLoading(false);
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteSupplier = async (id) => {
    // Implement deletion logic
  };

  const handleEditSupplier = (item) => {
    setEditFormActive(true);
    // Implement logic to handle editing
  };

  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
    XLSX.writeFile(wb, "inventory_report.xlsx");
  };

  return (
    <DashboardLayout>
      {user == null && <Navigate to="/authentication/sign-in" replace={true} />}

      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Inventory Report</ArgonTypography>
              <Button onClick={exportToExcel}>Export to Excel</Button>
            </ArgonBox>
            <ArgonBox>
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Suppliers;
