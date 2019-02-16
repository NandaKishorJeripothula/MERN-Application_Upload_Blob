import React from 'react'

export default function DataLoader(props) {
  return (
    <div>
          <h3>{this.props.userName}</h3>
          <h3>{this.props.userContact}</h3>
          <img src={this.props.file} alt={this.props.file.path} className="img-responsive" /><span>Hello {this.props.name}</span>
    </div>
  )
}
