import React from 'react'
import { inject, observer } from 'mobx-react'
import { BackHandler, ListView } from 'react-native'
import { Body, 
         Container, 
         Content, 
         List, 
         ListItem, 
         Text, 
         Thumbnail } from 'native-base'

@inject('books') @observer 
export default class CategoryView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.category}` || 'Category Unknown',
    headerRight: <Thumbnail square source={require('../icon.png')}/>
  })

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const category = this.props.navigation.state.params.category

    const dataObj = this.filterBooks(this.props.books.booklist, category)
    this.state = {
      category,
      dataSource: ds.cloneWithRows(dataObj)
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }

  componentWillMount () {
    //for the purposes of mobx state management, before the screen loads, select the current category 
    this.props.books.selectCategory(this.state.category)
  }

  filterBooks (booklist, category) {
    //returns an array that contains only the books in the general booklist containing all books in the database with the specified category
    return booklist.toJS()
      .filter(book => book.category === category)
  }

  _onPress = (book) => {
    //event handler to direct the user into the specific screen for the book they have clicked on
    this.props.navigation.navigate('BookView', {book})
  }

  renderRow (book) {
    return (
      <ListItem button onPress={() => this._onPress(book)}>
        <Thumbnail square size={80} source={{uri: book.imageuri}}/>
        <Body>
        <Text>{book.name}</Text>
        </Body>
      </ListItem>
    )
  }

  render () {
    return (
      <Container>
        <Content>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections
            pageSize={10}
          />
        </Content>
      </Container>
    )
  }
}