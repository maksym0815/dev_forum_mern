import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home"
import Users from "./pages/Users/Users"

const MainRouter = ()=>{
    return(
        <Switch>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/" component={Home}/>
        </Switch>
    )
}

export default MainRouter;