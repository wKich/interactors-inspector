import type { getInteractors } from "./getInteractors";
import { Interactor } from "./Interactor";

interface InspectorView {
  interactors: ReturnType<typeof getInteractors>;
}

export function InspectorView({ interactors }: InspectorView) {
  return (
    <>
      {interactors
        .filter(([, { elements }]) => elements.length)
        .map(([name, { elements }]) => (
          <Interactor key={name} name={name} elements={elements} />
        ))}
    </>
  );
}
