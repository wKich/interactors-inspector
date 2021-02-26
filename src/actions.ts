import { createApi, createStore, createEffect } from "effector";
import { getInteractors } from "./interactors/getInteractors";

export const $interactors = createStore<ReturnType<typeof getInteractors>>([]);
export const { refresh } = createApi($interactors, {
  refresh: (_state, _event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => getInteractors(),
});

export const $isLoading = createStore(false);
export const { start, end } = createApi($isLoading, {
  start: () => true,
  end: () => false,
});

export const $isOpened = createStore(false);
export const { toggle } = createApi($isOpened, {
  toggle: (state) => !state,
});

export const $code = createStore(localStorage.getItem("interactors_playground") ?? "");
export const { edit } = createApi($code, {
  edit: (_state, value: string) => value,
});

$code.watch((state) => {
  localStorage.setItem("interactors_playground", state);
});
