import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const CeremonyPage = () => {
  redirect(routes.ceremony.dashboard);
};

export default CeremonyPage;
