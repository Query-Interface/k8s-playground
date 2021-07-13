import { DetailedRequirement, Requirement, ServiceRequirement } from "../api/playground-api";
import { Kind, ServiceType } from "../api/types";

function buildRequirements(kind: Kind, requirements: Requirement): Array<DetailedRequirement> {
    if (requirements) {
        switch(kind) {
            case "service":
                return buildServiceRequirements(requirements as ServiceRequirement);
            default:
                const properties = Object.keys(requirements);

                return properties.map((item) => {
                    return {id: item, completed: false, "description" : `${item} should be well defined`};
            });
        }
    }
    return [];
}

function buildServiceRequirements(requirements: ServiceRequirement): Array<DetailedRequirement> {
    let uiRequirements: Array<DetailedRequirement> = [];
    uiRequirements.push({id: "name", completed: false, "description" : `Service name should be ${requirements.name}`});
    uiRequirements.push({id: "type", completed: false, "description" : `Service type should be ${requirements.type}`});
    uiRequirements.push({id: "port", completed: false, "description" : `Service port should be ${requirements.ports.port}`});
    uiRequirements.push({id: "targetPort", completed: false, "description" : `Service targetPort should be ${requirements.ports.targetPort}`});
    if (requirements.type !== "ClusterIP" as ServiceType) {
        uiRequirements.push({id: "nodePort", completed: false, "description" : `Service nodePort should be ${requirements.ports.nodePort}`});
    }
    return uiRequirements;
}

export {
    buildRequirements
}