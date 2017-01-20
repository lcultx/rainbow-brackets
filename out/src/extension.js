/*
 * author: 2gua.
 */
'use strict';
var vscode = require('vscode');
function activate(context) {
    var roundBracketsColor = ["#e6b422", "#c70067", "#00a960", "#fc7482"];
    var squareBracketsColor = ["#33ccff", "#8080ff", "#0073a8"];
    var squigglyBracketsColor = ["#d4d4aa", "#d1a075", "#9c6628"];
    var roundBracketsDecorationTypes = [];
    var squareBracketsDecorationTypes = [];
    var squigglyBracketsDecorationTypes = [];
    for (var index in roundBracketsColor) {
        roundBracketsDecorationTypes.push(vscode.window.createTextEditorDecorationType({
            color: roundBracketsColor[index]
        }));
    }
    for (var index in squareBracketsColor) {
        squareBracketsDecorationTypes.push(vscode.window.createTextEditorDecorationType({
            color: squareBracketsColor[index]
        }));
    }
    for (var index in squigglyBracketsColor) {
        squigglyBracketsDecorationTypes.push(vscode.window.createTextEditorDecorationType({
            color: squigglyBracketsColor[index]
        }));
    }
    var isolatedRightBracketsDecorationTypes = vscode.window.createTextEditorDecorationType({
        color: "#e2041b"
    });
    var activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        rainbowBrackets();
    }
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        activeEditor = editor;
        if (editor) {
            rainbowBrackets();
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(function (event) {
        if (activeEditor && event.document === activeEditor.document) {
            rainbowBrackets();
        }
    }, null, context.subscriptions);
    function rainbowBrackets() {
        if (!activeEditor) {
            return;
        }
        var text = activeEditor.document.getText();
        var regEx = /[\(\)\[\]\{\}]/g;
        var match;
        var roundBracketsColorCount = 0;
        var squareBracketsColorCount = 0;
        var squigglyBracketsColorCount = 0;
        var leftRoundBracketsStack = [];
        var leftSquareBracketsStack = [];
        var leftSquigglyBracketsStack = [];
        var roundBracketsDecorationTypeMap = {};
        var squareBracketsDecorationTypeMap = {};
        var squigglyBracketsDecorationTypeMap = {};
        for (var index in roundBracketsDecorationTypes) {
            roundBracketsDecorationTypeMap[index] = [];
        }
        ;
        for (var index in squareBracketsDecorationTypes) {
            squareBracketsDecorationTypeMap[index] = [];
        }
        ;
        for (var index in squigglyBracketsDecorationTypes) {
            squigglyBracketsDecorationTypeMap[index] = [];
        }
        ;
        var rightBracketsDecorationTypes = [];
        var roundCalculate;
        var squareCalculate;
        var squigglyCalculate;
        while (match = regEx.exec(text)) {
            var startPos = activeEditor.document.positionAt(match.index);
            var endPos = activeEditor.document.positionAt(match.index + 1);
            var decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: null };
            switch (match[0]) {
                case '(':
                    roundCalculate = roundBracketsColorCount;
                    leftRoundBracketsStack.push(roundCalculate);
                    roundBracketsColorCount++;
                    if (roundBracketsColorCount >= roundBracketsColor.length) {
                        roundBracketsColorCount = 0;
                    }
                    roundBracketsDecorationTypeMap[roundCalculate].push(decoration);
                    break;
                case ')':
                    if (leftRoundBracketsStack.length > 0) {
                        roundCalculate = leftRoundBracketsStack.pop();
                        roundBracketsColorCount = roundCalculate;
                        roundBracketsDecorationTypeMap[roundCalculate].push(decoration);
                    }
                    else {
                        rightBracketsDecorationTypes.push(decoration);
                    }
                    break;
                case '[':
                    squareCalculate = squareBracketsColorCount;
                    leftSquareBracketsStack.push(squareCalculate);
                    squareBracketsColorCount++;
                    if (squareBracketsColorCount >= squareBracketsColor.length) {
                        squareBracketsColorCount = 0;
                    }
                    squareBracketsDecorationTypeMap[squareCalculate].push(decoration);
                    break;
                case ']':
                    if (leftSquareBracketsStack.length > 0) {
                        squareCalculate = leftSquareBracketsStack.pop();
                        squareBracketsColorCount = squareCalculate;
                        squareBracketsDecorationTypeMap[squareCalculate].push(decoration);
                    }
                    else {
                        rightBracketsDecorationTypes.push(decoration);
                    }
                    break;
                case '{':
                    squigglyCalculate = squigglyBracketsColorCount;
                    leftSquigglyBracketsStack.push(squigglyCalculate);
                    squigglyBracketsColorCount++;
                    if (squigglyBracketsColorCount >= squigglyBracketsColor.length) {
                        squigglyBracketsColorCount = 0;
                    }
                    squigglyBracketsDecorationTypeMap[squigglyCalculate].push(decoration);
                    break;
                case '}':
                    if (leftSquigglyBracketsStack.length > 0) {
                        squigglyCalculate = leftSquigglyBracketsStack.pop();
                        squigglyBracketsColorCount = squigglyCalculate;
                        squigglyBracketsDecorationTypeMap[squigglyCalculate].push(decoration);
                    }
                    else {
                        rightBracketsDecorationTypes.push(decoration);
                    }
                    break;
                default:
            }
        }
        for (var index in roundBracketsDecorationTypes) {
            activeEditor.setDecorations(roundBracketsDecorationTypes[index], roundBracketsDecorationTypeMap[index]);
        }
        for (var index in squareBracketsDecorationTypes) {
            activeEditor.setDecorations(squareBracketsDecorationTypes[index], squareBracketsDecorationTypeMap[index]);
        }
        for (var index in squigglyBracketsDecorationTypes) {
            activeEditor.setDecorations(squigglyBracketsDecorationTypes[index], squigglyBracketsDecorationTypeMap[index]);
        }
        activeEditor.setDecorations(isolatedRightBracketsDecorationTypes, rightBracketsDecorationTypes);
    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map