import React, { useCallback } from "react";
import { delay } from "../helpers";
import { end, start } from "../actions";

interface ActionButton {
  name: string;
  action: (...args: any[]) => Promise<any>;
}

export function ActionButton({ name, action }: ActionButton) {
  const handleAction = useCallback(async () => {
    start();
    await delay(0);

    try {
      await action();
    } catch (error) {
      throw error;
    } finally {
      end();
    }
  }, [action]);

  return (
    <button className="rounded border-gray-500 border shadow outline-none focus:outline-none" onClick={handleAction}>
      <span className="m-1">{name}</span>
    </button>
  );
}
