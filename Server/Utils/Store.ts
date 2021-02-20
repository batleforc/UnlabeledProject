var path = require('path')
var fs = require('fs')
var {Log} = require('./Log')

class Store{
  nconf
  soundBoardRoot

  constructor(){
    this.nconf = require('nconf')
    this.soundBoardRoot = path.join(process.env.APPDATA,"SoundBoard")
    this.nconf
      .argv()
      .env()
    if(this.CreateFolderIfNotExist(this.soundBoardRoot)){
      this.CreateFolderIfNotExist(path.join(this.soundBoardRoot,"Store"))
      this.AddFileConfig(path.join(this.soundBoardRoot,"Store","config.json"))
      Log("Store","Le store est est initialiser")
    }
    this.nconf.defaults({
      "db": path.join(this.soundBoardRoot,"soundboard.db"),
      "tokenTable":"TokenTable",
      "table":{
        "token":"TokenTable",
        "test":"TestTable"
      },
      "table:Token":"TokenTable",
      "table:test":"TestTable"
    })

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