import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Identify {
  id: string;
  name: string;
  number: number;
}

interface State {
  value: Identify;
}

const initialState: State = {
  value: {
    id: '',
    name: '',
    number: 0,
  },
};

const fetchSlice = createSlice({
  name: 'getdata',
  initialState,
  reducers: {
    resetValue: state => {
      state.value = {
        id: '',
        name: '',
        number: 0,
      };
    },
    updateValue: (state, action: PayloadAction<Identify>) => {
      state.value = action.payload;
    },
  },
});

export const {resetValue, updateValue} = fetchSlice.actions;

export default fetchSlice.reducer;
