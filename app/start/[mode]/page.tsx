import AuthShell from "@/app/(auth)/AuthShell";

type ModePageProps = {
  params: {
    mode: string;
  };
};

export default function ModePage({ params }: ModePageProps) {
  const validModes = ["login", "register"];

  if (!validModes.includes(params.mode)) {
    return (
      <div className="p-8 text-white">
        <h1 className="mb-4 text-2xl font-semibold">Ogiltig sida</h1>
        <p>Den här sidan finns inte.</p>
      </div>
    );
  }

  return <AuthShell />;
}