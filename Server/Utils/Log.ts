const chalk = require('chalk');
/**
 * * Permet de console.log
 * @param tag Qui envoie le message
 * @param message Message envoyer par l'utilisateur
 */
export const Log =async (tag:string,message:string)=>{
  console.log(chalk`{bold [${tag}]}=> ${new Date().toISOString()} : ${message}`)
}

/**
 * * Permet de log une erreur
 * @param tag Qui envoie le message
 * @param message Message envoyer par l'utilisateur
 */
export const ErrorLog = async (tag:string,message:string)=>{
  console.log(chalk`{red.bold [${tag}]}=> ${new Date().toISOString()} : ${message}`)
}

export const ModuleLog =async (who : string,file: string ="",init : Boolean=false) =>
  console.log(chalk`{rgb(25,201,36).bold [${who}]}=> ${new Date().toISOString()} : {bold ${init?file.substring(0, file.length - 3):file}} ${init?"est initialiser":""}`)