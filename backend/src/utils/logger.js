/* eslint-disable no-console */

const chalk = require('chalk')

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err))
  },

  info: (msg) => {
    console.info(chalk.green(msg))
  },
  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started on http://${host}:${port} ${chalk.green('✓')}`)

    console.log(`
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  },
}

module.exports = logger
