"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import LogRegComponent from "../Components/LogRegComponent";

type AuthFormData = {
  email?: string;
  username?: string;
  password: string;
};

export default function AuthShell() {
  const segment = useSelectedLayoutSegment(); // "login" | "register" | null
  const mode = segment === "register" ? "register" : "login";

  const handleSubmit = async (data: AuthFormData) => {
    console.log("Auth submit:", mode, data);
    // TODO: koppla mot API senare
  };

  return <LogRegComponent mode={mode} onSubmit={handleSubmit} />;
}
