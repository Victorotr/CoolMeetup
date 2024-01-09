import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyContextProvider } from "./context/Context.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <Router>
      <App />
    </Router>
  </MyContextProvider>
);
