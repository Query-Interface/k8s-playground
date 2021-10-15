import { DetailedRequirement, Exercice, RequirementsResponse, Task } from "../api/playground-api";
import { Kind, Secret } from "../api/types";
import { buildRequirements } from "./RequirementsHelper";

function checkSecrets(exercice: Exercice, secrets: Array<Secret>): Array<RequirementsResponse> {
    const response:Array<RequirementsResponse> = [];
    if (exercice && secrets.length > 0) {
        console.log("checking secrets...");
        const tasks = getSecretTasks(exercice);
        // for each tasks checks if requirements are met
        tasks.forEach( task => {
            const secret = secrets.find(secret => secret.metadata.name === task.name);
            if (secret) {
                response.push(checkSecretRequirements(task.id, buildRequirements(task?.kind || "Pod" as Kind, task?.requirements || {}), secret));
            }
        });
    }
    return response;
}

const checkSecretRequirements = (taskId: string, requirements: Array<DetailedRequirement>, secret: Secret) : RequirementsResponse => {
    const updatedRequirements: RequirementsResponse = {taskId, requirements: []};
    updatedRequirements.requirements = requirements.map( req => {
        let requirement = {...req};
        if (secret.data.hasOwnProperty(req.id)) {
            requirement.completed = atob(secret.data[req.id]) === (req.options.value || "");
        } else {
            requirement.completed = false;
        }
        return requirement;
    });
    /*
    requirement.values.forEach(kvPair => {

        if (secret.data.hasOwnProperty(kvPair.key)) {
            kvPair.isfulfilled = atob(secret.data[kvPair.key]) === kvPair.value;
        } else {
            kvPair.isfulfilled = false;
        }
    });
    */
    return updatedRequirements;
}

const getSecretTasks = (exercice: Exercice): Array<Task> => {
    return exercice.tasks.filter(task => task.kind == Kind.Secret);
};

export {
    checkSecrets
}