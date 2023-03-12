import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from "../../components/CustomText";
import CustomSearch from "../../components/CustomSearch";

import { useNavigation } from "@react-navigation/native";

import { colors } from "../../constants/assets";






const ProductScreen = () => {

  const addProduct = ()=>{
    console.log("can go to add product")
  }
  const moreinfo = ()=>{
    console.log("more info")
  }
  const seemore = ()=>{
    console.log("see more")
  }
  const back = ()=>{
    console.log("go back")
  }


  return (
    <View style={styles.container}>

    
    <View style={styles.top}>
    <View style={styles.topItems} >



<View style={{
  flexDirection:'row'
}}>
  <TouchableOpacity onPress={back}>

<Entypo name="chevron-small-left" size={30} color="white" />
  </TouchableOpacity>
<CustomText color="#fff" >Product</CustomText>

</View>


<View style={styles.buttons} >
<TouchableOpacity onPress={addProduct} >
 <Entypo style={{right: 10}}  name="circle-with-plus" size={24} color="white" />

 </TouchableOpacity>

 <TouchableOpacity onPress={moreinfo}>
 <AntDesign tyle={{right: 10}}  name="appstore-o" size={24} color="white" />

 </TouchableOpacity>

 <TouchableOpacity onPress={seemore}>
 <MaterialIcons tyle={{right: 10}} name="align-vertical-top" size={24} color="white" />

 </TouchableOpacity>
 </View>

   
      
      </View>

      <View style={{
        paddingTop:33,
      }}>

      <CustomSearch style={styles.CustomSearch} mt={20} mx={10}/>
      </View>
      

    </View>

    <View style={styles.CustomCard}>
      <TextInput placeholder="product"/>
    </View>

    <View style={styles.CustomCard}>
    <TextInput placeholder=""/>
    </View>
    <View style={styles.CustomCard}>
    <TextInput placeholder=""/>
    </View>
    <View style={styles.CustomCard}>
    <TextInput placeholder=""/>
    </View>



    </View>
      
    

  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container:{
    
  },
  top:{
  
    height: 160,
    backgroundColor: colors.primary
    

  },
  buttons:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topItems: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal:15,
  },

  CustomSearch:{
    padding:8,
    color:'white',
  },
  CustomCard:{
    borderColor:'black',
    borderWidth:1,
    marginTop:20,
    padding:15,
    marginHorizontal:10,
    borderRadius:10,
  }
});
