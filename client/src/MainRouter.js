import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Nav from "./components/Nav/Nav";
import {Loader, ErrorModal} from "./components/UI/UI";
import {useSelector} from "react-redux";

const MainRouter = (props)=>{
    const isLoading = useSelector(state=> state.UI.isLoading);
    const errorOccured = useSelector(state=> state.UI.errorOccured);
    return(
        <>
            <Nav/>
            <Loader isLoading={isLoading}/>
            <ErrorModal errorOccured={errorOccured}/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/profile/:userId" component={Profile}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </>
    )
}

export default MainRouter;