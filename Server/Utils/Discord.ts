import Discordjs from 'discord.js'

class Discord{
  client : Discordjs.Client
  constructor() {
    this.client = new Discordjs.Client();
  }
  GetClient = ()=>this.client
  LoginClient = (token : string) => this.client.login(token)
  DisconnectClient = () => this.client.destroy()

  GetAllServer = () => this.client.guilds.cache
  GetOneServer = (GuildId : string) => this.client.guilds.cache.get(GuildId)
  GetAllChan = (GuildId : string) => this.GetOneServer(GuildId).channels.cache
}

export default Discord;