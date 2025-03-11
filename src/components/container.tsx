import React from "react";

interface Props {
  className?: string;
  children:React.ReactNode;
}
export default function ({className,children}:Props){
  return <div className={'px-8 max-w-[88rem] mx-auto '+(className || '')}>
    {children}
  </div>
}