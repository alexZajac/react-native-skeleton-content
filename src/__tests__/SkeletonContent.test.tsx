import { View, Text } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { create } from 'react-test-renderer';
import SkeletonContent from '../SkeletonContent';
import {
  ISkeletonContentProps,
  DEFAULT_BONE_COLOR,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_BORDER_RADIUS
} from '../Constants';

const staticStyles = {
  borderRadius: DEFAULT_BORDER_RADIUS,
  overflow: 'hidden',
  backgroundColor: DEFAULT_BONE_COLOR
};

describe('SkeletonComponent test suite', () => {
  it('should render empty alone', () => {
    const tree = create(<SkeletonContent isLoading={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have the correct layout when loading', () => {
    const layout = [
      {
        width: 240,
        height: 100,
        marginBottom: 10
      },
      {
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey'
      }
    ];
    const props: ISkeletonContentProps = {
      layout,
      isLoading: true,
      animationType: 'none'
    };
    const instance = create(<SkeletonContent {...props} />);
    const component = instance.root;
    const bones = component.findAllByType(Animated.View);

    // two bones and parent component
    expect(bones.length).toEqual(layout.length + 1);
    expect(bones[0].props.style).toEqual({
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    });
    // default props that are not set
    expect(bones[1].props.style).toEqual([{ ...layout[0], ...staticStyles }]);
    expect(bones[2].props.style).toEqual([
      { overflow: 'hidden', ...layout[1] }
    ]);
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should render the correct bones for children', () => {
    const props: ISkeletonContentProps = {
      isLoading: true,
      animationType: 'shiver'
    };
    const w1 = { height: 100, width: 200 };
    const w2 = { height: 120, width: 20 };
    const w3 = { height: 80, width: 240 };
    const children = [w1, w2, w3];
    const TestComponent = ({
      isLoading,
      animationType
    }: ISkeletonContentProps) => (
      <SkeletonContent isLoading={isLoading} animationType={animationType}>
        {children.map(c => (
          <View key={c.height} style={c} />
        ))}
      </SkeletonContent>
    );
    const instance = create(<TestComponent {...props} />);
    let component = instance.root;
    // finding children count
    let bones = component.findAllByType(LinearGradient);
    expect(bones.length).toEqual(children.length);
    // finding styles of wrapper views
    bones = component.findAllByType(Animated.View);
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...w1
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...w2
    });
    expect(bones[5].props.style).toEqual({
      ...staticStyles,
      ...w3
    });

    // re-update with pulse animation
    instance.update(<TestComponent isLoading animationType="pulse" />);
    component = instance.root;
    bones = component.findAllByType(Animated.View);
    // cannot test interpolated background color
    expect(bones[1].props.style).toEqual([
      {
        ...w1,
        borderRadius: DEFAULT_BORDER_RADIUS
      },
      { backgroundColor: { ' __value': NaN } }
    ]);
    expect(bones[2].props.style).toEqual([
      {
        ...w2,
        borderRadius: DEFAULT_BORDER_RADIUS
      },
      { backgroundColor: { ' __value': NaN } }
    ]);
    expect(bones[3].props.style).toEqual([
      {
        ...w3,
        borderRadius: DEFAULT_BORDER_RADIUS
      },
      { backgroundColor: { ' __value': NaN } }
    ]);
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should have correct props and layout between loading states', () => {
    const w1 = { width: 240, height: 100, marginBottom: 10 };
    const w2 = { width: 180, height: 40 };
    const layout = [w1, w2];
    const props: ISkeletonContentProps = {
      layout,
      isLoading: true,
      animationType: 'shiver'
    };
    const childStyle = { fontSize: 24 };
    const instance = create(
      <SkeletonContent {...props}>
        <Text style={childStyle} />
      </SkeletonContent>
    );
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);
    // one animated view child for each bone + parent
    expect(bones.length).toEqual(layout.length);
    bones = component.findAllByType(Animated.View);
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...w1
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...w2
    });
    let children = component.findAllByType(Text);
    // no child since it's loading
    expect(children.length).toEqual(0);

    // update props
    instance.update(
      <SkeletonContent {...props} isLoading={false}>
        <Text style={childStyle} />
      </SkeletonContent>
    );

    bones = instance.root.findAllByType(LinearGradient);
    expect(bones.length).toEqual(0);

    children = instance.root.findAllByType(Text);
    expect(children.length).toEqual(1);
    expect(children[0].props.style).toEqual(childStyle);

    // re-update to loading state
    instance.update(
      <SkeletonContent {...props}>
        <Text style={childStyle} />
      </SkeletonContent>
    );

    bones = instance.root.findAllByType(LinearGradient);
    expect(bones.length).toEqual(layout.length);
    bones = component.findAllByType(Animated.View);
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...w1
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...w2
    });
    children = instance.root.findAllByType(Text);
    // no child since it's loading
    expect(children.length).toEqual(0);

    // snapshot
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should support nested layouts', () => {
    const layout: any = [
      {
        flexDirection: 'row',
        width: 320,
        height: 300,
        children: [
          {
            width: 200,
            height: 120
          },
          {
            width: 180,
            height: 100
          }
        ]
      },
      {
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey'
      }
    ];
    const props: ISkeletonContentProps = {
      layout,
      isLoading: true,
      animationType: 'shiver'
    };
    const instance = create(<SkeletonContent {...props} />);
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);
    // three overall bones
    expect(bones.length).toEqual(3);
    bones = component.findAllByType(Animated.View);

    expect(bones[1].props.style).toEqual({
      flexDirection: 'row',
      width: 320,
      height: 300
    });
    // testing that styles for nested layout and last child persist
    expect(bones[2].props.style).toEqual({
      ...staticStyles,
      ...layout[0].children[0]
    });
    expect(bones[4].props.style).toEqual({
      ...staticStyles,
      ...layout[0].children[1]
    });
    expect(bones[6].props.style).toEqual({
      ...staticStyles,
      ...layout[1]
    });
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should support percentage for child size', () => {
    const parentHeight = 300;
    const parentWidth = 320;
    const containerStyle = {
      width: parentWidth,
      height: parentHeight
    };
    const layout = [
      {
        width: '20%',
        height: '50%',
        borderRadius: 20,
        backgroundColor: 'grey'
      },
      {
        width: '50%',
        height: '10%',
        borderRadius: 10
      }
    ];
    const props: ISkeletonContentProps = {
      layout,
      isLoading: true,
      animationType: 'shiver',
      containerStyle
    };
    const instance = create(<SkeletonContent {...props} />);
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);

    expect(bones.length).toEqual(layout.length);
    // get parent
    bones = component.findAllByType(Animated.View);
    // testing that styles of childs corresponds to percentages
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...layout[0]
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...layout[1]
    });
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should have the correct gradient properties', () => {
    let customProps: ISkeletonContentProps = {
      layout: [
        {
          width: 240,
          height: 100,
          marginBottom: 10
        }
      ],
      isLoading: true,
      animationDirection: 'diagonalDownLeft'
    };
    const TestComponent = (props: ISkeletonContentProps) => (
      <SkeletonContent {...props}>
        <Animated.View style={{ height: 100, width: 200 }} />
      </SkeletonContent>
    );
    const component = create(<TestComponent {...customProps} />);
    let gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    // change layout on diagonal component
    customProps = {
      ...customProps,
      layout: [
        {
          width: 240,
          height: 300
        }
      ]
    };
    component.update(
      <SkeletonContent {...customProps} animationDirection="diagonalDownLeft">
        <Animated.View style={{ height: 300, width: 200 }} />
      </SkeletonContent>
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    component.update(
      <SkeletonContent {...customProps} animationDirection="verticalTop">
        <Text style={{ fontSize: 24 }} />
      </SkeletonContent>
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    component.update(
      <SkeletonContent {...customProps} animationDirection="verticalDown">
        <Text style={{ fontSize: 24 }} />
      </SkeletonContent>
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    component.update(
      <SkeletonContent {...customProps} animationDirection="horizontalLeft">
        <Text style={{ fontSize: 24 }} />
      </SkeletonContent>
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    component.update(
      <SkeletonContent {...customProps} animationDirection="horizontalRight">
        <Text style={{ fontSize: 24 }} />
      </SkeletonContent>
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    expect(gradient.props.colors).toEqual([
      DEFAULT_BONE_COLOR,
      DEFAULT_HIGHLIGHT_COLOR,
      DEFAULT_BONE_COLOR
    ]);
  });
});
