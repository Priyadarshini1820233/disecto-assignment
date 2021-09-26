import React from "react";

import ImageGrid from "./comps/ImageGrid";
import Header from "./comps/Header";
import { Switch, Route } from "react-router-dom";
import AddEdit from "./comps/AddEdit";
import ListRecord from "./comps";
import View from "./comps/View";
import Error from "./comps/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={ListRecord} />
        <Route exact path="/add" component={AddEdit} />
        <Route exact path="/update/:id" component={AddEdit} />
        <Route exact path="/view/:id" component={View} />
        <Route exact path="/gallery" component={ImageGrid} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
