import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
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
        style={{ alignSelf: "center" , left:10, marginHorizontal:10, }}
        size={35}
        color="#2e9a90"
      />,
      <MaterialIcons
        name="date-range"
        style={{ alignSelf: "center" , left:10, marginHorizontal:10,  }}
        size={35}
        color="#2e9a90"
      />,
      <MaterialCommunityIcons
        name="lock-reset"
        style={{ alignSelf: "center" , left:10 , marginHorizontal:10,  }}
        size={35}
        color="#2e9a90"
      />,
      <FontAwesome5
        style={{ alignSelf: "center" , left:10 , marginHorizontal:10,  }}
        name="file-export"
        size={35}
        color="#2e9a90"
      />,
      <MaterialIcons
        style={{ alignSelf: "center" , left:10 , marginHorizontal:10,  }}
        name="backup"
        size={35}
        color="#2e9a90"
      />,
      <Entypo
        style={{ alignSelf: "center" , left:10 , marginHorizontal:10,  }}
        name="share"
        size={35}
        color="#2e9a90"
      />,
      <MaterialIcons
        style={{ alignSelf: "center", left:10 , marginHorizontal:10, }}
        name="clear-all"
        size={35}
        color="#2e9a90"
      />,
    ];

    const nextIcon = [
      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
        color="#2e9a90"
      />,

      <AntDesign
        style={{ alignSelf: "center" }}
        name="right"
        size={35}
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
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <View style={styles.singleButton}>
            <View style={styles.flexContainer}>
              {icons[index]}
              <CustomText
                style={{
                  marginLeft: 10,
                  alignSelf: "center",
                  color: "#2e9a90",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {texts[index]}
              </CustomText>
            </View>
            <View style={styles.iconEnd
        
            
            }>{nextIcon[index]}
            
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={goBackScreen} style={styles.backtouch}>
          <AntDesign name="left" size={30} color="#fff" />
        </TouchableOpacity>

        <CustomText style={styles.settingText}>Settings</CustomText>
      </View>

      <ScrollView>
        <View style={styles.stylesButtonCopntainer}>
          {Array(touchableCount)
            .fill()
            .map((_, index) => (
              <TouchableItem key={index} index={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  backtouch: {
    marginTop: 50,
    left: 20,
    top:10,
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "#fff",
  },
  settingText: {
    // alignSelf: "center",
    // marginTop: 10,
    // color: "#fff",
    // fontSize: 40,
    // fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginHorizontal: 140,
    color: "#fff",
    fontSize: 30,
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
    justifyContent: "space-between",
  },
  iconEnd: {
    justifyContent: "center",
  },
  flexContainer: {
    flexDirection: "row",
  },
});
