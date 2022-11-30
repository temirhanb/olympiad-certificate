export const EDIT_WINDOWS_SHOWING = 'EDIT_WINDOWS_SHOWING'
export const EDIT_DRAG_IMAGE = 'EDIT_DRAG_IMAGE'
export const IMAGE_ONLOAD = 'IMAGE_ONLOAD'
export const SET_IMAGE_SIZE = 'SET_IMAGE_SIZE'

export interface IInitialState {
  window: boolean;
  image: string;
  drag: boolean;
  widthImage: number;
  heightImage: number;
}
