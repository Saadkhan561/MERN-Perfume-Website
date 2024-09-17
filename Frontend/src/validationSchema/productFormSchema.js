import * as yup from "yup";

export const productFormSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
  // images: yup.mixed()
  //   .test(
  //     "required",
  //     "You must upload at least one image",
  //     (value) => value && value.length > 0
  //   )
  //   .test("fileSize", "Each image must be less than 2MB", (value) => {
  //     return value && Array.from(value).every((file) => file.size <= 2000000); // 2MB limit
  //   })
  //   .test("fileType", "Only JPEG/PNG images are allowed", (value) => {
  //     return (
  //       value &&
  //       Array.from(value).every((file) =>
  //         ["image/jpeg", "image/png"].includes(file.type)
  //       )
  //     );
  //   }),
});
