import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const UserPage = () => {
  redirect(routes.weddingCard.dashboard);
};

export default UserPage;
