import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Styles";

const SingleBar = (props) => {
  let { color, opacity, textStyle, index, nameToDisplay } = props;
  opacity = opacity ? opacity : 1;

  const getValue = () => {
    let value = Math.min(Math.max(props.value, 0), 1);
    value = value * 100;
    value = "" + value + "%";
    return value;
  };

  const getEndBarStyles = () => {
    let style = {};
    if (props.index == 0) {
      let propStyle = props.onStartProgressStyle
        ? props.onStartProgressStyle
        : {};
      style = { ...styles.onStartProgressStyle, ...propStyle };
    } else if (props.isLast) {
      let propStyle = props.onEndProgressStyle ? props.onEndProgressStyle : {};
      style = { ...styles.onEndProgressStyle, ...propStyle };
    }
    return style;
  };

  let value = getValue();
  let endStyles = getEndBarStyles();

  return (
    <View
      key={index}
      style={[
        endStyles,
        { backgroundColor: color, opacity: opacity, width: value },
      ]}
    >
      {nameToDisplay ? (
        <Text style={[styles.textStyle, textStyle ? textStyle : {}]}>
          {props.nameToDisplay}
        </Text>
      ) : null}
    </View>
  );
};
export default SingleBar;
