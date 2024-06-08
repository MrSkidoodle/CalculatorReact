import { useState } from "react";
import "./App.css";
let Numbers = [];
let Operators = [];
function Calculator() {
  const [DisplayString, setDisplayString] = useState("");
  const [TemporaryValue, setTemporaryValue] = useState("");
  const [LastOperation, setLastOperation] = useState("");
  
  function NumberButton({Number}) {
    function HandleNumberClick() {
      setTemporaryValue(TemporaryValue + Number);
      setDisplayString(DisplayString + Number);
    }
    return (
      <button className="Button" onClick={HandleNumberClick}>{Number}</button>
    );
  }
  function OperatorButton({Operator}) {
    function HandleOperatorClick() {
      Numbers.push(parseFloat(TemporaryValue));
      setTemporaryValue("");
      Operators.push(Operator);
      setDisplayString(DisplayString + " " + Operator + " ");
    }
    return (
      <button className="Button Operators" onClick={HandleOperatorClick}>{Operator}</button>
    )
  }
  function Equal() {
    function handleEqual() {
      Numbers.push(parseFloat(TemporaryValue));
      setLastOperation(DisplayString);
      for (let i = 0; i <= Operators.length - 1; i++) {
        if (Operators[i] === "X") {
          Numbers[i] = Numbers[i] * Numbers[i + 1];
          Numbers.splice(i + 1, 1);
          Operators.splice(i, 1);
          i -= 1;
        } else if (Operators[i] === "÷") {
          Numbers[i] = Numbers[i] / Numbers[i + 1];
          Numbers.splice(i + 1, 1);
          Operators.splice(i, 1);
          i -= 1;
        }
      }
      for (let j = 0; j <= Operators.length; j++) {
        if (Operators[j] === "+") {
          Numbers[j] = Numbers[j] + Numbers[j + 1];
          Numbers.splice(j + 1, 1);
          Operators.splice(j, 1);
          j -= 1;
        } else if (Operators[j] === "-") {
          Numbers[j] = Numbers[j] - Numbers[j + 1];
          Numbers.splice(j + 1, 1);
          Operators.splice(j, 1);
          j -= 1;
        }
      }
      setDisplayString(Numbers[0].toString());
      setTemporaryValue("");
      console.log(Numbers);
    }
    return (
      <button onClick={handleEqual} className="Equal">=</button>
    )
  }
  function Display() {
    return (
      <h1>{DisplayString}</h1>
    )
  }
  function LastFunction() {
    return (
      <h4>{LastOperation}</h4>
    );
  }
  function ClearAccumulator() {
    function HandleAC() {
      setDisplayString("");
      setLastOperation("");
      setTemporaryValue("");
      Numbers = [];
      Operators = [];
    }
    return (
      <button className="Button" onClick={HandleAC}>AC</button>
    )
  }
  return (
    <div className="Component">
      <div className="Calculator">
        <div className="Display">
          <div className="DisplayContainer">
            <div className="LastOperation">
              <LastFunction />
            </div>
            <div className="DisplaynEqual">
              <Display />
              <div className="EqualButton">
                <Equal />
              </div>
            </div>
          </div>
        </div>
        <div className="ButtonContainer">
          <div className="FirstRow">
            <NumberButton Number={"1"} />
            <NumberButton Number={"2"} />
            <NumberButton Number={"3"} />
            <OperatorButton Operator={"X"} />
          </div>
          <div className="SecondRow">
            <NumberButton Number={"4"} />
            <NumberButton Number={"5"} />
            <NumberButton Number={"6"} />
            <OperatorButton Operator={"÷"} />
          </div>
          <div className="ThirdRow">
            <NumberButton Number={"7"} />
            <NumberButton Number={"8"} />
            <NumberButton Number={"9"} />
            <OperatorButton Operator={"+"} />
          </div>
          <div className="FourthRow">
            <NumberButton Number={"."} />
            <NumberButton Number={"0"} />
            <ClearAccumulator />
            <OperatorButton Operator={"-"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calculator;