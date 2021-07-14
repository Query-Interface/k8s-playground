import { CompositeRequirement, DeployRequirement, DetailedRequirement, PersistentVolumeClaimRequirement, Requirement, SecretRequirement, ServiceRequirement } from "../api/playground-api";
import { Kind, ServiceType } from "../api/types";

function buildRequirements(kind: Kind, requirements: Requirement): Array<DetailedRequirement> {
    if (requirements) {
        switch(kind) {
            case "service":
                return buildServiceRequirements(requirements as ServiceRequirement);
            case "secret":
                return buildSecretRequirements(requirements as SecretRequirement);
            case "persistentVolume":
            case "persistentVolumeClaim":
                return buildPersistentVolumeRequirements(requirements as PersistentVolumeClaimRequirement);
            case "deploy":
                return buildDeploymentRequirements(requirements as DeployRequirement);
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
    const uiRequirements: Array<DetailedRequirement> = [];
    uiRequirements.push({id: "name", completed: false, description: `Service name should be ${requirements.name}`});
    uiRequirements.push({id: "type", completed: false, description: `Service type should be ${requirements.type}`});
    uiRequirements.push({id: "selector", completed: false, description: `Service should expose pods with labels ${requirements.selector}`});
    uiRequirements.push({id: "port", completed: false, description: `Service port should be ${requirements.ports.port}`});
    uiRequirements.push({id: "targetPort", completed: false, description: `Service targetPort should be ${requirements.ports.targetPort}`});
    if (requirements.type !== "ClusterIP" as ServiceType) {
        uiRequirements.push({id: "nodePort", completed: false, description: `Service nodePort should be ${requirements.ports.nodePort}`});
    }
    return uiRequirements;
}

function buildSecretRequirements(requirements: SecretRequirement): Array<DetailedRequirement> {
    const uiRequirements: Array<DetailedRequirement> = [];
    requirements.values.map((kvPair) => { return uiRequirements.push({id: kvPair.key, completed: false, description: `Env variable '${kvPair.key}' should be equal to '${kvPair.value}'`}); });
    return uiRequirements;
}

function buildPersistentVolumeRequirements(requirements: PersistentVolumeClaimRequirement): DetailedRequirement[] {
    const uiRequirements: Array<DetailedRequirement> = [];
    uiRequirements.push({id: "capacity", completed: false, description: `Capacity should be ${requirements.capacity}`});
    uiRequirements.push({id: "mode", completed: false, description: `Mode should be ${requirements.mode}`});
    return uiRequirements;
}

function buildDeploymentRequirements(requirements: DeployRequirement): DetailedRequirement[] {
    const uiRequirements: Array<DetailedRequirement> = [];
    uiRequirements.push({id: "replicas", completed: false, description: `Deployment should have ${requirements.replicas} replicas`});
    uiRequirements.push({id: "selector", completed: false, description: `Deployment should labels pods with '${requirements.selector}'`});
    if (requirements.volumes) {
        uiRequirements.push(buildVolumeRequirement(requirements));
    }
    if (requirements.initContainers) {
        uiRequirements.push(buildContainerRequirements(requirements, true));
    }
    if (requirements.containers) {
        uiRequirements.push(buildContainerRequirements(requirements));
    }
    return uiRequirements;
}

function buildVolumeRequirement(requirements: DeployRequirement): CompositeRequirement {
    const composite: CompositeRequirement = {id: "volumes", description:"Volumes", requirements: [], completed: false};
    requirements.volumes.map((volume, index) => {
        const prefix = `volume-${index}`;
        composite.requirements.push({id: prefix+"-name", completed: false, description: `${prefix} should be named '${volume.name}'`});
        composite.requirements.push({id: prefix+"-type", completed: false, description: `${prefix} should be named '${volume.type}'`});
        if (volume.type === "pvc") {
            composite.requirements.push({id: prefix+"-claimName", completed: false, description: `${prefix} should use claim named '${volume.claimName}'`});
        }
    });
    return composite;
}

function buildContainerRequirements(requirements: DeployRequirement, isInitContainer: boolean = false): CompositeRequirement {
    const composite: CompositeRequirement = {id: isInitContainer? "initContainers": "containers", description:isInitContainer? "Init Containers": "Containers", requirements: [], completed: false};
    const containers = isInitContainer ? requirements.initContainers : requirements.containers;
    containers.map((container, index) => {
        const prefix = isInitContainer ? `initContainer-${index}`: `container-${index}`;
        composite.requirements.push({id: prefix+"-name", completed: false, description: `${prefix} should be named '${container.name}'`});
        composite.requirements.push({id: prefix+"-image", completed: false, description: `${prefix} should use image '${container.image}'`});
        if (container.command) {
            composite.requirements.push({id: prefix+"-command", completed: false, description: `${prefix} should use command '${container.command}'`});
        }
        if (container.args) {
            composite.requirements.push({id: prefix+"-args", completed: false, description: `${prefix} should use arguments '${container.args}'`});
        }
        if (container.mounts) {

        }
    });
    return composite;
}

export {
    buildRequirements
}

