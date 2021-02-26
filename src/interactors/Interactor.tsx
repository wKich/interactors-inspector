import { InteractableElement, InteractableElementProps } from "./InteractableElement";

interface InteractorProps {
  name: string;
  elements: InteractableElementProps[];
}

export function Interactor({ name, elements }: InteractorProps) {
  return (
    <details key={name}>
      <summary className="outline-none cursor-pointer">
        Interactor: {name} ({elements.length} elements)
      </summary>
      {elements.map((props) => (
        <InteractableElement key={props.selector} {...props} />
      ))}
      <hr />
    </details>
  );
}
