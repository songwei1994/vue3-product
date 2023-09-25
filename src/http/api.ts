import instance from "./request.ts";

enum URL {
    deviceTree = '/api/v1/mecSys/device/tree'
}

interface ItypeAPI<T> {
    data: T,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    code: number //返回后端自定义的200，404，500这种状态码
}
type Res<T> = Promise<ItypeAPI<T>>;

export const getDeviceTree = (): Res<null> =>
    instance.get(URL.deviceTree);