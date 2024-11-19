import { LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center text-[#68807A]">
        <div className="animate-spin"><LoaderCircle size={48} /></div>
      </div>
    </>
  );
};

export default LoadingPage;
