import { Code2, Braces, Play } from "lucide-react";

export const authInfoCards = [
  {
    title: "Bygg endpoints",
    text: "Skapa egna endpoints med metod och path, till exempel GET /users.",
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Skriv JSON-svar",
    text: "Bestäm vad din endpoint ska svara med när det går bra eller när ett fel ska simuleras.",
    icon: Braces,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Testa med fetch()",
    text: "Kopiera din mock-URL och använd den direkt i din JavaScript-kod.",
    icon: Play,
    color: "bg-purple-100 text-purple-600",
  },
];
