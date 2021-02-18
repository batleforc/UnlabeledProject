import Discordjs, { ActivityType, Guild, Presence, PresenceData } from 'discord.js'

class Discord{
  client : Discordjs.Client
  constructor() {
    this.client = new Discordjs.Client();
  }
  GetClient = () => this.client

  LoginClient = (token : string) => this.client.login(token)
  DisconnectClient = () => this.client.destroy()

  GetAllServer = () => this.client.guilds.cache
  GetOneServer = ( guildId : string ) => this.client.guilds.cache.get(guildId)
  GetAllChan = ( guildId : string ) => this.GetOneServer(guildId)?.channels.cache
  GetOneChan = ( guildId : string , ChanId : string ) => this.GetAllChan(guildId)?.get(ChanId)

  SetPresenceFromPresenceData = (presence : PresenceData ) => this.client.user?.setPresence(presence)
  SetPresence = (online : boolean , name : string , type : ActivityType) => this.SetPresenceFromPresenceData({
    status : online ? "online" : "idle" ,
    activity : {
      name : name ,
      type : type
    }
  })
}

export default Discord;