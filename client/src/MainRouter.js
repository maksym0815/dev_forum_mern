import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Nav from "./components/Nav/Nav";
import Loader from "./components/UI/Loader/Loader";
import {useSelector} from "react-redux";

const MainRouter = (props)=>{
    const isLoading = useSelector(state=> state.UI.isLoading);
    return(
        <>
            <Nav/>
            <Loader isLoading={isLoading}/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </>
    )
}

export default withRouter(MainRouter);