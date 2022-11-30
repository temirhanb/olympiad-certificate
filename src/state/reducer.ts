import React from "react";
import { EDIT_DRAG_IMAGE, EDIT_WINDOWS_SHOWING, IInitialState, IMAGE_ONLOAD, SET_IMAGE_SIZE } from "./types";

export const initialState: IInitialState = {
  window: false,
  image: '',
  drag: false,
  widthImage: 0,
  heightImage: 0,
};


export const reducer: React.Reducer<IInitialState, any> = (state, action) => {

  switch (action.type) {
    case EDIT_WINDOWS_SHOWING:
      return {...state, window: action.payload};
    case EDIT_DRAG_IMAGE:
      return {...state, drag: action.payload};
    case IMAGE_ONLOAD:
      return {...state, image: action.payload};
    case SET_IMAGE_SIZE:
      return {
        ...state,
        widthImage: action.payload.width,
        heightImage: action.payload.height,
      };

    default:
      return state;
  }
}
