import React from "react";
import Icon from "./Icon";

interface RequirementProps {
    id: string;
    completed: boolean;
    description: string | JSX.Element;
}

const Requirement: React.FC<RequirementProps> = ({id, completed, description}: RequirementProps) => {
    return <li key={id} style={{listStyleType: "none"}}>
        <Icon 
            type={completed? "diamondFilled": "diamond"} 
            color={completed? "green": "red"} /> {description}
        </li>;
}

export default Requirement;

