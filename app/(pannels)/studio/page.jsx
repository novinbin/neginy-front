import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const StudioPage = () => {
  redirect(routes.studio.dashboard);
};

export default StudioPage;
