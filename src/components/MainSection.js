import React, { Component }  from "react";

export default function MainSection(props) {

    return(
        <div className="mainThing">
            <div className="tickBoxDiv">
                <div 
                    className="tickBox" 
                    onClick={props.handlePriceClick}
                    style={{
                        color: props.priceFilter === "1" ? '#00FF00' : props.priceFilter === "2" ? '#FF0000' : ""
                    }}
                    >Price
                </div>
                <div 
                    className="tickBox" 
                    style={{
                        backgroundColor: props.isVeganActive ? '#F9B009' : '',
                        color: props.isVeganActive ? '#2A2D32' : '',
                        outline: props.isVeganActive ? '0.5px solid #2A2D32' : ''
                    }}
                    onClick={props.handleVeganClick}
                    >Vegan
                </div>
                <div 
                    className="tickBox" 
                    style={{
                        backgroundColor: props.isMeatActive ? '#F9B009' : '',
                        color: props.isMeatActive ? '#2A2D32' : '',
                        outline: props.isMeatActive ? '0.5px solid #2A2D32' : ''
                    }}
                    onClick={props.handleMeatClick}
                    >Meat
                </div>
                <div 
                    className="tickBox" 
                    style={{
                        backgroundColor: props.isSpicyActive ? '#F9B009' : '',
                        color: props.isSpicyActive ? '#2A2D32' : '',
                        outline: props.isSpicyActive ? '0.5px solid #2A2D32' : ''
                    }}
                    onClick={props.handleSpicyClick}
                    >Spicy
                </div>
            </div>
            {props.items.map((item, index) => (
                    <div key={index} className = "mainItems">
                        <div className="imageDiv">
                            <img src={`${item.image}`}/>
                            <div className="mainInfo">
                                <h3 className="mainTitle">{`${item.name}`}</h3>
                                <h3 className="mainDesc">{`${item.description}`}</h3>
                            </div>
                        </div>
                        <div className="mainPrice">{`${item.price} €`}</div>
                    </div>
            ))}
        </div>
    )
}