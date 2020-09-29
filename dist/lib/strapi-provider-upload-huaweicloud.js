"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObsClient = require("esdk-obs-nodejs");
var fs = require("fs");
/**
 * 华为obs可用节点
 * https://developer.huaweicloud.com/endpoint?OBS
 */
var ObsServerEndpoint;
(function (ObsServerEndpoint) {
    /**
     * 非洲-约翰内斯堡
     */
    ObsServerEndpoint["AFSouth1"] = "obs.af-south-1.myhuaweicloud.com";
    /**
     * 华北-北京四
     */
    ObsServerEndpoint["CNNorth4"] = "obs.cn-north-4.myhuaweicloud.com";
    /**
     * 华北-北京一
     */
    ObsServerEndpoint["CNNorth1"] = "obs.cn-north-1.myhuaweicloud.com";
    /**
     * 华东-上海二
     */
    ObsServerEndpoint["CNEast2"] = "obs.cn-east-2.myhuaweicloud.com";
    /**
     * 华东-上海一
     */
    ObsServerEndpoint["CNEast3"] = "obs.cn-east-3.myhuaweicloud.com";
    /**
     * 华南-广州
     */
    ObsServerEndpoint["CNSouth1"] = "obs.cn-south-1.myhuaweicloud.com";
    /**
     * 西南-贵阳一
     */
    ObsServerEndpoint["CNSouthWest2"] = "obs.cn-southwest-2.myhuaweicloud.com";
    /**
     * 亚太-曼谷
     */
    ObsServerEndpoint["APSouthEast2"] = "obs.ap-southeast-2.myhuaweicloud.com";
    /**
     * 亚太-香港
     */
    ObsServerEndpoint["APSouthEast1"] = "obs.ap-southeast-1.myhuaweicloud.com";
    /**
     * 亚太-新加坡
     */
    ObsServerEndpoint["APSouthEast3"] = "obs.ap-southeast-3.myhuaweicloud.com";
})(ObsServerEndpoint || (ObsServerEndpoint = {}));
/**
 * 华为obs资源的访问域名
 * @param bucket
 * @param endpoint
 */
var getDomain = function (bucket, endpoint) {
    return "//" + bucket + "." + endpoint;
};
/**
 * 华为obs资源的访问地址
 * @param bucket
 * @param endpoint
 * @param key
 * @param bucketDomain
 */
var getObjectUrl = function (bucket, endpoint, key, bucketDomain) {
    var path = key.replace(/^\//, '');
    return (bucketDomain || getDomain(bucket, endpoint)) + "/" + path;
};
module.exports = {
    init: function (providerOptions) {
        var accessKeyId = providerOptions.accessKeyId, secretAccessKey = providerOptions.secretAccessKey, serverEndpoint = providerOptions.serverEndpoint, defaultBucket = providerOptions.bucket, bucketDomain = providerOptions.bucketDomain;
        var client = new ObsClient({
            access_key_id: accessKeyId,
            secret_access_key: secretAccessKey,
            server: serverEndpoint
        });
        return {
            upload: function (file) {
                return new Promise(function (resolve, reject) {
                    var path = file.path ? file.path + "/" : '';
                    var key = "" + path + file.hash + file.ext;
                    var fileStream = new fs.ReadStream();
                    fileStream.push(file.buffer);
                    client.putObject({
                        Bucket: defaultBucket,
                        Key: key,
                        Body: fileStream
                    }, function (err, result) {
                        if (err) {
                            console.error('Error-->' + err);
                            reject(err);
                        }
                        else {
                            file.url = getObjectUrl(defaultBucket, serverEndpoint, key, bucketDomain);
                            resolve();
                        }
                    });
                });
            },
            delete: function (file) {
                return new Promise(function (resolve, reject) {
                    var path = file.path ? file.path + "/" : '';
                    var key = "" + path + file.hash + file.ext;
                    client.deleteObject({
                        Bucket: defaultBucket,
                        Key: key
                    }, function (err, result) {
                        if (err) {
                            console.log('Error-->' + err);
                        }
                        else {
                            // console.log('Status-->' + result.CommonMsg.Status)
                            resolve();
                        }
                    });
                });
            }
        };
    }
};
//# sourceMappingURL=strapi-provider-upload-huaweicloud.js.map