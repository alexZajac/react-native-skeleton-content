## React Native Skeleton Content

> If you are not using expo, please head up to [this page](https://github.com/alexZajac/react-native-skeleton-content-nonexpo) instead.

<img width="220px" align="right" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif" />

React native Skeleton Content, a simple yet fully customizable component made to achieve loading animation in a Skeleton-style. Works in both iOS and Android.

[![npm version](https://img.shields.io/npm/v/react-native-skeleton-content.svg?style=flat-square)](https://www.npmjs.com/package/react-native-skeleton-content)

- [React Native Skeleton Content](#react-native-skeleton-content)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
  - [Examples](#examples)
  - [Playground](#playground)

### Installation

`npm install react-native-skeleton-content`

### Usage

1.  Import react-native-skeleton-content:

```javascript
import SkeletonContent from "react-native-skeleton-content";
```

2.  Once you create the SkeletonContent, you have two options:

- **Child Layout** : The component will figure out the layout of its bones with the dimensions of its direct children (make sure to wrap them in sized-views, with **width** and **height** properties, otherwise, shiver animation might not work).
- **Custom Layout** : You provide a prop `layout` to the component specifying the size of the bones (see the [Examples](#examples) section below). Herunder is the example with a custom layout. A key is optionnal but highly recommended.

```javascript
render () {
return (
<SkeletonContent
    containerStyle={{flex: 1, width: 300}}
    isLoading={false}
    layout={[
    { key: "someId", width: 220, height: 20, marginBottom: 6 },
    { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
    ]}
    >

    <Text style={styles.normalText}>
        Your content
    </Text>

    <Text style={styles.bigText}>
        Other content
    </Text>

</SkeletonContent>
)
}
```

3.  Then simply sync the prop `isLoading` to your state to show/hide the SkeletonContent when the assets/data are available to the user.

```javascript
render () {
    const { isLoading } = this.state;
    return (
    <SkeletonContent
        containerStyle={{flex: 1, width: 300}}
        isLoading={isLoading}>
        ...
    />
)
}
```

### Props

| Name               | Type             | Default                 | Description                                                                                                                       |
| ------------------ | ---------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| isLoading          | bool             | **required**            | Shows the Skeleton bones when true                                                                                                |
| layout             | array of objects | []                      | A custom layout for the Skeleton bones                                                                                            |
| duration           | number           | 1200 ms                 | Duration of one cycle of animation                                                                                                |
| containerStyle     | object           | flex: 1                 | The style applied to the View containing the bones                                                                                |
| easing             | Easing           | bezier(0.5, 0, 0.25, 1) | Easing of the bones animation                                                                                                     |
| animationType      | string           | "shiver"                | The animation to be used for animating the bones (see demos below)                                                                |
| animationDirection | string           | "horizontalRight"       | Used only for shiver animation, describes the direction and end-point (ex: horizontalRight goes on the x-axis from left to right) |
| boneColor          | string           | "#E1E9EE"               | Color of the bones                                                                                                                |
| highlightColor     | string           | "#F2F8FC"               | Color of the highlight of the bones                                                                                               |

### Examples

See the playground section to experiment :
**1** - Changing the direction of the animation (animationDirection prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/direction_change.gif" />
</p>

```javascript
render () {
    return (
    <SkeletonContent
        containerStyle={{flex: 1, width: 300}}
        animationDirection="horizontalLeft"
        isLoading={true}>
        ...
    />
    )
}
```

**2** - Changing the colors and switching to "pulse" animation (boneColor, highlightColor and animationType prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/color_change.gif" />
</p>

```javascript
render () {
    return (
    <SkeletonContent
        containerStyle={{flex: 1, width: 300}}
        boneColor="#121212"
        highlightColor="#333333"
        animationType="pulse"
        isLoading={true}>
        ...
    />
    )
}
```

**3** - Customizing the layout of the bones (layout prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/layout_change.gif" />
</p>

```javascript
render () {
    return (
    <SkeletonContent
        containerStyle={{flex: 1, width: 300}}
        animationDirection="horizontalLeft"
        layout={[
        // long line
        { width: 220, height: 20, marginBottom: 6 },
        // short line
        { width: 180, height: 20, marginBottom: 6 },
        ...
        ]}
        isLoading={true}>
        ...
    />
    )
}
```

### Playground

You can test out the features and different props easily on [**Snack**](https://snack.expo.io/@alexandrezajac/skeleton).
Don't hesitate to take contact if anything is unclear !
