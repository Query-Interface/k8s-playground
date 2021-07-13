import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { getRequirements } from '../app/appSlice';
import Requirement from './Requirement';

const Task: React.FC = () => {
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) => {
        return state.app.exercice?.tasks.find((t) => t.id === state.app.selectedTaskId);
    });
    const requirements = useSelector((state: RootState) => task ? state.app.requirementsByTaskId[task.id] : null);
    useEffect(() => {
        if (task && !requirements) {
            dispatch(getRequirements(task));
        }
    }, [task]);

    const renderRequirements = () => {
        if (requirements) {
            return requirements.map((requirement) => <Requirement {...requirement} /> );
        }
        return [];
    }

    return (
        <div style={{width:"100%", paddingTop: "30px"}}>
            <p className="h1">Specification</p>
            <ul>
                { renderRequirements() }
            </ul>
        </div>
    );
};

export default Task;