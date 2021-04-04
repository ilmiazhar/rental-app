import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

//mongodb+srv://admin:<password>@ilmiesmongodb.3fwxy.mongodb.net/<dbname>?retryWrites=true&w=majority
//ilmiego1@gmail.com

//mongodb+srv://<username>:<password>@ilmiesmongodb.3fwxy.mongodb.net/<dbname>?retryWrites=true&w=majority


console.log("SUPERMAN", process.env.REACT_APP_NAME);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
