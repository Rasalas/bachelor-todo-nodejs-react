declare interface TaskStatus {
    key: string;
    icon?: string;
    color?: string;
}

declare interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    project_id: number;
    complexity?: number;
}

declare interface Project {
    id: number;
    name: string;
}