import React, { PureComponent } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';

import { YellowStar, GreyStar } from '@assets'
const STAR_IMAGE = YellowStar
const STAR_SELECTED_IMAGE = GreyStar
const STAR_SIZE = 15;

export default class Star extends PureComponent {
    static defaultProps = {
        selectedColor: '#F8A41E',
        unSelectedColor: "#BDC3C7",
    };

    constructor() {
        super();
        this.springValue = new Animated.Value(1);

        this.state = {
            selected: false
        };
    }

    spring() {
        const { position, starSelectedInPosition,StarSize } = this.props;

        this.springValue.setValue(1.2);

        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 2,
                tension: 1,
                useNativeDriver: true,
            }
        ).start();

        this.setState({ selected: !this.state.selected });
        starSelectedInPosition(position);
    }

    render() {
        const { fill, size, selectedColor, unSelectedColor, isDisabled, starStyle,StarSize,styleProp } = this.props;
        const starSource = fill && selectedColor === null ? STAR_SELECTED_IMAGE : STAR_IMAGE;

        return (
            <TouchableOpacity activeOpacity={1} onPress={this.spring.bind(this)} disabled={isDisabled}>
                <View style={[styles.footerList,styleProp]}>
                    <Animated.Image
                        source={starSource}
                        style={[
                            styles.starStyle,
                            {
                                tintColor: fill && selectedColor ? selectedColor : unSelectedColor,
                                width: StarSize || STAR_SIZE,
                                height: StarSize || STAR_SIZE,
                                transform: [{ scale: this.springValue }]
                            },
                            starStyle
                        ]}
                    />

                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    starStyle: {
        margin: 3,
    },
    footerList: {
        padding: 0.5,
        backgroundColor: '#414141',
        borderRadius: 5,
        marginRight: 5
    }
});