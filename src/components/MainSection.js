import React, { Component }  from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function MainSection() {

    console.log("cat is ");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM";

    useEffect(() => {
        fetch("https://fe-assignment-server.herokuapp.com/api/v1/food/products", {
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

      const [filteredList, setFilteredList] = useState(items);
      const [selectedCategory, setSelectedCategory] = useState("");

      const filtered = items.filter(item => {
        return item.categoryId === `food_category_2`;
      });

      console.log(filtered);

      const filterByCategory = (filteredData) => {
        // Avoid filter for empty string
        if (!selectedCategory) {
          return filteredData;
        }
      
        const filteredFoods = filteredData.filter(
          (food) => food.category.split(" ").indexOf(selectedCategory) !== -1
        );
        return filteredFoods;
      };

      //console.log(items);

    return(
        <div className="mainThing">
            {items.map((item, index) => (
                    <div key={index} className = "mainItems">
                        <div className="mainInfo">
                            <h3>{`${item.name}`}</h3>
                            <h3>{`${item.price} €`}</h3>
                        </div>
                        <div className="mainDesc">{`${item.description}`}</div>
                    </div>
            ))}
        </div>
    )
}