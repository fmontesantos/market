import React, { Component }  from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const token = process.env.REACT_APP_TOKEN;

    useEffect(() => {
        fetch("https://fe-assignment-server.herokuapp.com/api/v1/food/categories", {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

      items.sort((a,b) => { 
        if (a.index > b.index) {
            return 1;
        }
        if (a.index < b.index) {
            return -1;
        }
        return 0;
    })

      function handleClickCategory(categoryId) {
        props.filterByCategoryId(categoryId)
      };

    return(
        <div className="sidebarDiv">
            <ul>
            {items.map(item => (
                <li key={item.index} onClick={()=>{handleClickCategory(item.id)}} style={{color: props.categoryId === item.id ? '#F9B009' : ''}}>
                    {item.name}
                </li>
            ))}
            </ul>
        </div>
    )
}