// Styles
import "@/app/styles/hero.sass";

// Icons
import Random from "@/components/icons/Random";
import StartDate from "@/components/icons/StartDate";
import Globe from "@/components/icons/Globe";
import Side from "@/components/icons/Side";

// Components
import Timer from "@/components/Timer";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";

// Scripts

export default function Home() {
  return (
    // Example how to include tailwind css class for a variable from layout file: font-[family-name:var(--font-montreal-medium)]
    <div className="font-[family-name:var(--font-montreal-medium)]">
      {/* Hero section */}
      <section className="w-full h-screen container-fit flex flex-col items-center justify-center">
        {/* TODO:Include approriate spaces between lines */}
        <div className="w-full flex flex-col gap-y-[12px] flex-1 pt-[70px]">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="absurdly-large-text">I DESIGN</h1>
            <h1 className="absurdly-large-text">AND</h1>
          </div>
          <div className="margin__line-two">
            <h1 className="absurdly-large-text">DEVELOP</h1>
          </div>
          <div className="margin__line-three">
            <h1 className="absurdly-large-text">SITES FOR</h1>
          </div>
          <div className="w-full">
            <h1 className="absurdly-large-text w-full text-right">STARTUPS</h1>
          </div>
        </div>
        {/* Bottom info */}
        <div className="w-full flex-1 flex flex-row justify-between items-center">
          <Random />
          <div className="w-1/2 flex flex-row items-center justify-between">
            <p className="body-text w-1/2">
              Hi. My name is Sasha, and I develop sites! This is my portfolio
              for you to check out my work. If you feel motivated to reach out
              about any work - feel free to fill in a form at the bottom
            </p>
            <StartDate />
          </div>
        </div>
      </section>

      {/* Time Section */}
      <section className="w-screen h-screen container-fit relative">
        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Globe />
        </div>

        {/* Content */}
        <div className="w-full h-fit absolute top-1/2 left-0 -translate-y-1/2">
          <div className="w-full h-fit flex flex-col justify-center items-center section__time__row-gap__title-timer">
            <h3 className="large-title-text">Currently I’m in: Chicago</h3>
            <div className="w-full h-[420px] relative">
              <div className="absolute top-0 left-0">
                <Side />
              </div>
              <h3 className="absurdly-large-text absolute top-1/2 left-0 w-full text-center -translate-y-1/2">
                <Timer />
              </h3>
              <div className="absolute top-0 right-0">
                <Side classes={"scale-x-[-1]"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full h-fit container-fit flex flex-col row-gap__title-content">
        <SectionTitle side="№&■ж" title="Selected Projects" sup="[01]"/>
        <div className="w-full h-fit flex flex-col section__projects__row-gap__line-spacing">
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard title={"PACIFICA"} imgDest={"nowhere"} imgAlt={"no matter"}/>
            <ProjectCard title={"Filipchik Studios"} imgDest={"nowhere"} imgAlt={"no matter"}/>
          </div>
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard title={"Perestroyka Agency"} imgDest={"nowhere"} imgAlt={"no matter"}/>
          </div>
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard title={"Pierce Interiors"} imgDest={"nowhere"} imgAlt={"no matter"}/>
            <ProjectCard title={"Harmony In Chaos"} imgDest={"nowhere"} imgAlt={"no matter"}/>
          </div>
        </div>
      </section>

      {/* Examples of the text */}
      {/* <p className="body-text">
        I DESIGN <sub className="side-decoration">№&■ж</sub>
      </p>
      <h3 className="section-title-text">
        Text text<sup>[01]</sup>
      </h3>
      <p className="large-text">
        (⁕⁕ For each step I will record a Loom video just for you, and at the
        end of the development I will gift you Figma file with all the work in
        it.  ⁕⁕)
      </p>
      <p className="absurdly-large-text">
        (⁕⁕ For each step I will record a Loom video just for you, and at the
        end of the development I will gift you Figma file with all the work in
        it.  ⁕⁕)
      </p> */}

      {/* Example section title use */}
      {/* <SectionTitle side="№&■ж" title="Selected Projects" sup="[01]"/> */}
    </div>
  );
}
