import AuthShell from "./AuthShell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <AuthShell />
        </main>
    );
}