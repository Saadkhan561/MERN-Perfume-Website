import React, { useState } from "react";
import AdminLayout from "./layout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useFetchAllCategories } from "@/hooks/query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCagtegory from "@/components/adminPanel/addCategoryModal";
import { useDeleteCategory, useUpdateCategory } from "@/hooks/mutation";
import { ClipLoader } from "react-spinners";
import useUserStore from "@/store/user";
import { toast } from "react-toastify";

const Categories = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const [categoryInput, setCategoryInput] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useFetchAllCategories();

  const { mutate: deleteCategory, isPending: isDeleteCategoryPending } =
    useDeleteCategory({
      onSuccess(data) {
        toast.success(data.message);
        refetchCategories();
      },
      onError(err) {
        toast.error(err);
      },
    });

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } =
    useUpdateCategory({
      onSuccess(data) {
        console.log(data);
        toast.success(data.message);
        setIsEdit(!isEdit);
        refetchCategories();
      },
      onError(err) {
        toast.error(err);
      },
    });

  const handleEditCategory = (categoryId) => {
    console.log("Category", categoryInput)
    if (categoryInput === "") {
      setCategoryError("Field must not be empty!");
    } else {
      updateCategory({ role: role, id: categoryId, name: categoryInput });
      setCategoryError("");
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-full">
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p className="text-xl">Categories</p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 pl-2 pr-2 text-sm rounded-lg cursor-pointer text-center bg-black text-white ">
                  Add Category
                </button>
              </DialogTrigger>
              <AddCagtegory refetchCategories={refetchCategories} />
            </Dialog>
          </div>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {isCategoriesLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center p-4 text-lg">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((category) => (
                  <TableRow>
                    <TableCell>
                      {isEdit && categoryId === category._id ? (
                        <>
                          {" "}
                          <input
                            type="text"
                            placeholder="Enter category"
                            className="p-1 rounded-lg focus:outline-none border-2 border-slate-200 text-sm"
                            onChange={(e) => {
                              e.target.value === ""
                                ? setCategoryError("Fields must not be empty!")
                                : setCategoryError("");
                              setCategoryInput(e.target.value);
                            }}
                          />
                          {categoryError !== "" && (
                            <p className="text-xs text-red-500">
                              {categoryError}
                            </p>
                          )}
                        </>
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (isEdit) {
                              handleEditCategory(category._id);
                            } else {
                              setIsEdit(!isEdit);
                              setCategoryId(category._id);
                            }
                          }}
                          disabled={
                            isUpdateCategoryPending &&
                            isEdit &&
                            categoryId === category._id
                          }
                          className={`text-sm p-1 rounded-lg text-center w-16 ${
                            isEdit && categoryId === category._id
                              ? "bg-white text-black border-2 border-slate-200"
                              : "bg-blue-700 text-white"
                          }`}
                        >
                          {isEdit &&
                          categoryId === category._id &&
                          isUpdateCategoryPending ? (
                            <div className="flex justify-center">
                              <ClipLoader size={15} color="black" />
                            </div>
                          ) : isEdit && categoryId === category._id ? (
                            "Done"
                          ) : (
                            "Edit"
                          )}
                        </button>
                        {isEdit && categoryId === category._id && (
                          <button
                            onClick={() => setIsEdit(!isEdit)}
                            className="text-sm p-1 rounded-lg text-center w-16 bg-white text-black border-2 border-slate-200"
                          >
                            Cancel
                          </button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className={`text-sm p-1 rounded-lg text-center w-16 ${
                                isEdit && categoryId === category._id
                                  ? "hidden"
                                  : "bg-red-700 text-white"
                              } `}
                              onClick={() => {
                                setCategoryId(category._id);
                              }}
                            >
                              {isDeleteCategoryPending &&
                              categoryId === category._id ? (
                                <div className="flex justify-center">
                                  {" "}
                                  <ClipLoader size={15} color="white" />
                                </div>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col gap-2 font-sans pt-10">
                            <p className="text-center text-xl font-semibold">
                              Do you want to delete this category?
                            </p>
                            <button
                              onClick={() =>
                                deleteCategory({
                                  id: category._id,
                                  role: role,
                                })
                              }
                              type="button"
                              className={`bg-red-700 text-white p-1 rounded-lg ${
                                isDeleteCategoryPending &&
                                categoryId === category._id
                                  ? "opacity-50 duration-200"
                                  : ""
                              }`}
                            >
                              {isDeleteCategoryPending &&
                              categoryId === category._id ? (
                                <div className="flex justify-center">
                                  {" "}
                                  <ClipLoader size={15} color="white" />
                                </div>
                              ) : (
                                "Delete"
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsDelete(!isDelete)}
                              className="bg-black text-white p-1 rounded-lg"
                            >
                              Cancel
                            </button>
                          </DialogContent>
                        </Dialog>
                        {/* {isDelete && categoryId === category._id && (
                            <div className="absolute top-10 w-[250px] shadow-lg z-20 flex flex-col gap-2 p-4 rounded-lg bg-white border-2">
                              <p className="text-center font-semibold">
                                Do you want to delete this category?
                              </p>
                              <button
                                onClick={() =>
                                  deleteCategory({
                                    id: category._id,
                                    role: role,
                                  })
                                }
                                type="button"
                                className={`bg-red-700 text-white p-1 rounded-lg ${
                                  isDeleteCategoryPending &&
                                  categoryId === category._id
                                    ? "opacity-50 duration-200"
                                    : ""
                                }`}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() =>setIsDelete(!isDelete)}
                                className="bg-black text-white p-1 rounded-lg"
                              >
                                Cancel
                              </button>
                            </div>
                          )} */}
                        {/* </div> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
