import React, { useEffect, useState } from "react";
import { DialogContent } from "../ui/dialog";
import { useRouter } from "next/router";
import { useFetchProductById } from "@/hooks/query";
import { useEditProduct } from "@/hooks/mutation";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import useUserStore from "@/store/user";

const ProductEditForm = ({ refetchProducts }) => {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;

  const { data: product, isLoading: isProductLoading } = useFetchProductById(
    router.query.id && router.query.id
  );

  const [option, setOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (product) {
      const firstOption = Object.keys(product.options)[0];
      setOption((prevOption) => prevOption ?? firstOption); // Set only if option is null
      setPriceInputVal(product.options[firstOption].price);
      setRestockInputVal(product.options[firstOption].quantityAvailable);
      setDiscountVal(product.options[firstOption].discount);
      setPinnedStatus(product.pinned);
      setProductStatus(product.productStatus);
    }
  }, [product]);

  const [priceInputVal, setPriceInputVal] = useState(undefined);
  const [restockInputVal, setRestockInputVal] = useState(undefined);
  const [discountVal, setDiscountVal] = useState(undefined);
  const [pinnedStatus, setPinnedStatus] = useState(undefined);
  const [productStatus, setProductStatus] = useState(undefined);

  useEffect(() => {
    if (product && product.options[option]) {
      setPriceInputVal(product.options[option].price);
      setRestockInputVal(product.options[option].quantityAvailable);
      setDiscountVal(product.options[option].discount);
      setPinnedStatus(product.pinned);
      setProductStatus(product.productStatus);
    }
  }, [product, option]);

  const { mutate: editProduct, isPending: isEditProductPending } =
    useEditProduct({
      onSuccess(data) {
        toast.success(data.message);
        refetchProducts();
      },
      onError(err) {
        toast.error(err.error);
      },
    });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editProduct({
        id: product?._id,
        option: option,
        price: priceInputVal,
        quantity: restockInputVal,
        discount: discountVal,
        status: pinnedStatus,
        productStatus: productStatus,
        role: role,
      });
    }
  };
  return (
    <DialogContent className="bg-white w-max h-max font-sans">
      <div className="mt-4  flex flex-col gap-8">
        <p className="text-2xl font-semibold">Edit product</p>
        <div className="grid grid-cols-2 gap-4">
          <label className="font-semibold">Amount</label>
          <div className="flex gap-2">
            {product &&
              Object.entries(product?.options).map(([key, value]) => (
                <div key={key} className="flex gap-1 items-center">
                  <input
                    value={key}
                    checked={option === key}
                    onChange={() => setOption(key)}
                    type="radio"
                    className="w-4 h-4 cursor-pointer"
                  />
                  <p className="text-xs font-semibold">{key} ml</p>
                </div>
              ))}
          </div>
          <label className="font-semibold">Price:</label>
          <div className="flex items-center gap-1">
            <input
              className="p-1 w-14 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={priceInputVal}
              onChange={(e) => setPriceInputVal(e.target.value)}
            />
            <p className="text-xs font-semibold">/Rs</p>
          </div>
          <label className="font-semibold">Quantity Available:</label>
          <div className="flex">
            <input
              className="p-1 w-14 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={restockInputVal}
              onChange={(e) => setRestockInputVal(e.target.value)}
            />
          </div>
          <label className="font-semibold">Discount:</label>
          <div className="flex items-center gap-1">
            <input
              className="p-1 w-14 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={discountVal}
              onChange={(e) => setDiscountVal(e.target.value)}
            />
            <p className="font-semibold text-xs">%</p>
          </div>
          <label className="font-semibold">Pinned Status:</label>
          <div className="flex gap-1 items-center text-sm">
            <p className="p-1 rounded-lg border bg-slate-100  w-max px-4">
              {pinnedStatus ? "True" : "False"}
            </p>
            <button
              onClick={() => setPinnedStatus(!pinnedStatus)}
              className="p-1 rounded-lg border bg-black text-white px-4"
            >
              Toggle
            </button>
          </div>
          <label className="font-semibold">Product Status:</label>
          <div className="flex gap-1 items-center text-sm">
            <p className="p-1 rounded-lg border bg-slate-100  w-max px-4">
              {productStatus ? "True" : "False"}
            </p>
            <button
              onClick={() => setProductStatus(!productStatus)}
              className="p-1 rounded-lg border bg-black text-white px-4"
            >
              Toggle
            </button>
          </div>
        </div>
        <div className="text-white flex flex-col gap-1">
          <button
            className="rounded-sm p-1 w-full text-center cursor-pointer duration-200 bg-black"
            disabled={isEditProductPending}
            type="button"
            onClick={() =>
              editProduct({
                id: product?._id,
                option: option,
                price: priceInputVal,
                quantity: restockInputVal,
                discount: discountVal,
                status: pinnedStatus,
                productStatus: productStatus,
                role: role,
              })
            }
            onKeyDown={handleKeyPress}
          >
            {isEditProductPending ? (
              <div className="flex justify-center">
                <ClipLoader size={15} color="white" />
              </div>
            ) : (
              "Done"
            )}
          </button>
          <button
            onClick={() => setRestock(false)}
            className="rounded-sm p-1 text-center w-full cursor-pointer bg-red-500 "
          >
            Cancel
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ProductEditForm;
