import React from "react";
import { DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailSchema } from "@/schema/sendEmailSchema";

const SendEmail = () => {
    // const initialValues ={

    // }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // initialValues: initialValues,
    resolver: yupResolver(sendEmailSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <DialogContent className="pt-10 w-2/5 font-sans">
      <p className="text-2xl font-semibold">Send Email</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">Enter subject</label>
          <input
            type="text"
            placeholder="Enter a subject..."
            className="cart_input_field"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">Enter email body</label>
          <textarea
            type="text"
            placeholder="Enter a body..."
            className="cart_input_field h-[300px]"
            {...register("body")}
          />
          {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
        </div>
        <button type="submit" className="text-white p-1 rounded-lg bg-black">
          Send
        </button>
      </form>
    </DialogContent>
  );
};

export default SendEmail;
