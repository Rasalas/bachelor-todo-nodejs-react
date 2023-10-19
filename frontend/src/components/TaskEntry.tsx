import React from 'react';

interface TaskProps {
    id: number;
    task: string;
    completed: boolean;
}

const TaskEntry: React.FC<TaskProps> = ({id, task, completed}) => {
    return (
        <li>
            {completed ? "✅" : "❌"} {task}
        </li>
    );
}

export default TaskEntry;