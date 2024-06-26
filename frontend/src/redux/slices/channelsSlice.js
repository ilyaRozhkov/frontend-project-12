/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';
import fetchAuthorizationData from '../thunk.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      const user = JSON.parse(localStorage.getItem('user'));
      if (payload.creator === user.username) {
        state.currentChannelId = payload.id;
      }
    },
    deleteChannel: (state, { payload }) => {
      const index = state.channels.findIndex(({ id }) => id === payload.id);
      const { id: idToBeDeletedChannel } = state.channels[index];

      if (idToBeDeletedChannel === state.currentChannelId) {
        state.currentChannelId = 1;
      }

      state.channels.splice(index, 1);
    },
    renameChannel: (state, { payload }) => {
      const index = state.channels.findIndex(({ id }) => id === payload.id);
      state.channels[index].name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const channelIdSelector = (state) => state.channels.currentChannelId;
export const channelsSelector = (state) => state.channels.channels;
export const {
  changeChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
