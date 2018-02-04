import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/main';

import {Provider} from 'mobx-react/native';
import {books, users} from './src/stores';

/*This file handles the fundamental initialization steps, 
as well as passing in the two mobx stores using Provider so that other files can call them*/

class LibraryApp extends React.Component {
    render() {
        return(
            <Provider users={users} books={books}>
                <App />
            </Provider>
        );
    }
}
AppRegistry.registerComponent('Library', () => LibraryApp);
