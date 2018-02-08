import React from 'react'
import { Image } from 'react-native'
import { Container,
         Content,
         Card,
         CardItem,
         Left,
         Body,
         Text,
         Footer,
         FooterTab,
         Button,
         Icon,
         Thumbnail,
         Header,
         Title } from 'native-base'

export default class EntryPoint extends React.Component {
    static navigationOptions = {
        title: 'TRHS Library Main Page',
    };

    render() {
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>TRHS Library Main Page</Title>
                    </Body>
                </Header>
                <Content>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Body>
                                <Image source={{uri:'https://p3cdn4static.sharpschool.com/UserFiles/Servers/Server_3707511/Image/IMG_0185.jpg'}} style={{height: 200, width: 375}}/>
                                <Text>{
`
Welcome to the Timonium Ridge High School Library!
                                        
Hours: 
Open before school 7:00-7:45 am Monday-Thursday
Open after school 2:15-3:30 pm all weekdays
Open during lunches only on B days
                                        
Your One-Stop Shop for peer tutoring, great reads, service learning information, technology help, and printing services.

Let's all make the journey to better literacy together!`
                            }</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}