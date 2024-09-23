import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  return (
    // Example how to include tailwind css class for a variable from layout file: font-[family-name:var(--font-montreal-medium)]
    <div className="font-[family-name:var(--font-montreal-medium)]">
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
