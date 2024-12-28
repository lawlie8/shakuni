import instance from "../../../../util/axios";
import { SAVE_SQL_FILE, TASK_DATA_BY_ID } from "../../../../util/Constants";

export function saveCurrentSQLFile(code, taskId) {
    return instance.post(SAVE_SQL_FILE, {
        sqlCode: code,
        taskId: taskId,
    })
}

export function fetchTaskData(taskId) {
    return instance.get(`${TASK_DATA_BY_ID}/${taskId}`)
}