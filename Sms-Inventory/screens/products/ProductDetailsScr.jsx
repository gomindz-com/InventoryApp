import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AppRegistry,
  } from "react-native";
  import React from "react";
  import { COLORS } from "../../constants/Theme";
  import CustomText from "../../components/CustomText";
  import { AntDesign, Ionicons } from "@expo/vector-icons";
  import CustomSearch from "../../components/CustomSearch";
  import CustomCard from "../../components/CustomCard";
  import CustomInput from "../../components/CustomInput";
  import { useNavigation } from "@react-navigation/native";
  import CustomButton from "../../components/CustomButton";
  
  
  const ProductDetailsScreen = ({ route }) => {
    // Extracting the item details from the route params
    const { item } = route.params;
    console.log(item)


 const myData = [
  {
	id: "1",
	name: "Earnest Green",
  },
  {
	id: "2",
	name: "Winston Orn",
  },
  {
	id: "3",
	name: "Carlton Collins",
  },
  {
	id: "4",
	name: "Malcolm Labadie",
  },
  {
	id: "5",
	name: "Michelle Dare",
  },
  {
	id: "6",
	name: "Carlton Zieme",
  },
  {
	id: "7",
	name: "Jessie Dickinson",
  },
  {
	id: "8",
	name: "Julian Gulgowski",
  },
  {
	id: "9",
	name: "Ellen Veum",
  },
  {
	id: "10",
	name: "Lorena Rice",
  },

  {
	id: "11",
	name: "Carlton Zieme",
  },
  {
	id: "12",
	name: "Jessie Dickinson",
  },
  {
	id: "13",
	name: "Julian Gulgowski",
  },
  {
	id: "14",
	name: "Ellen Veum",
  },
  {
	id: "15",
	name: "Lorena Rice",
  },
];
  
    return (
        <View style={styles.container}>

<View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
            <CustomText style={styles.ProductDetailText} color="#fff">ORANGE</CustomText>
          </TouchableOpacity>

          <View style={styles.right}>
            <TouchableOpacity style={{ left: 5 }}>
            <AntDesign name="closecircleo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      
      </View>






          {/* <CustomText style={styles.title}>Product Details pages</CustomText>
          <View style={styles.detailsContainer}>
            <CustomText style={styles.label}>ID:</CustomText>
            <CustomText>{item.id}</CustomText>
          </View>
          <View style={styles.detailsContainer}>
            <CustomText style={styles.label}>Title:</CustomText>


           {item.map((dummy)=>{
            return(
                <View>
                 <CustomText>{dummy.name}</CustomText>

                </View>
            )
           })}
          </View> */}

          <View style={styles.input} >
          <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Product ID:"} mx={10} mt={10} />
      </View>
    <View style={{ marginTop: 2 }}>
  
        <CustomInput placeholder={"Buy Rate:"} mx={10} mt={20} />
      </View>
    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Total In:"} mx={10} mt={20} />
      </View>
    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"In Hand"} mx={10} mt={20} />
      </View>
    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Stock Price:"} mx={10} mt={20} />
      </View>

      <View
          style={{
            flexDirection: "row",
            marginTop: 60,
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <CustomButton
            width={100}
            height={45}
            titleSize={15}
            title={"Delete"}
            br={10}
            bg={"#fff"}
            bc={"#2e9a90"}
            mx={10}
          />

          <CustomButton
            br={10}
            height={45}
            titleSize={15}
            width={100}
            title={"Edit"}
            bg={"#fff"}
            bc={"#2e9a90"}
            mx={10}
          />
          <CustomButton
            br={10}
            height={45}
            titleSize={15}
            width={120}
            title={"Transactions"}
            bg={"#fff"}
            bc={"#2e9a90"}
          />
        </View>
  

          </View>
          
         


         
        </View>
      );
    };




    const styles = StyleSheet.create({
      container: {},
      top: {
        height: 150,
        backgroundColor: COLORS.green,
      },
      right: {
        top:3,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      input:{
        top:20,
      },
      buttoncustom:{
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "transparent", // No fill color
      },

       buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black", // Text color
  },
      left: {
        top:3,
        flexDirection: "row",
      },
      flexContainer: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginTop: 50,
        justifyContent: "space-between",
      },
      ProductDetailText: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginHorizontal: 100,
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
      },
    });
    
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    //   title: {
    //     fontSize: 24,
    //     fontWeight: "bold",
    //     marginBottom: 20,
    //   },
    //   detailsContainer: {
    //     // flexDirection: "row",
    //     alignItems: "center",
    //     marginBottom: 10,
    //   },
    //   label: {
    //     fontWeight: "bold",
    //     marginRight: 10,
    //   },
    // });




    
  
  export default ProductDetailsScreen;
  
  
  