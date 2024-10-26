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
import { useRouter } from "next/router";
import ProductEditForm from "@/components/adminPanel/productEditForm";

const Products = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterVal, setFilterVal] = useState(null);

  // STATES FOR RESTOCK PRODUCT QUANTITY
  // const [restock, setRestock] = useState(false);
  // const [restockId, setRestockId] = useState(null);
  // const [restockOption, setRestockOption] = useState(null);
  // const [restockInputVal, setRestockInputVal] = useState(null);

  // const [pinId, setPinId] = useState(null);
  // const [deleteId, setDeleteId] = useState(null);

  // STATES FOR SETTING PRODUCTS DISCOUNT
  // const [discountVal, setDiscountVal] = useState(null);
  // const [discountId, setDiscountId] = useState(null);
  // const [discoutOption, setDiscountOption] = useState(null);

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

  // const handleRestock = (index, option, value) => {
  //   setRestockId(index);
  //   setRestockOption(option);
  //   setRestock(true);
  //   setRestockInputVal(value);
  // };

  // const handleDiscount = (index, option, value) => {
  //   setDiscountId(index);
  //   setDiscountOption(option);
  //   setDiscountVal(value);
  // };

  // MUTATION TO RESTOCK PRODUCT
  // const { mutate: restockQuantity, isPending: isRestockPending } = useRestock({
  //   onSuccess(data) {
  //     refetchProducts();
  //     setRestock(false);
  //     toast.success(data.message, {
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   },
  //   onError(error) {
  //     console.log(error);
  //     toast.error("Error occured" + error, {
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   },
  // });

  // MUTATION TO PIN PRODUCT
  // const { mutate: togglePinStatus, isPending: isPinStatusPending } =
  //   useTogglePinStatus({
  //     onSuccess(data) {
  //       toast.success(data.message, {
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //       refetchProducts();
  //     },
  //     onError(error) {
  //       console.log(error);
  //       toast.error("Error occured" + error, {
  //         autoClose: 1000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //     },
  //   });

  // MUTATION TO INACTIVATE PRODUCT
  // const { mutate: deleteProduct, isPending: isDeletePending } =
  //   useToggleProductStatus({
  //     onSuccess(data) {
  //       toast.success(data.message, {
  //         autoClose: 2000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //       refetchProducts();
  //     },
  //     onError(error) {
  //       console.log(error);
  //       toast.error("Error occured", {
  //         autoClose: 1000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //     },
  //   });

  // MUTATION TO SET DISCOUNT
  // const { mutate: setDiscount, isPending: isDiscountPending } = useSetDiscount({
  //   onSuccess(data) {
  //     toast.success(data.message, {
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //     refetchProducts();
  //     setDiscountId(null);
  //     setDiscountVal(null);
  //   },
  //   onError(error) {
  //     console.log(error);
  //     toast.error("Error occured", {
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   },
  // });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(searchVal);
      setSkip(0);
    }
  };

  const router = useRouter();

  const clearQueryParam = () => {
    const updatedQuery = { ...router.query };
    delete updatedQuery.id;
    delete updatedQuery.option;

    router.replace(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-full">
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
                          ([option, value]) => (
                            <div
                              key={option}
                              className="flex items-center gap-3"
                            >
                              <p>{value.quantityAvailable}</p>
                            </div>
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        {product.pinned ? (
                          <div className="flex items-center justify-between gap-1 w-20 p-1 rounded-lg bg-blue-700 text-white">
                            <p>Pinned</p>
                            <Pin size={12} />
                          </div>
                        ) : (
                          <p className="p-1 text-center rounded-lg w-20 border border-slate-300 bg-slate-100">
                            Not pinned
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="w-max">
                        <p
                          className={`p-1 rounded-lg ${
                            product.productStatus
                              ? "bg-blue-700 text-white"
                              : "bg-slate-100 border border-slate-500 text-black"
                          } text-sm w-20 text-center`}
                        >
                          {product.productStatus ? "Active" : "In Active"}
                        </p>
                      </TableCell>
                      <TableCell>
                        {Object.entries(product.options).map(
                          ([option, value]) => (
                            <p key={option}>
                              {value.discount !== 0
                                ? value.discount + " %"
                                : "-"}
                            </p>
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              clearQueryParam();
                            }
                          }}
                          className="w-4/5"
                        >
                          <DialogTrigger asChild>
                            <button
                              onClick={() =>
                                router.push(
                                  `?id=${product._id}`,
                                  undefined,
                                  {
                                    shallow: true,
                                  }
                                )
                              }
                              className="text-sm p-1 rounded-lg text-white text-center bg-blue-700 w-16"
                            >Edit</button>
                          </DialogTrigger>
                          <ProductEditForm refetchProducts={refetchProducts} />
                        </Dialog>
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
                  onClick={() => {
                    if (skip > 0) {
                      setSkip(skip - 2);
                    }
                  }}
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
                  onClick={() => {
                    if (products.currentPage < products.totalPages) {
                      setSkip(skip + 2);
                    }
                  }}
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
