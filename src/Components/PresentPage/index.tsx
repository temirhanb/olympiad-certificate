import * as React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import styles from '../../css/index.module.css';
import { EDIT_DRAG_IMAGE, EDIT_TEXTAREA_FIELD, IMAGE_ONLOAD } from "../../state/types";
import { useRef } from "react";

interface IProps {
  handlerShowWindows: () => void;
  dispatch: React.Dispatch<any>
  drag: boolean;
  image: string;
  text: string;
}

export const PresentPage: React.FC<IProps> = ({
                                                image,
                                                dispatch,
                                                text,
                                                drag,
                                                handlerShowWindows,
                                              }) => {

  const refInput = useRef(null)

  const handlerDragStart = (e: any) => {
    e.preventDefault();
    return dispatch({type: EDIT_DRAG_IMAGE, payload: true})

  }

  const handlerDragEnd = (e: any) => {
    e.preventDefault();

    return dispatch({type: EDIT_DRAG_IMAGE, payload: false})
  }
  const handlerChangeTextArea = (e: any) => {
    e.preventDefault();

    return dispatch({type: EDIT_TEXTAREA_FIELD, payload: e.target.value})
  }

  const onDropHandler = (e: any) => {
    e.preventDefault();

    let file = [...e.dataTransfer.files]

    file.forEach(item => {
      const image = new FileReader()
      image.readAsDataURL(item);
      image.onload = (ev: any) => {

        const src = ev.target.result;

        return dispatch({type: IMAGE_ONLOAD, payload: src})
      }
    })
  }

  const handlerInputFile = (e: any) => {
    e.preventDefault();

    let file = [...e.target.files]

    file.forEach(item => {
      const image = new FileReader()
      image.readAsDataURL(item);
      image.onload = (ev: any) => {

        const src = ev.target.result;

        return dispatch({type: IMAGE_ONLOAD, payload: src})
      }
    })
  }
  const clickHandlerInput = ()=>{
    // @ts-ignore
    refInput.current.click();
  }

  return (
    <div className={styles.containerPresent}>
      <div onClick={handlerShowWindows} className={styles.imageInfo}>
        <FontAwesomeIcon icon={faInfo}/>
      </div>
      <div className={styles.line}/>
      <div className={styles.textareaContainer}>
        <textarea value={text} onChange={handlerChangeTextArea} placeholder={'Напривер: Иван Иванов, Петр Петров...'} className={styles.textareaField}/>
      </div>
      <input className={styles.inputFile} ref={refInput} type="file" onChange={handlerInputFile}/>
      {image !== '' ?
        <div className={styles.containerImage}>
          <img className={styles.image} src={image} alt="фон"/>
        </div> :
        <div
          onDragStart={handlerDragStart}
          onDragLeave={handlerDragEnd}
          onDrop={onDropHandler}
          onDragOver={handlerDragStart}
          className={styles.containerDragImage}
          onClick={clickHandlerInput}
        >

          {drag ?
            <div>
              <span>Перетащите файл, для загрузки изображения</span>
            </div> :
            <div>
          <span>
            Отпустите файл, для загрузки изображения
          </span>
            </div>}
        </div>
      }

    </div>
  )
}
