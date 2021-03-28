import { VoiceChannel, VoiceConnection } from 'discord.js'
import {canJoin} from './Permissions'
import { Server } from 'socket.io';
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

  Play = ( song : Song, now? : boolean ) =>{
    if(this.songQueue.canPlay){

    }else
      return {message:"Isn't Connected",playing: false}
  }

  SetVolume = ( volume : number) => {
    this.songQueue.volume = volume
    this.songQueue.connection?.dispatcher.setVolumeLogarithmic(volume/5)
  }


}