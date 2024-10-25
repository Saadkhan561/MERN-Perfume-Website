import React from "react";
import { DialogContent } from "../ui/dialog";
import { useRouter } from "next/router";
import { useFetchProductById } from "@/hooks/query";

const ProductEditForm = () => {
  const router = useRouter();

  const [restockInputVal, setRestockInputVal] = useState(null);

  const { data: product, isLoading: isProductLoading } = useFetchProductById(
    router.query.id && router.query.id
  );

  console.log(product);
  return (
    <DialogContent className="bg-white w-1/4 h-4/5">
      <div className="mt-10 p-4">
        <p className="text-lg font-semibold">Edit product</p>
        <div>
          <input
            className="p-1 w-8 text-center focus:outline-slate-400 duration-200 border border-slate-300 rounded-md text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={restockInputVal}
            onChange={(e) => setRestockInputVal(e.target.value)}
          />
          <div className="text-xs text-white flex items-center gap-2">
            <button
              // onClick={() =>
              //   restockQuantity({
              //     id: product._id,
              //     option: option,
              //     quantity: restockInputVal,
              //   })
              // }
              className="rounded-sm p-1 text-center cursor-pointer duration-200 bg-blue-500"
              // disabled={isRestockPending}
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
      </div>
    </DialogContent>
  );
};

export default ProductEditForm;
