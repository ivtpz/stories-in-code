const initialState = {
  slider: {
    value: 2012, // new Date().getFullYear(),
    dragging: false
  }
};

const materialUi = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_D3_YEAR_SLIDER':
    case 'SET_SLIDER_DRAG':
      return {
        ...state,
        slider: {
          ...state.slider,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default materialUi;
