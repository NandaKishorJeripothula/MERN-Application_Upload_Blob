import React, { Component } from 'react';
import {server,getAllIds} from '../config';
import axios from 'axios';
export default class GetAllUploads extends Component {
  ///api/getAllIds
  constructor(props){
    super(props);
    this.state={secret:''};
    this.handleSubmit=this.handleSubmit.bind(this);
    this.secretChange=this.secretChange.bind(this);

  }
  secretChange(e){
    this.setState({secret:e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
      if(this.state.secret.length<=1){
          alert("Please Input Proper Contact");
      }
      else {
          let uri= server.toString() + getAllIds.toString() ;
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
  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
        <div className='row form-group'>
        <label>Input Admin Secret: </label>
                        <input
                            type="number"
                            placeholder='Ex. 987654321'  
                            className="form-control"
                            onChange={this.secretChange}
                        />
        </div>
        <input type="submit" value="See Total Uploads " className="btn btn-primary" /></form>
      </div>
    )
  }
}
