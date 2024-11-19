import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const ManagerPage = () => {
  redirect(routes.admin.dashboard);
};

export default ManagerPage;
