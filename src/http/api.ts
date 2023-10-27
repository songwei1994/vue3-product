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
export const getPointHistoryList = (data: any): ResTable<null> =>
    instance.post(URL.pointHistory, data);

//获取故障记录
export const getFaultHistoryList = (data: any): ResTable<null> =>
    instance.post(URL.faultHistory, data);
//获取维修记录
export const getRepairHistoryList = (data: any): ResTable<null> =>
    instance.post(URL.repairHistory, data);


//获取点检标准
export const getPointStandardList = (data: any): ResTable<null> =>
    instance.post(URL.pointStandard, data);
//获取维修标准
export const getRepairStandardList = (params: any): ResTable<null> =>
    instance.get(URL.repairStandard, params);