import React from 'react'
import { Image } from 'react-native'
import { Container,
         Content,
         Thumbnail } from 'native-base'

export default class EntryPoint extends React.Component {
    static navigationOptions = {
        title: 'School Map',
        headerRight: <Thumbnail square source={require('../icon.png')}/>
    };

    render() {
        return (
            <Container>
                <Content>
                    <Image source={require('../map.png')}/>
                </Content>
            </Container>
        )
    }
}