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
import { ToastContainer, toast } from "react-toastify";
import { addBuyer } from "apiservices/buyerService";
import { deleteBuyer } from "apiservices/buyerService";
import { editBuyer } from "apiservices/buyerService";
import { getProducts } from "apiservices/productService";
import Select from "react-select";
import { AddDamagesSchema } from "formValidation/addForm";
import { addDamage } from "apiservices/damageService";
import { getDamages } from "apiservices/damageService";

function Damages() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [damagesList, setDamagesList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);

  const [damagesData, setDamagesData] = useState({
    product: "",
    category: "",
    damages: "",
  });

  const product_options = [];
  const [productOptions, setProductOptions] = useState(null);
  const [productList, setProductList] = useState([]);

  const handleSubmit = async (e) => {
    const isValid = await AddDamagesSchema.isValid(damagesData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      try {
        const response = await addDamage(damagesData);
        if (response.status == 201) {
          toast.success("Successfully Added");
          handleGetDamagesList();
          setShowAddForm(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Adding");
      }
    }
  };


  const handleGetDamagesList = async () => {
    setDamagesList([]);

    try {
      await getDamages()
        .then((res) => {
          if (res.status == 200) {
            setDamagesList(res.data.damages);
          } else {
            setDamagesList([]);
          }
        })
        .catch((err) => {});
    } catch (error) {
      return error;
    }
  };


  const handleChange = (e) => {
    setDamagesData({ ...damagesData, [e.target.name]: e.target.value });
  };

  const handleGetProductList = async () => {
    setProductList([]);
    try {
      const res = await getProducts();
      if (res.status == 200) {
        res.data?.products.map((item) => {
          product_options.push({
            value: item.name,
            label: item.name,
            price: item.price,
            id: item.id,
            category: item.category,
          });
        });

        setProductOptions(product_options);
      } else {
        setProductList([]);
      }
    } catch (error) {}
  };

  const columns = [
    { name: "product", align: "left" },
    { name: "category", align: "left" },
    { name: "damages", align: "center" },
    // { name: "edit", align: "center" }
    ];

  const rows = [];

  damagesList.map(function (item, i) {
    rows.push({
      product: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
          <ArgonBox mr={2}>
            <ArgonAvatar src={logoSpotify} alt={"name"} size="sm" variant="rounded" />
          </ArgonBox>
          <ArgonBox display="flex" flexDirection="column">
            <ArgonTypography variant="button" fontWeight="medium">
              {item.product}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="secondary">
              {}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      ),

      category: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.category}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary"></ArgonTypography>
        </ArgonBox>
      ),
      damages: (
        <ArgonTypography
          variant="gradient"
          fontWeight="medium"
          size="xs"
          color="red"
        > {item.damages}
        </ArgonTypography>
      ),

      // edit: (
      //   <Button
      //     onClick={async () => {
      //       setEditFormActive(true);
      //       setShowAddForm(true);
      //       setDamagesData(item);
      //     }}
      //   >
      //     <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
      //   </Button>
      // )
    });
  });

  useEffect(() => {
    handleGetDamagesList();
    handleGetProductList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Damages List</ArgonTypography>
                <Button
                  onClick={() => {
                    setDamagesData({
                      product: "",
                      category: "",
                      damages: "",
                    });
                    setShowAddForm(!showAddForm);
                  }}
                >
                  <h4 style={{ paddingRight: 10 }}>Add Damages </h4>
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
                <ArgonTypography variant="h6">Damages List</ArgonTypography>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Damages List </h4>
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
                  <Select
                    name="product"
                    placeholder="Products"
                    options={productOptions}
                    onChange={async (selectedOption) => {
                      setDamagesData({
                        ...damagesData,
                        product: selectedOption.value,
                        category: selectedOption.category,
                      });
                    }}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="category"
                    name="address"
                    value={damagesData.category}
                    placeholder="Category"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="number"
                    name="damages"
                    value={damagesData.damages}
                    placeholder="Damages"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonButton
                    onClick={editFormActive ? handleEdit : handleSubmit}
                    color="info"
                    size="large"
                    fullWidth
                  >
                    {editFormActive ? "Edit Damages" : "Add Damages"}
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

export default Damages;
