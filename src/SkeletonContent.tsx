import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_BONE_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_EASING,
  DEFAULT_DURATION,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_INTENSITY,
  DEFAULT_LOADING,
  ISkeletonContentProps,
  IState,
  IDirection,
  CustomViewStyle,
} from "./Constants";

const styles = StyleSheet.create({
  absoluteGradient: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  gradientChild: {
    flex: 1,
  },
});

const SkeletonContent: React.FunctionComponent<ISkeletonContentProps> = (props) => {

  const [isLoading, setLoading] = useState(DEFAULT_LOADING);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    playAnimation();
  }, []);

  useEffect(() => {
    if (props.isLoading)
      playAnimation();
  }, [props.isLoading]);

  const animationPulse = new Animated.Value(0);
  const animationShiver = new Animated.Value(0);
  const interpolatedBackgroundColor = animationPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [props.boneColor!, props.highlightColor!],
  });

  const getGradientStartDirection = (): IDirection => {
    let direction: IDirection = { x: 0, y: 0 };
    if (props.animationType === "shiver") {
      if (
        props.animationDirection === "horizontalLeft" ||
        props.animationDirection === "horizontalRight" ||
        props.animationDirection === "verticalTop" ||
        props.animationDirection === "verticalDown" ||
        props.animationDirection === "diagonalDownRight"
      ) {
        direction = { x: 0, y: 0 };
      } else if (props.animationDirection === "diagonalTopLeft") {
        direction = { x: 1, y: 1 };
      } else if (props.animationDirection === "diagonalTopRight") {
        direction = { x: 0, y: 1 };
      } else if (props.animationDirection === "diagonalDownLeft") {
        direction = { x: 1, y: 0 };
      }
    }
    return direction;
  };

  const getGradientEndDirection = (): IDirection => {
    let direction = { x: 0, y: 0 };
    if (props.animationType === "shiver") {
      if (
        props.animationDirection === "horizontalLeft" ||
        props.animationDirection === "horizontalRight" ||
        props.animationDirection === "diagonalTopRight"
      ) {
        direction = { x: 1, y: 0 };
      } else if (
        props.animationDirection === "verticalTop" ||
        props.animationDirection === "verticalDown" ||
        props.animationDirection === "diagonalDownLeft"
      ) {
        direction = { x: 0, y: 1 };
      } else if (props.animationDirection === "diagonalTopLeft") {
        direction = { x: 0, y: 0 };
      } else if (props.animationDirection === "diagonalDownRight") {
        direction = { x: 1, y: 1 };
      }
    }
    return direction;
  };

  const gradientStart = getGradientStartDirection();
  const gradientEnd = getGradientEndDirection();

  const playAnimation = () => {
    if (props.animationType === "pulse") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationPulse, {
            toValue: 1,
            duration: props.duration! / 2,
            easing: props.easing,
            delay: props.duration,
            useNativeDriver: true
          }),
          Animated.timing(animationPulse, {
            toValue: 0,
            easing: props.easing,
            duration: props.duration! / 2,
            useNativeDriver: true
          }),
        ]),
      ).start();
    } else {
      Animated.loop(
        Animated.timing(animationShiver, {
          toValue: 1,
          duration: props.duration,
          easing: props.easing,
          useNativeDriver: true
        }),
      ).start();
    }
  };

  const getBoneStyles = (boneLayout: CustomViewStyle): CustomViewStyle => {
    const boneStyle: CustomViewStyle = {
      width: boneLayout.width || 0,
      height: boneLayout.height || 0,
      borderRadius: boneLayout.borderRadius || DEFAULT_BORDER_RADIUS,
      ...boneLayout,
    };
    if (props.animationType === "pulse") {
      boneStyle.backgroundColor = interpolatedBackgroundColor;
    } else {
      boneStyle.overflow = "hidden";
      boneStyle.backgroundColor = boneLayout.backgroundColor || props.boneColor;
    }
    return boneStyle;
  };

  const getGradientTransform = (boneLayout: CustomViewStyle): object => {
    let transform = {};
    const interpolatedPosition = animationShiver.interpolate({
      inputRange: [0, 1],
      outputRange: getPositionRange(boneLayout),
    });
    if (props.animationDirection !== "verticalTop" && props.animationDirection !== "verticalDown") {
      transform = { translateX: interpolatedPosition };
    } else {
      transform = { translateY: interpolatedPosition };
    }
    return transform;
  };

  const getPositionRange = (boneLayout: CustomViewStyle): number[] => {
    const outputRange: number[] = [];
    const boneWidth = boneLayout.width || 0;
    const boneHeight = boneLayout.height || 0;

    if (
      props.animationDirection === "horizontalRight" ||
      props.animationDirection === "diagonalDownRight" ||
      props.animationDirection === "diagonalTopRight"
    ) {
      outputRange.push(-boneWidth, +boneWidth);
    } else if (
      props.animationDirection === "horizontalLeft" ||
      props.animationDirection === "diagonalDownLeft" ||
      props.animationDirection === "diagonalTopLeft"
    ) {
      outputRange.push(+boneWidth, -boneWidth);
    } else if (props.animationDirection === "verticalDown") {
      outputRange.push(-boneHeight, +boneHeight);
    } else if (props.animationDirection === "verticalTop") {
      outputRange.push(+boneHeight, -boneHeight);
    }
    return outputRange;
  };

  const getStaticBone = (layoutStyle: CustomViewStyle, key: number): JSX.Element => (
    <Animated.View key={layoutStyle.key || key} style={getBoneStyles(layoutStyle)} />
  );

  const getShiverBone = (layoutStyle: CustomViewStyle, key: number): JSX.Element => (
    <View key={layoutStyle.key || key} style={getBoneStyles(layoutStyle)}>
      <Animated.View
        style={[
          styles.absoluteGradient,
          {
            transform: [getGradientTransform(layoutStyle)],
          },
        ]}
      >
        <LinearGradient
          colors={[props.boneColor!, props.highlightColor!, props.boneColor!]}
          start={gradientStart}
          end={gradientEnd}
          style={styles.gradientChild}
        />
      </Animated.View>
    </View>
  );

  const getBones = (layout: CustomViewStyle[], children: any): JSX.Element[] => {
    if (layout.length > 0) {
      const iterator: number[] = new Array(layout.length);
      for (let i = 0; i < layout.length; i++) {
        iterator[i] = 0;
      }
      return iterator.map((_, i) => {
        if (props.animationType === "pulse" || props.animationType === "none") {
          return getStaticBone(layout[i], i);
        } else {
          return getShiverBone(layout[i], i);
        }
      });
    } else {
      return React.Children.map(children, (child, i) => {
        const styling = child.props.style || {};
        if (props.animationType === "pulse" || props.animationType === "none") {
          return getStaticBone(styling, i);
        } else {
          return getShiverBone(styling, i);
        }
      });
    }
  };

  const renderLayout = (isLoading: boolean, bones: JSX.Element[], children: any): JSX.Element[] =>
    isLoading ? bones : children

  return <View style={props.containerStyle}>{renderLayout(isLoading, getBones(layout, props.children), props.children)}</View>;
}

SkeletonContent.defaultProps = {
  containerStyle: styles.container,
  easing: DEFAULT_EASING,
  duration: DEFAULT_DURATION,
  layout: [],
  animationType: DEFAULT_ANIMATION_TYPE,
  animationDirection: DEFAULT_ANIMATION_DIRECTION,
  isLoading: DEFAULT_LOADING,
  boneColor: DEFAULT_BONE_COLOR,
  highlightColor: DEFAULT_HIGHLIGHT_COLOR,
  intensity: DEFAULT_INTENSITY
}
