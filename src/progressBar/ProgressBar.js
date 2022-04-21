import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from './Styles';
import SingleBar from './SingleBar';

const getCoveredBar = (readings = []) => {
  return readings.reduce((total, bar) => { return Number(total) + Number(bar.value); }, 0)
}

const ProgressBar = ({
  parentViewStyle = {},
  backgroundBarStyle = {},
  arrayOfProgressObjects = [],
  onPress = () => {},
  isDisabled = true,
  onStartProgressStyle = {}, 
  onEndProgressStyle = {}, 
  textStyle = {}
}) => {
  const [total, setTotal] = useState(getCoveredBar(arrayOfProgressObjects));

  useEffect(() => {
    // componentDidUpdate
    let newTotal = getCoveredBar(arrayOfProgressObjects);
    if (newTotal !== total) {
      setTotal(newTotal)
    }
  }, [arrayOfProgressObjects]);


  const getSingleProgressBar = (item, index) => {
    let totalProgress = parseInt('' + total);
    return (
      <SingleBar
        key={'' + index}
        {...item}
        onEndProgressStyle={onEndProgressStyle}
        onStartProgressStyle={onStartProgressStyle}
        textStyle={textStyle}
        isLast={arrayOfProgressObjects.length == index + 1 && totalProgress >= 1}
        index={index}
      />
    )
  }

  return (
    <View style={[styles.parentView, parentViewStyle]}>
      <TouchableOpacity style={[styles.bar, backgroundBarStyle]} onPress={onPress} disabled={isDisabled || !onPress}>
        {arrayOfProgressObjects.map(getSingleProgressBar)}
      </TouchableOpacity>
    </View>
  );
}
export default React.memo(ProgressBar)