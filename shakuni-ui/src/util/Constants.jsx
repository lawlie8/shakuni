export const BASE_URL = "http://localhost:7911";
export const WS_BASE_URL = 'ws://localhost:7911/ws';
export const WS_GLOBAL_NOTIFICATION = `/notification/all`;
export const WS_CUSTOM_NOTIFICATION = `/notification`;
export const WS_JOB_UPDATE = `/notification/job`;


export const AUTH_URL = "/web/auth";
export const LOGOUT_URL = "/web/logout";
export const VERSION_API = "/web/config/version";
export const CONFIG_URL = "/app/config/settings/all";

export const DATASOURCE_TYPE_GET = "/app/datasource/type/all";
export const DATASOURCE_CONFIGURED_GET_BY_ID = "/app/datasource/configured/type/get";
export const DATASOURCE_PROPERTIES_GET_BY_DATASOURCE_TYPE_ID = "/app/datasource/configured/type/properties/get";
export const DATASOURCE_PROPERTY_VALUES_GET_BY_CONFIGURED_DATASOURCE_ID = "/app/datasource/configured/value/get";

export const DATASOURCE_CONFIGURED_DELETE_BY_ID = "/app/datasource/configured/delete";
export const DATASOURCE_CHECK_CONNECTION = "/app/datasource/configured/check";
export const DATASOURCE_SAVE_CONNECTION = "/app/datasource/configured/save";

export const USER_GET_ALL = "/app/user/all/get";
export const USER_GET_BY_ID = "/app/user/get";

export const ROLE_GET_ALL = "/app/user/role/all/get";
export const PERMISSION_GET_ALL = "/app/user/permission/all/get";
export const PERMISSION_GET_BY_NAME = "/app/user/permission/name/get";
export const SAVE_NEW_USER = "/app/user/save";
export const EDIT_NEW_USER = "/app/user/edit";

export const JOBS_GET_PAGABLE = "/app/jobs/get/all";
export const JOBS_GET_RECENT = "/app/jobs/get/recent";
export const JOBS_DELETE_ID = "/app/jobs/delete";
export const JOBS_EXECUTE_ID = "/app/jobs/execute";

export const JOBS_ALL_COUNT = "/app/jobs/get/all/count";
export const JOBS_CREATE_NEW = "/app/jobs/create/new";

export const TASKS_GET_BY_JOB_ID = "/app/task/get"
export const TASKS_CREATE_NEW = "/app/task/post/save";



