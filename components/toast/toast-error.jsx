import { CircleAlert } from "lucide-react";

const ToastError = ({ text }) => {
  return (
    <div className="flex w-full items-center gap-2">
      <CircleAlert size={20} strokeWidth={2} className="text-red-500" />
      <span className="mb-1 text-sm font-light">{text}</span>
    </div>
  );
};

export default ToastError;
