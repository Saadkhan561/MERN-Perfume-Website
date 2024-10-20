import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});
