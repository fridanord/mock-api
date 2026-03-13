import Hero from "../Components/Hero";
import InfoSection from "../Components/InfoSection";

export default function PublicLanding() {
  return (
    <main className="min-h-screen bg-[rgb(var(--app))]">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-10">
        <Hero />
        <InfoSection />
      </div>
    </main>
  );
}
