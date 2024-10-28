
import './App.css'
import Timer from "./components/Timer.jsx";


function App() {


  return (
    <div className="App">
        <Timer title="Timer 1" elapsedTime={5} endTime={10} />
        <Timer title="Timer 2" elapsedTime={10} endTime={20} />
        <Timer title="Timer 3" elapsedTime={15} endTime={30} />
        <Timer title="Timer 4" elapsedTime={20} endTime={40} />
        <Timer title="Timer 5" elapsedTime={25} endTime={50} />
        <Timer title="Timer 6" elapsedTime={30} endTime={60} />
        <Timer title="Timer 7" elapsedTime={35} endTime={70} />
        <Timer title="Timer 8" elapsedTime={40} endTime={80} />
        <Timer title="Timer 9" elapsedTime={45} endTime={90} />
        <Timer title="Timer 10" elapsedTime={50} endTime={100} />
    </div>
  )
}

export default App
