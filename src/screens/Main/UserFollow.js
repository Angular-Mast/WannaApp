import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText } from 'native-base';
import { Header, TextInput, Text, Button, FeedCard, Badge } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';

const { width, height } = Dimensions.get('window');

const UserSection = props => {
  return (
    <View 
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - w(30),
        marginRight: 'auto',
        marginLeft: 'auto',
      }}>
        <Image 
          source={images['user_avatar']}
          style={{
            width: m(50),
            height: m(50),
            // position: 'absolute',
            // top: h(220)
          }}
        />
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
          <Button 
            text="Followers"
            height={m(40)}
            width={m(128)}
            borderRadius={5}
            borderColor={Colors.white.base}
            color={Colors.primary.base}
            bold
            style={{marginRight: w(8)}}
            onPress={() => props.pressFollowers()}
          />
          <Button 
            text="Write"
            height={m(40)}
            width={m(112)}
            borderRadius={5}
            borderColor={Colors.white.base}
            color={Colors.primary.base}
            bold
          />
        </View>
    </View>
  )
}
const feedsActive = [
  {
    splitImage: "feed_coffee",
    ownerAvatar: "split_owner",
    ownerName: "John Stevenson Jr.",
    cost: "$5",
    numberOfPeople: " * 2 People",
    splitTitle: "Let's share a coffee",
    splitType: "Person",
    splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
    splitStatus: 'active',
    time: "10:15 min"
  },
  {
    splitImage: "feed_coffee1",
    ownerAvatar: "kelly",
    ownerName: "John Stevenson Jr.",
    cost: "$5",
    numberOfPeople: " * 2 People",
    splitTitle: "Let's share a coffee",
    splitType: "Person",
    splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
    splitStatus: 'active',
    time: "10:15 min"
  }
]
const feedsCompleted = [
  {
    splitImage: "feed_coffee1",
    ownerAvatar: "split_owner",
    ownerName: "John Stevenson Jr.",
    cost: "$5",
    numberOfPeople: " * 2 People",
    splitTitle: "Let's share a coffee",
    splitType: "Person",
    splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
    splitStatus: 'completed',
    time: "10:15 min"
  },
  {
    splitImage: "feed_coffee",
    ownerAvatar: "kelly",
    ownerName: "John Stevenson Jr.",
    cost: "$5",
    numberOfPeople: " * 2 People",
    splitTitle: "Let's share a coffee",
    splitType: "Person",
    splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
    splitStatus: 'completed',
    time: "10:15 min"
  }
]
export default class UserFollow extends Component {
  
  state = {
    feeds: [],
    focusedSplits: 'active'
  }

  componentDidMount() {
    this.setState({feeds: feedsActive});
  }

  onActiveSplits = () => {
    this.setState({
      focusedSplits: 'active',
      feeds: feedsActive
    });
  }

  onCompletedSplits = () => {
    this.setState({
      focusedSplits: 'completed',
      feeds: feedsCompleted
    });
  }

  onPressDescIcon = iconName => {
    if (iconName === 'comment') {
      this.props.navigation.navigate('CommentsScreen');
    }
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onSplit = splitStatus => {
    if (splitStatus !== 'active') {
      return;
    }

    this.props.navigation.navigate('ChatRoomScreen');
  }

  onPressFollowers = () => {
    this.props.navigation.navigate('FollowersScreen');
  }

  render() {
    const { 
      feeds,
      focusedSplits 
    } = this.state;

    return(
      <ScrollView 
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
      >
        <Header 
          onLeftIconPress={this.goToBack}
          onRightIconPress={() => {return}}
          leftIcon="back_arrow"
          title="ms.constant"
          rightIcon="menu_detail"
          rightIconSize={{
            width: m(4),
            height: m(16)
          }}
        />
        <Image 
          source={images['cover_photo']}
          style={{
            width: w(376),
            height: h(200)
        }}/>
        <View 
          style={{
            position: 'absolute',
            top: h(220),
            left: w(15)
          }}>
          <UserSection pressFollowers={this.onPressFollowers} />
        </View>
        <View style={styles.container}>
          <Text
            text="ms.constant"
            size={fontSizes.bigger}
            color={Colors.black.dark}
            semiBold
            style={{marginTop: h(23)}}
          />
          <Text 
            text="No one likes to have teeth that are not bright and white. Teeth are a very important aspect for the overall appearance of a person. Looking good and appearing presentable is very important in today’s competitive world."
            style={{marginTop: h(20)}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: h(25),
              marginBottom: h(30),
              borderColor: Colors.grey.lightest,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={() => this.onActiveSplits()}>
              <View 
                style={[focusedSplits === 'active' ? styles.activeBorder : '',  {
                  paddingBottom: h(10),
                }]}>
                <Text
                  semiBold 
                  text="Active splits"
                  size={fontSizes.bigger}
                  color={focusedSplits === 'active' ? Colors.black.base : Colors.grey.lighter}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onCompletedSplits()}>
              <View 
                style={[focusedSplits === 'completed' ? styles.activeBorder : '',  {
                  paddingBottom: h(10),
              }]}>
                <Text
                  semiBold 
                  text="Completed"
                  size={fontSizes.bigger}
                  color={focusedSplits === 'completed' ? Colors.black.base : Colors.grey.lighter}
                />
              </View>
            </TouchableOpacity>
          </View>
          {_.map(feeds, (feed, key) => {
              return (
                <FeedCard 
                  key={key}
                  onPressDescIcon={this.onPressDescIcon}
                  onPressAvatar={() => {return}}
                  splitImage={feed.splitImage}
                  ownerAvatar={feed.ownerAvatar}
                  ownerBrandAvatar={feed.ownerBrandAvatar}
                  ownerName={feed.ownerName}
                  brandName={feed.brandName}
                  cost={feed.cost}
                  numberOfPeople={feed.numberOfPeople}
                  splitTitle={feed.splitTitle}
                  splitType={feed.splitType}
                  splitComment={feed.splitComment}
                  time={feed.time}
                  splitStatus={feed.splitStatus}
                  onPressSplit={this.onSplit}
                />
              )
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ...commonStyle,
  activeBorder: {
    borderColor: Colors.primary.base,
    borderBottomWidth: 3
  }
});
