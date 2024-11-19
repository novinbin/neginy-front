import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const TalarPage = () => {
  redirect(routes.talar.dashboard);
};

export default TalarPage;
