import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Engineering } from "@/components/sections/engineering";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Engineering />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
