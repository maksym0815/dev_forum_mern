import React from "react";
import {Switch, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import AccountSettings from "./pages/Account Settings/AccountSettings";
import {Loader, ErrorModal} from "./components/UI/UI";

const MainRouter = ()=>{
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
                <ProtectedRoute exact path="/profile/:userId" component={Profile}/>
                <ProtectedRoute exact path="/profile" component={Profile}/>
                <ProtectedRoute exact path="/settings" component={AccountSettings}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </>
    )
}

export default MainRouter;