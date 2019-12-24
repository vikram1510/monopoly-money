import React from "react";
import CountUp from "react-countup";

const CountableNum = ({
  value,
  prefix,
  duration,
  preserveValue,
  startOnMount
}) => {
  return (
    <CountUp
      startOnMount={startOnMount}
      end={value}
      prefix={prefix}
      duration={duration}
      preserveValue={preserveValue}
    />
  );
};

CountableNum.defaultProps = {
  startOnMount: true,
  prefix: "$",
  duration: 2,
  preserveValue: true
};

export default CountableNum;
