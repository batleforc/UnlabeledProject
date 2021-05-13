const chalk = require("chalk");
const { createLogger, format, transports } = require("winston");
const { consoleFormat } = require("winston-console-format");
const Path = require("path");
require("winston-daily-rotate-file");

const transport = new transports.DailyRotateFile({
  filename: "unlabeled-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  dirname: Path.join(
    String(process.env.APPDATA || process.env.HOME),
    "SoundBoard",
    "log"
  ),
  maxSize: "20m",
  maxFiles: "7d",
});
const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta : {service:"UnlabeledProject"},
  transports: [
    transport,
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize({ all: true }),
      format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ["timestamp", "service"],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 120,
          compact:Infinity
        }
      })
    )
  }));
}

/**
 * * Permet de console.log
 * @param tag Qui envoie le message
 * @param message Message envoyer par l'utilisateur
 */
export const Log = async (tag: string, message: string) => {
  logger.info(`[${tag}]=> ${new Date().toISOString()} : ${message}`);
};

export const LogObject = async (tag: string, message: object) => {
  logger.info(message);
};

/**
 * * Permet de log une erreur
 * @param tag Qui envoie le message
 * @param message Message envoyer par l'utilisateur
 */
export const ErrorLog = async (tag: string, message: string) => {
  logger.error(`${tag}]=> ${new Date().toISOString()} : ${message}`)
};

export const ModuleLog = async (
  who: string,
  file: string = "",
  init: Boolean = false
) => {
  logger.verbose(`[${who}]=> ${new Date().toISOString()} :  ${
    init ? file.substring(0, file.length - 3) : file
  } ${init ? "est initialiser" : ""}`);
};
