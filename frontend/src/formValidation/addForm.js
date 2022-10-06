import * as Yup from "yup";

export const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sortno: Yup.number().required("Required"),
  category_id: Yup.string().required("Required"),
  images: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
  label: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  tags: Yup.string().required("Required"),
  label: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  //email: Yup.string().email("Email is required").required("Required"),
});
