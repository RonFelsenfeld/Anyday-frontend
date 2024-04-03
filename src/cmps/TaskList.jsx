import { TaskPreview } from "./TaskPreview";

export function TaskList({ board, group }) {
    return <tbody>
        {group.tasks.map(task => <tr className="task" key={task.id}>
            <TaskPreview board={board} group={group} task={task} />
        </tr>)}
    </tbody>
}