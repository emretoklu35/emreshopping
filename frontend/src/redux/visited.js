import { createSlice } from '@reduxjs/toolkit';

const storedItems = JSON.parse(localStorage.getItem("visitedProducts")) || [];

const visitedSlice = createSlice({
  name: 'visited',
  initialState: {
    items: storedItems,
  },
  reducers: {
    addVisitedProduct: (state, action) => {
   
      state.items = state.items.filter(item => item.id !== action.payload.id);
      

      state.items.unshift(action.payload);


      if (state.items.length > 5) {
        state.items = state.items.slice(0, 5);
      }

      localStorage.setItem("visitedProducts", JSON.stringify(state.items));
    },

    clearVisited: (state) => {
      state.items = [];
      localStorage.removeItem("visitedProducts");
    },
  },
});

export const { addVisitedProduct, clearVisited } = visitedSlice.actions;
export default visitedSlice.reducer;
