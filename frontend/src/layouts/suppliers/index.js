import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { getSuppliers } from "apiservices/supplierService";
import { Navigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { getRport } from "apiservices/reportService";

function Suppliers() {
  const [screenloading, setScreenLoading] = useState(true);
  const [supplierList, setSupplierList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All"); // Default to show all months

  const columns = [
    { name: "Name", align: "left" },
    { name: "Category", align: "left" },
    { name: "Stock In", align: "center" },
    { name: "Stock Out", align: "center" },
    { name: "Stock In Hand", align: "center" },
    { name: "expiry_date", align: "center" },
  ];

  useEffect(() => {
    handleGetReport();
  }, [selectedMonth]); // Fetch data whenever the selected month changes

  const handleGetReport = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReportList([]);
    try {
      const res = await getRport();
      if (res.data?.status) {
        const filteredRows =
          selectedMonth === "All"
            ? res.data.result
            : res.data.result.filter((item) => item.ExpiryDate.includes(selectedMonth));

        setReportList(filteredRows);
        setRows(filteredRows);
      } else {
        setReportList([]);
      }
    } catch (error) {}
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportList);
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
              <FormControl style={{ width: "50%" }}>
                <Select
                  labelId="select-month-label"
                  id="select-month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  <MenuItem value="All">Search Expiry Month</MenuItem>
                  <MenuItem value="01">January</MenuItem>
                  <MenuItem value="02">February</MenuItem>
                  {/* Add other months */}
                </Select>
              </FormControl>
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
