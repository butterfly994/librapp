import React from 'react'
import { BackHandler, Image, Share } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Body,
         Button, 
         Card, 
         CardItem, 
         Container, 
         Content, 
         Icon, 
         Left, 
         Text,
         Thumbnail } from 'native-base'

@inject('books', 'users') @observer
export default class BookView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.book.name}` || 'Book unknown name',
    headerRight: <Thumbnail square source={require('../icon.png')}/>
  })

  constructor (props) {
    //sets state to include necessary information for rendering the screen - moment being the current time and book being the selected book
    super(props)
    let moment = require('moment')
    this.state = {
      book: this.props.navigation.state.params.book,
      time: moment
    }
  }

  componentWillMount () {
    //before the screen is loaded, run the method to select the current book
    this.props.books.selectBook(this.state.book.bookId)
  }

  componentDidMount () {
    //after the screen is loaded, if the user presses the back button of their device, go to the last visited screen
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }

  handleReservePress(){
    //when the user presses the button to reserve a book, call the updateStatus method to change the database entry for the book with a new status reflecting both that it is reserved, and the date it was reserved
    //additionally, navigate the user back to the main page
    this.props.books.updateBookStatus(this.props.books.selectedBook.bookId, this.props.users.id, `R ${this.state.time().format('MMDDYYYY')}`);
    this.props.navigation.navigate('EntryPoint')
  }

  handleCheckOutPress(){
    //when the user presses the button to check out a book, call the updateStatus method to change the database entry for the book with a new status reflecting both that it was checked out, and the date it was reserved
    //additionally, navigate the user back to the main page
    this.props.books.updateBookStatus(this.props.books.selectedBook.bookId, this.props.users.id, `C ${this.state.time().format('MMDDYYYY')}`);
    this.props.navigation.navigate('EntryPoint')
  }

  handleSharePress(){
    //use react native's built in Share method to, using any social method on the user's device(Facebook app, messenger, Twitter, etc) to post about a book they are interested
    Share.share({
      message: `Check out this cool book! It's ${this.props.books.selectedBook.name}.`,
      title:'My soon-to-be read',
      url:`https://www.goodreads.com/book/title?id=${this.props.books.selectedBook.name.replace(" ", "%2B")}`
    }, {
      dialogTitle: 'Spread the love of reading!'
    })
  }

  render () {
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                <Text>{this.state.book.name}</Text>
                <Text>{this.state.book.author}</Text>
                <Text note>{this.state.book.status[0] === 'A' ? 'Available' : 'Unavailable'}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Image source={{uri: this.state.book.imageuri}} style={{height: 200, width: 200, alignSelf: 'center'}}/>
              <Text>{this.state.book.summary}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button disabled={this.state.book.status[0] !== 'A'}
                        onPress={_ => this.handleReservePress()}>
                  <Text>Reserve</Text>
                </Button>
              </Left>
              <Button disabled={this.state.book.status[0] !== 'A'}
                      onPress={_ => this.handleCheckOutPress()}>
                <Text>Check Out</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button onPress={_ => this.handleSharePress()}>
              <Icon active name="share"/>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}