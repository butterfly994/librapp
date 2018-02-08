import React from 'react'
import { Image } from 'react-native'
import { Container,
         Content,
         Thumbnail,
         Header,
         Title,
         Body } from 'native-base'

export default class EntryPoint extends React.Component {
    static navigationOptions = {
        title: 'School Map',
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>School Map</Title>
                    </Body>
                </Header>
                <Content>
                    <Image source={require('../map.png')}/>
                </Content>
            </Container>
        )
    }
}