// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function splitText(input: string): string {
    const cleanedText = input.replace(/\\\s*\n/g, ' ');
    return cleanedText.split(/\s+/).map(word => `"${word}"`).join(', ');
}

export function joinText(input: string): string {
    const cleanedText = input.replace(/^\s*\[|\]\s*$/g, '');
    return cleanedText.split(/",\s*"/).map(word => word.replace(/(^"|"$)/g, '')).join(' ');
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposableSplit  = vscode.commands.registerCommand('args-split.splitArgs', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selections = editor.selections;

            editor.edit((editBuilder) => {
                selections.forEach((selection) => {
                    const selectedText = document.getText(selection);
                    const output = splitText(selectedText);
                    editBuilder.replace(selection, output);
                });
            });
        }
    });

    let disposableJoin = vscode.commands.registerCommand('args-split.joinArgs', () => {
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
            const document = editor.document;
            const selections = editor.selections;
    
            editor.edit((editBuilder) => {
                selections.forEach((selection) => {
                    const selectedText = document.getText(selection);
                    const output = joinText(selectedText);
                    editBuilder.replace(selection, output);
                });
            });
        }
    });
    
    context.subscriptions.push(disposableSplit);
    context.subscriptions.push(disposableJoin);
}

// This method is called when your extension is deactivated
export function deactivate() {}
