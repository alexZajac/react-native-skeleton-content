import { Component } from "react";

interface SkeletonContentProps {
  isLoaded: boolean;
  layout: Array<object>;
  duration?: number;
  style?: object;
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
