import React, { Component }  from "react";
import { useState } from "react";
import { useEffect } from "react";
import MainSection from "./MainSection";

export default function Sidebar() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM";

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

      console.log(items);

    return(
        <div className="sidebarDiv">
            <ul>
            {items.map(item => (
                <li key={item.index}>
                    {item.name}
                </li>
            ))}
            </ul>
        </div>
    )
}