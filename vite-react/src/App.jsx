import React from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import { Delphi } from "./pages/Delphi";
import { Jokcy } from "./pages/Jokcy";
function App() {
  return (
    <HashRouter>
      <Link to="/">Jokcy</Link>
      <Link to="/index">Delphi</Link>
      <Switch>
        <Route component={Jokcy} exact path="/" />
        <Route component={Delphi} path="/index" />
      </Switch>
    </HashRouter>
  );
}

export default App;
