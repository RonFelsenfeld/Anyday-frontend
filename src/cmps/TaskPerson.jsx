import { boardService } from "../services/board.service";

export function TaskPerson({ board, setBoard, group, task }) {
    return <p className="task-persons-img">
        {task.personsIds
            ? task.personsIds.map(id =>
                <img key={id}
                    src={`${boardService.getPersonUrl(board, id)}`}
                    alt="" />)
            : <img
                src={`https://cdn.monday.com/icons/dapulse-person-column.svg`}
                alt="person-icon" />}
    </p>
}