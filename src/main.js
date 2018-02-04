import React from 'react';
import {StackNavigator,
        TabNavigator
} from 'react-navigation';
import {observer, inject} from 'mobx-react/native';

import EntryPoint from './screens/EntryPoint.js';
import CategoryList from './screens/CategoryList.js';
import CategoryView from './screens/CategoryView.js';
import BookView from './screens/BookView.js';
import LoginView from './screens/LoginView.js';
import AccountView from './screens/AccountView.js';
import MapView from './screens/MapView.js';

import {users, books} from './stores';

/*navigator handles all of the behavior of when a screen transitions, the new screen is loaded on top of it,
and a back button is placed at the top to navigate back to it*/

const Navigator = StackNavigator({
    EntryPoint: { screen: EntryPoint },
    LoginView: { screen: LoginView },
    AccountView: { screen: AccountView },
    MapView: { screen: MapView},
    CategoryList: { screen: CategoryList },
    CategoryView: { screen: CategoryView },
    BookView: { screen: BookView }
});

@inject('users') @observer
export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(this.props.users.isLoggedIn){
            return <Navigator/>;    
        }
        else{
            return <LoginView/>
        }   
    }
}