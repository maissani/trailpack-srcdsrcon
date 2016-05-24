'use strict'

const Service = require('trails-service')
const _ = require('lodash')
const rconTool = require('srcds-rcon')

/**
 * @module SrcdsRconService
 * @description Provide Rcon commands and tools for Trails
 */
module.exports = class SrcdsRconService extends Service {
  get(serverName) {
    const config = this.app.config.srcds
    // Adds the possibility to be call without args and callback to default properties
    if (!_.isString(serverName)) {
      serverName = config.defaultServer
    }
    // Retrieve the rcon configuration for the selected
    const rconConfig = _.pick(_.find(config.servers, {name: serverName}), ['address', 'password'])

    // Return an Rcon instance with Rcon params specified in config
    const rconService = rconTool(rconConfig)
    return rconService
  }
}
