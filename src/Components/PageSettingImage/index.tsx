import React, { useState } from "react";
import { IInitialState } from "../../state/types";
import { WindowsSetting } from "../WindowsSetting";
import styles from "../../css/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import domtoimage from 'dom-to-image';
// @ts-ignore
import { saveAs } from 'file-saver';

interface IProps {
  state: IInitialState;
  dispatch: React.Dispatch<any>;
}

export const PageSettingImage: React.FC<IProps> = ({state, dispatch}) => {

  const student = state.text;
  const studentArray = student.split(',');
  const [hideWindows, setHideWindows] = useState(false)

  const downloadFile = async () => {

    setHideWindows(true)

    for (let i = 0; i < studentArray.length; i++) {

      const svg = document.getElementById("svg_image");
      const svgText = document.getElementById("svg_text");
      // @ts-ignore
      svgText.innerHTML = studentArray[i];

      if (i === studentArray.length) {
        alert('Скачивание завершено')
      }
      // @ts-ignore
      await domtoimage.toBlob(svg)
        // @ts-ignore
        .then(function (blob) {
          // @ts-ignore
          saveAs(blob, svgText.innerHTML + '.png');
        });
    }
  }

  return (
    <div
      style={{position: 'absolute', left: 0, top: 0}}
    >
      <div
        className={styles.containerWindowsParent}
      >
        {hideWindows ? (
          <div className={styles.loader}>loading</div>
        ) : (
          <WindowsSetting
            state={state}
            dispatch={dispatch}
            downloadFile={downloadFile}
          />
        )}
      </div>

      <div
        style={{width: state.widthImage, height: state.heightImage, position: 'absolute'}}
        id="svg_image"
      >
        <img
          style={{
            position: "absolute"
          }}
          id="image"
          src={state.image}
          alt=""
        />
        <div
          id="container_text"
          style={{
            width: 'auto',
            left: `${state.leftText}%`,
            top: `${state.topText}%`,
            display: "flex",
            justifyContent: 'center',
            position: "absolute"
          }}
        >
          <div
            id='svg_text'
            style={{
              color: `#${state.color}`,
              fontSize: `${state.fontSize}px`,
              fontFamily: state.fontFamily,
            }}
          >
            {studentArray[0]}
          </div>
        </div>
      </div>
    </div>
  )
}
