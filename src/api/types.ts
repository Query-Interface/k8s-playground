interface ApiResponse {
    kind: string;
    apiVersion: string;
    items: Array<Resource>
}

interface Resource {}

interface Pod extends Resource {
    metadata: Metadata;
    spec?: Spec;
}

interface Secret extends Resource {
    metadata: Metadata;
    data: any;
    type: string;
}

interface Metadata {
    name: string;
    uid: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
}

interface Spec {

}

enum Kind {
    Deploy = "deploy",
    Service = "service",
    ConfigMap =  "configMap",
    Secret = "secret",
    PersistentVolume = "persistentVolume",
    PersistentVolumeClaim = "persistentVolumeClaim",
    StorageClass = "storageClass",
    Volume ="volume",
    Job = "job",
    CronJob = "cronJob",
    NetworkPolicy = "networkPolicy",
    Container = "container",
    None = "none"
}
enum ServiceType {
    ClusterIP = "ClusterIP",
    NodePort = "NodePort",
    LoadBalancer = "LoadBalancer"
}

export {
    ApiResponse,
    Resource,
    Pod,
    Spec,
    Metadata,
    Kind,
    ServiceType,
    Secret
}