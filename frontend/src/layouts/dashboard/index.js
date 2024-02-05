import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
import ProductSlider from "./components/Slider";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Data
import salesTableData from "layouts/dashboard/data/salesTableData";

import { getStoreStatistics } from "apiservices/storeStatisticsService";
import { getOrderCount } from "apiservices/orderService";
import { getProductsImages } from "apiservices/productService";

import Spinner from "components/Spinner";


function Default() {
  const userProfileInfo = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(true);

  const user = useState(JSON.parse(localStorage.getItem("user")));
  const { size } = typography;
  const [storeStatistics, setStoreStatistics] = useState({});
  const [orderCount, setOrderCount] = useState({});
  const [categoryStatList, setCategoryStatList] = useState([]);
  const categoriesListStatData = [];
  const [productImages, setProductImages] = useState({});

  categoryStatList.map(function (item, i) {
    categoriesListStatData.push({
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

  const gradientLineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Order Number",
        color: "info",
        data: orderCount.monthlyOrders,
        // data: [10, 20, 202, 23, 12, 12, 12, 12, 12, 12, 122, 76],
      },
    ],
  };

  const handleGetStoreStatistics = async () => {
    setStoreStatistics({});
    setCategoryStatList([]);

    try {
      const res = await getStoreStatistics();
      if (res.data?.status) {
        setStoreStatistics(res.data?.statistics);
        setCategoryStatList(res.data?.statistics.category_stat);
      } else {
        setStoreStatistics({});
      }
    } catch (error) {}
  };

  const handleGetOrderCount = async () => {
    setOrderCount({});
    try {
      await getOrderCount()
        .then((res) => {
          if (res.data?.status === "true") {
            setOrderCount(res.data.result);
          } else {
            setOrderCount({});
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const handleGetProductsImages = async () => {
    setOrderCount({});
    try {
      await getProductsImages()
        .then((res) => {
          if (res.status == 200) {
            setProductImages(res.data.images);
            setLoading(false)
          } else {
            setLoading(false)
            setProductImages({});
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };

  useEffect(() => {
    user != null && handleGetStoreStatistics();
    user != null && handleGetOrderCount();
    user != null && handleGetProductsImages();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <ArgonBox py={3}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={4} lg={2}>
              <DetailedStatisticsCard
                title="Revenue"
                count={
                  storeStatistics?.cash_inhand == undefined
                    ? "GMD" + 0
                    : "GMD" + storeStatistics?.cash_inhand.toLocaleString()
                }
                icon={{ color: "error", component: <i className="ni ni-credit-card" /> }}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <DetailedStatisticsCard
                title="receivable"
                count={
                  storeStatistics?.cash_pending == undefined
                    ? "GMD" + 0
                    : "GMD" + storeStatistics?.cash_pending.toLocaleString()
                }
                icon={{ color: "error", component: <i className="ni ni-money-coins" /> }}
              />
            </Grid>

            <Grid item xs={12} md={5} lg={2}>
              <DetailedStatisticsCard
                title="Stock-In"
                count={
                  storeStatistics?.stock_in == undefined
                    ? 0
                    : storeStatistics?.stock_in.toLocaleString()
                }
                icon={{ color: "warning", component: <i className="ni ni-bold-down" /> }}
              />
            </Grid>

            <Grid item xs={12} md={5} lg={2}>
              <DetailedStatisticsCard
                title="Stock-Out"
                count={
                  storeStatistics?.stock_out == undefined
                    ? 0
                    : storeStatistics?.stock_out.toLocaleString()
                }
                icon={{ color: "warning", component: <i className="ni ni-bold-up" /> }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <DetailedStatisticsCard
                title="Stock-In-Hand"
                count={
                  storeStatistics?.stock_inhand == undefined
                    ? 0
                    : storeStatistics?.stock_inhand.toLocaleString()
                }
                icon={{ color: "success", component: <i className="ni ni-archive-2" /> }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <DetailedStatisticsCard
                title="Damages"
                count={
                  storeStatistics?.number_of_damages == undefined
                    ? 0
                    : storeStatistics?.number_of_damages.toLocaleString()
                }
                icon={{ color: "error", component: <i className="ni ni-basket" /> }}
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
                      {orderCount?.percentageIncrement}% more{" "}
                      <ArgonTypography variant="button" color="text" fontWeight="regular">
                        in {new Date().getFullYear()}
                      </ArgonTypography>
                    </ArgonTypography>
                  </ArgonBox>
                }
                chart={gradientLineChartData}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ProductSlider products={productImages} />{" "}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SalesTable title="Sales by Regions" rows={salesTableData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CategoriesList title="categories of products" categories={categoriesListStatData} />
            </Grid>
          </Grid>
        </ArgonBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Default;
