import BetterDatabase from 'better-sqlite3'
import Store from './Store'
import {ModuleLog} from '../Utils/Log'
class DataBase{
  db : BetterDatabase.Database
  Table : any
  constructor(conf : Store){
    this.db = new BetterDatabase(conf.GetConf("db"))
    this.Table = conf.GetConf("table")
    this.CreateTokenTable(conf.GetConf("table").token).run()
    this.CreateTabTable(conf.GetConf("table").tab).run()
    this.CreateTabItemTable(conf.GetConf("table").tabItem).run()
    ModuleLog("DataBase",undefined,true)
  }
  CreateTokenTable = (TokenTableName : string)=> this.db.prepare(
    `CREATE TABLE IF NOT EXISTS ${TokenTableName} (
      id integer PRIMARY KEY,
      label varchar(55) NOT NULL,
      token varchar(255) NOT NULL
    )`
  )
  CreateTabTable = (TabTableName : string)=> this.db.prepare(
    `CREATE TABLE IF NOT EXISTS ${TabTableName} (
      id integer PRIMARY KEY,
      label varchar(55) NOT NULL
    )`
  )
  CreateTabItemTable = (TabItemTableName : string)=> this.db.prepare(
    `CREATE TABLE IF NOT EXISTS ${TabItemTableName} (
      id integer PRIMARY KEY,
      idTab integer NOT NULL,
      label varchar(55) NOT NULL
    )`
  )

  InsertToken =(label : string , token : string) =>this.db.prepare(`INSERT INTO ${this.Table.token} (label,token) VALUES (?,?)`)
    .run(label,token)
  GetAllToken = () => this.db.prepare(`select * from ${this.Table.token} `).all()
  GetToken = (id : string) => this.db.prepare(`Select * from ${this.Table.token} where id = ?`).get(id)
  DeleteToken = (idToken : number) => this.db.prepare(`Delete from ${this.Table.token} where id=${idToken}`).run()
  EditToken = (idToken : number, label : string , token : string) => this.db.prepare(`Update ${this.Table.token} set label = '${label}', token = '${token}' where id=${idToken}`).run()

}

export default DataBase;