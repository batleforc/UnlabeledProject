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

  Join = ( voiceChan : VoiceChannel , io : Server ) => {
    if(canJoin(voiceChan)){
      voiceChan
        .join()
        .then(value=>{
          this.songQueue.connection = value
          this.songQueue.canPlay = true
        })
    }
  }

  Play = ( io : Server, song? : Song, now? : boolean  ) =>{
    if(!song)
      return
    if(now){
      this.songQueue
        .queue.unshift(song)
    }else
      this.songQueue
        .queue.push(song)

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
          ErrorLog("VoiceHandler",error.message);
        })
        io.emit("VoicePlaying")
        dispatch.setVolumeLogarithmic(this.songQueue.volume/5)
    }else
      return {message:"Isn't Connected",playing: false}
  }

  SetVolume = ( volume : number) => {
    this.songQueue.volume = volume
    this.songQueue.connection?.dispatcher.setVolumeLogarithmic(volume/5)
  }


}