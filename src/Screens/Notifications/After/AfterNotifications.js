import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, BlueCard, BlackCard, Footer, TapRating } from '@components'
import { Avatar } from 'react-native-elements'
import {
    Peoples,
    Message,
    WhiteDownload,
    WhiteParty,
    Girl,
    Dollar
} from '@assets'

export default function Notifications() {

    const LeaveReview = () => {
        return (
            <View >
                <View style={{ backgroundColor: '#272727', borderRadius: 24 }}>
                    <Image source={Girl} style={{ height: 300, width: "100%", borderTopLeftRadius: 24, borderTopRightRadius: 24 }} />
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, paddingBottom: 10 }}>{"Jamon Ingram"}</Text>
                        <TapRating StarSize={12} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10,paddingBottom:30 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 18, paddingBottom: 10 }}>{"Leave a review:"}</Text>
                        <TapRating StarSize={26} />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Header
                    headerTitle={"Notifications"}
                />
                <BlueCard
                    icon={Dollar}
                    firstTitle={"2 Payments"}
                    secondTitle={"Vendors are requesting to work at your event!"}
                />
                <LeaveReview />
                <BlackCard
                    name={"Nicole Silkman"}
                    rightIcon={Message}
                    commentLineText={"Comment on your post"}
                    commentText={"Had so much fun! Could we please throw this party every year?? Let’s make it a tradition haha"}
                />
                <BlackCard
                    name={"Nicole Silkman"}
                    rightIcon={WhiteDownload}
                    commentLineText={"Saved your Post"}
                />
                <BlackCard
                    name={"Brian Robinson"}
                    rightIcon={WhiteParty}
                    commentLineText={"invited you to his event!"}
                />
                <View style={styles.eventDate}>
                    <Text style={styles.name}>Grad Night 2021</Text>
                    <Text style={styles.commentLineTextStyle}>Sat. October 3, 9:00pm</Text>
                </View>

            </ScrollView>
            <Footer
                notification
            />
        </View>
    )
}
const styles = StyleSheet.create({

    blueNotificationCard: {
        backgroundColor: 'radial - gradient(76.22 % 76.22 % at 50 % 23.78 %, rgba(31, 174, 247, 0.69) 0 %, rgba(31, 174, 247, 0.5) 100 %, rgba(31, 174, 247, 0.42) 100 %)',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    eventDate: {
        backgroundColor: '#313131',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
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
        backgroundColor: '#000000'
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    commentLineTextStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        opacity: 0.7
    },
})
