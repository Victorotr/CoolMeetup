import "./App.css";
import { useEffect } from "react";
import { Handler } from "./context/Context";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TestSecondPage from "./pages/TestSecondPage";
function App() {
  const { myData, setMyData } = Handler();

  useEffect(() => {
    setMyData("hello");
    console.log(myData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);
  return (
    <main className="flex items-center justify-center ">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<TestSecondPage />} />
      </Routes>
    </main>
  );
}

export default App;
