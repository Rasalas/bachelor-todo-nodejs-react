declare interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    status?: string;
}

declare interface Project {
    id: number;
    name: string;
}