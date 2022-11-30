import * as React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import styles from '../../css/index.module.css';
import { EDIT_DRAG_IMAGE, IMAGE_ONLOAD } from "../../state/types";

interface IProps {
  handlerShowWindows: () => void;
  dispatch: React.Dispatch<any>
  drag: boolean;
  image: string;
}

export const PresentPage: React.FC<IProps> = ({
                                                image,
                                                dispatch,
                                                drag,
                                                handlerShowWindows,
                                              }) => {

  const handlerDragStart = (e: any) => {
    e.preventDefault();
    return dispatch({type: EDIT_DRAG_IMAGE, payload: true})

  }

  const handlerDragEnd = (e: any) => {
    e.preventDefault();

    return dispatch({type: EDIT_DRAG_IMAGE, payload: false})
  }

  const onDropHandler = (e: any) => {
    e.preventDefault();
    let file = [...e.dataTransfer.files]
    file.forEach(item => {
      const image = new FileReader()
      console.log(item)
      image.readAsDataURL(item);
      image.onload = (ev: any) => {

        const src = ev.target.result;

        return dispatch({type: IMAGE_ONLOAD, payload: src})
      }
    })

  }
  return (
    <div className={styles.containerPresent}>
      <div onClick={handlerShowWindows} className={styles.imageInfo}>
        <FontAwesomeIcon icon={faInfo}/>
      </div>
      <div className={styles.line}/>
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
