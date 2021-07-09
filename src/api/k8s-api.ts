import { Pod } from "./types";
const apiroot = "/api/v1/";

async function getPods(): Promise<Array<Pod>> {
    const token = document["env"].token;
    const uri = apiroot + "pods";
    return fetch(uri, { method: "GET",
            headers: new Headers({
                "Authorization": "Header " + token,
                "Accept": "application/json"
            })})
        .then((response) => response.json())
        .then((data) => data.items);
}

export {
    getPods,
}