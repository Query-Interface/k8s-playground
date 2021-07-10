import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import Icon from './Icon';
import { Kind, ServiceType } from '../api/types';
import { Requirement, ServiceRequirement, DeployRequirement, PersistentVolumeClaimRequirement, SecretRequirement } from '../api/playground-api';

const Task: React.FC = () => {
    const task = useSelector((state: RootState) => {
        return state.app.exercice?.tasks.find((t) => t.id === state.app.selectedTaskId);
    });

    function renderRequirements() {
        const requirements = task?.requirements;
        if (requirements) {
            const properties = Object.keys(requirements);

            return properties.map((item) => {
                //return <li>{item} - {r[item]} </li>;
                return <li style={{listStyleType: "none"}}><Icon type="diamond" /> {item}</li>; // values can be arrays or object, so it cannot be print like that
            });
        }
        return [];
    }

    function renderRequirement(kind: Kind, requirements: Requirement): Array<JSX.Element> {
        if (requirements) {
            switch(kind) {
                case "service":
                    return renderServiceRequirements(requirements as ServiceRequirement);
                default:
                    const properties = Object.keys(requirements);

                    return properties.map((item) => {
                    //return <li>{item} - {r[item]} </li>;
                    return <li key={item} style={{listStyleType: "none"}}><Icon type="diamond" /> {item}</li>; // values can be arrays or object, so it cannot be print like that
                });
            }
        }
        return [];
    }

    function renderServiceRequirements(requirements: ServiceRequirement): Array<JSX.Element> {
        let elements: Array<JSX.Element> = [];
        elements.push(<li key="name" style={{listStyleType: "none"}}><Icon type="diamond" /> {`Service should be named '${requirements.name}'`}</li>);
        elements.push(<li key="type" style={{listStyleType: "none"}}><Icon type="diamond" /> {`Service type should be ${requirements.type}`}</li>);
        elements.push(<li key="port" style={{listStyleType: "none"}}><Icon type="diamond" /> {`Service port should be ${requirements.ports.port}`}</li>);
        elements.push(<li key= "targetPort" style={{listStyleType: "none"}}><Icon type="diamond" /> {`Service targetPort should be ${requirements.ports.targetPort}`}</li>);
        if (requirements.type !== "ClusterIP" as ServiceType) {
            elements.push(<li key="nodePort" style={{listStyleType: "none"}}><Icon type="diamond" /> {`Service nodePort should be ${requirements.ports.nodePort}`}</li>);
        }
        return elements;
    }

    return (
        <div style={{width:"100%", paddingTop: "30px"}}>
            <p className="h1">Specification</p>
            <ul>
                { renderRequirement(task?.kind || "Pod" as Kind, task?.requirements || {}) }
            </ul>
        </div>
    );
};

export default Task;