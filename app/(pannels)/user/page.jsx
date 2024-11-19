import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const UserPage = () => {
  redirect(routes.user.dashboard);
};

export default UserPage;
