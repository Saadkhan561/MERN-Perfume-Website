import { paymenyHook, placeOrder } from "@/services/productService";
import { loginUser, signupUser } from "@/services/userService";
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
    ...options
  })
}

export const usePlaceOrder = (options) => {
  return useMutation({
    mutationFn: placeOrder,
    ...options
  })
}
