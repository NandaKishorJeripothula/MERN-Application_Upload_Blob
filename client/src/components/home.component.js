import React, { Component } from 'react';
export default class home extends Component {
    constructor(props){
        super(props);
        this.state={name:'Name',contact:'987654321'};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.onContactChange= this.onContactChange.bind(this);
        this.onNameChange= this.onNameChange.bind(this);
    }
    onNameChange(evt){
        this.setState({name:evt.target.value});
    }
    onContactChange(evt){
        this.setState({contact:evt.target.value} )
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.name.length<=1||this.state.contact.length<=1){
            alert("The fileds cannot be empty")
        }
        console.log(this.state.name);
        console.log(this.state.contact);
        
      }
    render() {
        return (
            <div>
                <p>Welcome </p>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Name: </label>
                        <input
                            type="text"
                            placeholder={this.state.name}
                            onChange={this.onNameChange}
                            className="form-control"
                        />
                        <label>Contact: </label>
                        <input
                            type="number"
                            placeholder={this.state.contact}   
                            onChange={this.onContactChange}
                            className="form-control"
                        />
                        <div className='form-group'>
                            <label>Please select an image to upload: </label>
                            <br/>
                            <input 
                                type="file" 
                                name="file"
                                />
                        </div>
                        <input type="submit" value="Upload " className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}