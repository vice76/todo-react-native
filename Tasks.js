import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';

const Task = ({text, onDelete}) => {
  const [pan] = useState(new Animated.ValueXY());
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const panResponder = PanResponder.create({
    onPanResponderTerminationRequest: () => false,
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({x: 0, y: 0});
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 150) {
        onDelete();
      } else {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: [{translateX: pan.x._value}, {translateY: pan.y._value}],
  };

  return (
    <View style={styles.item}>
      <View
        {...panResponder.panHandlers}
        style={[styles.itemLeft, animatedStyle]}>
        <TouchableOpacity style={styles.sqaure}></TouchableOpacity>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {showDeleteButton && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="trash" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sqaure: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
});

export default Task;
