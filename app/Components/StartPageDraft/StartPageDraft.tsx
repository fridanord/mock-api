"use client";

import React from "react";
import { useSession } from "next-auth/react";
import LogRegComponent from "../LogRegComponent";
import AuthModal from "./AuthModal";
import StartHero from "./StartHero";
import StartInfoCards from "./StartInfoCards";

type AuthMode = "login" | "register";

export default function StartPageDraft() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<AuthMode>("login");

  React.useEffect(() => {
    if (session?.user) {
      setModalOpen(false);
    }
  }, [session]);

  const handleAuthClick = (selectedMode: AuthMode) => {
    setMode(selectedMode);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Auth submit:", mode, data);
    setModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <StartHero session={session} onAuthClick={handleAuthClick} />
        <StartInfoCards />
      </div>

      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "register" ? "Skapa konto" : "Logga in"}
      >
        <LogRegComponent mode={mode} onSubmit={handleSubmit} />
      </AuthModal>
    </>
  );
}
