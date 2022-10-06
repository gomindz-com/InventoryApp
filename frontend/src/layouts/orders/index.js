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

import { useState, useEffect } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Button } from "@mui/material";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { getSuppliers } from "apiservices/supplierService";

function Orders() {


  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  const handleGetOrderList = async () => {
    setOrderList([]);
    setScreenLoading(true);

    try {
      await getSuppliers()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Suppliers List");
            console.log(res.data.result);
            setOrderList(res.data.result);
          } else {
            setOrderList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Products", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { name: "order", align: "left" },
    { name: "stock", align: "left" },
    { name: "status", align: "center" },
    { name: "price", align: "center" },
    { name: "edit", align: "right" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  orderList.map(function (item, i) {
    rows.push({
      order: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar src={logoSpotify} alt={"name"} size="sm" variant="rounded" />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.name}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {item.label}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      stock: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.stock}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      status: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.status}
          color="success"
          size="xs"
          container
        />
      ),
      price: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {item.price}
        </ArgonTypography>
      ),
      edit: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
      delete: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Delete
        </ArgonTypography>
      ),
    });
  });

  useEffect(() => {
    handleGetOrderList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Order table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Add Orders </h4>
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
                <Table columns={columns} rows={rows} />
              </ArgonBox>
            </Card>
          </ArgonBox>
        ) : (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Suppliers table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Supplier Table </h4>
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
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="title" placeholder="Orders Title" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Label" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="tags" placeholder="Tags" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Price" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Category" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name" placeholder="Images" size="large" />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonButton onChange={handleSetRememberMe} color="info" size="large" fullWidth>
                    Add Order
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

export default Orders;
