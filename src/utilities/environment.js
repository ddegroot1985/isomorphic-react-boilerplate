export const isProd = process.env.NODE_ENV === 'production';

export const isDev = process.env.NODE_ENV === 'development';

export const usingDevServer = !!process.env.USING_DEV_SERVER;
