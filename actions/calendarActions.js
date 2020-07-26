export const SET_TARGET_DATE = 'SET_TARGET_DATE';
export const setTargetDate = (date) => ({
  type: SET_TARGET_DATE,
  payload: date,
});

export const SET_VIEW = 'SET_VIEW';
export const setView = (view) => ({
  type: SET_VIEW,
  payload: view,
});
