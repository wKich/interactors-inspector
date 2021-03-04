import { useStore } from "effector-react";
import { $selector } from "../actions";
import type { getInteractors } from "./getInteractors";
import { HighlightElement } from "./HighlightElement";
import { Interactor } from "./Interactor";

interface InspectorView {
  interactors: ReturnType<typeof getInteractors>;
}

export function InspectorView({ interactors }: InspectorView) {
  return (
    <>
      <HighlightElement />
      {interactors
        .filter(([, { elements }]) => elements.length)
        .map(([name, { elements }]) => (
          <Interactor key={name} name={name} elements={elements} />
        ))}
    </>
  );
}
