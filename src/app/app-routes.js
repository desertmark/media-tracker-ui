import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import About from './about/about';
import Login from './login/login';
export default function AppRoutes() {
    return (
        <Switch>
            <Route path="/login"><Login></Login></Route>
            <Route path="/about"><About></About></Route>
            <Route path="/"><Home></Home></Route>
        </Switch>
    );
}