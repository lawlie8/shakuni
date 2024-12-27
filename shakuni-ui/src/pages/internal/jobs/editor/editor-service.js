import instance from "../../../../util/axios";
import { SAVE_SQL_FILE } from "../../../../util/Constants";

export function saveCurrentSQLFile(code, taskId) {
    return instance.post(SAVE_SQL_FILE, {
        sqlCode: code,
        taskId: taskId,
    })
}