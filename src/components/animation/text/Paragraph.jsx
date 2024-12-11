"use client";
import "@/app/styles/components/animated-text.sass";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const Paragraph = ({ content }) => {
  const container = useRef();

  useGSAP(
    () => {
      let ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        const parent = document.getElementById(`paragraph__section`); // paragraph element

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: `start 50%`,
            end: `bottom 85%`,
            scrub: 1,
          },
        });

        const words = gsap.utils.toArray(".anim__word");

        tl.fromTo(words, { opacity: "30%" }, { opacity: "100%", stagger: 1 });
      });

      // cleanup
      return () => {
        ctx.revert();
        ScrollTrigger.killAll();
      };
    },
    { scope: container }
  );

  return (
    <p class="anim__paragraph" id="anim__paragraph" ref={container}>
      <span class="anim__word">(⁕⁕</span>
      <span class="anim__word">For</span>
      <span class="anim__word">each</span>
      <span class="anim__word">step</span>
      <span class="anim__word">I</span>
      <span class="anim__word">will</span>
      <span class="anim__word">record</span>
      <span class="anim__word">a</span>
      <span class="anim__word">Loom</span>
      <span class="anim__word">video</span>
      <span class="anim__word">just</span>
      <span class="anim__word">for</span>
      <span class="anim__word">you,</span>
      <span class="anim__word">and</span>
      <span class="anim__word">at</span>
      <span class="anim__word">the</span>
      <span class="anim__word">end</span>
      <span class="anim__word">of</span>
      <span class="anim__word">the</span>
      <span class="anim__word">development</span>
      <span class="anim__word">I</span>
      <span class="anim__word">will</span>
      <span class="anim__word">gift</span>
      <span class="anim__word">you</span>
      <span class="anim__word">Figma</span>
      <span class="anim__word">file</span>
      <span class="anim__word">with</span>
      <span class="anim__word">all</span>
      <span class="anim__word">the</span>
      <span class="anim__word">work</span>
      <span class="anim__word">in</span>
      <span class="anim__word">it.</span>
      <span class="anim__word">⁕⁕)</span>
    </p>
  );
};

export default Paragraph;
