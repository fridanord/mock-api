import StartHero from "./StartHero";
import StartInfoCards from "./StartInfoCards";

type AuthMode = "login" | "register";

type LoggedOutStartProps = {
  onAuthClick: (mode: AuthMode) => void;
};

export default function LoggedOutStart({ onAuthClick }: LoggedOutStartProps) {
  return (
    <div className="space-y-6">
      <StartHero session={null} onAuthClick={onAuthClick} />
      <StartInfoCards />
    </div>
  );
}
