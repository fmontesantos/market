import './App.css';
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MainSection from './components/MainSection';
import { useState } from "react";
import { useEffect } from "react";


function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const token = process.env.REACT_APP_TOKEN;
    const [isVeganActive, setIsVeganActive] = useState(false);
    const [isMeatActive, setIsMeatActive] = useState(false);
    const [isSpicyActive, setIsSpicyActive] = useState(false);
    const [priceFilter, setPriceFilter] = useState("0");
    const [categoryId, setCategoryId] = useState(null);
    const [searchState, setSearchState] = useState("");
    const [filteredList, setFilteredList] = useState(items);

    useEffect(() => {
        fetch("https://fe-assignment-server.herokuapp.com/api/v1/food/products", {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
          .then(res => res.json())
          .then(
            (result) => {
              setPriceFilter("0");
              setIsLoaded(true);
              setItems(result);
              setFilteredList(result);
              setIsMeatActive(false);
              setIsVeganActive(false);
              setIsSpicyActive(false);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

      

      useEffect(() => {

        let newItems = [...items]

        if(categoryId !== null){
          newItems = newItems.filter(
            (item) => item.categoryId === categoryId
          )
        }
        if(isMeatActive){
          newItems = newItems.filter(
            (food) => food.tags.includes("Κρεατικά")
          )
        }
        if(isVeganActive){
          newItems = newItems.filter(
            (food) => food.tags.includes("Vegetarian")
          )
        }
        if(isSpicyActive){
          newItems = newItems.filter(
            (food) => food.tags.includes("Πικάντικα")
          )
        }
        if(priceFilter !== "0"){
          if(priceFilter==="1"){
            newItems.sort((a,b) => { 
              if (a.price > b.price) {
                  return 1;
              }
              if (a.price < b.price) {
                  return -1;
              }
              return 0;
          })
          }
          else if(priceFilter==="2"){
            newItems.sort((a,b) => { 
              if (a.price < b.price) {
                  return 1;
              }
              if (a.price > b.price) {
                  return -1;
              }
              return 0;
          })
          }
        }
        
        setFilteredList(newItems);
      }, [categoryId, isMeatActive, isVeganActive, isSpicyActive, priceFilter])


      const filterByCategoryId = (categoryId) => {
          setCategoryId(categoryId);
      };

      const returnToStart = () => {
          setPriceFilter("0");
          setSearchState("");
          setFilteredList (items);
          setIsMeatActive(false);
          setIsVeganActive(false);
          setIsSpicyActive(false);
          setCategoryId(null);
      };



      const handleChange = event => {
          setSearchState(event.target.value);
      
          console.log('value is:', event.target.value);
        };

      const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          //setCategoryId(null);
          setIsMeatActive(false);
          setIsVeganActive(false);
          setIsSpicyActive(false);
          setPriceFilter("0");
          if(searchState !== ""){
            const newItems = items.filter(
              (food) => food.id === searchState || food.categoryId === searchState || food.name === searchState
            );
                setFilteredList(newItems);
            }
          }
      }




      const handleVeganClick = () => {
        setIsVeganActive(current => !current);
      };

      const handlePriceClick = () => {
          if(priceFilter==="2"){
            setPriceFilter("0");
          }
          else if(priceFilter==="1"){
            setPriceFilter("2");
          }
          else if(priceFilter=="0"){
            setPriceFilter("1");
          }
      };

      const handleMeatClick = () => {
        setIsMeatActive(current => !current);
        console.log("Meat state is " + isMeatActive);
      };

      const handleSpicyClick = () => {
        setIsSpicyActive(current => !current);
        console.log("Spicy state is " + isSpicyActive);
      };


  return (
    <div className="App">
        <Header returnToStart={returnToStart} handleChange={handleChange} handleKeyPress={handleKeyPress} value={searchState}/>
        <div className="mainSection">
          <Sidebar filterByCategoryId={filterByCategoryId} categoryId={categoryId}/>
          <MainSection priceFilter={priceFilter} items={filteredList} handleVeganClick={handleVeganClick} handleMeatClick={handleMeatClick} handleSpicyClick={handleSpicyClick} isVeganActive={isVeganActive} isMeatActive={isMeatActive} isSpicyActive={isSpicyActive} handlePriceClick={handlePriceClick}/>
        </div>
    </div>
  );
}

export default App;
