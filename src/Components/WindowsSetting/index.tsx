import React, { useState } from "react";
import styles from '../../css/index.module.css';
import {
  EDIT_FONT_FAMILY,
  IInitialState,
  SET_COLOR_TEXT,
  SET_LEFT_TEXT,
  SET_TEXT_SIZE,
  SET_TOP_TEXT
} from "../../state/types";

interface IProps {
  state: IInitialState;
  dispatch: React.Dispatch<any>;
  downloadFile: () => void;
}

const fontFamily = [
  {
    id: 1,
    name: 'CirceRoundedRegular2',
  }, {
    id: 2,
    name: 'CirceRoundedRegular',
  }, {
    id: 3,
    name: 'CirceRoundedBold',
  }, {
    id: 4,
    name: 'Arial, sans-serif',
  },
  {
    id: 7,
    name: 'UbuntuRegular',
  },
  {
    id: 6,
    name: 'UbuntuBold',
  },
  {
    id: 5,
    name: 'UbuntuMedium',
  }, {
    id: 8,
    name: 'UbuntuLite',
  },
]

export const WindowsSetting: React.FC<IProps> = (
  {
    state,
    dispatch,
    downloadFile
  }) => {

  const handlerInputLeft = (e: any) => {
    e.preventDefault();
    return dispatch({type: SET_LEFT_TEXT, payload: Number(e.target.value)})
  }

  const handlerInputTop = (e: any) => {
    e.preventDefault();
    return dispatch({type: SET_TOP_TEXT, payload: Number(e.target.value)})
  }

  const handlerInputFontSize = (e: any) => {
    e.preventDefault();
    return dispatch({type: SET_TEXT_SIZE, payload: Number(e.target.value)})
  }

  const handlerInputColor = (e: any) => {
    e.preventDefault();
    return dispatch({type: SET_COLOR_TEXT, payload: e.target.value})
  }

  const handlerStartDownload = async () => {
    const stateToString = JSON.stringify(state)
    localStorage.setItem('data', stateToString);

    downloadFile();
  }

  const handlerChangeOption = (e: { target: { value: any; }; }) => {
    return dispatch({type: EDIT_FONT_FAMILY, payload: e.target.value})
  }

  return (
    <div
      className={styles.containerWindowsSetting}>
      <div className={styles.windowsSettingHeader}>Настройки</div>
      <div className={styles.line}/>
      <div className={styles.inputContainer}>
        <span>Смещение по оси X</span>
        <input className={styles.inputSetting} value={state.leftText} onChange={handlerInputLeft} type="number"/>
      </div>
      <div className={styles.inputContainer}>
        <span>Смещение по оси Y</span>
        <input className={styles.inputSetting} value={state.topText} onChange={handlerInputTop} type="number"/>
      </div>
      <div className={styles.inputContainer}>
        <span>Шрифт</span>
        <select className={styles.inputSelect} value={state.fontFamily} onChange={handlerChangeOption}>
          {fontFamily.map(({id, name}) => (
            <option key={id} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <span>Размер шрифта</span>
        <input className={styles.inputSetting} value={state.fontSize} onChange={handlerInputFontSize} type="number"/>
      </div>
      <div className={styles.inputContainer}>
        <span>Цвет текста</span>
        <input className={styles.inputSetting} value={state.color} onChange={handlerInputColor} type="sting"/>
      </div>
      <div>
        <button onClick={handlerStartDownload}>Скачать</button>
      </div>
    </div>
  )
}
