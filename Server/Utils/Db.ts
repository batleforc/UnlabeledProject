import BetterDatabase from 'better-sqlite3'
import Store from './Store'
var {Log} = require('./Log')
class DataBase{
  db : BetterDatabase.Database
  Table : any
  constructor(conf : Store){
    this.db = new BetterDatabase(conf.GetConf("db"))
    this.Table = conf.GetConf("table")
    this.CreateTokenTable(conf.GetConf("table").token).run()
    Log("DataBase","La base de donnée est initialiser")
  }
  CreateTokenTable = (TokenTableName : string)=> this.db.prepare(
    `CREATE TABLE IF NOT EXISTS ${TokenTableName} (
      id integer PRIMARY KEY,
      label varchar(55) NOT NULL,
      token varchar(255) NOT NULL
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