"use client";

import React from "react";
import { useSession } from "next-auth/react";
import LogRegComponent from "../LogRegComponent";
import AuthModal from "./AuthModal";
import LoggedOutStart from "./LoggedOutStart";
import LoggedInStart from "./LoggedInStart";

type AuthMode = "login" | "register";

export default function StartPageDraft() {
  const { data: session } = useSession();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<AuthMode>("login");

  // Stäng modal automatiskt när användaren loggar in!
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

  const userName = session?.user?.name ?? session?.user?.email ?? "användare";

  // Om användaren är inloggad → visa LoggedInStart
  // annars → visa LoggedOutStart
  return (
    <>
      {session?.user ? (
        <LoggedInStart userName={userName} />
      ) : (
        <LoggedOutStart onAuthClick={handleAuthClick} />
      )}

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
