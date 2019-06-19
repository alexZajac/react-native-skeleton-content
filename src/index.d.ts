import { Component } from "react";

interface SkeletonContentProps {
  isLoading: boolean;
  layout?: Array<object>;
  duration?: number;
  containerStyle?: object;
  animationType?:
    | "none"
    | "shiverLeft"
    | "shiverRight"
    | "shiverTop"
    | "shiverDown"
    | "pulse";
  boneColor?: string;
  intensity?: number;
  highlightColor?: string;
}

export default class SkeletonContent extends Component<SkeletonContentProps> {}
