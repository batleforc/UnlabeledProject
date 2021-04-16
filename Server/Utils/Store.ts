import path from 'path'
import fs from 'fs'
import {ModuleLog} from '../Utils/Log'
class Store{
  nconf
  static soundBoardRoot : any
  constructor(){
    this.nconf = require('nconf')
    Store.soundBoardRoot = path.join(String(process.env.APPDATA||process.env.HOME),"SoundBoard")
    this.nconf
      .argv()
      .env()
    this.CreateFolderIfNotExist(Store.soundBoardRoot)
    this.CreateFolderIfNotExist(path.join(Store.soundBoardRoot,"Store"))
    this.CreateFolderIfNotExist(path.join(Store.soundBoardRoot,"log"))
    this.AddFileConfig(path.join(Store.soundBoardRoot,"Store","config.json"))
    this.CreateFolderIfNotExist(path.join(Store.soundBoardRoot,"ffmpeg"))
    this.CreateFolderIfNotExist(path.join(Store.soundBoardRoot,"command"))
    process.env.FFMPEG_BIN=path.join(Store.soundBoardRoot,"ffmpeg","ffmpeg")
    this.nconf.defaults({
      "db": path.join(Store.soundBoardRoot,"soundboard.db"),
      "ffmpeg": path.join(Store.soundBoardRoot,"ffmpeg"),
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