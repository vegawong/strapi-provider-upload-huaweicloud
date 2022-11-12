# strapi-provider-upload-huaweicloud

## Introduction

This is a strapi upload provider. It stores images uploaded in strapi to a huaweicloud OBS bucket.

## Usage

### Installation

With npm use:

```
npm install strapi-provider-upload-huaweicloud
```

With yarn use:

```
yarn add strapi-provider-upload-huaweicloud
```

With pnpm use:

```
pnpm add strapi-provider-upload-huaweicloud
```

### Configuration

For starters, you need to create an obs bucket and in your `.env` file, add the following; (The `.env` file should be at the root of your application)

```
OBS_ACCESS_KEY = //your obs bucket access key
OBS_SECRET_ACCESS_KEY = //your obs bucket secret access key
OBS_SERVER_ENDPOINT = //your obs server endpoint, based on region eg. https://obs.ap-southeast-3.myhuaweicloud.com
OBS_BUCKET_DOMAIN = //your obs bucket domain eg. https://<bucket-name>.obs.ap-southeast-3.myhuaweicloud.com
OBS_BUCKET = //your obs bucket nane
```

#### Example

In `./config/plugins.js` add:

```js
module.exports = ({ env }) => ({
  //...
  upload: {
    config: {
      provider: "strapi-provider-upload-huaweicloud",
      providerOptions: {
        accessKeyId: env("OBS_ACCESS_KEY_ID"),
        secretAccessKey: env("OBS_ACCESS_SECRET"),
        bucketDomain: env("OBS_BUCKET_DOMAIN"),
        serverEndpoint: env("OBS_SERVER_ENDPOINT"),
        bucket: env("OBS_BUCKET"),
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    //...
});
```

#### Image previews

To enable the image thumbnails display properly, add the `IMAGES_BASE_URL` property in the `.env` and add the config below in `./config/middlewares.js`. The `IMAGES_BASE_URL` should be your `OBS_BUCKET_DOMAIN` property or your the cdn baseurl of your cdn provider.

In `.env` :

```
IMAGES_BASE_URL = //your obs bucket domain or the domain of your cdn provider
```

In `./config/middlewares.js`:

```js
module.exports = ({ env }) => [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", `${env("IMAGES_BASE_URL") || env("OBS_BUCKET_DOMAIN")}`],
          "media-src": ["'self'", "data:", "blob:", `${env("IMAGES_BASE_URL") || env("OBS_BUCKET_DOMAIN")}`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```
