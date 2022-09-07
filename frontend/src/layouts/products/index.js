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

// Data
import suupliersTableData from "layouts/products/data/buyersTableData";
import projectsTableData from "layouts/products/data/projectsTableData";

// @mui material components
import Switch from "@mui/material/Switch";


import Icon from "@mui/material/Icon";

import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";


function Products() {
  const { columns, rows } = suupliersTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
      <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Products table</ArgonTypography>
              <Icon fontSize="small" style={{ color: 'white',marginRight: "6px",  backgroundColor: 'blue' }}>
                    add
              </Icon>
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
      
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
