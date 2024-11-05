import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/router";
import { Facebook } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const router = useRouter()
    
    useEffect(() => {
        AOS.init({})
    }, [])

  return (
    <div className="duration-200 flex justify-center mt-20 bg-slate-100 border-t border-t-slate-200">
      <div className="w-3/5 p-12 text-lg">
        <div className="flex justify-evenly mob_display:flex-col items-center font-semibold flex-wrap gap-4">
          <p className="cursor-pointer hover:underline duration-200">Home</p>
          <p className="cursor-pointer hover:underline duration-200">Services</p>
          <p className="cursor-pointer hover:underline duration-200">About</p>
          <p className="cursor-pointer hover:underline duration-200">Terms</p>
          <p className="cursor-pointer hover:underline duration-200">Privacy Policy</p>
        </div>
        <div className="flex justify-center gap-5 mt-6">
          <Image className="border border-white rounded-full p-1 bg-white cursor-pointer hover:scale-110 duration-200" src="/images/instagram.png" alt="" height={35} width={35} />
          <Image className="border border-white rounded-full p-1 bg-white cursor-pointer hover:scale-110 duration-200" src="/images/facebook.png" alt="" height={35} width={35} />
          {/* <Facebook size={15} color="black" /> */}
          <Image className="border border-white rounded-full p-1 bg-white cursor-pointer hover:scale-110 duration-200" src="/images/twitter.png" alt="" height={35} width={35} />
        </div>
        <div className="flex justify-center text-sm mt-4">
            company name &copy; 2018
        </div>
      </div>
    </div>
  );
};

export default Footer;
