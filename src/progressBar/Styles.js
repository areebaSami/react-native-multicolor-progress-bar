import {StyleSheet} from 'react-native';
import { colors } from '../commons';

export const styles = StyleSheet.create({
    parentView: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
    bar: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: colors.light_grey,
      borderRadius: 8.5,
      height: 12
    },
    onStartProgressStyle:{
      borderTopLeftRadius: 8.5,
      borderBottomLeftRadius: 8.5,
    },
    onEndProgressStyle: {
      borderTopRightRadius: 8.5,
      borderBottomRightRadius: 8.5
    },
    textStyle: {
        fontSize: 10,
        textAlign: 'center'
    }
  })