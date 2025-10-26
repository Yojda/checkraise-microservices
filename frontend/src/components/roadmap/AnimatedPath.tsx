import * as React from "react"
import {returnStatement} from "@babel/types";

type AnimatedPathProps = {
    d: string;
};

const AnimatedPath = ({d} : AnimatedPathProps) => {
    return (
        <path
          fill="none"
          stroke="#E0DBB5"
          strokeDasharray="3 3"
          strokeMiterlimit={10}
          d={d}
          pointerEvents="stroke"
          style={{
            stroke: "#E0DBB5",
            animation:
              "188ms linear 0s infinite normal none running ge-flow-animation-1jKgMrk81DSBv60hyZqZ",
            strokeDashoffset: 6,
          }}
        />
    );
}

export default AnimatedPath;