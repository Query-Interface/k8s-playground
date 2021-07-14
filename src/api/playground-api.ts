import { Kind, ServiceType } from "./types";

const sample = {
    id: "042fe56e-1777-4cdf-a505-7c6819c16bde",
    name: "Bravo - KodeKloud",
    tasks: [
        {
            id: "533348cd-f0ef-4056-adcd-dadf7d88a67f",
            name: "drupal-service",
            kind: "service",
            requirements: {
                name: "drupal-service",
                type: "NodePort",
                ports: {
                    port: 80,
                    targetPort: 80,
                    nodePort: 30095
                },
                selector: "app=drupal"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: Service\nmetadata:\n  labels:\n    app: test\n  name: test-service\nspec:\n  ports:\n  - port: 8080\n    protocol: TCP\n    targetPort: 8080\n    nodePort: 32456\n  selector:\n    app: test\n  type: NodePort\n"
        },
        {
            id: "ebfb3fc7-a9a0-456a-bbff-0cf8c5a30c1d",
            name: "drupal",
            kind: "deploy",
            requirements: {
                replicas: 1,
                selector: "app=drupal",
                containers: [{
                    image: "drupal:8.6",
                    name: "drupal",
                    mounts: [{
                        path: "/var/www/html/modules",
                        subPath: "modules",
                        name: "data"
                    },
                    {
                        path: "/var/www/html/profiles",
                        subPath: "profiles",
                        name: "data"
                    },
                    {
                        path: "/var/www/html/sites",
                        subPath: "sites",
                        name: "data"
                    },
                    {
                        path: "/var/www/html/themes",
                        subPath: "themes",
                        name: "data"
                    }
                    ]
                }],
                initContainers: [{
                    name: "initContainer",
                    image: "drupal:8.6",
                    command: ["/bin/bash", "-c"],
                    args: ["cp -r /var/www/html/sites/ /data/; chown www-data:www-data /data/ -R"]
                }],
                volumes: [{
                    type: "pvc",
                    claimName: "drupal-pvc",
                    name: "data"
                }]
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  labels:\n    app: test\n  name: test\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: test\n  template:\n    metadata:\n      labels:\n        app: test\n    spec:\n      volumes:\n      - name: data\n        persistentVolumeClaim:\n          claimName: test-pvc\n      initContainers:\n      - name: init\n        image: busybox\n        volumeMounts:\n        - mountPath: /data\n          name: data\n        command: [\"/bin/bash\", \"-c\"]\n        args: [\"sleep 3600\"]\n      containers:\n      - image: busybox\n        name: mycontainer\n        volumeMounts:\n        - mountPath: /path/to/dir\n          subPath: subDir\n          name: data\n"
        },
        {
            id: "a4296ed2-0ee4-4d2b-b680-47d7c4d8716c",
            name: "drupal-pvc",
            kind: "persistentVolumeClaim",
            requirements: {
                capacity: "5Gi",
                mode: "ReadWriteOnce"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: test-pvc\nspec:\n  storageClassName: manual\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 15Gi"
        },
        {
            id: "d1a170b7-a153-4dd7-b91b-bebe63c4b80f",
            name: "drupal-pv",
            kind: "persistentVolume",
            requirements: {
                capacity: "5Gi",
                mode: "ReadWriteOnce"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: test-pv\nspec:\n  storageClassName: manual\n  capacity:\n    storage: 15Gi\n  accessModes:\n    - ReadWriteOnce\n  hostPath:\n    path: /path/to/dir"
        },
        {
            id: "3afb4705-00b3-4303-a876-70e96bf48f0e",
            name: "drupal-mysql-service",
            kind: "service",
            requirements: {
                name: "drupal-mysql-service",
                type: "ClusterIP",
                ports: {
                    port: 3306,
                    targetPort: 3306
                },
                selector: "app=drupal-mysql"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: Service\nmetadata:\n  labels:\n    app: test\n  name: test-service\nspec:\n  ports:\n  - port: 8976\n    protocol: TCP\n    targetPort: 8976\n  selector:\n    app: test\n  type: ClusterIP"
        },
        {
            id: "e8fd5842-e605-4ff1-8d6f-3afe72880691",
            name: "drupal-mysql",
            kind: "deploy",
            requirements: {
                replicas: 1,
                selector: "app=drupal-mysql",
                "todo": "TODO"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  labels:\n    app: test\n  name: test\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: test\n  template:\n    metadata:\n      labels:\n        app: test\n    spec:\n      volumes:\n      - name: data\n        persistentVolumeClaim:\n          claimName: test-pvc\n      containers:\n      - image: busybox\n        name: mycontainer\n        volumeMounts:\n        - mountPath: /path/to/dir\n          subPath: subdir\n          name: data\n        env:\n        - name: ENV_1\n          valueFrom:\n            secretKeyRef:\n              name: secret\n              key: ENV_1\n        - name: ENV_2\n          valueFrom:\n            secretKeyRef:\n              name: secret\n              key: ENV_2"
        },
        {
            id: "f9d68a1e-37f9-4111-a804-196323d4b352",
            name: "drupal-mysql-secret",
            kind: "secret",
            requirements: {
                values: [
                    {
                        key: "MYSQL_ROOT_PASSWORD",
                        value: "root_password"
                    },
                    {
                        key: "MYSQL_DATABASE",
                        value: "drupal-database"
                    },
                    {
                        key: "MYSQL_USER",
                        value: "mysql"
                    }
                ]
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\ndata:\n  ENV_1: ZHJ1cGFsLWRhdGFiYXNl\n  ENV_2: cm9vdF9wYXNzd29yZA==\n  ENV_3: bXlzcWw=\nkind: Secret\nmetadata:\n  name: secret"
        },
        {
            id: "915c09ba-b29f-4857-b32f-fe984926f1d5",
            name: "drupal-mysql-pvc",
            kind: "persistentVolumeClaim",
            requirements: {
                capacity: "5Gi",
                mode: "ReadWriteOnce"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: test-pvc\nspec:\n  storageClassName: manual\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 15Gi"
        },
        {
            id: "845f6bf3-5b01-4cca-bde2-ad939b820616",
            name: "drupal-mysql-pv",
            kind: "persistentVolume",
            requirements: {
                capacity: "5Gi",
                mode: "ReadWriteOnce"
            },
            help: [
                "http:///kubernetes.io/docs"
            ],
            template: "apiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: test-pv\nspec:\n  storageClassName: manual\n  capacity:\n    storage: 15Gi\n  accessModes:\n    - ReadWriteOnce\n  hostPath:\n    path: /path/to/dir"
        },
    ],
    links: [
        {
            id: "1",
            from: "533348cd-f0ef-4056-adcd-dadf7d88a67f",
            to: "ebfb3fc7-a9a0-456a-bbff-0cf8c5a30c1d"
        },
        {
            id: "2",
            from: "ebfb3fc7-a9a0-456a-bbff-0cf8c5a30c1d",
            to: "a4296ed2-0ee4-4d2b-b680-47d7c4d8716c"
        },
        {
            id: "3",
            from: "a4296ed2-0ee4-4d2b-b680-47d7c4d8716c",
            to: "d1a170b7-a153-4dd7-b91b-bebe63c4b80f"
        },
        {
            id: "4",
            from: "ebfb3fc7-a9a0-456a-bbff-0cf8c5a30c1d",
            to: "3afb4705-00b3-4303-a876-70e96bf48f0e"
        },
        {
            id: "5",
            from: "3afb4705-00b3-4303-a876-70e96bf48f0e",
            to: "e8fd5842-e605-4ff1-8d6f-3afe72880691"
        },
        {
            id: "6",
            from: "e8fd5842-e605-4ff1-8d6f-3afe72880691",
            to: "f9d68a1e-37f9-4111-a804-196323d4b352"
        },
        {
            id: "7",
            from: "e8fd5842-e605-4ff1-8d6f-3afe72880691",
            to: "915c09ba-b29f-4857-b32f-fe984926f1d5"
        },
        {
            id: "8",
            from: "915c09ba-b29f-4857-b32f-fe984926f1d5",
            to: "845f6bf3-5b01-4cca-bde2-ad939b820616"
        }
    ]
};

export interface Exercice {
    id: string;
    name: string;
    tasks: Array<Task>;
    links: Array<Link>;
}
export interface Link {
    from: string;
    to: string;
}

export interface Task {
    id: string;
    name: string;
    kind: Kind;
    requirements: Requirement;
    help: Array<string>;
    template: string;
}

type Requirement = ( ServiceRequirement | DeployRequirement | PersistentVolumeClaimRequirement | VolumeClaimRequirement | SecretRequirement | EmptyRequirement )
interface EmptyRequirement {

}
interface ServiceRequirement {
    type: ServiceType;
    name: string;
    selector: string;
    ports: {
        port: number;
        targetPort: number;
        nodePort?: number;
    }
}
interface DeployRequirement {
    replicas: number;
    selector: string;
    containers: Array<Container>;
    initContainers: Array<Container>;
    volumes: Array<Volume>;
}
interface Container {
    name: string;
    image: string;
    mounts: [{
        name?: string;
        path: string;
        subPath?: string;
    }];
    command?: Array<string>;
    args?: Array<string>;
}
interface Volume {
    name: string;
    type: string;
    claimName?: string;
}
interface PersistentVolumeClaimRequirement {
    capacity: string;
    mode: AccessMode;
    storageClass?: string;
}
interface VolumeClaimRequirement {
    capacity: string;
    mode: AccessMode;
}
interface SecretRequirement {
    values: [{
        key: string;
        value: string;
    }]
}

interface DetailedRequirement {
    id: string;
    completed: boolean;
    description: string | JSX.Element;
}

interface CompositeRequirement extends DetailedRequirement {
    requirements: Array<DetailedRequirement>;
}

type AccessMode = "ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany";

async function getExercice() : Promise<Exercice> {
    return Promise.resolve(<Exercice> sample);
}

export {
    getExercice,
    Requirement,
    ServiceRequirement,
    DeployRequirement,
    SecretRequirement,
    PersistentVolumeClaimRequirement,
    DetailedRequirement,
    CompositeRequirement
}