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
  static #maxLength = 96;

  // Helper functions
  static #addPadding = (val) => {
    const len = val.length;
    return `${val} ${"=".repeat(Logger.#maxLength - len)}`
  }

  static #formatMessage = (val, options = { padding: false }) => {
    var message = '';
    if (options.logType) {
      message = `${message}[${options.logType}]`;
    }
    if (options.module) {
      message = `${message}[${options.module}]`;
    }
    if (options.submodule) {
      message = `${message}[${options.submodule}]`;
    }

    message = `${message} ${val}`;

    if (options.padding) {
      message = Logger.#addPadding(`${message}`);
    }
    if (options.update) {
      message = `\u001B[F \r${message}`
    }
    return `${message}\n`;
  }

  // Static methods
  static info(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'INFO',
    });
    process.stdout.write(`${Logger.#yellow}${message}${Logger.#reset}`);
  }

  static error(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'ERROR'
    });
    process.stdout.write(`${Logger.#red}${message}${Logger.#reset}`);
  }

  static success(val, options) {
    var message = val;
    message = Logger.#formatMessage(val, {
      ...options,
      logType: 'SUCCESS'
    });
    process.stdout.write(`${Logger.#green}${message}${Logger.#reset}`);
  }

  static logExecution(fn, { startText, endText }) {
    return function(...args) {
      Logger.info(startText);
      const res = fn(...args);
      Logger.success(endText, { update: true, padding: true });
      return res;
    }
  }
}