import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Engineering } from "@/components/sections/engineering";
import { Architecture } from "@/components/sections/architecture";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Education } from "@/components/sections/education";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { FeaturedRepos } from "@/components/sections/featured-repos";
import { Contact } from "@/components/sections/contact";
import { SparkField } from "@/components/layout/spark-field";

export default function HomePage() {
  return (
    <>
      <SparkField>
        <Hero />
      </SparkField>

      <SelectedWork />
      <Engineering />
      <Architecture />
      <Experience />
      <About />
      <TechStack />
      <Education />
      <CurrentlyBuilding />
      <FeaturedRepos />
      <Contact />
    </>
  );
}
