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
      label varchar(55) NOT NULL,
      content varchar(255)
    )`
  )

  InsertToken =(label : string , token : string) =>this.db.prepare(`INSERT INTO ${this.Table.token} (label,token) VALUES (?,?)`)
    .run(label,token)
  GetAllToken = () => this.db.prepare(`select * from ${this.Table.token} `).all()
  GetToken = (id : string) => this.db.prepare(`Select * from ${this.Table.token} where id = ?`).get(id)
  DeleteToken = (idToken : number) => this.db.prepare(`Delete from ${this.Table.token} where id=${idToken}`).run()
  EditToken = (idToken : number, label : string , token : string) => this.db.prepare(`Update ${this.Table.token} set label = '${label}', token = '${token}' where id=${idToken}`).run()

  GetAllTab =() => this.db.prepare(`select * from ${this.Table.tab}`).all()
  DeleteTab = (TabId : number) =>{
    this.db.prepare(`Delete from ${this.Table.tab} where id=${TabId}`).run()
  }
  InsertTab = (label : string) =>this.db.prepare(`INSERT INTO ${this.Table.tab} (label,content) VALUES (?)`)
    .run(label,"[]")
  EditTabLabel = (TabId : number, label : string) =>
    this.db.prepare(`Update ${this.Table.tab} set label = '${label} where id=${TabId}'`).run()
  EditTabContent = (TabId : number, content : string) =>
    this.db.prepare(`Update ${this.Table.tab} set content = '${content} where id=${TabId}'`).run()
}

export default DataBase;