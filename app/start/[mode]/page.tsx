import AuthShell, { Mode } from "@/app/(auth)/AuthShell";

type ModePageProps = {
  params: Promise<{
    mode: string;
  }>;
};

export default async function ModePage({ params }: ModePageProps) {
  const { mode } = await params;
  const validModes = ["login", "register"];

  if (!validModes.includes(mode)) {
    return (
      <div className="p-8 text-white">
        <h1 className="mb-4 text-2xl font-semibold">Ogiltig sida</h1>
        <p>Den här sidan finns inte.</p>
      </div>
    );
  }

  return <AuthShell mode={mode as Mode} />;
}