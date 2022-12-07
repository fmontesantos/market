import React, { Component } from "react";
import Mag from "../images/Mag.png"

export default function Header(props) {


    return(
        <div className="headerDiv">
            <h2 className="logo" onClick = {props.returnToStart}>FMONTESANTOS</h2>
            <div className="searchBar">
                <img src={Mag}/>
                <input
                    type="text" 
                    placeholder="" 
                    className="searchText"
                    onChange={props.handleChange}
                    value={props.value}
                    onKeyPress={props.handleKeyPress}
                >
                </input>
            </div>
        </div>
    )
}