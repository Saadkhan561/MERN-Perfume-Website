import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productFormSchema } from "@/validationSchema/productFormSchema";
import { Plus, Trash } from "lucide-react";

const ProductForm = () => {
  const [options, setOptions] = useState({});
  const [newOption, setNewOption] = useState({
    amount: "",
    price: 0,
    quantity: 0,
  });
  const [optionError, setOptionError] = useState(null);

  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState(null);

  console.log(images);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImgError("Please upload at least one image");
      return;
    } else if (!validateImages(images)) {
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("options", JSON.stringify(options));

    // Append the images to FormData
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData)
  };

  const handleAmount = (value) => {
    setNewOption((prev) => ({
      ...prev,
      amount: value,
    }));
  };
  const handlePrice = (value) => {
    setNewOption((prev) => ({
      ...prev,
      price: value,
    }));
  };
  const handleQuantity = (value) => {
    setNewOption((prev) => ({
      ...prev,
      quantity: value,
    }));
  };

  const handleNewOption = () => {
    if (
      newOption.name === "" ||
      newOption.price === 0 ||
      newOption.quantity === 0
    ) {
      setOptionError("Field must not be empty");
    } else {
      setOptionError(null);
      setOptions((prev) => ({
        ...prev,
        [newOption.amount]: {
          price: newOption.price,
          quantityAvailable: newOption.quantity,
        },
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Validate the selected images before setting them in state
    if (validateImages(selectedFiles)) {
      setImages(selectedFiles);
      setImgError(null);
    }
  };

  // Function to validate image files (type and size)
  const validateImages = (files) => {
    for (let file of files) {
      // Validate file type (JPEG, PNG)
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImgError("Only JPEG and PNG images are allowed");
        return false;
      }
      // Validate file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setImgError("Each image must be smaller than 2MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="bg-white p-4 font-sans">
      <form
        className="pt-5 grid grid-cols-2 w-full gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="name"
            >
              Enter name
            </label>
            <input
              className=" product_input"
              type="text"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="brand"
            >
              Enter brand name
            </label>
            <input
              className="product_input"
              type="text"
              id="brand_name"
              {...register("brand")}
            />
            {errors.brand && (
              <p className="text-red-500 text-xs">{errors.brand.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="category"
            >
              Enter category
            </label>
            <input
              className="product_input"
              type="text"
              id="category"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="category"
            >
              Enter options
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xs text-slate-500">
                  Amount
                </label>
                <input
                  type="number"
                  className="product_input"
                  onChange={(e) => handleAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-xs text-slate-500">
                  Price
                </label>
                <input
                  type="number"
                  className="product_input"
                  onChange={(e) => handlePrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-xs text-slate-500">
                  Quantity
                </label>
                <input
                  type="text"
                  className="product_input"
                  onChange={(e) => handleQuantity(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="p-1 mt-6 rounded-lg border border-slate-300 bg-slate-100 cursor-pointer"
                onClick={() => handleNewOption()}
              >
                <Plus className="h-5 w-5 text-blue-500" />
              </button>
            </div>
            {optionError && (
              <p className="text-red-500 text-xs">{optionError}</p>
            )}
          </div>
          {Object.entries(options).length !== 0 && (
            <table className="table-auto border-spacing-10 text-sm overflow-y-auto border border-slate-300 rounded-lg">
              <thead>
                <tr>
                  <td className="p-1 font-semibold">Amount</td>
                  <td className="p-1 font-semibold">Price</td>
                  <td className="p-1 font-semibold">Quantity</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(options).map(([key, value]) => (
                  <tr key={key}>
                    <td className="p-1">{key}</td>
                    <td className="p-1">{value.price}</td>
                    <td className="p-1">{value.quantityAvailable}</td>
                    <td>
                      <Trash className="h-3 w-3 text-red-700 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="description"
            >
              Enter description
            </label>
            <textarea
              className="h-20 w-full border border-slate-200 p-1 text-sm focus:outline-slate-300 rounded-lg"
              id="description"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold">
              Images:
            </label>
            <input type="file" multiple onChange={handleImageChange} />
            {imgError && (
              <p className="text-red-500 text-xs">{imgError}</p>
            )}
          </div>
        </div>
        <div className=" w-full text-end col-span-2 ">
          <button
            type="submit"
            className="p-1 w-24 text-sm rounded-lg cursor-pointer text-center bg-black text-white "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
