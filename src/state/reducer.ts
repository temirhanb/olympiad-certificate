import React from "react";
import {
  EDIT_DRAG_IMAGE,
  EDIT_TEXTAREA_FIELD,
  EDIT_WINDOWS_SHOWING,
  IInitialState,
  IMAGE_ONLOAD,
  SET_COLOR_TEXT,
  SET_IMAGE_SIZE,
  SET_LEFT_TEXT,
  SET_TEXT_SIZE,
  SET_TOP_TEXT
} from "./types";

export const initialState: IInitialState = {
  window: false,
  image: '',
  color: '000',
  drag: false,
  widthImage: 0,
  leftText: 30,
  topText: 30,
  fontSize: 150,
  heightImage: 0,
  text: ''
};


export const reducer: React.Reducer<IInitialState, any> = (state, action) => {

  switch (action.type) {
    case EDIT_WINDOWS_SHOWING:
      return {...state, window: action.payload};
    case EDIT_DRAG_IMAGE:
      return {...state, drag: action.payload};
    case EDIT_TEXTAREA_FIELD:
      return {...state, text: action.payload};
    case IMAGE_ONLOAD:
      return {...state, image: action.payload};
    case SET_COLOR_TEXT:
      return {...state, color: action.payload};
    case SET_TOP_TEXT:
      return {...state, topText: action.payload};
    case SET_LEFT_TEXT:
      return {...state, leftText: action.payload};
    case SET_TEXT_SIZE:
      return {...state, fontSize: action.payload};
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
