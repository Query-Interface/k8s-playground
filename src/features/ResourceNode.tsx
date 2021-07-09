import React from "react";
import ResourceIcon from "./ResourceIcon";

const nodeStyles = {
    background: "red",
    color: "#FFF",
    padding: 10,
    border: "1px solid red"
}

interface ResourceNodeProps {
    label: string;
    kind: string;
}

interface ReactFlowElementProps {
    id: string;
    type: string;
    data: ResourceNodeProps;
}

const ResourceNode: React.FC<ReactFlowElementProps> = ({data}: ReactFlowElementProps) => {

    return (
        <div style={nodeStyles}>

            <ResourceIcon kind={data.kind} />
            <div>{data.label}</div>

        </div>
    );
};

export default ResourceNode;