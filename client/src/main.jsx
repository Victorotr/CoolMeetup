import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MyContextProvider } from "./context/Context.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="598877473123-p75a92o2ppoba3jd078v5gjqdvrrblb6.apps.googleusercontent.com">
    <MyContextProvider>
      <Router>
        <App />
      </Router>
    </MyContextProvider>
  </GoogleOAuthProvider>
);
