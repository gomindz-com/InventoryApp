import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { IMAGES, SIZES } from "../constants/Theme";

const Adverts = () => {
  return (
    <Swiper
      //   style={{ height: 200, marginBottom: 10 }}
      autoplay={true}
      loop={true}
    >
      <TouchableOpacity>
        <Image
          source={IMAGES.banner1}
          style={{ height: 45, width: SIZES.width - 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={IMAGES.banner1}
          style={{ height: 45, width: SIZES.width - 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={IMAGES.banner1}
          style={{ height: 45, width: SIZES.width - 40 }}
        />
      </TouchableOpacity>
    </Swiper>
  );
};

export default Adverts;

const styles = StyleSheet.create({});
