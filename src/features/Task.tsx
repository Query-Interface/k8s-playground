import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

const Task: React.FC = () => {
    const task = useSelector((state: RootState) => {
        return state.app.exercice?.tasks.find((t) => t.id === state.app.selectedTaskId);
    });

    function renderRequirements() {
        const r = task?.requirements;
        if (r) {
            const properties = Object.keys(r);

            return properties.map((item) => {
                //return <li>{item} - {r[item]} </li>;
                return <li>{item}</li>; // values can be arrays or object, so it cannot be print like that
            })
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