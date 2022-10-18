import React, { useState, useEffect } from "react";
import "./App.css";
import MindARViewer from "./mindar-viewer";
import axios from "axios";

function App() {
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState([]);
  const [pathVideoCompiler, setPathVideoCompiler] = useState("");

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(process.env.REACT_APP_BASE_URL)
        .then((res) => {
          console.log(res.data);
          setItems(res.data.data);
        })
        .catch((err) => console.log(err));
    };

    const getVideoTargetsCompiler = async () => {
      await axios
        .get(process.env.REACT_APP_GET_COMPILER)
        .then((res) => {
          console.log(res.data);
          setPathVideoCompiler(
            res.data.data[0].video_compiler.path.slice(
              12,
              res.data.data[0].video_compiler.path.length
            )
          );
        })
        .catch((err) => console.log(err));
    };
    getVideoTargetsCompiler();
    getData();
  }, []);

  console.log(pathVideoCompiler);
  return (
    <div className="App">
      <div>
        {!started && (
          <button
            onClick={() => {
              setStarted(true);
            }}
          >
            Start
          </button>
        )}
        {started && (
          <button
            onClick={() => {
              setStarted(false);
            }}
          >
            Stop
          </button>
        )}
      </div>

      {started && (
        <div className="container">
          <MindARViewer items={items} pathVideoCompiler={pathVideoCompiler} />
          <video></video>
        </div>
      )}
    </div>
  );
}

export default App;
