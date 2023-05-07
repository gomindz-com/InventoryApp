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
import { getBuyers } from "apiservices/buyerService";
import { AddBuyerSchema } from "formValidation/addForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { addBuyer } from "apiservices/buyerService";
import { deleteBuyer } from "apiservices/buyerService";
import { editBuyer } from "apiservices/buyerService";

function Buyers() {


  const [rememberMe, setRememberMe] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [screenloading, setScreenLoading] = useState(true);
  const [buyerList, setBuyerList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);



  //START ADDING NEW BUYER
  const [buyerData, setBuyerData] = useState({
    name: "",
    address: "",
    mobile_number: "",
    email: "",
    tax_id: ""
  });
  
  const handleSubmit = async (e) => {
    //e.preventDefault();

    const isValid = await AddBuyerSchema.isValid(buyerData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      
    } else {
      await addBuyer(buyerData)
        .then((res) => {
          if (res.data?.status === "true") {
            toast.success("Successfully Added ");
            handleGetBuyerList();
            setShowAddForm(false)
          } else {
                        toast.error((res.data.result[Object.keys(res.data.result)[0]])[0]);
          }
        })
        .catch((err) => {
        });
    }
  };


  const handleEdit = async (e) => {
    //e.preventDefault();

    const isValid = await AddBuyerSchema.isValid(buyerData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await editBuyer(buyerData.id, buyerData)
        .then((res) => {
          if (res.data?.status === "true") {
            toast.success("Buyer Updated Successfully");
            handleGetBuyerList()
          } else {
            toast.error("Buyer Could Not Be Updated");
          }
        })
        .catch((err) => {
        });
    }
  };


  const handleChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };


  // GET BUYERS
  const handleGetBuyerList = async () => {
    setBuyerList([]);
    setScreenLoading(true);

    try {
      await getBuyers()
        .then((res) => {
          if (res.data?.status === "true") {
            
            setBuyerList(res.data.result);
          } else {
            setBuyerList([]);
          }
        })
        .catch((err) => {});

      setScreenLoading(false);
    } catch (error) {
      return(error);
    }
  };


   //DELETE SUPPLIER
   const handleDeleteBuyer= async (id) => {
    await deleteBuyer(id)
      .then((res) => {
        if (res.data?.status === "true") {
          handleGetBuyerList()
        } else {
        }
      })
      .catch((err) => {});
  };


  const columns = [
    { name: "buyer", align: "left" },
    { name: "address", align: "left" },
    { name: "contact", align: "center" },
    { name: "email", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  buyerList.map(function (item, i) {
    rows.push({
      buyer: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar src={logoSpotify} alt={"name"} size="sm" variant="rounded" />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.name}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {item.tax_id}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      address: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.address}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      contact: (
        <ArgonBadge
          variant="gradient"
          badgeContent={item.mobile_number}
          color="success"
          size="xs"
          container
        />
      ),
      email: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {item.email}
        </ArgonTypography>
      ),
      edit: (
        <Button
        onClick={async () => {
          setEditFormActive(true)
          setShowAddForm(true);
          setBuyerData(item)
          
        }}
      >
        <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
      </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteBuyer(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  useEffect(() => {
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
                <ArgonTypography variant="h6">Buyers table</ArgonTypography>
                <Button onClick={() =>  {
                    setBuyerData({
                      name: "",
                     address: "",
                     mobile_number: "",
                      email: "",
                      tax_id: ""


                    })
                    setShowAddForm(!showAddForm)}
                }>
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
                <Table columns={columns} rows={rows} />
              </ArgonBox>
            </Card>
          </ArgonBox>
        ) : (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Buyers table</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Buyers Table </h4>
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
                  <ArgonInput type="title" name="name" value={buyerData.name}   placeholder="Name" size="large" onChange={handleChange}/>
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="title" value={buyerData.address}  name="address" placeholder="Address" size="large" onChange={handleChange}/>
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="tags" name="mobile_number" value={buyerData.mobile_number} placeholder="Phone Number" size="large" onChange={handleChange}/>
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="email" name="email" placeholder="Email" value={buyerData.email} size="large" onChange={handleChange}/>
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput type="name"  name="tax_id" value={buyerData.tax_id} placeholder="Tax Id" size="large" onChange={handleChange} />
                </ArgonBox>
                
                <ArgonBox mb={2} mx={5}>
                <ArgonButton onClick={editFormActive? handleEdit: handleSubmit} color="info" size="large" fullWidth>
                    { editFormActive ?  "Edit Buyer" : 'Add Buyer' }
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
