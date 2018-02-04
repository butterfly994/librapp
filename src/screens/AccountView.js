import React from 'react';
import { observer, inject } from 'mobx-react/native';
import { Container,
         Header,
         Content,
         List,
         ListItem,
         Text,
         Body,
         Thumbnail,
         Button} from 'native-base';

@inject('users', 'books') @observer
export default class AccountView extends React.Component {
    static navigationOptions ={
        title:'My Account',
        headerRight: <Thumbnail square source={require('../icon.png')}/>
    };

    handleLogOut() {
        //logs out the users using the method in the users store and redirects the user to the main page of the app
        this.props.users.logout()
        this.props.navigation.navigate('EntryPoint')
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemHeader first>
                            <Text>Reserved Books</Text>
                        </ListItem>
                        {
                            this.props.users.userReserved.map(bookid =>{
                                return(
                                    <ListItem>
                                        <Thumbnail square size={80} source={{uri: this.props.books.booklist[bookid].imageuri}}/>
                                        <Body>
                                            <Text>{this.props.books.booklist[bookid].name}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            })
                        }  
                        <ListItem itemHeader>
                            <Text>Borrowed Books</Text>
                        </ListItem>
                        {
                            this.props.users.userCheckedOut.map(bookid =>{
                                return(
                                    <ListItem>
                                        <Thumbnail square size={80} source={{uri: this.props.books.booklist[bookid].imageuri}}/>
                                        <Body>
                                            <Text>{this.props.books.booklist[bookid].name}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            })
                        }
                        <ListItem itemHeader>
                            <Text>Overdue Books</Text>
                        </ListItem>
                        {
                            this.props.users.userOverdue.map(bookid =>{
                                return(
                                    <ListItem>
                                        <Thumbnail square size={80} source={{uri: this.props.books.booklist[bookid].imageuri}}/>
                                        <Body>
                                            <Text>{this.props.books.booklist[bookid].name}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                    <Button style={{marginTop:20, alignSelf:'center'}} onPress={_ => this.handleLogOut()}><Text>Log Out</Text></Button>
                </Content>    
            </Container>
        )
    }
}