import React, { memo } from 'react';
import {
    View,
    Text
} from 'react-native';
import { colors } from '../commons';
import { styles } from './Styles';

const SingleBar = ({
    index = 0,
    isLast = false,
    onStartProgressStyle = {},
    onEndProgressStyle = {},
    color = colors.black,
    opacity = 1,
    textStyle = {},
    nameToDisplay = '',
    value = 0

}) => {
    const getValue = (value) => {
        value = Math.min(Math.max(value, 0), 1);
        value = value * 100;
        value = '' + value + '%';
        return value
    }
    const getEndBarStyles = () => {
        let style = {};
        if (index == 0) {
            let propStyle = onStartProgressStyle ? onStartProgressStyle : {}
            style = { ...styles.onStartProgressStyle, ...propStyle }
        } else if (isLast) {
            let propStyle = onEndProgressStyle ? onEndProgressStyle : {}
            style = { ...styles.onEndProgressStyle, ...propStyle }
        }
        return style;
    }
    return (
        <View key={index} style={[getEndBarStyles(), { backgroundColor: color, opacity: opacity, width: getValue(value) }]}>
            {nameToDisplay ? <Text style={[styles.textStyle, textStyle ? textStyle : {}]}>{nameToDisplay}</Text> : null}
        </View>
    )
}
export default memo(SingleBar);
