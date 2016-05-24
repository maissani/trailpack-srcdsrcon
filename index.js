'use strict'

const Trailpack = require('trailpack')

module.exports = class SrcdsrconTrailpack extends Trailpack {

  /**
   * Validate the process that srcds config exist in srcds.js
   */
  validate () {
    if (!this.app.config.srcds){
      return Promise.reject(
        new Error('There no srcds.js under ./config,' +
          'check it\'s load in ./config/index.js or create it !')
      )
    }
    return Promise.resolve()
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
