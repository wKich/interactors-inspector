import { useStore } from "effector-react";
import { createInteractor } from "bigtest";
import React, { useCallback, useEffect, useRef } from "react";
import { InspectorView } from "./interactors/InspectorView";
import { ActionsEditor } from "./interactors/ActionsEditior";
import { $code, $interactors, $isLoading, $isOpened, end, refresh, start, toggle } from "./actions";
import { delay } from "./helpers";
import {
  Button,
  CheckBox,
  Heading,
  Link,
  MultiSelect,
  RadioButton,
  Select,
  TextField,
} from "./interactors/getInteractors";

// TODO debounce + mutation observer

export function App() {
  const interactors = useStore($interactors);
  const isLoading = useStore($isLoading);
  const isOpened = useStore($isOpened);
  const code = useStore($code);

  const capturing = useRef(true);

  const runHandler = useCallback(async () => {
    start();
    await delay(0);
    try {
      await eval(
        `async ({ Button, CheckBox, Heading, Link, MultiSelect, RadioButton, Select, TextField, createInteractor }, delay) => { ${code} }`
      )({ Button, CheckBox, Heading, Link, MultiSelect, RadioButton, Select, TextField, createInteractor }, delay);
    } catch (error) {
      throw error;
    } finally {
      end();
    }
  }, [code]);

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.altKey && event.code == "KeyI" && capturing.current) {
        capturing.current = false;
        toggle();
      }
    };
    const keyUpListener = (event: KeyboardEvent) => {
      if (event.code == "KeyI") capturing.current = true;
    };

    // @ts-expect-error
    window.__BIGTEST_SHOW_INSPECTOR__ = toggle;
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      // @ts-expect-error
      delete window.__BIGTEST_SHOW_INSPECTOR__;
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  return isOpened ? (
    <div className="relative flex bottom-8 left-8 bg-white p-4 w-max">
      <div className="mr-4 flex-shrink-0">
        <button
          className="rounded border-gray-500 border shadow outline-none focus:outline-none mb-2"
          onClick={refresh}
        >
          <span className="m-1">Refresh</span>
        </button>
        <div className="max-w-lg min-w-32 min-h-64 max-h-128 overflow-y-auto rounded-lg border-black border p-2">
          <InspectorView interactors={interactors} />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <button
          className="rounded border-gray-500 border shadow outline-none focus:outline-none mb-2"
          onClick={runHandler}
        >
          <span className="m-1">Run</span>
        </button>
        <div className="rounded-lg border-black border p-1 h-full">
          <ActionsEditor />
        </div>
      </div>
      {isLoading ? <div className="top-0 left-0 absolute w-full h-full bg-gray-400 opacity-50" /> : null}
    </div>
  ) : null;
}
