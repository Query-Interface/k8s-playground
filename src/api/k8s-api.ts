import { Pod, Secret } from "./types";
const apiroot = "/api/v1/";

async function getPods(): Promise<Array<Pod>> {
    //const token = document["env"].token;
    const uri = apiroot + "pods";
    /*
    return fetch(uri, { method: "GET",
            headers: new Headers({
                "Authorization": "Header " + token,
                "Accept": "application/json"
            })})
        .then((response) => response.json())
        .then((data) => data.items);
    */
    return fetch(uri, { method: "GET",
        })
    .then((response) => response.json())
    .then((data) => data.items);
}

async function getSecrets(): Promise<Array<Secret>> {
    const uri = apiroot + "secrets";
    /*return fetch(uri, { method: "GET",
            })
        .then((response) => response.json())
        .then((data) => data.items);
    */
   return fetchResources<Array<Secret>>(uri);
}

async function fetchResources<T>(uri: string) : Promise<T> {
    return fetch(uri, { method: "GET",
            })
        .then((response) => response.json())
        .then((data) => data.items);
}

export {
    getPods,
    getSecrets
}