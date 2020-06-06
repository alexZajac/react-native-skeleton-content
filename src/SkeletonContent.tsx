import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { interpolateColor, loop } from "react-native-redash";
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
  IDirection,
  ILayout,
  CustomViewStyle,
} from "./Constants";

const { Value, useCode, set, cond, eq } = Animated;

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

const useLayout = () => {
  const [size, setSize] = useState<any>({ width: 0, height: 0 });

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

const SkeletonContent: React.FunctionComponent<ISkeletonContentProps> = ({
  isLoading,
  layout,
  containerStyle,
  boneColor,
  highlightColor,
  duration,
  animationDirection,
  animationType,
  easing,
  intensity,
  children
}) => {

  const animationValue = new Value(0);
  const loadingValue = new Value(isLoading ? 1 : 0);
  const shiverValue = new Value(animationType === "shiver" ? 1 : 0);
  const interpolatedBackgroundColor = interpolateColor(animationValue, {
    inputRange: [0, 1],
    outputRange: [boneColor!, highlightColor!],
  });
  const [componentSize, onLayout] = useLayout();

  useCode(() =>
    cond(eq(loadingValue, 1),
      [
        cond(eq(shiverValue, 1),
          [
            set(animationValue, loop({
              duration: duration,
              easing
            }))
          ],
          [
            set(animationValue, loop({
              duration: duration! / 2,
              easing,
              boomerang: true
            }))
          ])
      ])
    , [loadingValue, shiverValue]);

  const getGradientStartDirection = (): IDirection => {
    let direction: IDirection = { x: 0, y: 0 };
    if (animationType === "shiver") {
      if (
        animationDirection === "horizontalLeft" ||
        animationDirection === "horizontalRight" ||
        animationDirection === "verticalTop" ||
        animationDirection === "verticalDown" ||
        animationDirection === "diagonalDownRight"
      ) {
        direction = { x: 0, y: 0 };
      } else if (animationDirection === "diagonalTopLeft") {
        direction = { x: 1, y: 1 };
      } else if (animationDirection === "diagonalTopRight") {
        direction = { x: 0, y: 1 };
      } else if (animationDirection === "diagonalDownLeft") {
        direction = { x: 1, y: 0 };
      }
    }
    return direction;
  };

  const getGradientEndDirection = (): IDirection => {
    let direction = { x: 0, y: 0 };
    if (animationType === "shiver") {
      if (
        animationDirection === "horizontalLeft" ||
        animationDirection === "horizontalRight" ||
        animationDirection === "diagonalTopRight"
      ) {
        direction = { x: 1, y: 0 };
      } else if (
        animationDirection === "verticalTop" ||
        animationDirection === "verticalDown" ||
        animationDirection === "diagonalDownLeft"
      ) {
        direction = { x: 0, y: 1 };
      } else if (animationDirection === "diagonalTopLeft") {
        direction = { x: 0, y: 0 };
      } else if (animationDirection === "diagonalDownRight") {
        direction = { x: 1, y: 1 };
      }
    }
    return direction;
  };

  const gradientStart = getGradientStartDirection();
  const gradientEnd = getGradientEndDirection();

  const getBoneStyles = (boneLayout: CustomViewStyle): CustomViewStyle => {
    const boneStyle: CustomViewStyle = {
      width: boneLayout.width || 0,
      height: boneLayout.height || 0,
      borderRadius: boneLayout.borderRadius || DEFAULT_BORDER_RADIUS,
      ...boneLayout,
    };
    if (animationType === "pulse") {
      boneStyle.backgroundColor = interpolatedBackgroundColor;
    } else {
      boneStyle.overflow = "hidden";
      boneStyle.backgroundColor = boneLayout.backgroundColor || boneColor;
    }
    return boneStyle;
  };

  const getGradientTransform = (boneLayout: CustomViewStyle): object => {
    let transform = {};
    const interpolatedPosition = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: getPositionRange(boneLayout),
    });
    if (animationDirection !== "verticalTop" && animationDirection !== "verticalDown") {
      transform = { translateX: interpolatedPosition };
    } else {
      transform = { translateY: interpolatedPosition };
    }
    return transform;
  };

  const getPositionRange = (boneLayout: CustomViewStyle): number[] => {
    const outputRange: number[] = [];
    // use layout dimensions for percentages (string type)
    const boneWidth =
      typeof boneLayout.width === "string"
        ? componentSize.width || 0
        : boneLayout.width || 0;
    const boneHeight =
      typeof boneLayout.width === "string"
        ? componentSize.height || 0
        : boneLayout.height || 0;

    if (
      animationDirection === "horizontalRight" ||
      animationDirection === "diagonalDownRight" ||
      animationDirection === "diagonalTopRight"
    ) {
      outputRange.push(-boneWidth, +boneWidth);
    } else if (
      animationDirection === "horizontalLeft" ||
      animationDirection === "diagonalDownLeft" ||
      animationDirection === "diagonalTopLeft"
    ) {
      outputRange.push(+boneWidth, -boneWidth);
    } else if (animationDirection === "verticalDown") {
      outputRange.push(-boneHeight, +boneHeight);
    } else if (animationDirection === "verticalTop") {
      outputRange.push(+boneHeight, -boneHeight);
    }
    return outputRange;
  };

  const getBoneContainer = (layoutStyle: CustomViewStyle, children: JSX.Element[], key: string) => (
    <View key={layoutStyle.key || key} style={layoutStyle}>
      {children}
    </View>
  );

  const getStaticBone = (layoutStyle: CustomViewStyle, key: number | string): JSX.Element => (
    <Animated.View key={layoutStyle.key || key} style={getBoneStyles(layoutStyle)} />
  );

  const getShiverBone = (layoutStyle: CustomViewStyle, key: number | string): JSX.Element => {
    const animatedStyle: any = { transform: [getGradientTransform(layoutStyle)] };
    return (<View key={layoutStyle.key || key} style={[getBoneStyles(layoutStyle), { overflow: "hidden" }]}>
      <Animated.View
        style={[
          styles.absoluteGradient,
          animatedStyle
        ]}
      >
        <LinearGradient
          colors={[boneColor!, highlightColor!, boneColor!]}
          start={gradientStart}
          end={gradientEnd}
          style={styles.gradientChild}
        />
      </Animated.View>
    </View>
    );
  }

  const getBones = (layout: CustomViewStyle[], children: any, prefix: string = ''): JSX.Element[] => {
    if (layout.length > 0) {
      const iterator: number[] = new Array(layout.length).fill(0);
      return iterator.map((_, i) => {
        // has a nested layout
        if (layout[i].children && layout[i].children.length > 0) {
          const containerPrefix = layout[i].key || `bone_container_${i}`;
          return getBoneContainer(layout[i], getBones(layout[i].children, [], containerPrefix), containerPrefix);
        } else {
          if (
            animationType === "pulse" ||
            animationType === "none"
          ) {
            return getStaticBone(layout[i], prefix ? `${prefix}_${i}` : i);
          } else {
            return getShiverBone(layout[i], prefix ? `${prefix}_${i}` : i);
          }
        }
      });
      // no mayout, matching children's layout
    } else {
      return React.Children.map(children, (child, i) => {
        const styling = child.style || {};
        if (animationType === "pulse" || animationType === "none") {
          return getStaticBone(styling, i);
        } else {
          return getShiverBone(styling, i);
        }
      });
    }
  };

  return <View style={containerStyle} onLayout={onLayout}>
    {isLoading ? getBones(layout!, children) : children}
  </View>;
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

export default SkeletonContent;
