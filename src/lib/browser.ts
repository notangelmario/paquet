import UA from "ua-parser-js";

const parser = new UA();

export const browser = typeof window !== "undefined" && parser.getBrowser();
export const device = typeof window !== "undefined" && parser.getDevice();
export const os = typeof window !== "undefined" && parser.getOS();

export const isIos = typeof window !== "undefined" && parser.getOS().name === "iOS";