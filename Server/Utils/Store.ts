import path from 'path'
import fs from 'fs'
import {ModuleLog} from '../Utils/Log'
class Store{
  nconf
  soundBoardRoot
  constructor(){
    this.nconf = require('nconf')
    this.soundBoardRoot = path.join(String(process.env.APPDATA||process.env.HOME),"SoundBoard")
    this.nconf
      .argv()
      .env()
    this.CreateFolderIfNotExist(this.soundBoardRoot)
    this.CreateFolderIfNotExist(path.join(this.soundBoardRoot,"Store"))
    this.AddFileConfig(path.join(this.soundBoardRoot,"Store","config.json"))
    this.CreateFolderIfNotExist(path.join(this.soundBoardRoot,"ffmpeg"))
    this.CreateFolderIfNotExist(path.join(this.soundBoardRoot,"command"))
    process.env.FFMPEG_BIN=path.join(this.soundBoardRoot,"ffmpeg","ffmpeg")
    this.nconf.defaults({
      "db": path.join(this.soundBoardRoot,"soundboard.db"),
      "ffmpeg": path.join(this.soundBoardRoot,"ffmpeg"),
      "tokenTable":"TokenTable",
      "table":{
        "token":"TokenTable",
        "test":"TestTable",
        "tab":"TabTable",
        "tabItem":"TabItemTable"
      }
    })
    ModuleLog("Store",undefined,true)
  }
  CreateFolderIfNotExist = (pathDir:string)=>!fs.existsSync(pathDir)?fs.mkdirSync(pathDir):true
  AddFileConfig = (pathDir:string) => this.nconf.file({file:pathDir})
  GetNConf = () => this.nconf
  GetConf = (label : string) => this.nconf.get(label)
  setConf = (label : string,value : object) => this.nconf.set(label,value)
  GetVar = (store:string,variable:string) => this.nconf.get(`${store}:${variable}`)
  SaveConf = (callback?:Function)=> this.nconf.save(callback)

}

export default Store;