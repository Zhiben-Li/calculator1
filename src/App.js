import { useState } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [hasDot, setHasDot] = useState(false);
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState(0);
  const [opr, setOpr] = useState("");
  const [start, setStart] = useState(false);
  const [memory, setMemory] = useState(0);
  const [buttonClicks, setButtonClicks] = useState([]);

  const ops = ["/", "*", "+", "-"];

  const updateCalc = (value) => {
    if (opr === "=") {
      setCalc(value);
      setOpr("");
      return;
    }
    if (value === "0" && calc === "") {
      setCalc("0");
      return;
    }
    if (value === "0" && calc === "0") {
      setCalc("0");
      return;
    }
    if (value === "." && calc === "0") {
      if (!hasDot) {
        setHasDot(true);
        setCalc(calc + value);
        return;
      } else {
        return;
      }
    }
    if (calc === "0") {
      setCalc(value);
      return;
    }
    if (value === ".") {
      if (!hasDot) {
        setHasDot(true);
      } else {
        return;
      }
    }
    if (ops.includes(value) && result === 0) {
      return;
    }
    setCalc(calc + value);
    handleClick(value);
  };

  const add = () => {
    handleClick("+");
    if (calc === "") {
      setOpr("+");
      return;
    }
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      setOpr("+");
      setHasDot(false);
      return;
    }
    setCalc(eval(result + opr + calc).toString());
    setResult(eval(result + opr + calc));
    setCalc("");
    setOpr("+");
    setHasDot(false);
  };

  const divide = () => {
    handleClick("/");
    if (calc === "") {
      setOpr("/");
      return;
    }
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      setOpr("/");
      setHasDot(false);
      return;
    }
    setCalc(eval(result + opr + calc).toString());
    setResult(eval(result + opr + calc));
    setCalc("");
    setOpr("/");
    setHasDot(false);
  };

  const subtract = () => {
    handleClick("-");
    if (calc === "") {
      setOpr("-");
      return;
    }
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      setOpr("-");
      setHasDot(false);
      return;
    }
    setCalc(eval(result + opr + calc).toString());
    setResult(eval(result + opr + calc));
    setCalc("");
    setOpr("-");
    setHasDot(false);
  };

  const multiply = () => {
    handleClick("*");
    if (calc === "") {
      setOpr("*");
      return;
    }
    if (!start) {
      setResult(calc);
      setStart(true);
      setCalc("");
      setOpr("*");
      setHasDot(false);
      return;
    }
    setCalc(eval(result + opr + calc).toString());
    setResult(eval(result + opr + calc));
    setCalc("");
    setOpr("*");
    setHasDot(false);
  };

  const equal = () => {
    handleClick("=");
    if (calc === "") {
      return;
    }
    if (!start) {
      return;
    }
    if (opr === "=") {
      return;
    }
    setCalc(eval(result + opr + calc).toString());
    setStart(false);
    setOpr("=");
  };

  const deleteLast = () => {
    handleClick("DEL");
    if (calc === "") {
      return;
    }
    setCalc(calc.slice(0, -1));
  };

  const memoryAdd = () => {
    handleClick("M");
    setMemory(calc.toString());
    setOpr("=");
  };

  const memoryRecall = () => {
    handleClick("MR");
    setCalc(memory.toString());
  };

  const clearEntry = () => {
    handleClick("CE");
    setCalc("0");
  };

  const clear = () => {
    handleClick("C");
    setCalc("0");
    setResult(0);
    setOpr("");
    setStart(false);
    setHasDot(false);
  };

  const createDigit = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  function handleClick(buttonText) {
    var timestamp = new Date().toISOString();
    const updatedButtonClicks = [...buttonClicks, { buttonText, timestamp }];
    setButtonClicks(updatedButtonClicks);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span></span> {calc || result.toString()}
        </div>

        <div className="extension">
          <button onClick={clearEntry}>CE</button>
          <button onClick={clear}>C</button>
          <button onClick={memoryAdd}>M</button>
          <button onClick={memoryRecall}>MR</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div class="container">
          <div className="digits">
            {createDigit()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button onClick={equal}>=</button>
          </div>

          <div className="operators">
            <button onClick={add}>+</button>
            <button onClick={subtract}>-</button>
            <button onClick={multiply}>*</button>
            <button onClick={divide}>/</button>
          </div>
        </div>
      </div>
      <div className="history">
        <CSVLink data={buttonClicks} filename={"buttonClicks.csv"}>
          Download buttonClicks.CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default App;
