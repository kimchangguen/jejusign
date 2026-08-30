import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WorkGallery from "@/components/WorkGallery";
import CompanyStrength from "@/components/CompanyStrength";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WorkGallery />
      <CompanyStrength />
      <ContactCTA />
    </>
  );
}
