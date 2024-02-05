import Card from "@mui/material/Card";

import { useState, useEffect } from "react";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Button } from "@mui/material";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { AddCategorySchema } from "formValidation/addForm";
import { toast } from "react-toastify";
import { addCategory,deleteCategory,getCategories,editCategoriee } from "apiservices/categoryService";


function Categories() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [screenloading, setScreenLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [editFormActive, setEditFormActive] = useState(false);

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    userid: user.id,
  });

  const handleSubmit = async (e) => {
    const isValid = await AddCategorySchema.isValid(categoryData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await addCategory(categoryData)
        .then((res) => {
          if (res.status == 201) {
            toast.success(" Successfully Added ");
            handleGetCategoryList();
            setShowAddCategoryForm(false);
          } else {
            toast.error("Category Could Not Be Added");
          }
        })
        .catch((err) => {});
    }
  };

  const handleEdit = async (e) => {
    setCategoryData({ ...categoryData, userid: user.id });

    const isValid = await AddCategorySchema.isValid(categoryData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await editCategoriee(categoryData.id, categoryData)
        .then((res) => {
          if (res.status == 200) {
            toast.success("category Updated Successfully");
            handleGetCategoryList();
          } else {
            toast.error("category Could Not Be Updated");
          }
        })
        .catch((err) => {});
    }
  };

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id)
      .then((res) => {
        if (res.status == 204) {
          handleGetCategoryList();
        } else {
        }
      })
      .catch((err) => {});
  };

  const handleGetCategoryList = async () => {
    toast.success("Fetching Categories!!", { autoClose: 2000 });
    setCategoryList([]);
    setScreenLoading(true);

    try {
      await getCategories()
        .then((res) => {
          if (res.data.status === true) {
            setCategoryList(res.data.categories);
          } else {
            setCategoryList([]);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const columns = [
    { name: "category", align: "left" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  categoryList.map(function (item, i) {
    rows.push({
      category: (
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

      edit: (
        <Button
          onClick={async () => {
            setEditFormActive(true);

            setShowAddCategoryForm(true);
            setCategoryData(item);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteCategory(item.id);
          }}
        >
          <ArgonBox component="i" color="red" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  useEffect(() => {
    handleGetCategoryList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {!showAddCategoryForm ? (
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Categories List</ArgonTypography>
                <Button
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    setCategoryData({
                      name: "",
                      description: "",
                      userid: user.id,
                    });
                    setShowAddCategoryForm(!showAddCategoryForm);
                  }}
                >
                  <h4 style={{ paddingRight: 10 }}>Add Category </h4>
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
                <ArgonTypography variant="h6">Categories List</ArgonTypography>
                <Button onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}>
                  <h4 style={{ paddingRight: 10 }}>Show Category List </h4>
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
                    name="name"
                    placeholder="Category Name"
                    size="large"
                    onChange={handleChange}
                    value={categoryData.name}
                  />
                </ArgonBox>

                <ArgonBox mb={2} mx={5}>
                  <ArgonInput
                    type="tags"
                    name="description"
                    placeholder="Description"
                    size="large"
                    value={categoryData.description}
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
                    {editFormActive ? "Edit Category" : "Add Category"}
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

export default Categories;
