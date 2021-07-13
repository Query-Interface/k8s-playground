import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisNetworkReactComponent from "vis-network-react";
import { setSelectedTask } from '../app/appSlice';
import { RootState } from '../app/rootReducer';

interface GraphEvent {
    edges: Array<string>;
    nodes: Array<string>;
    event: any;
    pointer: any;
}
type Kind = "deploy" | "service" | "configMap" | "secret" | "persistentVolume" | "persistentVolumeClaim" | "storageClass" | "volume" | "job" | "cronJob" | "networkPolicy";
const imagePaths : Record<Kind, string> = {
    deploy: "./icons/deploy.svg",
    service: "./icons/svc.svg",
    configMap: "./icons/cm.svg",
    secret: "./icons/secret.svg",
    persistentVolume: "./icons/pv.svg",
    persistentVolumeClaim: "./icons/pvc.svg",
    volume: "./icons/vol.svg",
    storageClass: "./icons/sc.svg",
    networkPolicy: "./icons/netpol.svg",
    job: "./icons/job.svg",
    cronJob: "./icons/cronjob.svg",
}

const Graph: React.FC = () => {
    const dispatch = useDispatch();
    const graphData = useSelector((state: RootState) => {
        const nodes = state.app.exercice?.tasks.map((task) => { return {
            id: task.id,
            shape: "image",
            label: task.name,
            image: imagePaths[task.kind]
        }});
        return {
            nodes: nodes,
            edges: state.app.exercice?.links
        }
    });
    const options = {
        
        layout: {
          randomSeed: 5,
        },
        nodes: {
            size: 30,
            brokenImage: "./broken-image.png",
            borderWidth: 2,
            shapeProperties: {
                useBorderWithImage: true
            }
        },
        edges: {
            color: {
                color: "black",
                highlight: "black"
            }
        }
    };

    let events = {
        selectNode: function (params: GraphEvent) {
          dispatch(setSelectedTask(params.nodes[0]));
          params.event.preventDefault();
        },
      };
    
    // WARNING: vis-network-react npm packages is not up-to-date (version 1.3.6 do not have fixes since https://github.com/visjs/vis-network-react/pull/56)
    // a solution could be to use this commit: https://github.com/visjs/vis-network-react/commit/2c2a2f0a66719eab70232cbb53d5324e0702791e#diff-92bbac9a308cd5fcf9db165841f2d90ce981baddcb2b1e26cfff170929af3bd1
    // otherwise there is a huge issue with event listeners that are not cleared on Graph redraw which leads to performance issues very fast
    return <div style={{ height: 900 }}>
        <VisNetworkReactComponent
            data={graphData}
            options={options}
            events={events}
        />
      </div>;
};

export default Graph;