import * as React from "react"

type HighlightProps = {
    x1: number;
    y1: number;
    callback: (label : string) => void;
    label: string;
    size: string;
};

const HighlightBlock = ({ x1, y1, callback, label, size } : HighlightProps) => (

    <g
        onClick={() => callback(label)}
        style={{ cursor: "pointer" }}
        className="hover:opacity-100 opacity-80 transition-opacity"
        fill="url(#roadmap-gradient)"
      >
      <rect
        width={size == "lg" ? 280 : 135}
        height={30}
        x={x1}
        y={y1}
        pointerEvents="all"
        rx={4.5}
        ry={4.5}
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
              width: size == "lg" ? 278 : 133,
              height: 1,
              paddingTop: y1 + 15,
              marginLeft: x1 + 1,
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                fontSize: 0,
                textAlign: "center",
                color: "#000000",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontFamily: "&quot",
                  color: "#000000",
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
          x={590}
          y={59}
          fill="#FFFFFF"
          fontFamily='"Open Sans", sans-serif'
          fontSize={12}
          textAnchor="middle"
        >
          {label}
        </text>
      </switch>
    </g>
);

export default HighlightBlock;