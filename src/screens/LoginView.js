import React, {Component} from 'react'
import { Text, View } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../components/LoginForm'

@inject('users') @observer
class Login extends Component {
  onLogin(email, password) {
    this.props.users.login(email, password);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{padding: 20, marginTop: 20, backgroundColor: '#eee'}}>
        <Icon name="book" size={60} color='#ccc' style={{alignSelf: 'center', paddingBottom: 20}}/>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text>- Please, log in to continue -</Text>
        </View>
        <LoginForm
          onPress={this.onLogin.bind(this)}
          busy={this.props.users.loggingIn}
          loggingError={this.props.users.loggingError}
        />
      </KeyboardAwareScrollView>
    )
  }
}

export default Login;
