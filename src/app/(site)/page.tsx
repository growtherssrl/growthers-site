import Hero from "@/components/sections/home/Hero";
import Clients from "@/components/sections/home/Clients";
import Services from "@/components/sections/home/Services";
import Results from "@/components/sections/home/Results";
import ContactCTA from "@/components/sections/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Results />
      <ContactCTA />
    </>
  );
}
