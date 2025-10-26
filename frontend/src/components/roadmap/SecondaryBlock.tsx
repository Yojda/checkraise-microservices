import * as React from "react"

type SecondaryProps = {
    x1: number;
    y1: number;
    callback: (label : string) => void;
    label: string;
    size: string;
};

const SecondaryBlock = ({ x1, y1, callback, label, size } : SecondaryProps) => (
    <g
        onClick={() => {callback(label)}}
        style={{ cursor: "pointer" }}
        className={"hover:fill-amber-800 fill-[#FFFFFF15]"}
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
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontFamily: "&quot",
                  color: "#FFFFFF",
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

export default SecondaryBlock;