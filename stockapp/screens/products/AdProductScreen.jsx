import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native"; // Import toast function

import { addProduct } from "../apiService/productApi";

const AdProductScreen = () => {
  const navigation = useNavigation();
  const backScreen = () => {
    navigation.goBack();
  };

  const initialValues = {
    name: "",
    buy_rate: "",
    description: "",
  };

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await addProduct(values);
      navigation.navigate("ProductScreen");
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product Name is required"),
    buy_rate: Yup.number().required("Buy Rate is required"),
    description: Yup.string().required("Product Description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    formik;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Add Product</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={{ right: 15 }}>
              <AntDesign name="export" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={backScreen} style={{ right: 2 }}>
              <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.secondSection}>
        <View style={{ marginTop: 2 }}>
          <TextInput
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Write Your Product Name"
            style={styles.input}
          />
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}
        </View>
        <View style={{ marginTop: 2 }}>
          <TextInput
            value={values.buy_rate}
            onChangeText={handleChange("buy_rate")}
            onBlur={handleBlur("buy_rate")}
            placeholder="Write Your Buy Rate"
            style={styles.input}
          />
          {touched.buy_rate && errors.buy_rate && (
            <Text style={styles.error}>{errors.buy_rate}</Text>
          )}
        </View>
        <View style={{ marginTop: 2 }}>
          <TextInput
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            placeholder="Write Your Product Description"
            style={styles.input}
          />
          {touched.description && errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  flexContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  right: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  secondSection: {
    marginHorizontal: 15,
    marginTop: 15,
  },
});

export default AdProductScreen;
