/**
 * 华为obs可用节点
 * https://developer.huaweicloud.com/endpoint?OBS
 */
declare enum ObsServerEndpoint {
    /**
     * 非洲-约翰内斯堡
     */
    AFSouth1 = "obs.af-south-1.myhuaweicloud.com",
    /**
     * 华北-北京四
     */
    CNNorth4 = "obs.cn-north-4.myhuaweicloud.com",
    /**
     * 华北-北京一
     */
    CNNorth1 = "obs.cn-north-1.myhuaweicloud.com",
    /**
     * 华东-上海二
     */
    CNEast2 = "obs.cn-east-2.myhuaweicloud.com",
    /**
     * 华东-上海一
     */
    CNEast3 = "obs.cn-east-3.myhuaweicloud.com",
    /**
     * 华南-广州
     */
    CNSouth1 = "obs.cn-south-1.myhuaweicloud.com",
    /**
     * 西南-贵阳一
     */
    CNSouthWest2 = "obs.cn-southwest-2.myhuaweicloud.com",
    /**
     * 亚太-曼谷
     */
    APSouthEast2 = "obs.ap-southeast-2.myhuaweicloud.com",
    /**
     * 亚太-香港
     */
    APSouthEast1 = "obs.ap-southeast-1.myhuaweicloud.com",
    /**
     * 亚太-新加坡
     */
    APSouthEast3 = "obs.ap-southeast-3.myhuaweicloud.com"
}
export interface ProviderOptions {
    /**
     * 华为obs的access_key_id
     */
    accessKeyId: string;
    /**
     * 华为obs的secret_access_key
     */
    secretAccessKey: string;
    /**
     * 华为obs的区域终端节点
     */
    serverEndpoint: ObsServerEndpoint | string;
    /**
     * 华为obs的bucket
     */
    bucket: string;
    /**
     * 额外给obs绑定的域名
     */
    bucketDomain?: string;
    /**
     * 文件夹目录
     */
    folder: string;
}
/**
 * strapi的upload参数中的File类型
 */
export interface IFile {
    id: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
        [key: string]: any;
    };
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: {
        [key: string]: any;
    };
    related: any[];
    path?: string;
    buffer?: string;
}
export {};
