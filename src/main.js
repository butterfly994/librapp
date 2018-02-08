import React from 'react';
import {StackNavigator,
        DrawerNavigator,
        DrawerItems,
        SafeAreaView,
} from 'react-navigation';
import {ScrollView, View, Text} from 'react-native';
import {Icon} from 'native-base';
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

const BrowseNavigator = StackNavigator({
    CategoryList: {screen: CategoryList},
    CategoryView: { screen: CategoryView},
    BookView: {screen: BookView}
    },
);

/*drawer navigator is slightly different-at any page, swiping to the right 
from the left portion of the screen opens a bar to navigate to any page

also, a custom footer has been added to allow the user to log out straight from
the navigation sidebar*/

const CustomDrawer = (props) => (
    <View style={{flex: 1, paddingTop:20}}>
        <ScrollView>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
        <View style={{padding: 10, backgroundColor: 'grey'}}>
            <Icon name={'log-out'} style={{color:'white'}}/>
            <Text style={{color:'white'}} onPress={_ => users.logout()}>Log Out</Text>
        </View>
    </View>
);

const Navigator = DrawerNavigator({
    EntryPoint: { screen: EntryPoint },
    AccountView: { screen: AccountView },
    MapView: { screen: MapView},
    Browse: {screen: BrowseNavigator},
    },
    {
        navigationOptions: ({navigation}) => ({
            drawerIcon: () => {
                const { routeName } = navigation.state;
                let iconName;
                if(routeName === 'EntryPoint'){
                    iconName = 'home'
                }
                else if(routeName === 'MapView'){
                    iconName = 'map'
                }
                else if(routeName === 'AccountView'){
                    iconName = 'person'
                }
                else{
                    iconName = 'globe'
                }
                return  <Icon name={iconName}/>
            },
        }),
        contentComponent: CustomDrawer,
    }
);



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