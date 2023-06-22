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

import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { getStoreStatistics } from "apiservices/storeStatisticsService";
import { getOrderCount } from "apiservices/orderService";


// pro
function Default() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { size } = typography;
  const [storeStatistics, setStoreStatistics] = useState({});
  const [orderCount, setOrderCount] = useState({});
  const [categoryStatList, setCategoryStatList] = useState([]);
  const categoriesListStatData = [];


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
      },
    ],
  };

  useEffect(() => {
    user != null && handleGetStoreStatistics();
    user != null && handleGetOrderCount();
  }, []);

  return (
    <DashboardLayout>
      {user == null && <Navigate to="/authentication/sign-in" replace={true} />}
      <ToastContainer />
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4} lg={2}>
            <DetailedStatisticsCard
              title="Cash InHand"
              count={
                storeStatistics?.cash_inhand == undefined
                  ? "D" + 0
                  : "D" + storeStatistics?.cash_inhand
              }
              amount={""}
              icon={{ color: "error", component: <i className="ni ni-money-coins" /> }}
              // percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>


          <Grid item xs={12} md={4} lg={2}>
            <DetailedStatisticsCard
              title="Cash Pending"
              count={
                storeStatistics?.cash_inhand == undefined
                  ? "D" + 0
                  : "D" + storeStatistics?.cash_inhand
              }
              amount={""}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              // percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>


          {/* <Grid item xs={12} md={5} lg={2}>
            <DetailedStatisticsCard
              title="Cash Pending"
              count={
                storeStatistics?.cash_pending == undefined
                  ? "D" + 0
                  : "D" + storeStatistics?.cash_pending
              }
              amount={""}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              // percentage={{ color: "success", count: "+55%", text: "" }}
            />
          </Grid> */}
          
          <Grid item xs={12} md={5} lg={2}>
            <DetailedStatisticsCard
              title="Stock-In"
              count={storeStatistics?.stock_in}
              amount={""}
              icon={{ color: "warning",  component: <i className="ni ni-bold-down" /> }}
              // percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        
          <Grid item xs={12} md={5} lg={2}>
            <DetailedStatisticsCard
              title="Stock-Out"
              count={storeStatistics?.stock_out}
              amount={""}
              icon={{ color: "warning", component: <i className="ni ni-bold-up" /> }}
              // percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={2}>
            <DetailedStatisticsCard
              title="Stock-In-Hand"
              count={storeStatistics?.stock_inhand}
              amount={""}
              icon={{ color: "success", component: <i className="ni ni-archive-2" /> }}
              // percentage={{ color: "error", count: "", text: "" }}
            />
          </Grid>


          
          
          

          <Grid item xs={12} md={6} lg={2}>
            <DetailedStatisticsCard
              title="Damages"
              count={storeStatistics?.number_of_damages}
              amount={""}
              icon={{ color: "error", component: <i className="ni ni-basket" /> }}
              // percentage={{ color: "success", count: "+3%", text: "since last week" }}
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
            <Slider />
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

      <Footer />
    </DashboardLayout>
  );
}

export default Default;
