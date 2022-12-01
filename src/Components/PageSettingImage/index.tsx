import React from "react";
import html2canvas from "html2canvas";
import { IInitialState } from "../../state/types";
import { WindowsSetting } from "../WindowsSetting";

interface IProps {
  state: IInitialState;
  dispatch: React.Dispatch<any>;
}

export const PageSettingImage: React.FC<IProps> = ({state, dispatch}) => {
  const student = state.text;

  const studentArray = student.split(',');
  const downloadFile = () => {

    for (const item in studentArray) {
      setTimeout(function () {
        const svg = document.getElementById("svg_image");
        const svgText = document.getElementById("svg_text");
        // @ts-ignore
        svgText.innerHTML = studentArray[item];
        // @ts-ignore
        html2canvas(svg, {width: state.widthImage, height: state.heightImage, x: 0}).then(function (canvas) {

          const link = document.createElement("a");
          document.body.appendChild(link);
          // @ts-ignore
          link.download = svgText.innerHTML + ".png";
          link.href = canvas.toDataURL();
          link.target = '_blank';
          link.click();
          document.body.removeChild(link);
        });
      }, Number(item) * 5000, item);
    }
  }
  return (
    <div
      style={{position: 'absolute', left: 0, top: 0}}
    >
      <WindowsSetting
        state={state}
        dispatch={dispatch}
        downloadFile={downloadFile}
      />
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
            width: 100,
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
            }}
          >
            {studentArray[0]}
          </div>
        </div>
      </div>
    </div>
  )
}
