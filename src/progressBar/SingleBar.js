import React, { PureComponent } from 'react';
import {
  View,
  Text
} from 'react-native';
import { styles } from './Styles';

class SingleBar extends PureComponent {
  constructor(props){
    super(props);
  }
  getValue(){
    let value = Math.min(Math.max(this.props.value, 0), 1);
    value = value * 100;
    value = '' + value + '%';
    return value
  }
  getEndBarStyles(){
    let style = {};
    if(this.props.index == 0){
      let propStyle = this.props.onStartProgressStyle ?  this.props.onStartProgressStyle : {}
      style = {...styles.onStartProgressStyle,...propStyle}
    }else if(this.props.isLast){
      let propStyle = this.props.onEndProgressStyle ?  this.props.onEndProgressStyle : {}
      style = {...styles.onEndProgressStyle,...propStyle}
    }
    return style;
  }
  render() {
    let {color,opacity,textStyle,index,nameToDisplay} = this.props;
    let value = this.getValue();
    let endStyles = this.getEndBarStyles();
    opacity = opacity ? opacity : 1
    return (
      <View key={index} style={[endStyles,{backgroundColor: color,opacity: opacity, width: value}]}>
        {nameToDisplay ? <Text style={[styles.textStyle,textStyle ? textStyle : {}]}>{this.props.nameToDisplay}</Text> : null}
      </View>
    )
  }
}
export default SingleBar;
