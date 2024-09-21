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
import { Filter, Pencil } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "@/components/adminPanel/productForm";

const Products = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [restock, setRestock] = useState(false)
  const { data: products, isLoading } = useFetchNonFilteredProducts();

  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchAllCategories();
  console.log(categories);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-max">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
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
                      {restock && Object.entries(product.options).map(
                        ([option, value]) => (
                          <div key={option} className="flex items-center gap-3">
                            <p>{value.quantityAvailable}</p>
                            <Pencil onClick={() => setRestock(!restock)} className="h-3 w-3 cursor-pointer hover:bg-slate-100 duration-200" />
                          </div>
                        )
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.totalAmount}
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

export default Products;
