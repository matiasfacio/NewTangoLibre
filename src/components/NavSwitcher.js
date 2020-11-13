import React from 'react';
import ClassesLists from './ClassesLists'
import Students from './Students'
import About from './About'
import { Switch, Route } from 'react-router-dom'
import Checkingin from './Checkingin';
import Home from './Home'

const NavSwitcher = () => {
    return ( <div>
        <Switch>
            <Route exact path = '/'>
                <Home/>
            </Route>
            <Route exact path = '/StudentsArea'>
                <Students/>
            </Route>
            <Route path = '/Classes'>
                <ClassesLists/>
            </Route>
            <Route path = '/Checkin'>
                <Checkingin/>
            </Route>
            <Route path = '/About'>
                <About/>
            </Route>
        </Switch>
    </div> );
}
 
export default NavSwitcher;