import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { getRequirements } from '../app/appSlice';
import { CompositeRequirement, DetailedRequirement } from '../api/playground-api';
import Requirement from './Requirement';
import ComplexRequirement from './ComplexRequirement';

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
            return requirements.map((requirement, index) => {
                return isCompositeRequirement(requirement) ? <ComplexRequirement key={index} {...requirement} /> : <Requirement key={index} {...requirement} />;
            });
        }
        return [];
    };

    const isCompositeRequirement = (requirement: DetailedRequirement | CompositeRequirement): requirement is CompositeRequirement => {
        return (requirement as CompositeRequirement).requirements !== undefined;
    };

    return (
        <div style={{width:"100%", paddingTop: "30px"}}>
            <p className="h1">Specification</p>
            <ul style={{paddingLeft: "0"}}>
                { renderRequirements() }
            </ul>
        </div>
    );
};

export default Task;