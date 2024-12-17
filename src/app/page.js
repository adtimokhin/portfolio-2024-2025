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

// Scripts
import HeroLetters from "@/components/animation/HeroLetters";
import "@/app/scripts/theme-check";
import DropDownCollection from "@/components/drop-down/DropDownCollection";
import CanvasPluses from "@/components/canvas-based/CanvasPluses";
import DynamicTextWrapper from "@/components/DynamicTextWrapper";
import HoverAnimation from "@/components/animation/HoverAnimation";
import Paragraph from "@/components/animation/text/Paragraph";

export default function Home() {
  return (
    // Example how to include tailwind css class for a variable from layout file: font-[family-name:var(--font-montreal-medium)]
    <main className="flex flex-col row-gap__sections-y">
      {/* Hero section */}
      <section className="w-full h-screen min-h-fit container-fit flex flex-col items-center desktop:justify-center tablet:justify-around phone:justify-between pt-[70px]">
        {/* TODO:Include approriate spaces between lines */}
        <HeroLetters />
        <div className="w-full flex flex-col hero-lines__row-gap desktop:flex-1">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="animatable-span hero-letter">I</span>
              <span className="animatable-span hero-letter ">&nbsp;</span>
              <span className="animatable-span hero-letter">D</span>
              <span className="animatable-span hero-letter ">E</span>
              <span className="animatable-span hero-letter ">S</span>
              <span className="animatable-span hero-letter">I</span>
              <span className="animatable-span hero-letter">G</span>
              <span className="animatable-span hero-letter ">N</span>
            </h1>
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="animatable-span hero-letter">A</span>
              <span className="animatable-span hero-letter">N</span>
              <span className="animatable-span hero-letter">D</span>
            </h1>
          </div>
          <div className="margin__line-two">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="animatable-span hero-letter">D</span>
              <span className="animatable-span hero-letter">E</span>
              <span className="animatable-span hero-letter">V</span>
              <span className="animatable-span hero-letter">E</span>
              <span className="animatable-span hero-letter">L</span>
              <span className="animatable-span hero-letter">O</span>
              <span className="animatable-span hero-letter">P</span>
            </h1>
          </div>

          {/* ICON FOR SMALLER SCREENS */}
          <div className="bg-text_light dark:bg-text_dark icon-cover desktop:hidden tablet:flex phone:flex flex-col justify-center items-center">
            <StartDate
              classes={
                "hover:bg-text_light dark:hover:bg-text_dark transition-colors ease-in-out duration-300"
              }
            />
          </div>

          <div className="margin__line-three">
            <h1 className="absurdly-large-text overflow-hidden">
              <span className="animatable-span hero-letter">S</span>
              <span className="animatable-span hero-letter">I</span>
              <span className="animatable-span hero-letter">T</span>
              <span className="animatable-span hero-letter">E</span>
              <span className="animatable-span hero-letter">S</span>
              <span className="animatable-span hero-letter">&nbsp;</span>
              <span className="animatable-span hero-letter">F</span>
              <span className="animatable-span hero-letter">O</span>
              <span className="animatable-span hero-letter">R</span>
            </h1>
          </div>
          <div className="w-full">
            <h1 className="absurdly-large-text w-full text-right overflow-hidden">
              <span className="animatable-span hero-letter">S</span>
              <span className="animatable-span hero-letter">T</span>
              <span className="animatable-span hero-letter">A</span>
              <span className="animatable-span hero-letter">R</span>
              <span className="animatable-span hero-letter">T</span>
              <span className="animatable-span hero-letter">U</span>
              <span className="animatable-span hero-letter">P</span>
              <span className="animatable-span hero-letter">S</span>
            </h1>
          </div>
        </div>

        {/* Bottom info */}
        <div className="w-full desktop:flex-1 tablet:h-fit phone:h-fit flex desktop:flex-row tablet:flex-row phone:flex-col justify-between items-center gap-y-8">
          <div className="bg-text_light dark:bg-text_dark icon-cover desktop:order-first tablet:order-last phone:order-last">
            <Random
              classes={
                "hover:bg-text_light dark:hover:bg-text_dark transition-colors ease-in-out duration-300"
              }
            />
          </div>
          <div className="desktop:w-1/2 tablet:w-1/2 phone:w-full flex flex-row items-center justify-between">
            <div className="body-text desktop:w-1/2">
              <DynamicTextWrapper
                text={
                  "Hi. My name is Sasha, and I develop sites! This is my portfolio for you to check out my work. If you feel motivated to reach out about any work - feel free to fill in a form at the bottom"
                }
              />
            </div>
            <div className="bg-text_light dark:bg-text_dark icon-cover desktop:flex tablet:hidden phone:hidden">
              <StartDate
                classes={
                  "hover:bg-text_light dark:hover:bg-text_dark transition-colors ease-in-out duration-300"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Time Section */}
      <section className="w-screen desktop:h-screen tablet:h-screen phone:h-[80vh] container-fit relative">
        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Globe classes={"fill-light_gray_dimmed_light"} />
        </div>

        {/* Content */}
        <div className="w-full h-fit absolute top-1/2 left-0 -translate-y-1/2">
          <div className="w-full h-fit flex flex-col justify-center items-center section__time__row-gap__title-timer">
            <h3 className="large-title-text">Currently I’m in: Almaty</h3>
            <div className="w-full desktop:h-[420px] tablet:h-[220px] phone:h-[72px] relative">
              <div className="absolute top-0 left-0">
                <Side />
              </div>
              <h3 className="absurdly-large-text absolute top-1/2 left-0 w-full text-center -translate-y-1/2">
                <HoverAnimation>
                  <Timer />
                </HoverAnimation>
              </h3>
              <div className="absolute top-0 right-0">
                <Side classes={"scale-x-[-1]"} />
              </div>
            </div>
          </div>
        </div>

        {/* PLUSES BG */}
        <CanvasPluses color={"DFDFDF"} />
      </section>

      {/* Projects Section */}
      <section
        className="w-full h-fit container-fit flex flex-col row-gap__title-content"
        id="projects"
      >
        <SectionTitle side="№&■ж" title="Selected Projects" sup="[01]" />
        <div className="w-full h-fit flex flex-col section__projects__row-gap__line-spacing">
          <div className="w-full flex desktop:flex-row tablet:flex-col phone:flex-col section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"PACIFICA"}
              imgName={"Pacifica.png"}
              imgAlt={"lines in gradient and a large title PACIFICA"}
              destination={"https://pacifica-kz-redesign.vercel.app/"}
            />
            <ProjectCard
              title={"Filipchik Studios"}
              imgName={"Filipchik.png"}
              imgAlt={"Large logo of FILIPCHIK STUDIOS in black and white"}
              destination={
                "https://filipchik-studio-website-redesign.vercel.app/"
              }
            />
          </div>
          <div className="w-full flex flex-row section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"Perestroyka Agency"}
              imgName={"Perestroyka.png"}
              imgAlt={
                "A blured image of a kitchen interior and a large text: 'design studio'"
              }
              destination={
                "https://www.behance.net/gallery/194325431/Perestroyka-Agency-Website-Posters-Social-Media"
              }
            />
          </div>
          <div className="w-full flex desktop:flex-row tablet:flex-col phone:flex-col section__projects__col-gap__card-gap section__projects__row-gap__line-spacing justify-center">
            <ProjectCard
              title={"Pierce Interiors"}
              imgName={"Pierce.png"}
              imgAlt={
                "An image of a blue colored interior of a living room with a large text 'Pierce interiors' over"
              }
              destination={"https://pierce-interior.vercel.app/"}
            />
            <ProjectCard
              title={"Harmony In Chaos"}
              imgName={"Harmony.png"}
              imgAlt={"a sculpture of a man contemplating"}
              destination={"https://harmony-in-chaos-website.vercel.app/"}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="w-full h-fit container-fit flex flex-col row-gap__title-content"
        id="process"
      >
        <SectionTitle side="↙У/©°∞" title="Creative Process" sup="[02]" />
        <div className="w-full h-fit flex flex-col justify-end items-end">
          <div className="desktop:w-3/4 tablet:w-full phone:w-full h-fit">
            <DropDownCollection />
          </div>
        </div>
      </section>

      {/* Extras Section */}
      <section
        className="w-full desktop:h-screen tablet:h-[100vh] phone:h-[100vh] container-fit flex flex-col justify-center items-center inverted large-text"
        id="paragraph__section"
      >
        <Paragraph
          content={
            "(⁕⁕ For each step I will record a Loom video just for you, and at the end of the development I will gift you Figma file with all the work in it. ⁕⁕)"
          }
        />
      </section>

      {/* Contact Section */}
      <section
        className="w-full h-fit container-fit flex flex-col row-gap__title-content relative overflow-hidden"
        id="contact"
      >
        <SectionTitle side="Ä▄@ŋ¬" title="Contact Form" sup="[03]" />
        <div className="w-full h-fit flex flex-col justify-end items-end">
          <div className="desktop:w-3/4 tablet:w-full phone:w-full h-fit">
            {/* FIXME: Add email checks */}
            <form
              className="w-full h-fit flex flex-col justify-center section__projects__row-gap__form-button"
              action="https://formspree.io/f/xovqzywa"
              method="POST"
            >
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
                  id={"message"}
                  placeholder={"Project Description (500 symbols max)"}
                />
              </div>

              <Button text="SEND" />
            </form>
          </div>
        </div>

        <span className="absurdly-large-text absolute desktop:flex tablet:hidden phone:hidden top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 -">
          ¶№§4€
        </span>
      </section>
    </main>
  );
}
