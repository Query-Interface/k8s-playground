interface ApiResponse {
    kind: string;
    apiVersion: string;
    items: Array<Resource>
}

interface Resource {}

interface Pod extends Resource {
    metadata: Metadata,
    spec?: Spec
}

interface Metadata {
    name: string;
    uid: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
}

interface Spec {

}

type Kind = "deploy" | "service" | "configMap" | "secret" | "persistentVolume" | "persistentVolumeClaim" | "storageClass" | "volume" | "job" | "cronJob" | "networkPolicy";
type ServiceType = "ClusterIP" | "NodePort" | "LoadBalancer";

export {
    ApiResponse,
    Resource,
    Pod,
    Spec,
    Metadata,
    Kind,
    ServiceType
}