## React Native Skeleton Content

<img width="220px" align="right" src="https://raw.githubusercontent.com/rt2zz/react-native-drawer/master/examples/rn-drawer.gif" />

React native Skeleton Content, a simple yet fully customizable component made to achieve performant loading in a Skeleton-style. Works in both iOS and Android.

[![npm version](https://img.shields.io/npm/v/react-native-skeleton-content.svg?style=flat-square)](https://www.npmjs.com/package/react-native-skeleton-content)

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Playground](#playground)
- [Credits](#credits)

### Installation

`npm install react-native-skeleton-content`

### Usage

1.  Import react-native-skeleton-content:

```javascript
import SkeletonContent from "react-native-skeleton-content";
```

2.  Once you create the SkeletonContent, you have two options:

- **Custom Layout** : You provide a prop `layout` to the component specifying the size of the bones (see the [Examples](#examples) section below).
- **Child Layout** : The component will figure out the layout of its bones with the dimensions of its direct children (make sure to wrap them in sized-views). Herunder is the example without a custom layout.

```javascript
render () {
    return (
      <SkeletonContent
			containerStyle={{flex: 1, width: 300}}
			isLoading={false}>

				<View style={{flex: 2, width: 260}}>
					<Text style={styles.normalText}>
						Your content
					</Text>
				</View>

				<View style={{flex: 1, width: 180, marginTop: 10}}>
					<Text style={styles.bigText}>
						Other content
					</Text>
				</View>

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

## Available props

| Name           | Type             | Default                 | Description                                                        |
| -------------- | ---------------- | ----------------------- | ------------------------------------------------------------------ |
| isLoading      | bool             | **required**            | Shows the Skeleton bones when true                                 |
| layout         | array of objects | []                      | A custom layout for the Skeleton bones                             |
| duration       | number           | 1200 ms                 | Duration of one cycle of animation                                 |
| containerStyle | object           | flex: 1                 | The style applied to the View containing the bones                 |
| easing         | Easing           | bezier(0.5, 0, 0.25, 1) | Easing of the bones animation                                      |
| animationType  | string           | "shiverLeft"            | The animation to be used for animating the bones (see demos below) |
| boneColor      | string           | "#E1E9EE"               | Color of the bones                                                 |
| highlightColor | string           | "#F2F8FC"               | Color of the highlight of the bones                                |
| intensity      | number           | 0.5                     | How intense should the animation should be (between 0 and 1)       |

### Examples (all shown in the demo section)

```jsx
```

### Playground

You can test out the features easily on [**Snack**](https://snack.expo.io/@alexandrezajac/skeleton).
Don't hesitate to take contact if anything is unclear !
