import React from 'react'
import { View, Text } from 'react-native'
import MobxStore from '../../../mobx';
import { observer } from 'mobx-react';
import AddInterest from './AddInterest';
import NewsFeed from './NewsFeed';

function ConditionalRenderNewsFeed(props) {
    const {
        authStore
    } = MobxStore;
    const { navigation } = props;
    const userinfo = authStore.userProfile;
    const {
        userInterest
    } = userinfo.user
    console.log("USER INFO STRINGIFY:", JSON.stringify(userinfo.user))
    console.log("userInterest", userInterest.length)
    return (
        <View style={{ flex: 1 }}>
            {userInterest.length > 0 ?
                <NewsFeed {...props} />
                :
                <AddInterest {...props} />
            }
        </View>
    )
}
ConditionalRenderNewsFeed.routeName = "/ConditionalRenderNewsFeed";
export default observer(ConditionalRenderNewsFeed)