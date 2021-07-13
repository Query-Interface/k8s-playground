const app = App();
function App() {
    const root = document.env.host;
    const token = document.env.token;

    async function getPods() {
        const uri = '/api/v1/pods';
        return fetch(uri, { method: "GET",
            headers: new Headers({
                "Authorization": "Header " + token,
                "Accept": "application/json"
            })})
            .then((response) => response.json())
            .then((data) => data.items);
    }

    async function checkPod() {
        const content = document.querySelector('#probe');
        const pods = getPods();
        pods.then((data) => {
            const pod = data.find(pod => pod.metadata.name === "nginx-frontend");
            if (pod) {
                content.style.backgroundColor = "green";
            } else {
                content.style.backgroundColor = "red";
            }
        });
    }

    setInterval(() => checkPod(), 10000);
}