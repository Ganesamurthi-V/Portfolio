import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Engineering } from "@/components/sections/engineering";
import { Architecture } from "@/components/sections/architecture";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Engineering />
      <Architecture />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
