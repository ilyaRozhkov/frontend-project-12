import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  isOpen: null,
  data: null,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type
      state.isOpen = true
      state.data = payload.data
    },
    closeModal: (state) => {
      state.type = null
      state.isOpen = false
      state.data = null
    },
  },
})

export const actions = modalsSlice.actions
export default modalsSlice.reducer
