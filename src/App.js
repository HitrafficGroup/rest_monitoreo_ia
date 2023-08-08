
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeView from './views/HomeView';
import TestView from './views/TestView';
import SideBar from './components/side-bar';
function App() {
  return (
    <>


      <SideBar>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/test" element={<TestView />} />
        </Routes>
      </SideBar>


    </>

  );
}

export default App;
