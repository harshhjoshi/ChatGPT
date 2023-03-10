import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import { arrayItems } from "./AIOptions";
import "./App.css";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";

function App() {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = { ...option, prompt: input };

    const response = await openai.createCompletion(object);

    setResult(response.data.choices[0].text);
  };

  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} />
      )}
    </div>
  );
}

export default App;
