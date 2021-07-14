import React from "react";
import { DetailedRequirement } from "../api/playground-api";
import Icon from "./Icon";

interface ComplexRequirementProps {
    id: string;
    completed: boolean;
    description: string | JSX.Element;
    requirements: Array<DetailedRequirement>
}

const ComplexRequirement: React.FC<ComplexRequirementProps> = ({id, description, requirements}: ComplexRequirementProps) => {
    return (<li key={id} style={{listStyleType: "none"}}><i>{description}</i>
        <ul style={{paddingLeft: "10px"}}>
            {requirements.map((requirement) => {
                return <li key={id} style={{listStyleType: "none"}}>
                <Icon 
                type={requirement.completed? "diamondFilled": "diamond"} 
                color={requirement.completed? "green": "red"} /> {requirement.description}
                </li>
            })}
        </ul>
        </li>);
        
}

export default ComplexRequirement;