import * as React from "react";
import { Card } from "react-toolbox/lib/card";
import axios from "axios";
import { Row } from "./Row/Row";
import * as Style from "./App.css";

interface State {
    objs: any[]
}

export class App extends React.Component<{},State>{
    constructor(props:{}){
        super(props);
        this.state = {
            objs: []
        }
    }

    render(){
        var rows:JSX.Element[] = [];
        for(let i = 0;i < this.state.objs.length;i ++){
            rows.push(<Row className={Style.row} obj={this.state.objs[i]} />)
        }

        return(
            <div>
                <Card className={Style.card}>
                    <div className={Style.miniheader}>
                        You have to do...
                    </div>
                    {rows}
                </Card>
            </div>
        )
    }

    async componentDidMount(){
        const ax = await axios.get("http://localhost:5000/get");
        console.log(ax);
        const obj = JSON.parse(ax.data);
        console.log(obj);
        
        this.setState({
            objs: obj.data
        })

        axios.post("http://localhost:5000/post");
    }
}