// "activationEvents": [
//     "onCommand:pug2htmlac.execute"
// ],
// "contributes": {
//     "commands": [
//         {
//             "command": "pug2htmlac.execute",
//             "title": "Pug2Html Auto Compiler"
//         }
//     ]
// },
import * as vscode from 'vscode'
const fs = require('fs')
const pug = require('pug')
export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage("Pug2Html Auto Compiler ativo.");
	vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument)=>{
        let nameSt = e.fileName.lastIndexOf("\\")+1
        let allname = e.fileName.substring(nameSt, e.fileName.length)
        let namei = allname.lastIndexOf('.')
        let filename = allname.substring(0,namei)
        let path = e.fileName.substring(0,nameSt)+filename+".html"
		if (["pug", "jade"].indexOf(e.languageId) != -1){
            let text = e.getText()
            if (!pug) {
                vscode.window.showErrorMessage("Pug nao esta instalado.");
                return
            }
            let ret = pug.compile(text,{pretty:true})
            fs.writeFile(path,ret(),function(err="erro"){
                if(err) console.log(err);
                 err;
            });
        }
	});
	let disposable = vscode.commands.registerCommand('pug2htmlac.execute', () => {});
	context.subscriptions.push(disposable);
}
export function deactivate() {}