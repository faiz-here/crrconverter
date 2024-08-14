import React from 'react'
import "./app.css"
import currcode from "./currcode.js"
import { useState } from "react"

function App() {
  let [selectedValue1, setselectedValue1] = useState(currcode[0])
  let [selectedValue2, setselectedValue2] = useState(currcode[1])
  let [inputField, setInputField] = useState("1")
  let [Result, setResult] = useState("0.01 USD")

  let swapbtn = () => {
    setselectedValue1(selectedValue2)
    setselectedValue2(selectedValue1)
  }

  let btn = () => {
    fetch(`https://open.er-api.com/v6/latest/${selectedValue1}`).then((res) => res.json())
    .then((finalRes) => {
      let value = finalRes.rates[selectedValue2]
      let finalValue = value * inputField
      console.log(finalRes.rates[selectedValue2]);
      // console.log(finalValue);
      setResult(((finalValue).toFixed(2) + " " + selectedValue2))
    })
  }
  return (
    <>
      <div className="container">

        <div className="minicontainer">
          <div className='currencys'>
            <select value={selectedValue1} defaultValue="INR" onChange={(e) => setselectedValue1(e.target.value)} name="" id="" className='currency' >
              {currcode.map((val, index) => {
                return (
                  <>
                    <option key={index} > {val} </option>
                  </>
                )
              })}
            </select>

            <button onClick={()=> swapbtn()} className='swap'>
              <p> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" /></svg></p>
            </button>

            <select value={selectedValue2} defaultValue="USD" onChange={(e) => setselectedValue2(e.target.value)} name="" id="" className='currency'>
              {currcode.map((val, index) => {
                return (
                  <>
                    <option key={index} value={val} > {val} </option>
                  </>
                )
              })}
            </select>
          </div>
          <div className="inputvalue">
            <h1>Enter Amount</h1>
            <input type="number" className='inutfield' value={inputField} onChange={(e) =>setInputField(e.target.value)} />
          </div>
          <div className="value"> {Result}  </div>
          <button className='btn' onClick={btn}>get value</button>
        </div>
      </div>
    </>
  )
}

export default App