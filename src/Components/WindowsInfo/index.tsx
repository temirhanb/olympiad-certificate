import React from "react";
import styles from '../../css/index.module.css';

interface IProps {
  handlerShowWindows: () => void
}

export const WindowsInfo: React.FC<IProps> = ({
                                                handlerShowWindows
                                              }) => {
  return (
    <div onClick={handlerShowWindows} className={styles.infoBackground}>
      <div className={styles.infoContainer}>
        <span>
          Упс... Кажется тут ничего нет &#128529;
        </span>
      </div>
    </div>
  )
}
