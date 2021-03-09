import Discordjs, { ActivityType, Guild, Presence, PresenceData, StreamOptions, VoiceChannel } from 'discord.js'
import { Server } from 'socket.io';
import {Log, ModuleLog} from '../Utils/Log'

class Discord{
  client : Discordjs.Client
  Ready : Boolean
  Voice : Discordjs.VoiceConnection
  constructor() {
    this.client = new Discordjs.Client();
    this.Ready = false;
    ModuleLog("Discord",undefined,true)
  }

  //#region Auth
  LoginClient = (token : string) => this.client.login(token)
  DisconnectClient = (io : Server) =>{
    this.client= new Discordjs.Client();
    this.DefaultFire(io);
    this.Ready=false
  }
  //#endregion

  //#region FireEvent
  DefaultFire = (io : Server) => {
    this.FireWhenReady(io,()=>{})
    this.FireWhenDisconnect(io,()=>{})
    this.FireWhenGuildJoin(io,()=>{})
    if(process.env.NODE_ENV=="development"){
      this.FireWhenDebug()
      this.FireWhenWarn()
      this.FireWhenError()
    }
    ModuleLog("Discord","Event initialiser")
  }
  FireWhenDebug = () => this.client.on("debug",(message : string) => Log("Discord",message))
  FireWhenWarn = () => this.client.on("warn",(message : string) => Log("Discord",message))
  FireWhenError = () => this.client.on("error",(message : Error) => Log("Discord",message.message))
  FireWhenReady = ( io : Server , toDo : Function ) => this.client.on('ready',()=>{
    this.Ready = true;
    io.emit("botUpdate")
    Log("Discord","Bot Started")
    Log("Socket","Tout les client sont actualiser")
    toDo()
  })
  FireWhenDisconnect = ( io :Server ,toDo : Function) => this.client.on("disconnect",() => {
    this.Ready=false;
    io.emit("botUpdate")
    Log("Discord","Bot Off")
    toDo();
  })
  FireWhenGuildJoin = (io : Server, toDo : Function) => this.client.on("guildCreate",(guild)=>{
    io.emit("guildUpdate")
    Log("Discord","Bot join guild "+guild.name)
    Log("Socket","Tout les client sont actualiser")
    toDo()
  })
  //#endregion

  //#region Getter
  GetClient = () => this.client
  GetUser = () => this.client.user
  GetVoice = () => this.Voice
  GetAllServer = () => this.client.guilds.cache
  GetOneServer = ( guildId : string ) => this.client.guilds.cache.find((value,index)=>index===guildId)
  GetAllChan = ( guildId : string ) => this.GetOneServer(guildId)?.channels.cache
  GetOneChan = ( guildId : string , ChanId : string ) => this.GetAllChan(guildId)?.find((value,index)=>index===ChanId)
  //#endregion

  //#region PresenceHandler
  SetPresenceFromPresenceData = (presence : PresenceData ) => this.client.user?.setPresence(presence)
  SetPresence = (online : boolean , name : string , type : ActivityType) => this.SetPresenceFromPresenceData({
    status : online ? "online" : "idle" ,
    activity : {
      name : name ,
      type : type
    }
  })
  //#endregion

  //#region Voice
  VoiceJoin = (guildId : string, channelId : string) =>
    (this.GetOneChan(guildId,channelId)as VoiceChannel)?.join()
      .then(value=>{this.Voice=value})
  VoiceLeave = () => this.Voice?.disconnect()
  VoicePlay = (toPlay : any,option? : StreamOptions) => this.Voice?.play(toPlay,option)
  VoiceStop = () => this.Voice?.dispatcher?.pause()
  VoiceResume = () => this.Voice?.dispatcher?.resume()
  VoiceVolume = (volume : number) => this.Voice?.dispatcher?.setVolume(volume);
  VoiceGetVolume = () => this.Voice?.dispatcher?.volume
  VoiceGetIsPaused = ()=> this.Voice?.dispatcher?.paused
  VoiceGetStatus = () => this.Voice?.status
  VoiceGetChan = () => this.Voice?.channel

  VoiceEventStart = (io : Server) => {
    this.Voice.on("start", ()=>{io.emit("VoiceStart")})
    this.Voice.on("volumeChange", ()=>{io.emit("VoiceVolume")})
    this.Voice.on("speaking", ()=>{io.emit("VoiceSpeaking")})
  }
  //#endregion
}

export default Discord;