import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center font-sans">
      <div className="flex flex-col items-center">
        <Image src="/images/error.png" alt="404" height={500} width={500} />
        <Link
          href="/"
          className="p-1 bg-slate-100 text-lg border-2 rounded-lg font-semibold"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
