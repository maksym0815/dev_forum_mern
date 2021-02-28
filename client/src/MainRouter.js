import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav/Nav";

const MainRouter = (props)=>{
    return(
        <>
            <Nav/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </>
    )
}

export default withRouter(MainRouter);