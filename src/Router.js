import React from 'react'
import { Route, Switch } from 'react-router';
import Main from './components/main';
import Search from './components/search';

const Router = () => {

    return (
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/search" component={Search} />
            <Route component={Main} />
        </Switch>
    )
}

export default Router;
