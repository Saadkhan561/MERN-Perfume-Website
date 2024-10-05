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
import { ChevronLeft, Filter, Pencil, Pin, Search, Trash } from "lucide-react";

import { Bounce, toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/components/adminPanel/productForm";
import {
  useRestock,
  useSetDiscount,
  useTogglePinStatus,
  useToggleProductStatus,
} from "@/hooks/mutation";
import { ClipLoader } from "react-spinners";
import useUserStore from "@/store/user";

const Products = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterVal, setFilterVal] = useState(null);
  const [restock, setRestock] = useState(false);
  const [restockId, setRestockId] = useState(null);
  const [restockOption, setRestockOption] = useState(null);
  const [inputVal, setInputVal] = useState(null);
  const [discountVal, setDiscountVal] = useState(null);
  const [pinId, setPinId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [discountId, setDiscountId] = useState(null);
  const [skip, setSkip] = useState(0);
  const [searchVal, setSearchVal] = useState("");

  const [query, setQuery] = useState("");

  const { currentUser } = useUserStore();
  const accessToken = currentUser?.token;
  const role = currentUser?.user.role;

  const {
    data: products,
    isLoading,
    refetch: refetchProducts,
  } = useFetchNonFilteredProducts({
    filter: filterVal,
    skip: skip,
    searchTerm: query,
  });

  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchAllCategories();

  const handleRestock = (index, option, value) => {
    setRestockId(index);
    setRestockOption(option);
    setRestock(true);
    setInputVal(value);
  };

  // MUTATION TO RESTOCK PRODUCT
  const { mutate: restockQuantity, isPending: isRestockPending } = useRestock({
    onSuccess(data) {
      refetchProducts();
      setRestock(false);
      toast.success(data.message, {
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
      toast.error("Error occured" + error, {
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

  // MUTATION TO PIN PRODUCT
  const { mutate: togglePinStatus, isPending: isPinStatusPending } =
    useTogglePinStatus({
      onSuccess(data) {
        toast.success(data.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        refetchProducts();
      },
      onError(error) {
        console.log(error);
        toast.error("Error occured" + error, {
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

  // MUTATION TO INACTIVATE PRODUCT
  const { mutate: deleteProduct, isPending: isDeletePending } =
    useToggleProductStatus({
      onSuccess(data) {
        toast.success(data.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        refetchProducts();
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

  // MUTATION TO SET DISCOUNT
  const { mutate: setDiscount, isPending: isDiscountPending } = useSetDiscount({
    onSuccess(data) {
      toast.success(data.message, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      refetchProducts();
      setDiscountId(null);
      setDiscountVal(null);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(searchVal);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-full ">
        <div className="bg-white rounded-lg">
          <div className="flex items-center p-4 justify-between">
            <p className="text-xl">Products</p>
            <div className="flex items-center gap-4">
              {/* SEARCH DIV */}
              <div>
                <div>
                  <form className="flex gap-2 items-center border border-slate-500 rounded-r-full p-1">
                    <Search
                      onClick={() => setQuery(searchVal)}
                      height={15}
                      width={15}
                    />
                    <input
                      className="focus:outline-none text-sm"
                      type="text"
                      value={searchVal}
                      placeholder="Search..."
                      onChange={(e) => setSearchVal(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </form>
                </div>
              </div>
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
                    <li
                      onClick={() => setFilterVal(null)}
                      className="p-1 text-sm hover:bg-slate-100 duration-200 cursor-pointer"
                    >
                      See all
                    </li>
                    {isCategoriesLoading ? (
                      <div>Loading...</div>
                    ) : (
                      categories?.map((category, index) => (
                        <li
                          onClick={() => setFilterVal(category.name)}
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
                  <TableHead>Active Status</TableHead>
                  <TableHead>Discount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center p-4">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : products?.products?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center p-4 text-lg">
                      No products to show....
                    </TableCell>
                  </TableRow>
                ) : (
                  products?.products?.map((product, index) => (
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
                                      className="rounded-sm p-1 text-center cursor-pointer duration-200 bg-blue-500"
                                      disabled={isRestockPending}
                                    >
                                      {isRestockPending ? (
                                        <ClipLoader size={15} color="white" />
                                      ) : (
                                        "Done"
                                      )}
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
                            onClick={() => {
                              togglePinStatus({
                                id: product._id,
                                status: product.pinned,
                              });
                              setPinId(product._id);
                            }}
                            className="p-1 text-sm cursor-pointer bg-blue-500 text-white w-max rounded-lg"
                            disabled={isPinStatusPending}
                          >
                            {isPinStatusPending && product._id === pinId ? (
                              <ClipLoader size={15} color="white" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <p>Pinned</p>
                                <Pin className="h-3 w-3 cursor-pointer" />
                              </div>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              togglePinStatus({
                                id: product._id,
                                status: product.pinned,
                              });
                              setPinId(product._id);
                            }}
                            className="p-1 text-sm cursor-pointer bg-slate-100 w-max rounded-lg"
                            disabled={isPinStatusPending}
                          >
                            {isPinStatusPending && product._id === pinId ? (
                              <ClipLoader size={15} color="black" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <p>Not pinned</p>
                                <Pin className="h-3 w-3 cursor-pointer" />
                              </div>
                            )}
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="w-max">
                        <div className="hover:bg-slate-100 rounded-full duration-200 p-1 w-max">
                          {isDeletePending && product._id === deleteId ? (
                            <ClipLoader size={15} color="black" />
                          ) : product.productStatus ? (
                            <Trash
                              disabled={isDeletePending}
                              onClick={() => {
                                deleteProduct({
                                  id: product._id,
                                  productStatus: product.productStatus,
                                  token: accessToken,
                                  role: role,
                                });
                                setDeleteId(product._id);
                              }}
                              className="h-4 w-4 cursor-pointer text-red-500"
                            />
                          ) : (
                            <p
                              onClick={() => {
                                deleteProduct({
                                  id: product._id,
                                  productStatus: product.productStatus,
                                  token: accessToken,
                                  role: role,
                                });
                                setDeleteId(product._id);
                              }}
                              className="p-1 rounded-lg text-center text-white bg-red-500 cursor-pointer"
                            >
                              In active
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product._id === discountId ? (
                          <div className="flex items-center gap-2">
                            <input
                              className="p-1 w-8 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm "
                              value={discountVal}
                              type="text"
                              onChange={(e) => setDiscountVal(e.target.value)}
                            />
                            <button
                              onClick={() =>
                                setDiscount({
                                  id: product._id,
                                  discount: discountVal,
                                  role: role,
                                })
                              }
                              className="rounded-sm text-xs text-white p-1 text-center cursor-pointer duration-200 bg-blue-500"
                            >
                              {isDiscountPending ? (
                                <ClipLoader size={15} color="white" />
                              ) : (
                                "Done"
                              )}
                            </button>
                            <button
                              onClick={() => setDiscountId(null)}
                              className="rounded-sm text-xs text-white p-1 text-center cursor-pointer duration-200 bg-red-500"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            {product.discount ? (
                              <p className="text-sm font-semibold text-gray-600">
                                {product.discount}%
                              </p>
                            ) : (
                              <p className="text-xl">-</p>
                            )}
                            <Pencil
                              onClick={() => setDiscountId(product._id)}
                              className="h-3 w-3 cursor-pointer hover:bg-slate-100 duration-200"
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex gap-2 mt-10 font-semibold">
              <div>Page No:</div>
              <div className="flex gap-2 items-center">
                <ChevronLeft
                  onClick={() => setSkip(skip - 2)}
                  className=" border border-slate-300 cursor-pointer hover:bg-slate-200 duration-200 h-5 w-5"
                />
                <p className="text-sm font-semibold">
                  {isLoading ? (
                    <ClipLoader size={15} />
                  ) : products?.products?.length === 0 ? (
                    "0"
                  ) : (
                    `${products?.currentPage} / ${products?.totalPages}`
                  )}
                </p>
                <ChevronLeft
                  onClick={() => setSkip(skip + 2)}
                  className=" border border-slate-300 cursor-pointer hover:bg-slate-200 duration-200 h-5 w-5 rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
