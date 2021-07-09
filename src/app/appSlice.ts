import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';
import { Pod } from '../api/types';
import { getPods } from '../api/k8s-api';
import { Exercice, getExercice } from '../api/playground-api';

interface PodState {
    pods: Array<Pod>;
    exercice:  Exercice | null;
    error: string | null;
    selectedTaskId: string | null;
}

const initialState: PodState = {
    pods: [],
    error: null,
    exercice: null,
    selectedTaskId: null
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        getPodsSuccess(state, action: PayloadAction<Array<Pod>>) : void {
            state.pods = action.payload;
            state.error = null;
        },
        getPodsFailed(state, action: PayloadAction<string>) : void {
            state.pods = [];
            state.error = action.payload;
        },
        getExerciceSuccess(state, action: PayloadAction<Exercice>) : void {
            state.exercice = action.payload;
            state.error = null;
        },
        getExerciceFailed(state, action: PayloadAction<string>) : void {
            state.exercice = null;
            state.error = action.payload;
        },
        setSelectedTask(state, action: PayloadAction<string>) : void {
            state.selectedTaskId = action.payload;
        }
    }
});

export const { getPodsSuccess, getPodsFailed, getExerciceSuccess, getExerciceFailed, setSelectedTask } = appSlice.actions;

export const fetchPods = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
      const pods = await getPods();
      dispatch(getPodsSuccess(pods));
    } catch (err) {
      dispatch(getPodsFailed(err.toString()));
    }
};
export const fetchExercice = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
        const exercice = await getExercice();
        dispatch(getExerciceSuccess(exercice));
      } catch (err) {
        dispatch(getExerciceFailed(err.toString()));
      }
}
export const selectTask = (taskId: string): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setSelectedTask(taskId));
}

export default appSlice.reducer;
