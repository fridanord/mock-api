import LayoutAccordion from "../Components/LayoutAccordion";

export default function StartLayout({ children }: { children: React.ReactNode }) {
    return <LayoutAccordion>{children}</LayoutAccordion>;
}