import React from "react";

function GiftsList() {
  return (
    <div>
      <div className="mx-auto mt-12 flex h-16 w-11/12 items-center gap-4 overflow-x-auto rounded-br-[99px] rounded-tl-[99px] bg-[#87A09B] bg-opacity-50 pr-20 backdrop-blur-md sm:pr-7 md:pr-12">
        <p>مجموع کل هدایا :</p>
        <p>1,234,567 تومان</p>
      </div>

      <div className="mx-auto mt-9 grid w-11/12 grid-cols-4 items-center justify-center overflow-x-auto rounded-lg backdrop-blur-md">
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          ردیف
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          نام و نام خانوادگی
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          تاریخ واریز
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          هدیه
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          1
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          happy
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          9/4/1344
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          4,000,369
        </div>
      </div>
    </div>
  );
}

export default GiftsList;
