import React, { Component  } from 'react';
import {server, uploadAPI} from '../config';
export default class home extends Component {
    constructor(props){
        super(props);
        this.state={name:'',contact:'',uploadStatus:''};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.onContactChange= this.onContactChange.bind(this);
        this.onNameChange= this.onNameChange.bind(this);
        this.fileInput = React.createRef();

    }
    onNameChange(evt){
        this.setState({name:evt.target.value});
    }
    onContactChange(evt){
        this.setState({contact:evt.target.value} )
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({uploadStatus:''});
        document.getElementById('spinner').classList.add('spinner-border');
        if(this.state.name.length<=1||this.state.contact.length<=1){
            alert("The fileds cannot be empty")
        }
        else{
            var formData=new FormData();
            formData.append('userName',this.state.name);
            formData.append('userContact',this.state.contact);
            //console.log(this.state.name);
            //console.log(this.state.contact);
        }
        if(this.fileInput.current.files[0]===undefined){
            alert("Please select an image to upload");
        }
        else{
            formData.append('file',this.fileInput.current.files[0])
            //console.log("Uploadable file Name:"+this.fileInput.current.files[0].name);
        }
        fetch(server+uploadAPI, {
            method: 'POST',
            body:formData // dynamic formdata Object
        }).then((resp) => {
            if(resp.status===200){
                document.getElementById('spinner').classList.remove('spinner-border');
                this.setState({uploadStatus:'Upload Success!!!'})
                //document.getElementById('successMsg').innerText="Upload Success!!!";
                this.setState({name:'',contact:''});
                console.log("upload done")
            };
        }).catch((error) => {
            document.getElementById('spinner').classList.remove('spinner-border');
            this.setState({uploadStatus:'Server Unreachable!!!'})
            //document.getElementById('successMsg').innerText="Server Unreachable";
            console.log(error);
        });


        
      }
    render() { 
        let dataLoader;
       return (
            <div className='container'>     
                <div className='row'>
                <div className='col'>
                <div className='slice left'>
                <p>Welcome </p>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Name: </label>
                        <input
                            type="text"
                            value={this.state.name}
                            placeholder='Ex. John'
                            onChange={this.onNameChange}
                            className="form-control"
                        />
                        <label>Contact: </label>
                        <input
                            type="number"
                            value={this.state.contact}
                            placeholder='Ex. 987654321'  
                            onChange={this.onContactChange}
                            className="form-control"
                        />
                        <div className='form-group'>
                            <label>Please select an image to upload: </label>
                            <br/>
                            <input 
                                type="file" 
                                name="file"
                                accept="image/*"
                                ref={this.fileInput}
                                />
                        </div>
                        <input type="submit" value="Upload " className="btn btn-primary" />
                    </div>
                </form>
                <div id='spinner' role="status">
                    <span className="sr-only">Loading...</span>
                    <h3 id="successMsg">{this.state.uploadStatus}</h3>
                </div>
            </div>
            </div>
                <div className='col slice' id='dataloader'>
                {dataLoader}
                </div>
            </div>
                    
        </div>
        )
    }
}

