import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { routes } from "@/routes/routes";

const DataTableHeader = ({ title, description, btnText, href, children }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-background flex w-full items-center justify-between rounded-lg p-2 px-3">
        <div className="flex flex-col gap-2">
          <span className="text-lg text-muted-foreground">{title}</span>
        </div>
        {children}
        {btnText && (
          <div>
            <Link href={href}>
              <Button className="border-red-primary min-w-36 rounded-3xl border-2 bg-white hover:bg-white/60">
                {btnText}
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Separator className="mb-4 mt-2 h-[1px] bg-gray-400" />
    </div>
  );
};

export default DataTableHeader;
