import { LogIn, UserPlus, FolderLock } from "lucide-react";

export const authInfoCards = [
  {
    title: "Logga in",
    text: "Logga in för att fortsätta där du slutade. Du får tillgång till dina sparade projekt, endpoints och inställningar direkt.",
    icon: LogIn,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Skapa konto",
    text: "Har du inget konto ännu? Skapa ett gratis konto för att börja bygga och spara dina egna endpoints och JSON-svar.",
    icon: UserPlus,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Allt sparas säkert",
    text: "Dina projekt och endpoints kopplas till ditt konto så att du alltid kan komma tillbaka och fortsätta arbeta – oavsett enhet.",
    icon: FolderLock,
    color: "bg-purple-100 text-purple-600",
  },
];
