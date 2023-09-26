import instance from "./request.ts";

enum URL {
    deviceTree = '/api/v1/mecSys/device/tree',
    pointHistory = '/api/HistorySheets/Dynamic/PointHistory',
    faultHistory = '/api/HistorySheets/Dynamic/FaultHistory',
    repairHistory = '/api/HistorySheets/Dynamic/RepairHistory',
    pointStandard = '/api/HistorySheets/Dynamic/PointInspections',
    repairStandard = '/api/HistorySheets/Dynamic/RepairStandard'
}
enum POST_URL {
    pointInspections = '/api/HistorySheets/Standard/PointInspections'
}

interface ItypeAPI<T> {
    data: T,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    code: number //返回后端自定义的200，404，500这种状态码
}
interface ITableData<T> {
    dataCount: number,
    tableData: T[]
}
type Res<T> = Promise<ItypeAPI<T>>;
type ResTable<T> = Promise<ITableData<T>>;

//获取组织结构树
export const getDeviceTree = (): Res<null> =>
    instance.get(import.meta.env.VITE_APP_API_OTHERURL + URL.deviceTree);
//获取点检记录
export const getPointHistoryList = (params: any): ResTable<null> =>
    instance.get(URL.pointHistory, { params });

//获取故障记录
export const getFaultHistoryList = (params: any): ResTable<null> =>
    instance.get(URL.faultHistory, params);
//获取维修记录
export const getRepairHistoryList = (params: any): ResTable<null> =>
    instance.get(URL.repairHistory, params);


//获取点检标准
export const getPointStandardList = (params: any): ResTable<null> =>
    instance.get(URL.pointStandard, params);
//获取维修标准
export const getRepairStandardList = (params: any): ResTable<null> =>
    instance.get(URL.repairStandard, params);