/* eslint-disable no-unused-vars */
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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import salesTableData from "layouts/dashboard/data/salesTableData";
import { getOrderCount } from "apiservices/orderService";
import { getProductCount } from "apiservices/productService";
import { getSupplierCount } from "apiservices/supplierService";
import { getBuyerCount } from "apiservices/buyerService";
import { getCategories } from "apiservices/categoryService";
import { getProducts } from "apiservices/productService";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";
import { Button } from "@mui/material";
import Table from "examples/Tables/Table";

// pro
function Default() {
  const { size } = typography;
  const [orderCount, setOrderCount] = useState({});
  const [productCount, setProductCount] = useState({});
  const [supplierCount, setSupplierCount] = useState({});
  const [buyerCount, setBuyerCount] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const [productList, setProductList] = useState([]);
  const [productListA, setProductListA] = useState([]);

  const categoriesListData = [];

  const [showSearch, setShowSearch] = useState(false);

  //START GET CATEGORY
  const handleGetCategoryList = async () => {
    setCategoryList([]);

    try {
      await getCategories()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Category List");
            console.log(res.data.result);
            setCategoryList(res.data.result);
          } else {
            setCategoryList([]);
          }
        })
        .catch((err) => console.log("Error in Getting setCategoryList", err));
    } catch (error) {
      console.log(error);
    }
  };
  //END GET CATEGORY

  categoryList.map(function (item, i) {
    categoriesListData.push({
      color: "dark",
      icon: <i className="ni ni-mobile-button" style={{ fontSize: "12px" }} />,
      name: item.name,
      description: (
        <>
          {item.stock} in stock,{" "}
          <ArgonTypography variant="caption" color="text" fontWeight="medium">
            {item.amount}+ sold
          </ArgonTypography>
        </>
      ),
      route: "/",
    });
  });

  const handleGetOrderCount = async () => {
    setOrderCount({});

    try {
      await getOrderCount()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Order Count");
            console.log(res.data.result);
            setOrderCount(res.data.result);
          } else {
            setOrderCount({});
          }
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  };

  const gradientLineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Order Number",
        color: "info",
        data: orderCount.monthlyOrders,
      },
    ],
  };

  const handleGetProductCount = async () => {
    setProductCount({});

    try {
      await getProductCount()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Product Count");
            console.log(res.data.result);
            setProductCount(res.data.result);
          } else {
            setProductCount({});
          }
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSupplierCount = async () => {
    setSupplierCount({});

    try {
      await getSupplierCount()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Supplier Count");
            console.log(res.data.result);
            setSupplierCount(res.data.result);
          } else {
            setSupplierCount({});
          }
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetBuyerCount = async () => {
    setBuyerCount({});

    try {
      await getBuyerCount()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Buyer Count");
            console.log(res.data.result);
            setBuyerCount(res.data.result);
          } else {
            setBuyerCount({});
          }
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  };

  //START GET PRODUCTS
  const handleGetProductList = async () => {
    setProductList([]);

    try {
      await getProducts()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Product List");
            console.log(res.data.result);
            setProductList(res.data.result);
          } else {
            setProductList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Products", err));
    } catch (error) {
      console.log(error);
    }
  };
  //END GET PRODUCTS

  useEffect(() => {
    handleGetOrderCount();
    handleGetProductCount();
    handleGetSupplierCount();
    handleGetBuyerCount();
    handleGetCategoryList();
    handleGetProductList();
  }, []);

  function handleClick(e) {
    setShowSearch(true);

    const filtered2 = productList.filter((employee) => {
      console.log("The Name");
      console.log(employee.name);
      console.log("The Target Value");
      console.log(e.target.value.toString());

      if (employee.name.toLowerCase() === e.target.value.toLowerCase()) {
        console.log("We have one equal");
        setProductListA([employee]);
      }

      if (e.target.value == "") {
        setShowSearch(false);
      }
    });
  }

  const columns = [
    { name: "product", align: "left" },
    { name: "category", align: "left" },
    { name: "stock", align: "left" },
    { name: "status", align: "center" },
    { name: "price", align: "center" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center" },
  ];

  const rows = [];

  productListA.map(function (item, i) {
    rows.push({
      product: (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
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
      category: (
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="caption" fontWeight="medium" color="text">
            {item.category.name}
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
        <Button
          onClick={async () => {
            setEditFormActive(true);
            setShowAddProductForm(true);
            setProductData(item);

            console.log(item);

            setProductData({
              ...item,
              ["category_id"]: item.category.id,
              ["category"]: item.category.id,
            });
          }}
        >
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ruler-pencil" />
        </Button>
      ),
      delete: (
        <Button
          onClick={async () => {
            handleDeleteProduct(item.id);
          }}
        >
          <ArgonBox component="i" color="info" fontSize="34px" className="ni ni-fat-remove" />
        </Button>
      ),
    });
  });

  return (
    <DashboardLayout>
      <DashboardNavbar handleClick={handleClick} data={showSearch} />

      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Orders"
              count={orderCount?.total == undefined ? "D" + 0 : "D" + orderCount?.total}
              amount={
                orderCount?.ordercount == undefined
                  ? 0 + " Orders"
                  : orderCount?.ordercount + " Order(s)"
              }
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Product"
              count={
                productCount?.productcount == undefined
                  ? 0 + " Product"
                  : productCount?.productcount + " Product(s)"
              }
              amount={
                productCount?.productcount == undefined
                  ? 0 + " Product"
                  : productCount?.productcount + " Product(s)"
              }
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Supplier"
              count={
                supplierCount?.suppliercount == undefined
                  ? 0 + " Supplier"
                  : supplierCount?.suppliercount + " Supplier(s)"
              }
              amount={
                supplierCount?.suppliercount == undefined
                  ? 0 + " Supplier"
                  : supplierCount?.suppliercount + " Supplier(s)"
              }
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Buyer"
              count={
                buyerCount?.buyercount == undefined
                  ? 0 + " Buyer"
                  : buyerCount?.buyercount + " Buyer(s)"
              }
              amount={
                buyerCount?.buyercount == undefined
                  ? 0 + " Buyer"
                  : buyerCount?.buyercount + " Buyer(s)"
              }
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>

        {showSearch && (
          <ArgonBox
            style={{ marginTop: 100, marginBottom: 100 }}
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
        )}

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Our Sales Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    {orderCount?.percentageIncrement}% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Sales by Regions" rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title="categories of products" categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Default;
