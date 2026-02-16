import { redirect } from "next/navigation";

import LayoutAccordion from "./Components/LayoutAccordion";

export default function Home() {
  redirect("/login");
}
