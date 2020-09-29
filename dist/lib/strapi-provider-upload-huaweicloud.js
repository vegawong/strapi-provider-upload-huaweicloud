"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var esdk_obs_nodejs_1 = require("esdk-obs-nodejs");
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
var getDomain = function (bucket, endpoint) {
    return "//" + bucket + "." + endpoint;
};
var getObjectUrl = function (bucket, endpoint, key, bucketDomain) {
    var path = key.replace(/^\//, '');
    return (bucketDomain || getDomain(bucket, endpoint)) + "/" + path;
};
module.exports = {
    init: function (providerOptions) {
        var accessKeyId = providerOptions.accessKeyId, secretAccessKey = providerOptions.secretAccessKey, serverEndpoint = providerOptions.serverEndpoint, defaultBucket = providerOptions.bucket, bucketDomain = providerOptions.bucketDomain;
        var client = new esdk_obs_nodejs_1.default({
            access_key_id: accessKeyId,
            secret_access_key: secretAccessKey,
            server: serverEndpoint
        });
        return {
            upload: function (file) {
                return new Promise(function (resolve, reject) {
                    var path = file.path ? file.path + "/" : '';
                    var key = "" + path + file.hash + file.ext;
                    client.putObject({
                        Bucket: defaultBucket,
                        Key: key,
                        Body: Buffer.from(file.buffer, 'binary'),
                    }, function (err, result) {
                        if (err) {
                            console.error('Error-->' + err);
                            reject(err);
                        }
                        else {
                            file.url = getObjectUrl(defaultBucket, serverEndpoint, key);
                            resolve();
                        }
                    });
                });
                // upload the file in the provider
            },
            delete: function (file) {
                // delete the file in the provider
            }
        };
    }
};
//# sourceMappingURL=strapi-provider-upload-huaweicloud.js.map