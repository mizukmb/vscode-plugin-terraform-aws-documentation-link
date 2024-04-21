import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.languages.registerHoverProvider('terraform', {
		provideHover(document, position, _token) {
			const wordRange = document.getWordRangeAtPosition(position);
			const word = document.getText(wordRange);

			// Check if the word is an AWS resource
			if (word.startsWith("aws_")) {
				const baseUrl = 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources';
				const documentationUrl = `${baseUrl}/${word.slice(4)}`;
				return new vscode.Hover(`[Documentation link](${documentationUrl})`);
			}
		}
	});

	context.subscriptions.push(disposable);
}
