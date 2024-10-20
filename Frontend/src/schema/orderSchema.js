import * as yup from "yup";

export const deliverySchema = yup.object({
  email: yup.string().email().required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s\-()]{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
});

export const guestDeliverySchema = yup.object({
  email: yup.string().email().required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s\-()]{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
});
