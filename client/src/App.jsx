import { useEffect } from "react";
import { Handler } from "./context/Context";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TestSecondPage from "./pages/TestSecondPage";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
function App() {
  const { myData, setMyData } = Handler();

  useEffect(() => {
    setMyData("hello");
    console.log(myData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);
  return (
    <main 
    className={` min-h-screen relative`}>
    <Nav/>
    <SideBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<TestSecondPage />} />
      </Routes>
    </main>
  );
}

export default App;
