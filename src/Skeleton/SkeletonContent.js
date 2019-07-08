import * as React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewPropTypes
} from "react-native";
import { LinearGradient } from "expo";
import {
  DEFAULT_BONE_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_EASING,
  DEFAULT_DURATION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_ANIMATION_DIRECTION
} from "./Constants";

export default class SkeletonContent extends React.Component {
  constructor(props) {
    super(props);
    this.containerStyle = this.props.containerStyle;
    this.duration = this.props.duration;
    this.easing = this.props.easing;
    this.highlightColor = this.props.highlightColor;
    this.boneColor = this.props.boneColor;
    this.animationType = this.props.animationType;
    this.animationDirection = this.props.animationDirection;

    this.animationPulse = new Animated.Value(0);
    this.animationShiver = new Animated.Value(0);
    this.interpolatedBackgroundColor = this.animationPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [this.boneColor, this.highlightColor]
    });

    this.gradientStart = this.getGradientStartDirection();
    this.gradientEnd = this.getGradientEndDirection();

    this.state = {
      isLoading: this.props.isLoading,
      layout: this.props.layout
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.isLoading !== prevState.isLoading ||
      nextProps.layout !== prevState.layout
    ) {
      return { isLoading: nextProps.isLoading, layout: nextProps.layout };
    }
    return null;
  }

  componentDidMount() {
    this.playAnimation();
  }

  playAnimation = () => {
    if (this.animationType === "pulse") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.animationPulse, {
            toValue: 1,
            duration: this.duration / 2,
            easing: this.easing,
            delay: this.duration
          }),
          Animated.timing(this.animationPulse, {
            toValue: 0,
            easing: this.easing,
            duration: this.duration / 2
          })
        ])
      ).start();
    } else {
      Animated.loop(
        Animated.timing(this.animationShiver, {
          toValue: 1,
          duration: this.duration,
          easing: this.easing
        })
      ).start();
    }
  };

  getGradientStartDirection = () => {
    let direction = {};
    if (this.animationType === "shiver") {
      if (
        this.animationDirection === "horizontalLeft" ||
        this.animationDirection === "horizontalRight" ||
        this.animationDirection === "verticalTop" ||
        this.animationDirection === "verticalDown" ||
        this.animationDirection === "diagonalDownRight"
      ) {
        direction = { x: 0, y: 0 };
      } else if (this.animationDirection === "diagonalTopLeft") {
        direction = { x: 1, y: 1 };
      } else if (this.animationDirection === "diagonalTopRight") {
        direction = { x: 0, y: 1 };
      } else if (this.animationDirection === "diagonalDownLeft") {
        direction = { x: 1, y: 0 };
      }
    }
    return direction;
  };

  getGradientEndDirection = () => {
    let direction = {};
    if (this.animationType === "shiver") {
      if (
        this.animationDirection === "horizontalLeft" ||
        this.animationDirection === "horizontalRight" ||
        this.animationDirection === "diagonalTopRight"
      ) {
        direction = { x: 1, y: 0 };
      } else if (
        this.animationDirection === "verticalTop" ||
        this.animationDirection === "verticalDown" ||
        this.animationDirection === "diagonalDownLeft"
      ) {
        direction = { x: 0, y: 1 };
      } else if (this.animationDirection === "diagonalTopLeft") {
        direction = { x: 0, y: 0 };
      } else if (this.animationDirection === "diagonalDownRight") {
        direction = { x: 1, y: 1 };
      }
    }
    return direction;
  };

  getBoneStyles = boneLayout => {
    let boneStyle = {
      width: boneLayout.width || 0,
      height: boneLayout.height || 0,
      borderRadius: boneLayout.borderRadius || DEFAULT_BORDER_RADIUS,
      ...boneLayout
    };
    if (this.animationType === "pulse") {
      boneStyle.backgroundColor = this.interpolatedBackgroundColor;
    } else {
      boneStyle.overflow = "hidden";
      boneStyle.backgroundColor = boneLayout.backgroundColor || this.boneColor;
    }
    return boneStyle;
  };

  getGradientTransform = boneLayout => {
    let transform = {};
    const interpolatedPosition = this.animationShiver.interpolate({
      inputRange: [0, 1],
      outputRange: this.getPositionRange(boneLayout)
    });
    if (
      this.animationDirection !== "verticalTop" &&
      this.animationDirection !== "verticalDown"
    ) {
      transform = { translateX: interpolatedPosition };
    } else {
      transform = { translateY: interpolatedPosition };
    }
    return transform;
  };

  getPositionRange = boneLayout => {
    let outputRange = [];
    const boneWidth = boneLayout.width || 0;
    const boneHeight = boneLayout.height || 0;

    if (
      this.animationDirection === "horizontalRight" ||
      this.animationDirection === "diagonalDownRight" ||
      this.animationDirection === "diagonalTopRight"
    ) {
      outputRange.push(-boneWidth, boneWidth);
    } else if (
      this.animationDirection === "horizontalLeft" ||
      this.animationDirection === "diagonalDownLeft" ||
      this.animationDirection === "diagonalTopLeft"
    ) {
      outputRange.push(boneWidth, -boneWidth);
    } else if (this.animationDirection === "verticalDown") {
      outputRange.push(-boneHeight, boneHeight);
    } else if (this.animationDirection === "verticalTop") {
      outputRange.push(boneHeight, -boneHeight);
    }
    return outputRange;
  };

  getStaticBone = layoutStyle => (
    <Animated.View style={this.getBoneStyles(layoutStyle)} />
  );

  getShiverBone = layoutStyle => (
    <View style={this.getBoneStyles(layoutStyle)}>
      <Animated.View
        style={[
          styles.absoluteGradient,
          {
            transform: [this.getGradientTransform(layoutStyle)]
          }
        ]}
      >
        <LinearGradient
          colors={[this.boneColor, this.highlightColor, this.boneColor]}
          start={this.gradientStart}
          end={this.gradientEnd}
          style={styles.gradientChild}
        />
      </Animated.View>
    </View>
  );

  getBones = (layout, children) => {
    if (layout.length > 0) {
      const iterator = Array.from(new Array(layout.length));
      return iterator.map((_, i) => {
        if (this.animationType === "pulse" || this.animationType === "none") {
          return this.getStaticBone(layout[i]);
        } else {
          return this.getShiverBone(layout[i]);
        }
      });
    } else {
      return React.Children.map(children, child => {
        const styling = child.props.style || {};
        if (this.animationType === "pulse" || this.animationType === "none") {
          return this.getStaticBone(styling);
        } else {
          return this.getShiverBone(styling);
        }
      });
    }
  };

  renderLayout = (isLoading, bones, children) => (isLoading ? bones : children);

  render() {
    const { isLoading, layout } = this.state;
    const { children } = this.props;
    const bones = this.getBones(layout, children);

    return (
      <View style={this.containerStyle}>
        {this.renderLayout(isLoading, bones, children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  absoluteGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  gradientChild: {
    flex: 1
  }
});

SkeletonContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  layout: PropTypes.arrayOf(PropTypes.object),
  duration: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  easing: PropTypes.oneOfType([typeof Easing]),
  animationType: PropTypes.oneOf(["none", "shiver", "pulse"]),
  animationDirection: PropTypes.oneOf([
    "horizontalLeft",
    "horizontalRight",
    "verticalTop",
    "verticalDown",
    "diagonalDownLeft",
    "diagonalDownRight",
    "diagonalTopLeft",
    "diagonalTopRight"
  ]),
  boneColor: PropTypes.string,
  highlightColor: PropTypes.string
};

SkeletonContent.defaultProps = {
  containerStyle: styles.container,
  easing: DEFAULT_EASING,
  duration: DEFAULT_DURATION,
  layout: [],
  animationType: DEFAULT_ANIMATION_TYPE,
  animationDirection: DEFAULT_ANIMATION_DIRECTION,
  isLoading: true,
  boneColor: DEFAULT_BONE_COLOR,
  highlightColor: DEFAULT_HIGHLIGHT_COLOR
};
