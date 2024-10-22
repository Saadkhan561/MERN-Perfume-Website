import * as yup from "yup";

export const signupSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s\-()]{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
