import React, { useState } from "react";
import AdminLayout from "./layout";
import {
  useFetchAllCategories,
  useFetchNonFilteredProducts,
} from "@/hooks/query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Pencil, Pin } from "lucide-react";

import { Bounce, toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/components/adminPanel/productForm";
import { useRestock, useTogglePinStatus } from "@/hooks/mutation";

const Products = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [restock, setRestock] = useState(false);
  const [restockId, setRestockId] = useState(null);
  const [restockOption, setRestockOption] = useState(null);
  const [inputVal, setInputVal] = useState(null);

  const {
    data: products,
    isLoading,
    refetch: refetchProducts,
  } = useFetchNonFilteredProducts();

  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchAllCategories();

  const handleRestock = (index, option, value) => {
    setRestockId(index);
    setRestockOption(option);
    setRestock(true);
    setInputVal(value);
  };

  const { mutate: restockQuantity } = useRestock({
    onSuccess(data) {
      refetchProducts();
      setRestock(false);
      toast.success("Updated", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
    onError(error) {
      console.log(error);
      toast.error("Error occured", {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  const { mutate: togglePinStatus } = useTogglePinStatus({
    onSuccess(data) {
      console.log(data);
      toast.success("Updated", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      refetchProducts()
    },
    onError(error) {
      console.log(error);
      toast.error("Error occured", {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-full ">
        <div className="bg-white rounded-lg">
          <div className="flex items-center p-4 justify-between">
            <p className="text-xl">Products</p>
            <div className="flex items-center gap-4">
              <div>
                <div className="relative ">
                  <Filter
                    onClick={() => setFilterDropdown(!filterDropdown)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <ul
                    className={`p-1 z-20 absolute top-6 -left-8 w-[100px] bg-white shadow-2xl border border-slate-200 ${
                      filterDropdown ? "block" : "hidden"
                    }`}
                  >
                    <li className="p-1 text-sm hover:bg-slate-100 duration-200 cursor-pointer">
                      See all
                    </li>
                    {isCategoriesLoading ? (
                      <div>Loading...</div>
                    ) : (
                      categories?.map((category, index) => (
                        <li
                          className="p-1 text-sm hover:bg-slate-100 duration-200 cursor-pointer"
                          key={index}
                        >
                          {category.name}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-1 pl-2 pr-2 text-sm rounded-lg cursor-pointer text-center bg-black text-white ">
                    Add Product
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[1000px] h-max">
                  <DialogTitle className="text-2xl font-sans">
                    Add product form
                  </DialogTitle>
                  <ProductForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-max">Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Pinned Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  products?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category_details.name}</TableCell>
                      <TableCell>
                        {Object.entries(product.options).map(([option]) => (
                          <p key={option}>{option} ml</p>
                        ))}
                      </TableCell>
                      <TableCell>
                        {Object.entries(product.options).map(
                          ([option, value]) => (
                            <p key={option}>{value.price} Rs</p>
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        {Object.entries(product.options).map(
                          ([option, value]) => {
                            if (
                              restock &&
                              index === restockId &&
                              option === restockOption
                            ) {
                              return (
                                <div
                                  key={option}
                                  className="flex items-center gap-2 mb-1"
                                >
                                  <input
                                    className="p-1 w-8 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    value={inputVal}
                                    onChange={(e) =>
                                      setInputVal(e.target.value)
                                    }
                                  />
                                  <div className="text-xs text-white flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        restockQuantity({
                                          id: product._id,
                                          option: option,
                                          quantity: inputVal,
                                        })
                                      }
                                      className="rounded-sm p-1 text-center cursor-pointer bg-blue-500 "
                                    >
                                      Done
                                    </button>
                                    <button
                                      onClick={() => setRestock(false)}
                                      className="rounded-sm p-1 text-center cursor-pointer bg-red-500 "
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={option}
                                  className="flex items-center gap-3"
                                >
                                  <p>{value.quantityAvailable}</p>
                                  <Pencil
                                    onClick={() =>
                                      handleRestock(
                                        index,
                                        option,
                                        value.quantityAvailable
                                      )
                                    }
                                    className="h-3 w-3 cursor-pointer hover:bg-slate-100 duration-200"
                                  />
                                </div>
                              );
                            }
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {product.pinned ? (
                          <button
                            onClick={() =>
                              togglePinStatus({
                                id: product._id,
                                status: product.pinned,
                              })
                            }
                            className="p-1 flex items-center text-sm cursor-pointer gap-2 bg-blue-500 text-white w-max rounded-lg"
                          >
                            <p>Pinned</p>
                            <Pin className="h-3 w-3 cursor-pointer" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              togglePinStatus({
                                id: product._id,
                                status: product.pinned,
                              })
                            }
                            className="p-1 flex items-center text-sm cursor-pointer gap-2 bg-slate-100 w-max rounded-lg"
                          >
                            <p>Not pinned</p>
                            <Pin className="h-3 w-3 cursor-pointer" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
