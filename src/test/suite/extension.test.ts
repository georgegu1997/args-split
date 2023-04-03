import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import { splitText, joinText } from '../../extension';


suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Split args', async () => {
        const input = '--arg1 a --arg2 b --arg3 c';
        const expectedOutput = '"--arg1", "a", "--arg2", "b", "--arg3", "c"';

        const output = splitText(input);

        assert.strictEqual(output, expectedOutput);
    });

    test('Join args', async () => {
        const input = '["--arg1", "a", "--arg2", "b", "--arg3", "c"]';
        const expectedOutput = '--arg1 a --arg2 b --arg3 c';

        const output = joinText(input);

        assert.strictEqual(output, expectedOutput);
    });

    test('Split args Multiline', async () => {
        const input = `--arg1 a \\
    --arg2 b \\
    --arg3 c`;
        const expectedOutput = '"--arg1", "a", "--arg2", "b", "--arg3", "c"';
    
        const output = splitText(input);
    
        assert.strictEqual(output, expectedOutput);
    });
});
