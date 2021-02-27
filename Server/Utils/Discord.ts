import Discordjs, { ActivityType, Guild, Presence, PresenceData } from 'discord.js'

class Discord{
  client : Discordjs.Client
  Ready : Boolean
  constructor() {
    this.client = new Discordjs.Client();
    this.Ready = false;
  }
  GetClient = () => this.client

  LoginClient = (token : string) => this.client.login(token)
  DisconnectClient = () =>{
    this.client= new Discordjs.Client();
    this.FireWhenReady(()=>{})
    this.FireWhenDisconnect(()=>{})
    console.log("test")
    this.Ready=false
  }

  FireWhenReady = ( toDo : Function ) => this.client.on('ready',()=>{
    this.Ready = true;
    toDo()
  })
  FireWhenDisconnect = (toDo : Function) => this.client.on("disconnect",()=>{
    this.Ready=false;
    toDo();
  })

  GetAllServer = () => this.client.guilds.cache
  GetOneServer = ( guildId : string ) => this.client.guilds.cache.get(guildId)
  GetAllChan = ( guildId : string ) => this.GetOneServer(guildId)?.channels.cache
  GetOneChan = ( guildId : string , ChanId : string ) => this.GetAllChan(guildId)?.get(ChanId)

  GetUser = () => this.client.user

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