import Calender from "./components/calender";

const TimingPage = () => {
  return (
    <div className="">
      <div className="mx-auto flex w-11/12 flex-col gap-2 rounded-lg bg-[#E7D7CA] bg-opacity-65 px-9 py-7">
        <h1 className="text-xl font-bold">تقویم زمانبندی تالار</h1>
        <p>
          در این صفحه میتوانید تاریخ های رزرو شده و خالی را مشاهده و ویرایش کنید
        </p>
      </div>
      <div className="mx-auto mt-4 w-11/12">
        <Calender />
      </div>
    </div>
  );
};

export default TimingPage;
