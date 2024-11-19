import { CircleCheckBig } from "lucide-react";

const ToastSuccess = ({ text }) => {
  return (
    <div className="flex w-full items-center gap-2">
      <CircleCheckBig size={20} strokeWidth={2} className="text-green-500" />
      <span className="mb-1 text-sm font-light">{text}</span>
    </div>
  );
};

export default ToastSuccess;
