import { redirect } from "next/navigation";


// START SIDAN Redirectar till /start/login som är den första fliken i LayoutAccordion, detta kan ändras senare
export default function StartPage() {
    redirect("/start/login");
}