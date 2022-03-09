import React, { useState, useEffect, useCallback } from "react";
import CalculatorKey from "./CalculatorKey";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, nextValue, prevValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };

  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };

  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = useCallback((value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
  }, [prevValue, nextValue]
  );

  return (
    <div id="wrapper">
        <div id="app">
            <div data-reactroot="" className="calculator">
                <div className="calculator-output">
                  <div className="result">{nextValue}</div>
                </div>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalculatorKey className="calculator-key key-clear" keyValue={"c"} onClick={handleOperation}>AC</CalculatorKey>
                            <CalculatorKey className="calculator-key key-sign" keyValue={"\xB1"} onClick={handleOperation}>±</CalculatorKey>
                            <CalculatorKey className="calculator-key key-percent" keyValue={"%"} onClick={handleOperation}>%</CalculatorKey>
                        </div>
                        <div className="digit-keys">
                            <CalculatorKey className="calculator-key key-0" keyValue={0} onClick={handleOperation}>0</CalculatorKey>
                            <CalculatorKey className="calculator-key key-dot" keyValue={"."} onClick={handleOperation}>.</CalculatorKey>
                            <CalculatorKey className="calculator-key key-1" keyValue={1} onClick={handleOperation}>1</CalculatorKey>
                            <CalculatorKey className="calculator-key key-2" keyValue={2} onClick={handleOperation}>2</CalculatorKey>
                            <CalculatorKey className="calculator-key key-3" keyValue={3} onClick={handleOperation}>3</CalculatorKey>
                            <CalculatorKey className="calculator-key key-4" keyValue={4} onClick={handleOperation}>4</CalculatorKey>
                            <CalculatorKey className="calculator-key key-5" keyValue={5} onClick={handleOperation}>5</CalculatorKey>
                            <CalculatorKey className="calculator-key key-6" keyValue={6} onClick={handleOperation}>6</CalculatorKey>
                            <CalculatorKey className="calculator-key key-7" keyValue={7} onClick={handleOperation}>7</CalculatorKey>
                            <CalculatorKey className="calculator-key key-8" keyValue={8} onClick={handleOperation}>8</CalculatorKey>
                            <CalculatorKey className="calculator-key key-9" keyValue={9} onClick={handleOperation}>9</CalculatorKey>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <CalculatorKey className="calculator-key key-divide" keyValue={"/"} onClick={handleOperation}>÷</CalculatorKey>
                        <CalculatorKey className="calculator-key key-multiply" keyValue={"*"} onClick={handleOperation}>×</CalculatorKey>
                        <CalculatorKey className="calculator-key key-subtract" keyValue={"-"} onClick={handleOperation}>−</CalculatorKey>
                        <CalculatorKey className="calculator-key key-add" keyValue={"+"} onClick={handleOperation}>+</CalculatorKey>
                        <CalculatorKey className="calculator-key key-equals" keyValue={"="} onClick={handleOperation}>=</CalculatorKey>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Calculator;
