/**
 * @jest-environment jsdom
 */

import { shallow, mount } from 'enzyme';
import React from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SkeletonContent from '../SkeletonContent';
import {
  ISkeletonContentProps,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_BONE_COLOR,
  DEFAULT_EASING,
  DEFAULT_DURATION,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_INTENSITY,
  DEFAULT_LOADING,
} from '../Constants';

describe('SkeletonComponent testing', () => {
// TODO: Find the integration issue between expo-linear-gradient and Jest with Enzyme
// it('should render empty alone', () => {
//   const component = shallow(<SkeletonContent />);
//   expect(component).toMatchSnapshot();
// });
// it('should render Linear Gradient alone', () => {
//   const props: { colors: Array<string> } = {
//     colors: ['red', 'blue'],
//   };
//   const component = shallow(<LinearGradient {...props} />);
//   expect(component).toMatchSnapshot();
// });
// it('should have default Props', () => {
//   const component = mount(<SkeletonContent />);
//   expect(component.props().containerStyle).toEqual({
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   });
//   expect(component.props().easing).toEqual(DEFAULT_EASING);
//   expect(component.props().layout).toEqual([]);
//   expect(component.props().animationDirection).toEqual(DEFAULT_ANIMATION_DIRECTION);
//   expect(component.props().animationType).toEqual(DEFAULT_ANIMATION_TYPE);
//   expect(component.props().boneColor).toEqual(DEFAULT_BONE_COLOR);
//   expect(component.props().duration).toEqual(DEFAULT_DURATION);
//   expect(component.props().highlightColor).toEqual(DEFAULT_HIGHLIGHT_COLOR);
//   expect(component.props().intensity).toEqual(DEFAULT_INTENSITY);
//   expect(component.props().isLoading).toEqual(DEFAULT_LOADING);
//   component.unmount();
// });
// it('should have the correct layout when loading', () => {
//   const props: ISkeletonContentProps = {
//     layout: [
//       {
//         width: 240,
//         height: 100,
//         marginBottom: 10,
//       },
//       {
//         width: 180,
//         height: 40,
//       },
//     ],
//     isLoading: true,
//     animationType: 'none',
//   };
//   const component = mount<SkeletonContent>(<SkeletonContent {...props} />);
//   expect(component.children().find(Animated.View)).toHaveLength(2);
//   expect(component).toMatchSnapshot();
//   component.unmount();
// });
// it('should render the correct bones for children', () => {
//   const props: ISkeletonContentProps = {
//     isLoading: true,
//     animationType: 'none',
//   };
//   const TestComponent = ({ isLoading, animationType }: ISkeletonContentProps) => (
//     <SkeletonContent isLoading={isLoading} animationType={animationType}>
//       <View style={{ height: 100, width: 200 }} />
//       <View style={{ height: 120, width: 20 }} />
//       <View style={{ height: 80, width: 240 }} />
//     </SkeletonContent>
//   );
//   const component = mount(<TestComponent {...props} />);
//   expect(component.children().find(Animated.View)).toHaveLength(3);
//   expect(component).toMatchSnapshot();
//   component.unmount();
// });
// it('should render shiver bones for children', () => {
//   const props: ISkeletonContentProps = {
//     isLoading: true,
//   };
//   const TestComponent = ({ isLoading }: ISkeletonContentProps) => (
//     <SkeletonContent isLoading={isLoading}>
//       <Animated.View style={{ height: 100 }} />
//       <Animated.View style={{ height: 120, width: 20 }} />
//       <Animated.View style={{ width: 240 }} />
//     </SkeletonContent>
//   );
//   const component = mount(<TestComponent {...props} />);
//   expect(component.children().find(Animated.View)).toHaveLength(3);
//   expect(component).toMatchSnapshot();
//   component.unmount();
// });
// it('should switch to correct children after finishing loading', () => {
//   const props: ISkeletonContentProps = {
//     layout: [
//       {
//         width: 240,
//         height: 100,
//         marginBottom: 10,
//       },
//       {
//         width: 180,
//         height: 40,
//       },
//     ],
//     isLoading: true,
//     animationType: 'pulse',
//   };
//   const TestComponent = ({ isLoading, layout, animationType }: ISkeletonContentProps) => (
//     <SkeletonContent layout={layout} isLoading={isLoading} animationType={animationType}>
//       <Animated.View style={{ height: 100, width: 200 }} />
//       <Animated.View style={{ height: 120, width: 20 }} />
//       <Animated.View />
//     </SkeletonContent>
//   );
//   const component = mount(<TestComponent {...props} />);
//   expect(component.children().find(Animated.View)).toHaveLength(2);
//   component.setProps({ isLoading: false });
//   expect(component.children().find(Animated.View)).toHaveLength(3);
//   expect(
//     component.containsAllMatchingElements([
//       <View style={{ height: 100, width: 200 }} />,
//       <View style={{ height: 120, width: 20 }} />,
//       <View style={{ height: 80, width: 240 }} />,
//     ]),
//   );
//   component.unmount();
// });
// it('should render loading children with no style', () => {
//   const props: ISkeletonContentProps = {
//     isLoading: true,
//     animationType: 'pulse',
//   };
//   const TestComponent = ({ isLoading, animationType }: ISkeletonContentProps) => (
//     <SkeletonContent isLoading={isLoading} animationType={animationType}>
//       <Animated.View />
//       <Animated.View />
//     </SkeletonContent>
//   );
//   const component = mount(<TestComponent {...props} />);
//   expect(component.children().find(Animated.View)).toHaveLength(2);
//   expect(component.containsAllMatchingElements([<Animated.View />, <Animated.View />]));
//   component.unmount();
// });
// it('should have the correct gradient properties', () => {
//   let props: ISkeletonContentProps = {
//     layout: [
//       {
//         width: 240,
//         height: 100,
//         marginBottom: 10,
//       },
//       {
//         width: 180,
//         height: 40,
//       },
//     ],
//     isLoading: true,
//     animationDirection: 'diagonalDownLeft',
//   };
//   const TestComponent = ({ isLoading, layout, animationDirection }: ISkeletonContentProps) => (
//     <SkeletonContent isLoading={isLoading} layout={layout} animationDirection={animationDirection}>
//       <Animated.View style={{ height: 100, width: 200 }} />
//     </SkeletonContent>
//   );
//   let component = mount(<TestComponent {...props} />);
//   expect(component.find(LinearGradient)).toBeDefined();
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 1,
//     y: 0,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 0,
//     y: 1,
//   });
//   props.animationDirection = 'diagonalTopLeft';
//   component = mount(<TestComponent {...props} />);
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 1,
//     y: 1,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 0,
//     y: 0,
//   });
//   props.animationDirection = 'diagonalTopRight';
//   component = mount(<TestComponent {...props} />);
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 0,
//     y: 1,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 1,
//     y: 0,
//   });
//   props.animationDirection = 'diagonalDownRight';
//   component = mount(<TestComponent {...props} />);
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 0,
//     y: 0,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 1,
//     y: 1,
//   });
//   props.animationDirection = 'verticalTop';
//   component = mount(<TestComponent {...props} />);
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 0,
//     y: 0,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 0,
//     y: 1,
//   });
//   props.animationDirection = 'verticalDown';
//   component = mount(<TestComponent {...props} />);
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().start,
//   ).toEqual({
//     x: 0,
//     y: 0,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().end,
//   ).toEqual({
//     x: 0,
//     y: 1,
//   });
//   expect(
//     component
//       .find(LinearGradient)
//       .at(0)
//       .props().colors,
//   ).toEqual([DEFAULT_BONE_COLOR, DEFAULT_HIGHLIGHT_COLOR, DEFAULT_BONE_COLOR]);
//   component.unmount();
// });
});
