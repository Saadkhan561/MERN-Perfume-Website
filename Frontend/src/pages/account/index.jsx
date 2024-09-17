import Layout from "@/layout/layout";
import { Pencil } from "lucide-react";
import React from "react";

const Account = () => {
  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="w-4/5 p-10 flex flex-col gap-10 h-screen">
          <p className="text-5xl">My Account</p>
          <div className="flex">
            <div className="w-full font-semibold">
              <div className="text-xl">My Order History</div>
              <div className="border mt-4 text-sm border-slate-200 p-4 rounded-lg flex justify-between items-center">
                <div>Order Id: 1241352352341</div>
                <button className="text-center text-sm border border-slate-300 hover:bg-slate-100 duration-200 p-1 rounded-lg cursor-pointer font-normal">
                  View Details
                </button>
              </div>
              <div className="border mt-4 text-sm border-slate-200 p-4 rounded-lg flex justify-between items-center">
                <div>Order Id: 1241352352341</div>
                <button className="text-center text-sm border border-slate-300 hover:bg-slate-100 duration-200 p-1 rounded-lg cursor-pointer font-normal">
                  View Details
                </button>
              </div>
              <div className="border mt-4 text-sm border-slate-200 p-4 rounded-lg flex justify-between items-center">
                <div>Order Id: 1241352352341</div>
                <button className="text-center text-sm border border-slate-300 hover:bg-slate-100 duration-200 p-1 rounded-lg cursor-pointer font-normal">
                  View Details
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-end gap-2 ml-10">
              <div>
                <p className="text-3xl font-semibold mb-5">Account Details</p>
                <p className="text-lg font-semibold">Saad Nadeem Khan</p>
                <p>Karachi, Pakistan.</p>
                <div className="flex gap-2 items-center">
                    <p>Address: </p>
                  <p>H-353 Sabir Colony, Malir.</p>
                  <Pencil className="h-4 w-4 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
