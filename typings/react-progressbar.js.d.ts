declare module "react-progressbar.js" {
    import React = require("react");

    export interface ShapeOptions {
        color?: string,
        strokeWidth?: number,
        trailColor?: string,
        trailWidth?: number,
        svgStyle?: {
            display?: string,
            width?: string
        },
        text?: {
            value?: string,
            className?: string,
            style?: {
                color?: string,
                position?: string,
                left?: string,
                top?: string,
                padding?: number,
                margin?: number,
                transform?: {
                    prefix?: boolean,
                    value?: string
                }
            },
            autoStyleContainer?: boolean,
            alignToBottom?: boolean
        },
        fill?: string,
        duration?: number,
        easing?: string,
        from?: { color?: string },
        to?: { color?: string },
        step?: (state, circle, attachment) => void,
        warnings?: boolean
    }

    export interface ShapeProps {
        // ShapeClass: any;
        options?: ShapeOptions;
        progress?: number;
        text?: string;
        initialAnimate?: boolean;
        containerStyle?: any;
        containerClassName?: string;
    }
    export interface ShapeState {
        shape: any;
    }

    export class Shape extends React.Component<ShapeProps, ShapeState> {
        animateProgress(progress: number);
        setProgress(progress: number);
        setText(text: string);
    }

    export class Line extends Shape {
        public readonly _shape: Shape;
    }

    export class Circle extends Shape {
        public readonly _shape: Shape;
    }

    export class SemiCircle extends Shape {
        public readonly _shape: Shape;
    }
}
