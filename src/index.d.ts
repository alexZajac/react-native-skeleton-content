import { Component } from "react";

interface SkeletonContentProps {
  isLoading: boolean;
  layout?: Array<object>;
  duration?: number;
  containerStyle?: object;
  animationType?: "none" | "shiver" | "pulse";
  animationDirection?:
    | "horizontalLeft"
    | "horizontalRight"
    | "verticalTop"
    | "verticalDown"
    | "diagonalDownLeft"
    | "diagonalDownRight"
    | "diagonalTopLeft"
    | "diagonalTopRight";
  boneColor?: string;
  intensity?: number;
  highlightColor?: string;
}

export default class SkeletonContent extends Component<SkeletonContentProps> {}
