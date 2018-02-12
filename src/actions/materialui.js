export const updateD3YearSlider = value => ({
  type: 'UPDATE_D3_YEAR_SLIDER',
  payload: { value }
});

export const setSliderDrag = dragging => ({
  type: 'SET_SLIDER_DRAG',
  payload: { dragging }
});
