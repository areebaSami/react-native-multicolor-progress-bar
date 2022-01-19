import PropTypes from "prop-types";
import React from "react";
import { Text, TouchableOpacity, View, ViewPropTypes } from "react-native";
import SingleBar from "./SingleBar";
import { styles } from "./Styles";

const ProgressBar = ({
  arrayOfProgressObjects,
  parentViewStyle,
  backgroundBarStyle,
  ...props
}) => {
  const [total, setTotal] = React.useState(0);

  let onPress = props.onPress ? props.onPress : null;
  let isDisabled = !props.isDisabled && props.onPress ? false : true;

  React.useEffect(() => {
    setTotal(getCoveredBar());
  }, [arrayOfProgressObjects]);

  const getCoveredBar = () => {
    let readings = arrayOfProgressObjects;
    return readings.reduce((total, bar) => {
      return total + bar.value;
    }, 0);
  };

  const getSingleProgressBar = (item, index) => {
    let {
      onStartProgressStyle,
      onEndProgressStyle,
      arrayOfProgressObjects,
      textStyle,
    } = props;
    let totalProgress = parseInt("" + total);
    return (
      <SingleBar
        key={"" + index}
        {...item}
        onEndProgressStyle={onEndProgressStyle}
        onStartProgressStyle={onStartProgressStyle}
        textStyle={textStyle}
        isLast={
          arrayOfProgressObjects?.length == index + 1 && totalProgress >= 1
        }
        index={index}
      />
    );
  };

  return (
    <View style={[styles.parentView, parentViewStyle]}>
      <TouchableOpacity
        style={[styles.bar, backgroundBarStyle]}
        onPress={onPress}
        disabled={isDisabled}
      >
        {arrayOfProgressObjects.map(getSingleProgressBar)}
      </TouchableOpacity>
    </View>
  );
};

ProgressBar.propTypes = {
  parentViewStyle: ViewPropTypes.style,
  backgroundBarStyle: ViewPropTypes.style,
  onStartProgressStyle: PropTypes.shape({
    borderTopLeftRadius: PropTypes.number,
    borderBottomLeftRadius: PropTypes.number,
  }),
  onEndProgressStyle: PropTypes.shape({
    borderTopRightRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
  }),
  arrayOfProgressObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPress: PropTypes.func,
  textStyle: Text.propTypes.style,
};
