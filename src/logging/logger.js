const path = require('path');
const { format, createLogger, transports } = require('winston');

module.exports = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../logs/error.log'),
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      level: 'info',
      filename: path.resolve(__dirname, '../../logs/info.log'),
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});
