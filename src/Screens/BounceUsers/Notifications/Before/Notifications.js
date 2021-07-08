import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import {
    Header,
    Scaffold,
    MessageCard,
    FriendRequest,
    InviteRequest,
} from '@components'
import {
    StarPerson,
    Girl,
    Message,
    WhiteDownload,
    WhiteParty,
} from '@assets'
import { FONTSIZE } from '@utils'
import { Payment } from '../../../../components'
import { getHp } from '../../../../app/utils'

const MESSAGESTACK = [{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    price: '$750.00',
    desc:'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.'
},
{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    price: '$750.00',
    desc:'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.'
},
]


const ReviewStack = [{
    icon: Girl,
    name: "David Poura",
    time: "Sat. October 3, 9:00pm",
    partyType: "Grad Night 2021",
    price: '$750.00',
    desc:'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.'
},
{
    icon: Girl,
    name: "David Poura",
    time: "Sat. October 3, 9:00pm",
    partyType: "Grad Night 2021",
    price: '$750.00',
    desc:'Hiring this vendor wil place him inside the ‘Featuring’ section in your event page.'
},
]

export default function Notifications() {
    return (
        // <View style={styles.container}>
        //     <Text style={[styles.headingStyle, { color: '#000' }]}>
        //         {"No notification's available."}
        //     </Text>
        // </View>
        <Scaffold>
            <View style={styles.container}>
                <ScrollView>

                    <Payment
                        MESSAGESTACK={MESSAGESTACK}
                        heading={'Payments'}
                    />
                    <MessageCard
                        MESSAGESTACK={MESSAGESTACK}
                        heading={'Messaging'}
                    />
                    <FriendRequest
                        MESSAGESTACK={MESSAGESTACK}
                        heading={'Friend Requests'}
                    />
                    <InviteRequest
                        MESSAGESTACK={ReviewStack}
                        heading={'Invites'}
                    />

                </ScrollView>
            </View>
        </Scaffold>
    )
}

Notifications.routeName = "/BENotification";
const styles = StyleSheet.create({
    headingStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text20,
        fontFamily: 'AvenirNext-Regular'
    },

    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        marginBottom: getHp(50)
    },
    commentLineTextStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        opacity: 0.7
    },
})
