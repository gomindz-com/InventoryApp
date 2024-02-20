import * as Yup from "yup";


export const AddCategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Required"),
  });


export const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  stock: Yup.number().required("Required"),
  description_color: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  status: Yup.string().required("Required"),
  
});


export const AddDamagesSchema = Yup.object().shape({
  product: Yup.string().required("Name is required"),
  damages: Yup.number().required("Required"),
});


export const AddSupplierSchema = Yup.object().shape({
    companyName: Yup.string().required("Name is required"),
    country: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    contactName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
});
  

 export const AddBuyerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Required"),
    mobile_number: Yup.string().required("Required"),
    tax_id: Yup.string(),
    email: Yup.string().email("Email is required"),
});


export const AddOrderSchema = Yup.object().shape({
    products: Yup.array().required("Required"),
    buyer: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    ref: Yup.string().required("Required"),
    total_price: Yup.number().required("Required"),
    buyer_location: Yup.string().required("Required"),

});


export const UserSchema = Yup.object().shape({
    email: Yup.string().email("Email Must Be Valid").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});


export const RegisterUserSchema = Yup.object().shape({
  password: Yup.string().required("Password is Required"),
  first_name: Yup.string().required("First Name is Required"),
  last_name: Yup.string().required("Last Name is Required"),
  username: Yup.string().required("Username is Required"),
  contact: Yup.string().required("Contact is Required"),
  email: Yup.string().email("Email Format is required").required("Email is Required"),
});