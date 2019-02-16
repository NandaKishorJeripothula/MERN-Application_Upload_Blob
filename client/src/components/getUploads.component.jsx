import React, { Component } from 'react';
import {server,getIdByContactAPI} from '../config'
import axios from 'axios';
export default class getUploads extends Component {
    constructor(props){
        super(props);
        this.state={contact:'',searchResults:''};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onContactChange=this.onContactChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();

        if(this.state.contact.length<=1){
            alert("Please Input Proper Contact");
        }
        else {
            let uri= server.toString() + getIdByContactAPI.toString() + this.state.contact.toString();
            console.log(uri);
            axios(uri, {
            //axios('http://localhost:4000/api/getIdsByContact/52344535', {
                method: 'GET',
                "headers":{"accept":"text/html,application/xhtml+xml,application/xml"},
            }).then((resp) => {
                console.log(resp.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    onContactChange(e){
        this.setState({contact:e.target.value});
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <h6>Please Input your unique contact:  </h6>
                        <input
                            type="number"
                            value={this.state.contact}
                            placeholder='Ex. 987654321'
                            onChange={this.onContactChange}
                            className="form-control"
                        />  
                    </div>
                    <input type="submit" value="Get My Uploads " className="btn btn-primary" />
                </form>
                <h4>{this.state.searchResults}</h4>
            </div>
        )
    }
}