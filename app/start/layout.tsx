import AuthShell from "../(auth)/AuthShell";
import LayoutAccordion from "../Components/LayoutAccordion";

export default function StartLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutAccordion>
            <AuthShell />
            {children}
        </LayoutAccordion>
    );
}