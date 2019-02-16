import React, { Component } from 'react'
import axios from 'axios';
import {server, getDetailsByIdAPI,getImageByIdAPI} from '../config';

export default class DataLoader extends Component {
  constructor(props){
    super(props);
    this.state={id:this.props.id,userName:undefined,userContact:undefined,userUpload:undefined};
    this.getDetails=this.getDetails.bind(this);
    this.getImage=this.getImage.bind(this);

  }
  getDetails(e){
      axios(server + getDetailsByIdAPI + e.toString(), {
        method: 'GET',
        "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
      }).then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
        }
      }).catch((error) => {
        this.setState({ searchResults: 'Server Unreachable!!!' })
        console.log(error);
      });

  }
  getImage(e){
      axios(server + getImageByIdAPI + e.toString(), {
        method: 'GET',
        "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
      }).then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
        }
      }).catch((error) => {
        this.setState({ searchResults: 'Server Unreachable!!!' })
        console.log(error);
      });
  }
  async componentDidMount(){
    await this.getDetails(this.state.id);
  }
  render() {
    /**
     <h3>{this.props.userName}</h3>
            <h3>{this.props.userContact}</h3>
            <img src={this.props.file} alt={this.props.file.path} className="img-responsive" /><span>Hello {this.props.name}</span>
     */
    return (
      <div>
           {this.props.id} 
      </div>
    )
  }
}
