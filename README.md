# trailpack-srcdsrcon
[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

:package: Add a Trails service to execute rcon comands

This package is an implementation of [node-srcds-rcon](https://github.com/randunel/node-srcds-rcon) in Trails framework.


## Intallation
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-srcdsrcon
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-srcdsrcon`

## Configuration
Enable SrcdsRcon
```js
// config/main.js

  packs: [
    ...
    require('trailpack-srcdsrcon')
  ],
```
Check that srcds config is loaded on index.js
```js
// config/index.js
...
exports.srcds = require('./srcds')
```

Configure
```js
// config/srdcs.js

module.exports = {

  // List of servers that use SRCDS services
  servers: [{
    name: 'myServer',
    address: '123.123.123.123', //this could be (ip or ip:port)
    password: 'my-rcon-password'
  }],
  /*
   * Default server the service will connect if there is no args
   */
  defaultServer: 'myServer'
}

```


## Usage

#### First establish connection

``` javascript
let rcon = this.app.services.SrcdsRconService.get("myServer")
rcon.connect().then(() => {
    console.log('connected');
}).catch(console.error);
```

#### Run commands

``` javascript
let rcon = this.app.services.SrcdsRconService.get("myServer")
rcon.connect().then(() => {
    return rcon.command('sv_airaccelerate 10').then(() => {
        console.log('changed sv_airaccelerate');
    });
}).then(
    () => rcon.command('status').then(status => console.log(`got status ${status}`))
).then(
    () => rcon.command('cvarlist').then(cvarlist => console.log(`cvarlist is \n${cvarlist}`))
).then(
    () => rcon.command('changelevel de_dust2').then(() => console.log('changed map'))
).catch(err => {
    console.log('caught', err);
    console.log(err.stack);
});
```

#### Specify command timeout

``` javascript
rcon.command('cvarlist', 1000).then(console.log, console.error);
```

## Errors

Some errors may contain partial command output. That indicates that the command was run, but reply packets have been lost.

``` javascript
rcon.command('cvarlist').then(() => {}).catch(err => {
    console.log(`Command error: ${err.message}`);
    if (err.details && err.details.partialResponse) {
        console.log(`Got partial response: ${err.details.partialResponse}`);
    }
});
```

When an error is returned, even if it doesn't contain a partial output, there is no guarantee the command was not run. The protocol uses udp and the packets sometimes get lost. The only guarantee the command did run is when the error contains a partial output.


## License
A part of this docs are owned by Mihai Ene the creator of node-srcds-rcon package.

[MIT](https://github.com/jaumard/trailpack-email/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-srcdsrcon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-srcdsrcon
[npm-download]: https://img.shields.io/npm/dt/trailpack-srcdsrcon.svg
[ci-image]: https://travis-ci.org/maissani/trailpack-srcdsrcon.svg?branch=master
[ci-url]: https://travis-ci.org/maissani/trailpack-srcdsrcon
[daviddm-image]: http://img.shields.io/david/maissani/trailpack-srcdsrcon.svg?style=flat-square
[daviddm-url]: https://david-dm.org/maissani/trailpack-srcdsrcon
[codeclimate-image]: https://img.shields.io/codeclimate/github/maissani/trailpack-srcdsrcon.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/maissani/trailpack-srcdsrcon
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

