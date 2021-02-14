import Discordjs from 'discord.js'

class Discord{
  client : Discordjs.Client
  constructor(Token : string) {
    this.client = new Discordjs.Client();
  }
  GetClient = ()=>this.client
}