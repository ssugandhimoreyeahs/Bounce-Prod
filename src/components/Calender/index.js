import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LeftBlueArrow, RightBlueArrow, DollarWhite, BounceLogo, BlackCircleCross } from '@svg'
import { CustomButton } from '@components'

export default class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        // const Arrows = (props) => {
        //     return <LeftBlueArrow height={80} width={80} />
        // }

        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', width: '100%', paddingVertical: 10, paddingHorizontal: 20
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <BounceLogo height={50} width={50} />
                        <Text style={styles.bbText}>BB</Text>
                    </View>
                    <BlackCircleCross height={50} width={50} />
                </View>
                <Text style={{ color: '#fff', fontSize: 16, letterSpacing: 1.6, lineHeight: 23, width: '70%', alignSelf: 'center' }}>Promote, and expand your reach by up to 50%</Text>
                <CalendarPicker
                    textStyle={{ color: '#fff', fontSize: 18, fontFamily: 'AvenirNext-Regular' }}
                    previousComponent
                    nextComponent
                    headerWrapperStyle={{ justifyContent: 'flex-start', padding: 15 }}
                    // children={()=>{
                    //     return console.log("qqqqqqqq")
                    // }}

                    // headerWrapperStyle={{ backgroundColor: 'red' }}
                    // customDayHeaderStyles={ }
                    previousTitleStyle={{ fontSize: 22, fontFamily: 'AvenirNext-Regular' }}
                    todayTextStyle={{fontWeight:'bold',color:'#000'}}
                    todayBackgroundColor={'#1FAEF7'}
                    allowRangeSelection
                    onDateChange={this.onDateChange}
                    selectedRangeStartStyle={{ backgroundColor: '#414141' }}
                    selectedRangeEndStyle={{ backgroundColor: '#414141' }}
                    selectedRangeStyle={{ backgroundColor: '#414141' }}
                    customDatesStyles={{ color: 'red', backgroundColor: 'green' }}
                />

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 }}>
                    <Text style={{ color: '#fff', fontSize: 16, opacity: 0.5 }}>Promote until your event</Text>
                    <Text style={{ color: '#fff', fontSize: 18 ,marginTop:5}}>{startDate}</Text>

                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 15 }}>
                    <DollarWhite height={25} width={25} />
                    <Text style={[styles.bbText]}>{"105"}</Text>
                    <Text style={{ fontSize: 18, color: '#fff', opacity: 0.5 }}>{"  $3/day! "}</Text>
                </View>
                <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                    <CustomButton
                        Pay
                        ButtonTitle={"Promote"}
                        ContainerStyle={{ backgroundColor: '#000000', paddingVertical: 0, width: '80%', alignSelf: 'center' }}
                        ButtonStyle={{ backgroundColor: '#1FAEF7', borderRadius: 20, }}
                        TitleStyle={[styles.TitleStyle, { paddingVertical: 5, fontSize: 22, letterSpacing: 1.5 }]}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bbText: {
        fontFamily: 'AvenirNext-Regular',
        letterSpacing: 1.6,
        color: '#fff',
        fontSize: 22,
        marginLeft: 15
    },
    bbHeader: {
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 25,
        justifyContent: 'space-evenly'
    },
    container: {
        // width:'100%',
        flex: 1,
        // height:'90%',
        backgroundColor: '#1A1A1A',
        // marginTop: 100,
        // paddingHorizontal:5
        borderRadius: 20,
    },
    TitleStyle: {
        fontSize: 16,
        paddingVertical: 5
    },
});