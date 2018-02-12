import { combineReducers } from 'redux';
import arxiv from './arxiv';
import materialUi from './materialui';
import d3 from './d3Reducers';

export default combineReducers({
  arxiv,
  materialUi,
  d3
});
