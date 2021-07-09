import React from "react";

interface ResourceIconProps {
    kind: string;
}

type Kind = "deploy" | "service" | "configMap" | "secret" | "persistentVolume" | "persistentVolumeClaim" | "storageClass" | "volume" | "job" | "cronJob" | "networkPolicy";

const ResourceIcon: React.FC<ResourceIconProps> = ({kind}: ResourceIconProps) => {
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

    return <img style={{height: "64px"}} src={imagePaths[kind]} />
};

export default ResourceIcon;