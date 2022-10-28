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
import { getSuppliers, addSupplier } from "apiservices/supplierService";
import { AddSupplierSchema } from "formValidation/addForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { deleteSupplier } from "apiservices/supplierService";
import { editSupplier } from "apiservices/supplierService";

function Suppliers() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [supplierList, setSupplierList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);


  //START ADDING NEW SUPPLIER
  const [supplierData, setSupplierData] = useState({
    companyName: "",
    country: "",
    contactName: "",
    phone_number: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await AddSupplierSchema.isValid(supplierData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(supplierData);
    } else {
      console.log(supplierData);
      await addSupplier(supplierData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Supplier Added");
            toast.success("Supplier Added Successfully");
            handleGetSupplierList();
            console.log(res.data.result);
          } else {
            console.log("Supplier Could Not Be Added");
            console.log(res.data.result);
            toast.error("Supplier Could Not Be Added");
          }
        })
        .catch((err) => {
          console.log("Error Adding Supplier", err);
        });
    }h
  };


  const handleEdit = async (e) => {
    e.preventDefault();

    const isValid = await AddSupplierSchema.isValid(supplierData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(supplierData);
    } else {
      console.log(supplierData);
      await editSupplier(supplierData.id, supplierData)
        .then((res) => {
          if (res.data?.status === "true") {
            console.log("Supplier Updated");
            toast.success("Supplier Updated Successfully");
            handleGetSupplierList();
            console.log(res.data.result);
          } else {
            console.log("Supplier Could Not Be Updated");
            console.log(res.data.result);
            toast.error("Supplier Could Not Be Updated");
          }
        })
        .catch((err) => {
          console.log("Error Updating Supplier", err);
        });
    }
  };


  const handleChange = (e) => {
    setSupplierData({ ...supplierData, [e.target.name]: e.target.value });
  };

  //END ADDING NEW SUPPLIER

  const handleGetSupplierList = async () => {
    setSupplierList([]);
    setScreenLoading(true);

    try {
      await getSuppliers()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Suppliers List");
            console.log(res.data.result);
            setSupplierList(res.data.result);
          } else {
            setSupplierList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Suppliers", err));

      setScreenLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE SUPPLIER
  const handleDeleteSupplier = async (id) => {
    await deleteSupplier(id)
      .then((res) => {
        if (res.data?.status === "true") {
          console.log("Suppliers List");
          console.log(res.data.result);
          handleGetSupplierList()
        } else {
        }
      })
      .catch((err) => console.log("Error in Deleting Supplier", err));
  };

  const columns = [
    { name: "supplier", align: "left" },
    { name: "contact", align: "left" },
    { name: "manager", align: "center" },
    { name: "address", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  supplierList.map(function (item, i) {
    rows.push({
      supplier: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar src={logoSpotify} alt={"name"} size="sm" variant="rounded" />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.companyName}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {item.label}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      contact: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.phone_number}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      manager: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.contactName}
          color="success"
          size="xs"
          container
        />
      ),
      address: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {item.address}
        </ArgonTypography>
      ),
      edit: (
        <Button
          onClick={async () => {
            setEditFormActive(true)
            setShowAddForm(true);
            setSupplierData(item);
            
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteSupplier(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  useEffect(() => {
    handleGetSupplierList();
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Suppliers table</ArgonTypography>
                <Button onClick={() =>{
                   setSupplierData({
                    companyName: "",
                    country: "",
                    contactName: "",
                    phone_number: "",
                    address: "",
                   })
                   setShowAddForm(!showAddForm)
                   }}>
                  <h4 style={{ paddingRight: 10 }}>Add Supplier </h4>
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
                  <ArgonInput
                    type="title"
                    name="companyName"
                    value={supplierData.companyName}
                    placeholder="Company Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="country"
                    value={supplierData.country}
                    placeholder="Country"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="tags"
                    name="phone_number"
                    value={supplierData.phone_number}
                    placeholder="Phone Number"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="tags"
                    name="contactName"
                    value={supplierData.contactName}
                    placeholder="Contact Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="name"
                    name="address"
                    value={supplierData.address}
                    placeholder="Address"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonButton onClick={editFormActive ?  handleEdit : handleSubmit} color="info" size="large" fullWidth>
                    { editFormActive ?  "Edit Supplier" : 'Add Supplier' }
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

export default Suppliers;
