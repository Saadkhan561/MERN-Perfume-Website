import { addCategory, deleteCategory, udpateCategory } from "@/services/categoryService";
import { changeOrderStatus, sendEmail } from "@/services/orderService";
import {
  addProduct,
  editProduct,
  paymenyHook,
  placeOrder,
} from "@/services/productService";
import { addAddress, loginUser, resetPassword, signupUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = (options) => {
  return useMutation({
    mutationFn: loginUser,
    ...options,
  });
};

export const useSignupMutation = (options) => {
  return useMutation({
    mutationFn: signupUser,
    ...options,
  });
};

export const usePaymentHook = (options) => {
  return useMutation({
    mutationFn: paymenyHook,
    ...options,
  });
};

export const usePlaceOrder = (options) => {
  return useMutation({
    mutationFn: placeOrder,
    ...options,
  });
};

export const useAddProduct = (options) => {
  return useMutation({
    mutationFn: addProduct,
    ...options,
  });
};

export const useEditProduct = (options) => {
  return useMutation({
    mutationFn: editProduct,
    ...options
  })
}

export const useChangeOrderStatus = (options) => {
  return useMutation({
    mutationFn: changeOrderStatus,
    ...options,
  });
};

export const useResetPassword = (options) => {
  return useMutation({
    mutationFn: resetPassword,
    ...options,
  });
};

export const useAddAddress = (options) => {
  return useMutation({
    mutationFn: addAddress,
    ...options
  })
}

export const useAddCategory = (options) => {
  return useMutation({
    mutationFn: addCategory,
    ...options
  })
}

export const useDeleteCategory = ( options) =>{ 
  return useMutation({
    mutationFn: deleteCategory,
    ...options
  })
}

export const useUpdateCategory = (options) => {
  return useMutation({
    mutationFn: udpateCategory,
    ...options
  })
}

export const useSendEmail =(options) => {
  return useMutation({
    mutationFn: sendEmail,
    ...options
  })
}