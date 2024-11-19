"use client";

import useMount from "@/hooks/use-mount";


const Details = ({ data }) => {
  const mount = useMount();


  if (!mount) {
    return null;
  }

  return (
    <div className="">
     
    </div>
  );
};

export default Details;
