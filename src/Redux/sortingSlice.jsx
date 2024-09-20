import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order:"Priority",
    group:"User",
    readyStates:false,
    error: null,

};

const sortingSlice = createSlice({
    name: "sorting",
    initialState,
    reducers: {
        setSorting(state, actions) {
           if(actions.payload.order) state.order = actions.payload.order;
           if(actions.payload.group) state.group = actions.payload.group;
            state.readyStates = true;
        },

    },
});

export const { setSorting} = sortingSlice.actions;
export default sortingSlice.reducer;
