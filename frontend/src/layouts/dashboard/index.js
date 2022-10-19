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
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import { getOrderCount } from "apiservices/orderService";
import { getProductCount } from "apiservices/productService";
import { getSupplierCount } from "apiservices/supplierService";
import { getBuyerCount } from "apiservices/buyerService";
import { getCategories } from "apiservices/categoryService";


// pro
function Default() {
  const { size } = typography;
  const [orderCount, setOrderCount] = useState({});
  const [productCount, setProductCount] = useState({});
  const [supplierCount, setSupplierCount] = useState({});
  const [buyerCount, setBuyerCount] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const categoriesListData = [


    
    
  ];


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
    categoriesListData.push(
      
    {
      color: "dark",
      icon: <i className="ni ni-mobile-button" style={{ fontSize: "12px" }} />,
      name: item.name,
      description: (
        <>
          {item.stock} in stock,{" "}
          <ArgonTypography variant="caption" color="text" fontWeight="medium">
            346+ sold
          </ArgonTypography>
        </>
      ),
      route: "/",
    },
    
    );
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


  useEffect(() => {
    handleGetOrderCount();
    handleGetProductCount();
    handleGetSupplierCount();
    handleGetBuyerCount();    
    handleGetCategoryList();

  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Orders"
              count={orderCount?.total == undefined ? "D"+0 : "D"+orderCount?.total }
              amount={orderCount?.ordercount == undefined ? 0 + ' Orders' : orderCount?.ordercount + ' Order(s)'}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Product"
              count={productCount?.productcount == undefined ? 0 + ' Product' : productCount?.productcount + ' Product(s)'}
              amount={productCount?.productcount == undefined ? 0 + ' Product' : productCount?.productcount + ' Product(s)'}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Supplier"
              count={supplierCount?.suppliercount == undefined ? 0 + ' Supplier' : supplierCount?.suppliercount + ' Supplier(s)'}
              amount={supplierCount?.suppliercount == undefined ? 0 + ' Supplier' : supplierCount?.suppliercount + ' Supplier(s)'}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Buyer"
              count={buyerCount?.buyercount == undefined ? 0 + ' Buyer' : buyerCount?.buyercount + ' Buyer(s)'}
              amount={buyerCount?.buyercount == undefined ? 0 + ' Buyer' : buyerCount?.buyercount + ' Buyer(s)'}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>
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
                    4% more{" "}
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
