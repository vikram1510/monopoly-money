import React, { useEffect } from "react";
import CountUp from "react-countup";

const CountableNum = ({
  value,
  prefix,
  duration,
  preserveValue,
  startOnMount,
  animateOnRender,
}) => {
  
  let start

  useEffect(() => {
    if (!animateOnRender) {
      start = value
    }
  }, [animateOnRender])

  return (
    <CountUp
      startOnMount={startOnMount}
      start={start}
      end={value}
      prefix={prefix}
      duration={duration}
      preserveValue={preserveValue}
    />
  );
};

CountableNum.defaultProps = {
  prefix: "$",
  duration: 2,
  preserveValue: true
};

export default CountableNum;
