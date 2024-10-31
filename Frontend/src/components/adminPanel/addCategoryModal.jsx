import React, { useState } from "react";
import { useAddCategory } from "@/hooks/mutation";
import { toast } from "react-toastify";
import { DialogContent } from "../ui/dialog";
import { ClipLoader } from "react-spinners";
import useUserStore from "@/store/user";

const AddCagtegory = ({refetchCategories}) => {
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const {currentUser} = useUserStore()
  const role = currentUser?.user.role
  const { mutate: addCategory, isPending: isAddCategoryPending } =
    useAddCategory({
      onSuccess(data) {
        console.log(data);
        toast.success(data.message);
        refetchCategories()
      },
      onError(err) {
        console.log(err);
        toast.error(err);
      },
    });

  const handleSubmit = () => {
    if (category === "") {
      setCategoryError("Category is required!");
    } else {
      setCategoryError("");
      addCategory({ name: category, role: role });
    }
  };
  return (
    <DialogContent className="w-max p-12 h-max flex flex-col gap-4 pt-10 font-sans">
      <p className="text-2xl font-semibold">Enter a new category</p>
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-sm">Enter category</label>
        <input
          type="text"
          className="p-2 focus:outline-none text-sm rounded-lg border border-slate-300"
          onChange={(e) => {
            e.target.value === ""
              ? setCategoryError("Category is required")
              : setCategoryError("");
            setCategory(e.target.value);
          }}
        />
        {categoryError !== "" && (
          <p className="text-xs text-red-500">{categoryError}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        disabled={isAddCategoryPending}
        className={`bg-black text-white p-1 rounded-lg ${
          isAddCategoryPending ? "opacity-50 duration-200" : ""
        }`}
      >
        {isAddCategoryPending ? (
          <div className="flex justify-center">
            {" "}
            <ClipLoader size={15} color="white" />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </DialogContent>
  );
};

export default AddCagtegory;
