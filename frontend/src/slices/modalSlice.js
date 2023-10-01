import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: { activeModal: undefined, lang: 'ru' },
  reducers: {
    openModal(state, { payload }) {
      console.log(payload);
      // eslint-disable-next-line no-param-reassign
      state.activeModal = payload;
    },
    closeModal(state) {
      // eslint-disable-next-line no-param-reassign
      state.activeModal = undefined;
    },
    changeLang(state, { payload }) {
      // eslint-disable-next-line no-param-reassign
      state.lang = payload;
    },
  },
});

export default modalSlice.reducer;
export const { actions } = modalSlice;
