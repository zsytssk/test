# vscode-terminal-api-example

This sample provides several commands that demonstrates how to utilize the integrated terminal extension API. Access the commands through the command palette (F1).

![demo](demo.png)

## VS Code API

### `vscode` module

- [window.createTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.createTerminal)
- [window.onDidChangeActiveTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidChangeActiveTerminal)
- [window.onDidCloseTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidCloseTerminal)
- [window.onDidOpenTerminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.onDidOpenTerminal)
- [window.Terminal](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.Terminal)
- [window.terminals](https://vscode-ext-docs.azurewebsites.net/api/references/vscode-api#window.terminals) 

### Proposed API

- `window.createTerminalRenderer`
- `window.TerminalRenderer`

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributescommands)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window
