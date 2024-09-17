import React from 'react'
import AdminLayout from "./layout";
import { useFetchAllProducts } from '@/hooks/query';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Products = () => {
  const { data: products, isLoading } = useFetchAllProducts()

  return (
    <AdminLayout>
      <div>Products</div>
      <div></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            {products?.products?.options.map((option, index))}
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (<div>Loading...</div>) : products?.products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.categoryDetails.name}</TableCell>
              {product.options.map((option, index) => (
                <TableCell key={index}>{option.quantityAvailabe}</TableCell>
              ))}
              <TableCell className="text-right">{product.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </AdminLayout>
  )
}

export default Products