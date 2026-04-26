"use client";

import { useState } from "react";
import AuthInfoCard from "./AuthInfoCard";
import { authInfoCards } from "./authInfoCardsData";

export default function AuthInfoCards() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section className="mt-8 w-full max-w-md space-y-3">
      {authInfoCards.map((card, index) => (
        <AuthInfoCard
          key={card.title}
          title={card.title}
          text={card.text}
          icon={card.icon}
          color={card.color}
          isOpen={openCard === index}
          onClick={() => setOpenCard(openCard === index ? null : index)}
        />
      ))}
    </section>
  );
}
