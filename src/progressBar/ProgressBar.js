import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ViewPropTypes, Text} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './Styles';
import SingleBar from './SingleBar';

export default class ProgressBar extends Component {
    constructor(props) {
      super(props);
      let total = this.getCoveredBar(props);
      this.state = {
        total
      };
      this.getSingleProgressBar = this.getSingleProgressBar.bind(this);
    }
  
    shouldComponentUpdate(nextProps, nextState){
      let shouldUpdate = this.props.arrayOfProgressObjects != nextProps.arrayOfProgressObjects
      return (
        shouldUpdate
      )
    }
  
    UNSAFE_componentWillReceiveProps(nextProps) {
      if(this.props.arrayOfProgressObjects != nextProps.arrayOfProgressObjects){
        let total = this.getCoveredBar(nextProps);
        this.setState({
          total
        })
      }
    }
  
    getSingleProgressBar(item,index){
      let {onStartProgressStyle,onEndProgressStyle,arrayOfProgressObjects,textStyle} = this.props;
      let totalProgress = parseInt('' + this.state.total);
      return (
        <SingleBar
          key={'' + index}
          {...item}
          onEndProgressStyle={onEndProgressStyle}
          onStartProgressStyle={onStartProgressStyle}
          textStyle={textStyle}
          isLast={arrayOfProgressObjects.length==index+1 && totalProgress >= 1}
          index={index}
        />
      )
    }
  
    getCoveredBar(props){
      let readings = props.arrayOfProgressObjects;
      return readings.reduce((total,bar) => {return total + bar.value;},0)
    }
  
    render() {
      let {parentViewStyle,backgroundBarStyle,arrayOfProgressObjects} = this.props
      let onPress = this.props.onPress ? this.props.onPress : null
      let isDisabled = !this.props.isDisabled && this.props.onPress ? false : true
      return (
        <View style={[styles.parentView,parentViewStyle]}>
          <TouchableOpacity style={[styles.bar,backgroundBarStyle]} onPress={onPress} disabled={isDisabled}>
            {arrayOfProgressObjects.map(this.getSingleProgressBar)}
          </TouchableOpacity>
        </View>
      );
    }
  }
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
    textStyle: Text.propTypes.style
  }
  
  