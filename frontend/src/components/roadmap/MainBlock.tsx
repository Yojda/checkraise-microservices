import * as React from "react"

type MainBlockProps = {
    x1: number;
    y1: number;
    callback: (label : string) => void;
    label: string;
};

const MainBlock = ({ x1, y1, callback, label } : MainBlockProps) => (
    <g
      onClick={() => callback(label)}
      style={{ cursor: "pointer" }}
      className={"hover:fill-amber-200 fill-[#E0DBB5]"}
    >
      <rect
        width={135}
        height={40}
        x={x1}
        y={y1}
        pointerEvents="all"
        rx={6}
        ry={6}
        style={{
          stroke: "#d6b656",
        }}
      />
      <switch transform="translate(-.5 -.5)">
        <foreignObject
          width="100%"
          height="100%"
          pointerEvents="none"
          requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
          style={{
            overflow: "visible",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "unsafe center",
              justifyContent: "unsafe center",
              width: 133,
              height: 1,
              paddingTop: y1 + 20,
              marginLeft: x1 + 1,
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                fontSize: 0,
                textAlign: "center",
                color: "#000",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontFamily: "&quot",
                  color: "#000",
                  lineHeight: 1.2,
                  pointerEvents: "all",
                  whiteSpace: "normal",
                  wordWrap: "normal",
                }}
              >
                {label}
              </div>
            </div>
          </div>
        </foreignObject>
        <text
          x={278}
          y={134}
          fill="light-dark(#000000, #ffffff)"
          fontFamily='"Open Sans", sans-serif'
          fontSize={12}
          textAnchor="middle"
        >
          {label}
        </text>
      </switch>
    </g>
);

export default MainBlock;