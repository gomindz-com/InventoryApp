import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button, Select, MenuItem, FormControl } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import * as XLSX from "xlsx";
import { getReport } from "apiservices/reportService";

function Report() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const [reportList, setReportList] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All");

  const columns = [
    { name: "Name", align: "left" },
    { name: "Category", align: "left" },
    { name: "Stock In", align: "center" },
    { name: "Stock Out", align: "center" },
    { name: "Stock In Hand", align: "center" },
    { name: "Added Date", align: "center" },
    { name: "Expiry Date", align: "center" },
  ];

  const handleGetReport = async () => {
    setReportList([]);
    try {
      const res = await getReport();
      if (res.data?.status) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const filteredRows =
          selectedMonth === "All"
            ? res.data.result
            : res.data.result.filter((item) => {
                const itemExpiryDate = item["Added Date"]?.substring(0, 7);
                const selectedYearMonth = `${currentYear}-${selectedMonth.padStart(2, "0")}`;
                return itemExpiryDate === selectedYearMonth;
              });
        setReportList(filteredRows);
        setRows(filteredRows);
      } else {
        setReportList([]);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
    XLSX.writeFile(wb, "inventory_report.xlsx");
  };

  useEffect(() => {
    handleGetReport();
  }, [selectedMonth]);

  return (
    <DashboardLayout>
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
                  <MenuItem value="All">All Months</MenuItem>
                  <MenuItem value="01">January</MenuItem>
                  <MenuItem value="02">February</MenuItem>
                  <MenuItem value="03">March</MenuItem>
                  <MenuItem value="04">April</MenuItem>
                  <MenuItem value="05">May</MenuItem>
                  <MenuItem value="06">June</MenuItem>
                  <MenuItem value="07">July</MenuItem>
                  <MenuItem value="08">August</MenuItem>
                  <MenuItem value="09">September</MenuItem>
                  <MenuItem value="10">October</MenuItem>
                  <MenuItem value="11">November</MenuItem>
                  <MenuItem value="12">December</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={exportToExcel}>Export to Excel</Button>
            </ArgonBox>
            <ArgonBox pl={1}>
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Report;
