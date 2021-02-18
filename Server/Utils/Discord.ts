import Discordjs from 'discord.js'

class Discord{
  client : Discordjs.Client
  constructor() {
    this.client = new Discordjs.Client();
  }
  GetClient = ()=>this.client
  LoginClient = (token : string) => this.client.login(token)
  DisconnectClient = () => this.client.destroy()
}

export default Discord;