# Interactors Inspector PoC

## How to start

Required `npm@7`

- `npm i`
- `npm run build`
- Inject bundle from `./build/main.js` to your app
- In a browser with your app press `Ctrl + Alt + I` to show the inspector view

## How to use

- Hit `Refresh` button to match built-in interactors to all dom elements. When you move mouse on matched interactor the bound dom element highlights. You can inspect element props and do some actions.
- On the right side you can write custom interactors by using `createInteractor` API or use built-in interactors to write action sequence

## What doesn't work yet

- `fillIn` action, you can't use this action from the left side panel
- Autocomplete for actions editor
- Interactor actions execute synchronously, that blocks UI updates
- The filter by `selector` works very inefficiency
