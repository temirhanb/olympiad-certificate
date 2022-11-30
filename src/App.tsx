import React, { useEffect, useReducer } from "react";

import { PresentPage } from "./Components/PresentPage";

import styles from './css/index.module.css';
import { initialState, reducer } from "./state/reducer";
import { WindowsInfo } from "./Components/WindowsInfo";
import { EDIT_WINDOWS_SHOWING, SET_IMAGE_SIZE } from "./state/types";
import JSZip from "jszip";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {window} = state

  const handlerShowWindows = () => {
    return dispatch({type: EDIT_WINDOWS_SHOWING, payload: !state.window})
  }

  useEffect(() => {
    var img = new Image();
    img.onload = function () {
      return dispatch({
        type: SET_IMAGE_SIZE, payload: {
          width: img.width,
          height: img.height
        }
      })
    };
    img.src = state.image;
  }, [state.image])
  const downloadFile = () => {

    const student =
      'Черкас Мораес Дмитрий' +
      ',Ситниченко Габриэлла';

    const studentArray = student.split(',');

    const myLoop = () => {
      const zip = new JSZip()
      zip.generateAsync({type: "blob"}).then(function (content) {
        // see FileSaver.js
        studentArray.forEach(item => {
          const svg = document.getElementById("svg_image");
          const svgText = document.getElementById("svg_text");
          // @ts-ignore
          svgText.innerHTML = item;
          // @ts-ignore
          html2canvas(svg, {width: 3508, height: 2480, x: 0}).then(function (canvas) {

            const link = document.createElement("a");
            document.body.appendChild(link);
            // @ts-ignore
            link.download = svgText.innerHTML + ".png";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
            document.body.removeChild(link);
          });
        })
      });
    }

    myLoop()
  }

  const hide = false
  return (
    <div className={styles.container}>
      {hide && (
        <div style={{width: state.widthImage, height: state.heightImage}} onClick={downloadFile} id="svg_image">
          <img id="image" src={state.image} alt=""/>
          <div id="container_text">
            <div id='svg_text'>
            </div>
          </div>
        </div>
      )}
      {window && <WindowsInfo handlerShowWindows={handlerShowWindows}/>}
      <PresentPage
        image={state.image}
        dispatch={dispatch} drag={state.drag} handlerShowWindows={handlerShowWindows}/>
    </div>
  );
}

export default App;
