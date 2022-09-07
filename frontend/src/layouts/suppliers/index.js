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

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import suupliersTableData from "layouts/suppliers/data/suppliersTableData";

function Suppliers() {
  const { columns, rows } = suupliersTableData;

  const handleForm = () => {
    console.log("supllier created");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Suppliers table</ArgonTypography>
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

      <Card>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <ArgonTypography variant="h6">Create Supplier</ArgonTypography>
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
        ></ArgonBox>
      </Card>

      <ArgonTypography variant="h6">Name</ArgonTypography>
      <ArgonInput></ArgonInput>

      <ArgonTypography variant="h6">Address</ArgonTypography>
      <ArgonInput></ArgonInput>

      <ArgonTypography variant="h6">Email</ArgonTypography>
      <ArgonInput></ArgonInput>

      <ArgonTypography variant="h6">UserName</ArgonTypography>
      <ArgonInput></ArgonInput>
      <ArgonTypography variant="h6">Password</ArgonTypography>
      <ArgonInput></ArgonInput>
      <ArgonTypography variant="h6">RetypePassword</ArgonTypography>
      <ArgonInput></ArgonInput>

      <ArgonBox p={4} mb={1}>
        <ArgonButton onClick={handleForm} p={5} color="info" size="large" fullWidth>
          Create Supplier
        </ArgonButton>
      </ArgonBox>

      {/* <ArgonBox p={3} mb={1} textAlign="center">
        <ArgonTypography
          onClick={handleSetRememberMe}
          color="info"
          variant="h5"
          fontWeight="medium"
        >
          Register with
        </ArgonTypography>
      </ArgonBox> */}
    </DashboardLayout>
  );
}

export default Suppliers;
