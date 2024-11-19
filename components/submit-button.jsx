import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SubmitButton = ({ children, loading, className, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(className)}
      type="submit"
      disabled={props.disabled || loading}
    >
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <Loader2 size={16} className="animate-spin" />}
      </span>
    </Button>
  );
};

export default SubmitButton;
