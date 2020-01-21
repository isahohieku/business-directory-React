import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import Root from './Root';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
    <Root>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Root>, document.getElementById("root"));

serviceWorker.unregister();
