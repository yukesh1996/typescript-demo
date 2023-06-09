const {ENV} = process.env;

export default {
  appenders: {
    app: {
      type: "dateFile",
      filename: `../../logs/${ENV}`,
      pattern: ".yyyy-MM-dd.log",
      compress: true,
      alwaysIncludePattern: true,
    },
    consoleAppender: { type: "console" },
  },
  categories: {
    default: { appenders: ["app", "consoleAppender"], level: "debug" },
  },
};
