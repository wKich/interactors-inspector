import {
  Button as BaseButton,
  CheckBox as BaseCheckBox,
  Heading as BaseHeading,
  InteractorConstructor,
  Link as BaseLink,
  MultiSelect as BaseMultiSelect,
  RadioButton as BaseRadioButton,
  Select as BaseSelect,
  TextField as BaseTextField,
} from "bigtest";
import { finder } from "@medv/finder";
import { entries } from "../helpers";
import { root } from "../root";

const excludedContainers = [() => root, () => document.querySelector("body > .ace_editor")] as (() => Element | null)[];

const additionalFilters = { selector: (element: Element) => finder(element) };

export const Button = BaseButton.extend("Button").filters(additionalFilters);
export const CheckBox = BaseCheckBox.extend("CheckBox").filters(additionalFilters);
export const Heading = BaseHeading.extend("Heading").filters(additionalFilters);
export const Link = BaseLink.extend("Link").filters(additionalFilters);
export const MultiSelect = BaseMultiSelect.extend("ButMultiSelectton").filters(additionalFilters);
export const RadioButton = BaseRadioButton.extend("RadioButton").filters(additionalFilters);
export const Select = BaseSelect.extend("Select").filters(additionalFilters);
export const TextField = BaseTextField.extend("TextField").filters(additionalFilters);

// TODO Action is too long if many same elements

function resolveInteractor<T extends InteractorConstructor<any, any, any>>(constructor: T) {
  const interactor = constructor();
  const { specification } = interactor.options;
  const { locator, selector, filters, actions } = specification;
  const elements: HTMLElement[] = ((selector
    ? Array.from(document.querySelectorAll(selector))
    : []) as HTMLElement[]).filter((element) =>
    excludedContainers.every((container) => !container()?.contains(element))
  );

  return {
    constructor,
    interactor,
    elements: elements
      .map((element) => [element, finder(element)] as [HTMLElement, string])
      .map(([element, selector]) => ({
        element,
        selector,
        locator: locator?.(element as any),
        actions: Object.fromEntries(
          Object.keys(actions).map((actionName) => [
            actionName,
            async (...args: any[]) => await constructor({ selector })[actionName](...args),
          ])
        ),
        props: Object.fromEntries(
          entries(filters).map(([filterKey, filter]) => [
            filterKey,
            typeof filter == "function" ? filter(element) : filter.apply(element),
          ])
        ),
      })),
  };
}

export const getInteractors = () =>
  entries({
    Button: resolveInteractor(Button),
    CheckBox: resolveInteractor(CheckBox),
    Heading: resolveInteractor(Heading),
    Link: resolveInteractor(Link),
    MultiSelect: resolveInteractor(MultiSelect),
    RadioButton: resolveInteractor(RadioButton),
    Select: resolveInteractor(Select),
    TextField: resolveInteractor(TextField),
  });
