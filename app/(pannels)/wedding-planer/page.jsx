import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const WeddingPlanerPage = () => {
  redirect(routes.weddingPlaner.dashboard);
};

export default WeddingPlanerPage;
