import AddressForm from "@/components/forms/addressForm";
import OrderDetail from "@/components/modals/orderDetailsModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetUserOrders } from "@/hooks/query";
import Layout from "@/layout/layout";
import useUserStore from "@/store/user";
import { Pencil } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Account = () => {
  const [limit, setLimit] = useState(5);
  const [addressForm, setAddressForm] = useState(false);
  const { currentUser } = useUserStore();

  // console.log(currentUser)

  const { data: orders, isLoading: isOrdersLoading } = useGetUserOrders(
    currentUser?.user?._id && {
      userId: currentUser?.user?._id,
      limit: limit,
    }
  );

  const router = useRouter();

  const clearQueryParam = () => {
    const updatedQuery = { ...router.query };
    delete updatedQuery.orderId; // Remove the 'orderId' query param

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
    <Layout>
      <div className="flex justify-center w-full">
        <div className="w-4/5 p-10 flex flex-col gap-10 h-screen">
          <p className="text-5xl">My Account</p>
          <div className="flex">
            <div className="w-full  font-semibold ">
              <div className="text-xl">My Order History</div>
              <div className="overflow-y-auto max-h-[430px] p-4">
                {isOrdersLoading ? (
                  <div>Loading...</div>
                ) : (
                  orders?.orders?.map((order) => (
                    <div
                      key={order._id}
                      className="border shadow-sm mt-4 text-sm border-slate-200 p-4 rounded-lg flex justify-between items-center"
                    >
                      <p>
                        Order Id :{" "}
                        <span className="font-normal">{order._id}</span>
                      </p>
                      <Dialog
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            clearQueryParam(); // Clear query param when dialog is closed
                          }
                        }}
                      >
                        <DialogTrigger>
                          <button
                            onClick={() =>
                              router.push(`?orderId=${order._id}`, undefined, {
                                shallow: true,
                              })
                            }
                            className="text-center bg-black text-white font-normal px-2 rounded-lg p-1"
                          >
                            View Details
                          </button>
                        </DialogTrigger>
                        <OrderDetail clearQueryParam={clearQueryParam} />
                      </Dialog>
                    </div>
                  ))
                )}
              </div>
              <div className="w-full text-center">
                <button
                  onClick={() => setLimit(limit + 5)}
                  className="w-max text-center rounded-lg p-1 border-2"
                >
                  Load more...
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-end gap-2 ml-10">
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-semibold mb-5">Account Details</p>
                <p className="text-lg font-semibold">
                  {currentUser?.user.first_name} {currentUser?.user.last_name}
                </p>
                {addressForm ? (
                  <AddressForm
                    setAddressForm={setAddressForm}
                    addressForm={addressForm}
                  />
                ) : currentUser?.user.address ? (
                  <div>
                    <p>{currentUser.user.city}</p>
                    <div className="flex gap-2 items-center">
                      <p>Address: </p>
                      <p>{currentUser.user.address}</p>
                      <Pencil
                        onClick={() => setAddressForm(!addressForm)}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddressForm(!addressForm)}
                    className="p-1 rounded-lg border-2 border-black text-center font-semibold"
                  >
                    Add address
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
