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

export {
    ApiResponse,
    Resource,
    Pod,
    Spec,
    Metadata
}