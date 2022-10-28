import * as Yup from "yup";


export const AddCategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Required"),
  });


export const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sortno: Yup.number().required("Required"),
  images: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
  label: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  tags: Yup.string().required("Required"),
  label: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  //email: Yup.string().email("Email is required").required("Required"),
});


export const AddSupplierSchema = Yup.object().shape({
    companyName: Yup.string().required("Name is required"),
    country: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    contactName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    //email: Yup.string().email("Email is required").required("Required"),
});
  

 export const AddBuyerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Required"),
    mobile_number: Yup.string().required("Required"),
    tax_id: Yup.string().required("Required"),
    email: Yup.string().email("Email is required").required("Required"),
});


export const AddOrderSchema = Yup.object().shape({
    products: Yup.array().required("Required"),
    buyer: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    receipt: Yup.string().required("Required"),
    total_price: Yup.number().required("Required"),

});


export const UserSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Email is required").required("Required"),
});