import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs, Link } from "preact-router";

import Weather from "../routes/weather";
import Calender from "../routes/calender";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    };
 
    public render() {
        return (
            <div id="app">
                <Router onChange={this.handleRoute}>
                    <Route path="/" component={Weather} />
                    <Route path="/calender" component={Calender} />
                </Router>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" activeClassName="active">Weather</Link>
                        </li>
                        <li>
                            <Link href="/calender" activeClassName="active">Calender</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
