import React, { Component } from "react";
import ReactSearchBox from "react-search-box";
import Mag from "../images/loupe.png"

export default function Header(ele) {

    return(
        <div className="headerDiv">
            <h2 className="logo">FMONTESANTOS</h2>
            <div className="searchBar">
                <img src={Mag}/>
                <input
                    type="text" 
                    placeholder="" 
                    className="searchText"
                >
                </input>
            </div>
        </div>
    )
}