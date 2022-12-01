export const EDIT_WINDOWS_SHOWING = 'EDIT_WINDOWS_SHOWING'
export const EDIT_TEXTAREA_FIELD = 'EDIT_TEXTAREA_FIELD'
export const EDIT_DRAG_IMAGE = 'EDIT_DRAG_IMAGE'
export const IMAGE_ONLOAD = 'IMAGE_ONLOAD'
export const SET_IMAGE_SIZE = 'SET_IMAGE_SIZE'
export const SET_LEFT_TEXT = 'SET_LEFT_TEXT'
export const SET_TOP_TEXT = 'SET_TOP_TEXT'
export const SET_TEXT_SIZE = 'SET_TEXT_SIZE'
export const SET_COLOR_TEXT = 'SET_COLOR_TEXT'

export interface IInitialState {
  window: boolean;
  image: string;
  text: string;
  color: string;
  drag: boolean;
  widthImage: number;
  heightImage: number;
  leftText: number;
  topText: number;
  fontSize: number;
}
