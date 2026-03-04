import Hero from "../Components/Hero";
import InfoSection from "../Components/InfoSection";

export default function StartPage() {
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <Hero />
        <InfoSection />
      </div>
    </div>
  );
}