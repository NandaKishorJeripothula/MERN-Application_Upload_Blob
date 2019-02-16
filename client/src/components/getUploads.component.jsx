import React, { Component } from 'react';
import {server,getIdByContactAPI, getDetailsByIdAPI,getImageByIdAPI} from '../config'
import axios from 'axios';
import { isUndefined } from 'util';
import DataLoader from './dataLoder.component';
export default class getUploads extends Component {
    constructor(props){
        super(props);
        this.state={contact:'',searchResults:'',ids:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onContactChange=this.onContactChange.bind(this);
        this.getDetails= this.getDetails.bind(this);
        this.getImage= this.getImage.bind(this);
    }
    getDetails(e){
        e.forEach(element => {
            console.log(server + getDetailsByIdAPI + element.toString());
            axios(server + getDetailsByIdAPI + element.toString(), {
                method: 'GET',
                "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
            }).then(resp=>{
                if(resp.status===200){
                    console.log(resp.data);
                }
            }).catch((error) => {
                this.setState({searchResults:'Server Unreachable!!!'})
                console.log(error);
            });
        });

    }
    getImage(e){
        e.forEach(element => {
            axios(server + getImageByIdAPI + element, {
                method: 'GET',
                "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
            }).then(resp=>{
                if(resp.status===200){
                   // console.log(resp.data);
                }
            }).catch((error) => {
                this.setState({searchResults:'Server Unreachable!!!'})
                console.log(error);
            });
        });

    }
    async handleSubmit(e){
        e.preventDefault();
        if(this.state.contact.length<=1){
            alert("Please Input Proper Contact");
        }
        else {
            let uri= server.toString() + getIdByContactAPI.toString() + this.state.contact.toString();
            console.log(uri);
            await axios(uri, {
            //axios('http://localhost:4000/api/getIdsByContact/52344535', {
                method: 'GET',
                "headers":{"accept":"text/html,application/xhtml+xml,application/xml"},
            }).then((resp) => {
                if(resp.status===200){
                    if(resp.data!=='Empty'){
                        this.setState({ searchResults: 'Data Found' })
                        this.setState({ids:resp.data.ids});
                        this.getDetails(resp.data.ids);
                        this.getImage(resp.data.ids);

                    }
                    else{this.setState({searchResults:'No Data Found'})}
                }
            }).catch((error) => {
                this.setState({searchResults:'Server Unreachable!!!'})
                console.log(error);
            });
        }
        if(isUndefined(this.state.ids)){
            console.log(this.state.ids)
        }
    }
    onContactChange(e){
        this.setState({contact:e.target.value});
    }
    render() {
        let dataloader;
        if(this.state.ids.length!==0)
           {

        dataloader = this.state.ids.map((el, i) => (
            <DataLoader id={el} key={i}/>
            //<img key={i} className='images' src={el.path_lower} />
        ))}

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
                <div>
                    {dataloader}
                </div>  
            </div>
        )
    }
}