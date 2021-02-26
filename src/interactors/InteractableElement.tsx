import { createApi, createStore } from "effector";
import React, { useCallback } from "react";
import { ActionButton } from "./ActionButton";

export interface InteractableElementProps {
  element: HTMLElement;
  selector: string;
  locator: any;
  actions: {
    [k: string]: (...args: any[]) => Promise<any>;
  };
  props: {
    [k: string]: any;
  };
}

const $element = createStore<HTMLElement | null>(null);

const { highlight, unhighlight } = createApi($element, {
  highlight: (_element, target: HTMLElement) => {
    // TODO Portal
    const { top, left, width, height } = target.getBoundingClientRect();
    const highlightElement = document.createElement("div");
    highlightElement.style.backgroundColor = "cornflowerblue";
    highlightElement.style.opacity = "0.6";
    highlightElement.style.position = "absolute";
    highlightElement.style.zIndex = "10000";
    highlightElement.style.top = `${top}px`;
    highlightElement.style.left = `${left}px`;
    highlightElement.style.width = `${width}px`;
    highlightElement.style.height = `${height}px`;
    document.body.appendChild(highlightElement);
    return highlightElement;
  },
  unhighlight: (element) => (element?.remove(), null),
});

export function InteractableElement({ element, selector, locator, actions, props }: InteractableElementProps) {
  const mouseEnterHandler = useCallback(() => highlight(element), [element]);
  const mouseLeaveHandler = useCallback(() => unhighlight(), []);

  return (
    <details className="ml-2" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      <summary className="outline-none cursor-pointer">
        Locator: {locator ? `"${locator}" (${selector})` : selector}
      </summary>
      <div className="flex m-2 ml-4">
        {Object.entries(actions).map(([actionName, action]) => (
          // TODO fillIn action?
          <div key={actionName} className="mx-2">
            <ActionButton name={actionName} action={action} />
          </div>
        ))}
      </div>
      <div className="bg-gray-300 m-2 ml-4 w-max">
        <code className="bigtest-code whitespace-pre overflow-x-auto p-2">{JSON.stringify(props, null, 2)}</code>
      </div>
    </details>
  );
}
