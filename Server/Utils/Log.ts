const chalk = require('chalk');
module.exports ={
  /**
   * * Permet de console.log
   * @param tag Qui envoie le message
   * @param message Message envoyer par l'utilisateur
   */
  Log: async (tag:string,message:string)=>{
    console.log(chalk`{bold [${tag}]}=> ${new Date().toISOString()} : ${message}`)
  },
  /**
   * * Permet de log une erreur
   * @param tag Qui envoie le message
   * @param message Message envoyer par l'utilisateur
   */
  ErrorLog: async (tag:string,message:string)=>{
    console.log(chalk`{red.bold [${tag}]}=> ${new Date().toISOString()} : ${message}`)
  }
}