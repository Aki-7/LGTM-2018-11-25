import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog as _Dialog, DialogActionProps } from "react-toolbox/lib/dialog";
import { Err400, Err401, Err404, Err405, Err500, Err} from "./Message";

type DialogType = "default" | "custom" | "waiting" | "reqError";

export class Dialog {
    private static id = "Dialog"
    private static type: DialogType = "default" 
    static size?: "small" | "normal" | "large" = "small"
    static title? = ""
    static message?: string
    static statusCode?: number
    static children?: React.ReactNode
    private static actions: DialogActionProps[];
    
    /**
     * ダイアログの初期化も行う    
     *    "default"  - size, title, message, actions のみで構成    
     *    "custom"   - size, children のみで構成    
     *    "reqError" - statusCode, actions のみで構成    
     *    "waiting"  - waitingアニメーションを表示(未実装)    
     *
     * @static
     * @param {"default" | "custom" | "waiting" | "reqError"} type
     * @memberof Dialog
     */
    static setType(type:DialogType){
        Dialog.title = undefined; Dialog.message = undefined; 
        Dialog.statusCode = undefined; Dialog.children = undefined; Dialog.actions = [];
        Dialog.type = type;
    }

    static activate(){
        if(!document.getElementById(Dialog.id)){
            console.error("Error in Dialog.activate()\nid=\"Dialog\"のdivが必要です。")
            alert("ダイアログのエラー");
        }
        ReactDOM.render(
            Dialog.createDialog(),
            document.getElementById(Dialog.id)
            )
        }
        
    static close(){
        ReactDOM.render(
            Dialog.createDialog(false),
            document.getElementById(Dialog.id)
        )
    }

    static pushActions(label: string,onClick: Function){
        Dialog.actions.push({label: label, onClick:onClick})
    }

    private static createDialog(active: boolean = true):JSX.Element{
        switch(Dialog.type){
            case "default":
            return <_Dialog title={Dialog.title} type={Dialog.size} actions={Dialog.actions} active={active} >
                {Dialog.message}
            </_Dialog>

            case "custom":
            return <_Dialog type={Dialog.size} active={active}>
                {Dialog.children}
            </_Dialog>

            case "waiting":
            return <_Dialog active={active} >
                waiting ...
            </_Dialog>

            case "reqError":
            return <_Dialog title="ERROR" type="small" actions={Dialog.actions} active={active} >
                {Dialog.getErrorMSGByStatusCode(Dialog.statusCode)}
            </_Dialog>
        }
    }

    private static getErrorMSGByStatusCode(code?: number):string{
        switch(code){
            case 400: return Err400;
            case 401: return Err401;
            case 404: return Err404;
            case 405: return Err405;
            case 500: return Err500;
            default:  return Err+`(${code})`;
        }
    }
}