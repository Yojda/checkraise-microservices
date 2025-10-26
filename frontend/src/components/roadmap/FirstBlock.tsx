import * as React from "react"

type FirstBlockProps = {
    label: string;
    d: string;
};

const FirstBlock = ({ label, d } : FirstBlockProps) => (
    <g>
      <path fill="none" d={d} pointerEvents="all" />
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
              width: 1,
              height: 1,
              paddingTop: 25,
              marginLeft: 278,
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                fontSize: 0,
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontSize: 16,
                  fontFamily: "&quot",
                  color: "#ffffff",
                  lineHeight: 1.2,
                  pointerEvents: "all",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            </div>
          </div>
        </foreignObject>
        <text
          x={278}
          y={30}
          fill="#393C56"
          fontFamily='"Open Sans", sans-serif'
          fontSize={16}
          textAnchor="middle"
        >
          {label}
        </text>
      </switch>
    </g>
);

export default FirstBlock;