import * as React from "react"
import {returnStatement} from "@babel/types";

type RegularPathProps = {
    d: string;
};

const RegularPath = ({d} : RegularPathProps) => {
    return (
        <path
          fill="none"
          stroke="#E0DBB5"
          strokeMiterlimit={10}
          strokeWidth={2}
          d={d}
          pointerEvents="stroke"
          style={{
            stroke: "#E0DBB5",
          }}
        />
    );
}

export default RegularPath;