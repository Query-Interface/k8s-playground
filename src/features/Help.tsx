import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Tab, Tabs } from 'react-bootstrap';

const Help: React.FC = () => {
    const task = useSelector((state: RootState) => {
        return state.app.exercice?.tasks.find((t) => t.id === state.app.selectedTaskId);
    });

    // TODO: add button to add yaml to clipboard
    return (
        <div style={{width:"100%"}}>
        <Tabs defaultActiveKey="help" transition={false} >
            <Tab eventKey="help" title="Help">
                <ul>
                    {task?.help.map((item) => <li><a href={item}>{item}</a></li>)}
                </ul>
            </Tab>
            <Tab eventKey="template" title="Template">
                <pre>
                    {task?.template}
                </pre>
            </Tab>
        </Tabs>
        </div>
    );
};

export default Help;