import React, { useEffect, useReducer } from "react";

import { PresentPage } from "./Components/PresentPage";

import styles from './css/index.module.css';
import { initialState, reducer } from "./state/reducer";
import { WindowsInfo } from "./Components/WindowsInfo";
import { EDIT_WINDOWS_SHOWING, SET_IMAGE_SIZE, SET_STATE } from "./state/types";
import { PageSettingImage } from "./Components/PageSettingImage";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {window, image} = state

  const handlerShowWindows = () => {
    return dispatch({type: EDIT_WINDOWS_SHOWING, payload: !state.window})
  }

  useEffect(() => {

    const store: string | null = localStorage.getItem('data');
    if (typeof store === "string") {
      const parseStore = JSON.parse(store)
      dispatch({type: SET_STATE, payload: parseStore})
    }
  }, [])

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

  return (
    <div className={styles.container}>
      {window && <WindowsInfo handlerShowWindows={handlerShowWindows}/>}
      {image !== '' && (
        <PageSettingImage dispatch={dispatch} state={state}/>
      )}
      {image === '' && (
        <PresentPage
          image={state.image}
          dispatch={dispatch}
          drag={state.drag}
          text={state.text}
          handlerShowWindows={handlerShowWindows}
        />
      )}
    </div>
  );
}

export default App;
