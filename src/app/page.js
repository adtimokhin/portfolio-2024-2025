// Styles
import "@/app/styles/landing/hero.sass";
import "@/app/styles/landing/process.sass";

// Icons
import Random from "@/components/icons/Random";
import StartDate from "@/components/icons/StartDate";
import Globe from "@/components/icons/Globe";
import Side from "@/components/icons/Side";

// Components
import Timer from "@/components/Timer";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import SmallInput from "@/components/input/SmallInput";
import LargeInput from "@/components/input/LargeInput";
import Button from "@/components/input/Button";
import DropDownSection from "@/components/drop-down/DropDownSection";

// Scripts
import HeroLetters from "@/components/animation/HeroLetters";
import "@/app/scripts/theme-check";

export default function Home() {
  return (
    // Example how to include tailwind css class for a variable from layout file: font-[family-name:var(--font-montreal-medium)]
    <main className="flex flex-col row-gap__sections-y">
      {/* Hero section */}
      <section className="w-full h-screen container-fit flex flex-col items-center justify-center">
        {/* TODO:Include approriate spaces between lines */}
        <HeroLetters />
        <div className="w-full flex flex-col gap-y-[12px] flex-1 pt-[70px]">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="hero-letter">I</span>
              <span className="hero-letter ">&nbsp;</span>
              <span className="hero-letter">D</span>
              <span className="hero-letter ">E</span>
              <span className="hero-letter ">S</span>
              <span className="hero-letter">I</span>
              <span className="hero-letter">G</span>
              <span className="hero-letter ">N</span>
            </h1>
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="hero-letter">A</span>
              <span className="hero-letter">N</span>
              <span className="hero-letter">D</span>
            </h1>
          </div>
          <div className="margin__line-two">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="hero-letter">D</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">V</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">L</span>
              <span className="hero-letter">O</span>
              <span className="hero-letter">P</span>
            </h1>
          </div>
          <div className="margin__line-three">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="hero-letter">S</span>
              <span className="hero-letter">I</span>
              <span className="hero-letter">T</span>
              <span className="hero-letter">E</span>
              <span className="hero-letter">S</span>
              <span className="hero-letter">&nbsp;</span>
              <span className="hero-letter">F</span>
              <span className="hero-letter">O</span>
              <span className="hero-letter">R</span>
            </h1>
          </div>
          <div className="w-full">
            <h1 className="absurdly-large-text w-full text-right overflow-hidden">
              <span className="hero-letter">S</span>
              <span className="hero-letter">T</span>
              <span className="hero-letter">A</span>
              <span className="hero-letter">R</span>
              <span className="hero-letter">T</span>
              <span className="hero-letter">U</span>
              <span className="hero-letter">P</span>
              <span className="hero-letter">S</span>
            </h1>
          </div>
        </div>

        {/* Bottom info */}
        <div className="w-full flex-1 flex flex-row justify-between items-center">
          <div id="test-animation3">
            <Random />
          </div>
          <div className="w-1/2 flex flex-row items-center justify-between">
            <p className="body-text w-1/2" id="hero-body-text">
              Hi. My name is Sasha, and I develop sites! This is my portfolio
              for you to check out my work. If you feel motivated to reach out
              about any work - feel free to fill in a form at the bottom
            </p>
            <div id="test-animation">
              <StartDate />
            </div>
          </div>
        </div>
      </section>

      {/* Time Section */}
      <section className="w-screen h-screen container-fit relative">
        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Globe classes={"fill-light_gray_dimmed_light"} />
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
        <SectionTitle side="№&■ж" title="Selected Projects" sup="[01]" />
        <div className="w-full h-fit flex flex-col section__projects__row-gap__line-spacing">
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"PACIFICA"}
              imgDest={"nowhere"}
              imgAlt={"no matter"}
            />
            <ProjectCard
              title={"Filipchik Studios"}
              imgDest={"nowhere"}
              imgAlt={"no matter"}
            />
          </div>
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"Perestroyka Agency"}
              imgDest={"nowhere"}
              imgAlt={"no matter"}
            />
          </div>
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"Pierce Interiors"}
              imgDest={"nowhere"}
              imgAlt={"no matter"}
            />
            <ProjectCard
              title={"Harmony In Chaos"}
              imgDest={"nowhere"}
              imgAlt={"no matter"}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* TODO: Finish up this section later */}
      <section className="w-full h-fit container-fit flex flex-col row-gap__title-content">
        <SectionTitle side="↙У/©°∞" title="Creative Process" sup="[02]" />
        <div className="w-full h-fit flex flex-col justify-end items-end">
          <div className="w-3/4 h-fit">
            <ul className="process-list">
              <li>
                <DropDownSection title={"Setting   goals"} />
              </li>
              <li>
                <DropDownSection title={"Analyzing"} />
              </li>
              <li>
                <DropDownSection title={"Prototyping"} />
              </li>
              <li>
                <DropDownSection title={"Designing"} />
              </li>
              <li>
                <DropDownSection title={"Coding"} />
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Extras Section */}
      <section className="w-full h-screen container-fit flex flex-col justify-center items-center inverted ">
        <p className="large-text w-full indent-[25%]">
          (⁕⁕&emsp;For each step I will record a Loom video just for you, and at
          the end of the development I will gift you Figma file with all the
          work in it.&emsp;⁕⁕)
        </p>
      </section>

      {/* Contact Section */}
      <section className="w-full h-fit container-fit flex flex-col row-gap__title-content relative overflow-hidden">
        <SectionTitle side="Ä▄@ŋ¬" title="Contact Form" sup="[03]" />
        <div className="w-full h-fit flex flex-col justify-end items-end">
          <div className="w-3/4 h-fit">
            <form className="w-full h-fit flex flex-col justify-center section__projects__row-gap__form-button">
              <div className="w-full h-fit flex flex-col section__projects__row-gap__input-spacing">
                <SmallInput
                  inputType={"text"}
                  id={"name"}
                  placeholder={"Name"}
                />
                <SmallInput
                  inputType={"email"}
                  id={"email"}
                  placeholder={"Email"}
                />
                <LargeInput
                  id={"description"}
                  placeholder={"Project Description (500 symbols max)"}
                />
              </div>

              <Button text="SEND" />
            </form>
          </div>
        </div>

        <span className="absurdly-large-text absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 -">
          ¶№§4€
        </span>
      </section>
    </main>
  );
}
