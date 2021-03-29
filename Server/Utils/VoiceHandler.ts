import { VoiceChannel, VoiceConnection } from 'discord.js'
import {canJoin} from './Permissions'
import { Server } from 'socket.io';
import {ErrorLog} from './Log'
import ytdl from 'ytdl-core'
enum SongType{
  link = 0,
  YouTube = 1,
  Spotify = 2
}

interface Song{
  title : string
  url   : string,
  type  : SongType
}

interface SongQueue{
  voiceChannel  : VoiceChannel | null
  connection    : VoiceConnection | null
  volume        : number
  playing       : boolean
  canPlay       : boolean
  queue         : Array<Song>
}

class VoiceHandler{
  songQueue : SongQueue

  constructor(){
    this.songQueue = {
      voiceChannel : null,
      playing      : false,
      volume       : 5,
      queue        : [],
      connection   : null,
      canPlay      : false
    } as SongQueue
  }

  getQueue = () => this.songQueue.queue
  getVolume = () => this.songQueue.volume
  getServer = () => this.songQueue.voiceChannel.guild
  getChannel = () => this.songQueue.voiceChannel
  getIsPaused = () => this.songQueue.connection.dispatcher.paused
  getStatus = () => this.songQueue.connection

  Leave = ( io : Server) =>{
    this.songQueue.connection.disconnect()
    this.songQueue.canPlay = false;
    io.emit("VoiceLeave")
  }

  Join = ( voiceChan : VoiceChannel , io : Server ) => {
    if(canJoin(voiceChan)){
      voiceChan
        .join()
        .then(value=>{
          this.songQueue.connection = value
          this.songQueue.canPlay = true
          io.emit("VoiceJoin")
        })
    }
  }

  Pause = (io : Server) => {
    this.songQueue.connection?.dispatcher.pause()
    io.emit("VoiceChange")
  }

  Resume = (io : Server) =>{
    this.songQueue.connection?.dispatcher.resume()
    io.emit("VoiceChange")
  }

  Stop = ( io : Server) =>{
    this.songQueue.queue= [];
    this.songQueue.connection.dispatcher.end();
    io.emit("VoiceChange")
    return {stopped : true}
  }

  Skip = ( io : Server) =>{
    if(this.songQueue.queue.length===0)
      return {message:"no queue",playing: false}
    this.songQueue.connection.dispatcher.end();
    io.emit("VoiceChange")
    return {message:"All is good", playing : true}
  }

  Play = ( io : Server, song? : Song, now? : boolean  ) =>{
    if(!song)
      return
    if(now){
      this.songQueue
        .queue.splice(1,0,song)
      this.songQueue.connection.dispatcher.end()
    }else
      this.songQueue
        .queue.push(song)
    io.emit("VoiceQueue")
    if(this.songQueue.queue.length===1){
      this.Player(io);
    }
  }
  Player = (io : Server) => {
    if(this.songQueue.canPlay){
      var dispatch = this.songQueue.connection
        .play((
          this.songQueue.queue[0].type===SongType.link?
          this.songQueue.queue[0].url:
          this.songQueue.queue[0].type===SongType.YouTube?
          ytdl(this.songQueue.queue[0].url):
          this.songQueue.queue[0].url
          ))
        .on("finish",()=>{
          this.songQueue.queue.shift();
          this.Play(io,this.songQueue.queue[0])
          io.emit("VoiceChange")
        })
        .on("error",error=>{
          io.emit("VoiceError")
          this.songQueue.playing=false;
          ErrorLog("VoiceHandler",error.message);
        })
        this.songQueue.playing=true;
        io.emit("VoiceChange")
        dispatch.setVolumeLogarithmic(this.songQueue.volume/5)
      return {message:"Sound started",playing:true}
    }else{
      this.songQueue.playing=false;
      return {message:"Isn't Connected",playing: false}
    }
  }

  SetVolume = ( io : Server, volume : number) => {
    this.songQueue.volume = volume
    this.songQueue.connection?.dispatcher.setVolumeLogarithmic(volume/5)
    io.emit("VoiceChange")
  }
}


export default VoiceHandler;