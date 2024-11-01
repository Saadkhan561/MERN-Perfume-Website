import React from "react";
import { DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailSchema } from "@/schema/sendEmailSchema";
import { useSendEmail } from "@/hooks/mutation";
import { toast } from "react-toastify";
import useUserStore from "@/store/user";
import { ClipLoader } from "react-spinners";

const SendEmail = ({ customerId }) => {
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;

  const { mutate: sendEmail, isPending: isSendEmailPending } = useSendEmail({
    onSuccess(data) {
      toast.success(data.message);
      reset()
    },
    onError(err) {
      toast.error(err);
    },
  });
  const initialValues = {
    subject: "",
    trackingId: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    initialValues: initialValues,
    resolver: yupResolver(sendEmailSchema),
  });

  const onSubmit = (data) => {
    sendEmail({
      customerId: customerId,
      subject: data.subject,
      trackingId: data.trackingId,
      role: role,
    });
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
          <label className="text-gray-500 text-sm">Enter tracking ID</label>
          <input
            type="number"
            placeholder="Enter tracking ID..."
            className="cart_input_field"
            {...register("trackingId")}
          />
          {errors.trackingId && (
            <p className="text-red-500 text-sm">{errors.trackingId.message}</p>
          )}
        </div>
        <button
          disabled={isSendEmailPending}
          type="submit"
          className="text-white p-1 rounded-lg bg-black"
        >
          {isSendEmailPending ? (
            <div className="flex justify-center w-full">
              {" "}
              <ClipLoader size={15} color="white" />
            </div>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </DialogContent>
  );
};

export default SendEmail;
