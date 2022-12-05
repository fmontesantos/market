import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MainSection from './components/MainSection';
import Mag from "./images/loupe.png"


function App() {
  return (
    <div className="App">
        <Header />
        <div className="mainSection">
          <Sidebar />
          <MainSection />
        </div>
    </div>
  );
}

export default App;
