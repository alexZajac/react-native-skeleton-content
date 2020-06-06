import { StyleProp, ViewStyle } from 'react-native';
import { Easing } from 'react-native-reanimated';

type animationType = 'none' | 'shiver' | 'pulse';
type animationDirection =
  | 'horizontalLeft'
  | 'horizontalRight'
  | 'verticalTop'
  | 'verticalDown'
  | 'diagonalDownLeft'
  | 'diagonalDownRight'
  | 'diagonalTopLeft'
  | 'diagonalTopRight';

export type CustomViewStyle = any;

export interface ISkeletonContentProps {
  isLoading: boolean;
  layout?: CustomViewStyle[];
  duration?: number;
  containerStyle?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'shiver' | 'pulse';
  animationDirection?:
  | 'horizontalLeft'
  | 'horizontalRight'
  | 'verticalTop'
  | 'verticalDown'
  | 'diagonalDownLeft'
  | 'diagonalDownRight'
  | 'diagonalTopLeft'
  | 'diagonalTopRight';
  boneColor?: string;
  intensity?: number;
  highlightColor?: string;
  easing?: any;
}

export interface IDirection {
  x: number;
  y: number;
}

export const DEFAULT_BORDER_RADIUS: number = 4;
export const DEFAULT_DURATION: number = 1200;
export const DEFAULT_ANIMATION_TYPE: animationType = 'pulse';
export const DEFAULT_ANIMATION_DIRECTION: animationDirection = 'horizontalRight';
export const DEFAULT_BONE_COLOR: string = '#E1E9EE';
export const DEFAULT_HIGHLIGHT_COLOR: string = '#F2F8FC';
export const DEFAULT_EASING: any = Easing.bezier(0.5, 0, 0.25, 1);
export const DEFAULT_INTENSITY = 0.6;
export const DEFAULT_LOADING = true;
