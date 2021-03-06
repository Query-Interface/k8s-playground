import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';
import { Kind, Pod, Secret} from '../api/types';
import { getPods, getSecrets } from '../api/k8s-api';
import { checkSecrets as checkSecretsRequirement } from '../features/RequirementChecker';
import { buildRequirements } from '../features/RequirementsHelper';
import { DetailedRequirement, Exercice, getExercice, RequirementsResponse, Task } from '../api/playground-api';

interface PodState {
    pods: Array<Pod>;
    secrets: Array<Secret>;
    exercice:  Exercice | null;
    error: string | null;
    selectedTaskId: string | null;
    requirementsByTaskId: Record<string, Array<DetailedRequirement>>;
}

const initialState: PodState = {
    pods: [],
    secrets: [],
    error: null,
    exercice: null,
    selectedTaskId: null,
    requirementsByTaskId: {}
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
        },
        getRequirementsSuccess(state, action: PayloadAction<RequirementsResponse>): void {
            state.requirementsByTaskId[action.payload.taskId] = action.payload.requirements;
        },
        checkRequirementsSuccess(state, action: PayloadAction<RequirementsResponse>): void {
            state.requirementsByTaskId[action.payload.taskId] = action.payload.requirements;
        },
        getSecretsSuccess(state, action: PayloadAction<Array<Secret>>) : void {
            state.secrets = action.payload;
            state.error = null;
        },
        getSecretsFailed(state, action: PayloadAction<string>) : void {
            state.secrets = [];
            state.error = action.payload;
        },
    }
});

export const { getPodsSuccess, getPodsFailed, getExerciceSuccess, getExerciceFailed, setSelectedTask, getRequirementsSuccess, checkRequirementsSuccess, getSecretsSuccess, getSecretsFailed } = appSlice.actions;

export const fetchPods = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
      const pods = await getPods();
      dispatch(getPodsSuccess(pods));
    } catch (err) {
      dispatch(getPodsFailed(err.toString()));
    }
};
export const fetchSecrets = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
        const secrets = await getSecrets();
        dispatch(getSecretsSuccess(secrets));
      } catch (err) {
        dispatch(getSecretsFailed(err.toString()));
      }
};
export const checkSecrets = (exercice: Exercice | null, secrets: Array<Secret>): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    if (exercice) {
        const responses = checkSecretsRequirement(exercice, secrets);
        responses.forEach(response => {
            dispatch(checkRequirementsSuccess(response)); 
        });
    }
}
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

export const getRequirements = (task: Task): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    const requirements: Array<DetailedRequirement> = buildRequirements(task?.kind || "Pod" as Kind, task?.requirements || {});
    dispatch(getRequirementsSuccess({taskId: task.id, requirements}));
}

export default appSlice.reducer;
