/**
 * 环境配置封装
 */
const env = import.meta.MODE || "prod";
const EnvConfig = {
  dev: {
    baseApi: "/",
    mockApi:
      "https://www.fastmock.site/mock/6a175c916cf86dc6554f897d8d2bb15a/api",
  },
  test: {
    baseApi: "//test.futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/6a175c916cf86dc6554f897d8d2bb15a/api",
  },
  prod: {
    baseApi: "//futurefe.com/api",
    mockApi:
      "https://www.fastmock.site/mock/6a175c916cf86dc6554f897d8d2bb15a/api",
  },
};
export default {
  env,
  mock: true,
  ...EnvConfig[env],
};
