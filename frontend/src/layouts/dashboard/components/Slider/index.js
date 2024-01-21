import { useRef } from "react";

// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper";

// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react";

// SwiperJS styles
import "swiper/swiper-bundle.min.css";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Images
import bg1 from "assets/images/img-2.jpg";
import bg2 from "assets/images/img-1.jpg";
import bg3 from "assets/images/img-3.jpg";
import armanty from "assets/images/armanty.jpeg";
import coffie from "assets/images/coffie.jpeg";
import tomato from "assets/images/Tomato.jpeg";

function Slider() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

  // SwiperJS navigation buttons ref
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Card sx={{ position: "relative", display: "block", height: "100%", overflow: "hidden" }}>
      <Swiper
        onInit={({ params, navigation }) => {
          const { navigation: nav } = params;

          nav.prevEl = navigationPrevRef.current;
          nav.nextEl = navigationNextRef.current;
          navigation.init();
          navigation.update();
        }}
        autoplay={{ delay: 5000 }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        loop
        style={{ height: "100%" }}
      >
        <ArgonBox
          display="flex"
          alignItems="center"
          position="absolute"
          top={12}
          right={12}
          zIndex={5}
        >
          <ArgonBox
            width="3.25rem"
            height="3.25rem"
            color="white"
            p={2}
            sx={{ cursor: "pointer" }}
            ref={navigationPrevRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </ArgonBox>
          <ArgonBox
            width="3.25rem"
            height="3.25rem"
            color="white"
            p={2}
            sx={{ cursor: "pointer" }}
            ref={navigationNextRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </ArgonBox>
        </ArgonBox>
        <SwiperSlide>
          <ArgonBox
            sx={{
              position: "relative",
              backgroundImage: `url(${coffie})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <ArgonBox position="absolute" bottom={16} ml={6} py={2.5} textAlign="left" width="80%">
              <ArgonBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                bgColor="white"
                borderRadius="md"
                textAlign="center"
                mb={2}
              >
                <ArgonTypography variant="caption" color="dark" lineHeight={0}>
                  <ArgonBox component="i" color="dark" className="ni ni-camera-compact" />
                </ArgonTypography>
              </ArgonBox>
              <ArgonTypography variant="h5" color="white" mb={0.5}>
                Our products are available at all times
              </ArgonTypography>
              <ArgonTypography variant="body2" color="white">
                Coffee available at a very cheap price
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </SwiperSlide>
        <SwiperSlide>
          <ArgonBox
            sx={{
              position: "relative",
              backgroundImage: `url(${armanty})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <ArgonBox position="absolute" bottom={16} ml={6} py={2.5} textAlign="left" width="80%">
              <ArgonBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                bgColor="white"
                borderRadius="md"
                textAlign="center"
                mb={2}
              >
                <ArgonTypography variant="caption" lineHeight={0}>
                  <ArgonBox component="i" color="dark" className="ni ni-bulb-61" />
                </ArgonTypography>
              </ArgonBox>
              <ArgonTypography variant="h5" color="white" mb={0.5}>
                Our products are available at all times
              </ArgonTypography>
              <ArgonTypography variant="body2" color="white">
                Armanty available at a cheap price
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </SwiperSlide>
        <SwiperSlide>
          <ArgonBox
            sx={{
              position: "relative",
              backgroundImage: `url(${tomato})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <ArgonBox position="absolute" bottom={16} ml={6} py={2.5} textAlign="left" width="80%">
              <ArgonBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                bgColor="white"
                borderRadius="md"
                textAlign="center"
                mb={2}
              >
                <ArgonTypography variant="caption" color="dark" lineHeight={0}>
                  <ArgonBox component="i" color="dark" className="ni ni-trophy" />
                </ArgonTypography>
              </ArgonBox>
              <ArgonTypography variant="h5" color="white" mb={0.5}>
                Our products are available at all times
              </ArgonTypography>
              <ArgonTypography variant="body2" color="white">
                Tomato available at a cheap price
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </SwiperSlide>
      </Swiper>
    </Card>
  );
}

export default Slider;

// import React, { useRef, useState, useEffect } from "react";
// import SwiperCore, { Autoplay, Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import Card from "@mui/material/Card";
// import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";
// import { getProducts } from "apiservices/productService";

// SwiperCore.use([Autoplay, Navigation]);

// const ProductSlider = ({ products }) => {
//   const navigationPrevRef = useRef(null);
//   const navigationNextRef = useRef(null);
//   const [productList, setProductList] = useState([]);
//   console.log("let see  the ", productList);

//   useEffect(() => {
//     handleGetProductList();
//   }, []);

//   const handleGetProductList = async () => {
//     try {
//       const res = await getProducts();

//       if (res.data?.status) {
//         setProductList(res.data.products);
//       } else {
//         setProductList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Card sx={{ position: "relative", display: "block", height: "100%", overflow: "hidden" }}>
//       <Swiper
//         onInit={({ params, navigation }) => {
//           const { navigation: nav } = params;
//           nav.prevEl = navigationPrevRef.current;
//           nav.nextEl = navigationNextRef.current;
//           navigation.init();
//           navigation.update();
//         }}
//         autoplay={{ delay: 5000 }}
//         speed={800}
//         spaceBetween={0}
//         slidesPerView={1}
//         loop
//         style={{ height: "100%" }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id}>
//             <ArgonBox
//               sx={{
//                 position: "relative",
//                 backgroundImage: `url(${product.image})`,
//                 backgroundSize: "cover",
//                 height: "100%",
//               }}
//             >
//               <ArgonBox
//                 position="absolute"
//                 bottom={16}
//                 ml={6}
//                 py={2.5}
//                 textAlign="left"
//                 width="80%"
//               >
//                 <ArgonBox
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                   width="32px"
//                   height="32px"
//                   bgColor="white"
//                   borderRadius="md"
//                   textAlign="center"
//                   mb={2}
//                 >
//                   <ArgonTypography variant="caption" color="dark" lineHeight={0}>
//                     <ArgonBox component="i" color="dark" className="ni ni-camera-compact" />
//                   </ArgonTypography>
//                 </ArgonBox>
//                 <ArgonTypography variant="h5" color="white" mb={0.5}>
//                   {product.name}
//                 </ArgonTypography>
//                 <ArgonTypography variant="body2" color="white">
//                   {product.description_color}
//                 </ArgonTypography>
//               </ArgonBox>
//             </ArgonBox>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Card>
//   );
// };

// export default ProductSlider;
