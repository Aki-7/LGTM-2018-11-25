import * as React from "react";
import * as Style from "./Row.css";

interface Props {
    obj: any
    className: string
}
interface State{

}

export class Row extends React.Component<Props,State>{
    render(){
        return(
            <div className={this.props.className}>
                <div className={Style.cell1}>
                    {this.props.obj.title}
                </div>
                <div className={Style.cell2}>
                    memo: {this.props.obj.memo}
                </div>
            </div>
        )
    }
} 