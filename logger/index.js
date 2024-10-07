export default class Logger {
  // Reset
  static #reset = '\x1b[0m';

  // Colors
  static #black = '\x1b[30m';
  static #red = '\x1b[31m';
  static #green = '\x1b[32m';
  static #yellow = '\x1b[33m';
  static #blue = '\x1b[34m';
  static #magenta = '\x1b[35m';
  static #cyan = '\x1b[36m';
  static #white = '\x1b[37m';

  // Styles
  static #bold = '\x1b[1m';
  static #underline = '\x1b[4m';

  // Logging config
  static #maxLength = 128;

  // Helper functions
  static #addPadding = (val) => {
    const len = val.length;
    return `${val} ${"=".repeat(Logger.#maxLength - len)}`
  }

  static #formatMessage = (val, options = { padding: false }) => {
    var message = val;
    if (options.submodule) {
      message = `[${options.submodule}] ${message}`;
    }
    if (options.module) {
      message = `[${options.module}] ${message}`;
    }
    if (options.logType) {
      message = `[${options.logType}] ${message}`;
    }
    if (options.padding) {
      message = Logger.#addPadding(`${message}`);
    }
    return message;
  }

  // Static methods
  static info(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'INFO',
    });
    console.log(`${Logger.#yellow}${message}${Logger.#reset}`);
  }

  static error(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'ERROR'
    });
    console.log(`${Logger.#red}${message}${Logger.#reset}`);
  }

  static success(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'SUCCESS'
    });
    console.log(`${Logger.#green}${message}${Logger.#reset}`);
  }
}