import React, { Component } from 'react';
import {server,getAllIds} from '../config';
import axios from 'axios';
import DataLoader from './dataLoder.component';

export default class GetAllUploads extends Component {
  ///api/getAllIds
  constructor(props){
    super(props);
    this.state={secret:'',searchResults:'',ids:[]};
    this.handleSubmit=this.handleSubmit.bind(this);
    this.secretChange=this.secretChange.bind(this);

  }
  secretChange(e){
    this.setState({secret:e.target.value});
  }
  async handleSubmit(e){
    e.preventDefault();
      if(this.state.secret.length<=1){
          alert("Please Input Proper Contact");
      }
      else {
        let uri = server.toString() + getAllIds.toString();
        console.log(uri);
        await axios(uri, {
          method: 'GET',
          "headers": { "accept": "text/html,application/xhtml+xml,application/xml" },
        }).then((resp) => {
          if (resp.status === 200) {
            if (resp.data !== 'Empty') {
              this.setState({ searchResults: 'Data Found' })
              this.setState({ ids: resp.data.ids });
            }
            else { this.setState({ searchResults: 'No Data Found' }) }
          }
        }).catch((error) => {
          this.setState({ searchResults: 'Server Unreachable!!!' })
          console.log(error);
        });
      }
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
          <div className='row form-group'>
            <label>Input Admin Secret: </label>
            <input
              type="number"
              value={this.state.secret}
              placeholder='Ex. 987654321'
              className="form-control"
              onChange={this.secretChange}
            />
          </div>
          <input type="submit" value="See Total Uploads " className="btn btn-primary" />
        </form>
        <h4>{this.state.searchResults}</h4>
        <div>
          {dataloader}
        </div>
      </div>
    )
  }
}
