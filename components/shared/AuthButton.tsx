"use client";

import Image from "next/image";
import React from "react";

type AuthButtonProps = {
  icon: string;
  text: string;
  handleClick?: () => void;
};

const AuthButton = ({ icon, text, handleClick }: AuthButtonProps) => {
  return (
    <button
      className="text-sm flex items-center gap-3 text-gray-700 border-gray-200 border-[1px] rounded-md px-4 py-2"
      onClick={handleClick}
    >
      <Image src={icon} alt="github" width={20} height={20} />
      {text}
    </button>
  );
};

export default AuthButton;
