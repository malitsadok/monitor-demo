import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

export default class MonitorPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            monitorFlag : false ,
            folderName: '', 
            eventList: [],
            isStartClicked : false
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.onChangeFolderName = this.onChangeFolderName.bind(this);
        this.getItems = this.getItems.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    onChangeFolderName(e) {
        this.setState({ folderName: e.target.value})
    }

    handleStart(e) {
        e.preventDefault();
        this.setState({ isStartClicked: true })
        const monitor = {  
            folderName: this.state.folderName,
        }

        axios.post('http://localhost:5000/monitor/start/' , monitor)
            .then(res => console.log(res.data));
    }

  

    handleStop(e) {
        e.preventDefault();
        this.setState({ isStartClicked: false})
        axios.post('http://localhost:5000/monitor/stop')
            .then(res => console.log(res.data))
    }


    handleLogOut(e) {
        e.preventDefault();   
        axios.post('http://localhost:5000/monitor/logout')
            .then(this.props.history.push("/"))
    }




    componentDidMount() {  
        this.timer = setInterval(() => this.getItems(), 1000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    getItems() {
      axios.get('http://localhost:5000/monitor/status')
           .then(result => this.setState({ eventList: result.data }))
    }





    render() {
        return (
<div>          
<div className="box-container"> 
     <div className="inner-container">
        <div className="App-header">
             Sapiens - spy 
        </div>
        <div className="box">
                <label>Folder Name:</label>
                <input
                    type="text"
                    required
                    className="input-group"                 
                    value={this.state.folderName}
                    onChange={this.onChangeFolderName} />
                <button className="my-btn" disabled={this.state.isStartClicked} onClick={this.handleStart}>
                    start
               </button>       
             
                <button className="my-btn" disabled={!this.state.isStartClicked} onClick={this.handleStop}>
                    stop
               </button>
      
                <ul>
                    {this.state.eventList.map(function (item) {
                        return <li key={item.id}>{item.event}</li>;
                    })}
                </ul>

                  
        </div>
                </div> 
                
   </div>
         <button onClick={this.handleLogOut}>logOut</button>
</div>        
        );
    }
}