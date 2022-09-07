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

import { useState } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Data
import suupliersTableData from "layouts/buyers/data/buyersTableData";
import projectsTableData from "layouts/buyers/data/projectsTableData";

import { Button } from "@mui/material";

function Buyers() {
  const { columns, rows } = suupliersTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [rememberMe, setRememberMe] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (

    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddProductForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Buyers table</ArgonTypography>
                <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
                  <h4 style={{ paddingRight: 10 }}>Add Buyer </h4>
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
                <Table columns={prCols} rows={prRows} />
              </ArgonBox>
            </Card>
          </ArgonBox>
        ) : (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Buyers table</ArgonTypography>
                <Button onClick={() => setShowAddProductForm(!showAddProductForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Buyer Table </h4>
                  <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-bold-right" />
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
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="title" placeholder="Customer Name" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Mobile Number" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="tags" placeholder="Email" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Address" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Tax ID" size="large" />
                </ArgonBox>
                
                <ArgonBox mb={2} mx={5}>
                  <ArgonButton onChange={handleSetRememberMe} color="info" size="large" fullWidth>
                    Submit Form
                  </ArgonButton>
                </ArgonBox>
              </ArgonBox>
            </Card>
          </ArgonBox>
        )}
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Buyers;
