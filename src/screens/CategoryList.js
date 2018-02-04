import React from 'react'
import { inject, observer, toJS } from 'mobx-react'
import { BackHandler, ListView } from 'react-native'
import { Button, 
         Container, 
         Content, 
         List, 
         ListItem, 
         Text,
         Thumbnail } from 'native-base'

@inject('books') @observer
export default class CategoryList extends React.Component {
  static navigationOptions = {
    title: 'Categories',
    headerRight: <Thumbnail square source={require('../icon.png')}/>
  }

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataObj = this.findCategories(this.props.books.booklist)
    this.state = {
      dataSource: ds.cloneWithRows(dataObj)
    }
    this.renderRow = this.renderRow.bind(this)
  }

  findCategories (booklist) {
    //this method turns the array of book objects into an array of strings containing all the category names present in the array of book objects
    //the main functionality is using javascript Set to enforce a no duplicates property, then converting the Set into a conventional array
    const categories = new Set()
    booklist.toJS()
      .map((book) => book.category)
      .forEach((cat) => categories.add(cat))

    return Array.from(categories)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }

  _onPress = (category) =>{
    //direct the user from this screen to a specified screen for the selected category when this event handler is triggered
    this.props.navigation.navigate('CategoryView', {category})
  }

  renderRow (category) {
    //each row item is composed of text of the category name, and an event handler to handle clicking on it
    return (
      <ListItem button onPress={_ => this._onPress(category)}>
        <Text>{category}</Text>
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
            pageSize={15}
          />
        </Content>
      </Container>
    )
  }
}