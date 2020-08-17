module.export = {
  webpackDEvMiddleware: (config) => {
    config.watchOptions.poll = 300
    return config
  },
}
