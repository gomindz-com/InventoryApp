import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { COLORS } from "../../constants/Theme";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";

const SettingScreen = () => {
  const navigation = useNavigation();
  const goBackScreen = () => {
    navigation.goBack();
  };

  const touchableCount = 7; // Number of touchables

  const animatedValues = useRef(
    Array(touchableCount)
      .fill()
      .map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animateTouchable = (index) => {
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    };

    for (let i = 0; i < touchableCount; i++) {
      animateTouchable(i);
    }
  }, []);

  const TouchableItem = ({ index }) => {
    const handlePress = () => {
      // Handle touchable press
    };

    const icons = [
      <AntDesign
        name="appstore-o"
        style={{ alignSelf: "center" }}
        size={40}
        color="#2e9a90"
      />,
      <MaterialIcons
        name="date-range"
        style={{ alignSelf: "center" }}
        size={40}
        color="#2e9a90"
      />,
      <MaterialCommunityIcons
        name="lock-reset"
        style={{ alignSelf: "center" }}
        size={40}
        color="#2e9a90"
      />,
      <FontAwesome5
        style={{ alignSelf: "center" }}
        name="file-export"
        size={40}
        color="#2e9a90"
      />,
      <MaterialIcons
        style={{ alignSelf: "center" }}
        name="backup"
        size={40}
        color="#2e9a90"
      />,
      <Entypo
        style={{ alignSelf: "center" }}
        name="share"
        size={40}
        color="#2e9a90"
      />,
      <MaterialIcons
        style={{ alignSelf: "center" }}
        name="clear-all"
        size={40}
        color="#2e9a90"
      />,
    ];

    const texts = [
      "Set Low Stock",
      "Date Format",
      "Date Format",
      "Export Report",
      "Backup or Restore",
      "Tell a Friend",
      "Clear All",
    ];

    const fadeInAnim = animatedValues[index];

    return (
      <Animated.View style={{ opacity: fadeInAnim }}>
        <TouchableOpacity
          style={styles.singleButton}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          {icons[index]}
          <CustomText
            style={{
              marginLeft: 10,
              alignSelf: "center",
              color: "#2e9a90",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {texts[index]}
          </CustomText>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View>
      <View style={styles.top}>
        <TouchableOpacity onPress={goBackScreen} style={styles.backtouch}>
          <AntDesign name="left" size={40} color="#fff" />
        </TouchableOpacity>

        <CustomText style={styles.settingText}>Settings</CustomText>
      </View>

      <View style={styles.stylesButtonCopntainer}>
        {Array(touchableCount)
          .fill()
          .map((_, index) => (
            <TouchableItem key={index} index={index} />
          ))}
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  backtouch: {
    marginTop: 50,
    left: 20,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "#fff",
  },
  settingText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  stylesButtonCopntainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  singleButton: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    elevation: 5,
    backgroundColor: "#f5faf8",
    borderRadius: 10,
    marginBottom: 20,
  },
});
