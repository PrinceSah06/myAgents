import proxy from "express-http-proxy";

export const proxywithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user?.userId) {
        proxyReqOpts.headers["x-user-id"] = String(srcReq.user.userId);
      }
      return proxyReqOpts;
    },
  });
};
