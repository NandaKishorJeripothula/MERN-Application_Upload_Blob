import React, { Component } from 'react'

import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container'>

                <Link to="/" className="navbar-brand">React Node Blob Uploads</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/getUploads" className="nav-link">Get Your Uploads</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/getAllUploads" className="nav-link">Get All Uploads</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      
    )
  }
}
