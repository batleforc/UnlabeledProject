import BetterDatabase from 'better-sqlite3'
import Store from './Store'
class DataBase{
  db : BetterDatabase.Database
  Table : any
  constructor(conf : Store){
    this.db = new BetterDatabase(conf.GetConf("db"))
    this.Table = conf.GetConf("table")
    this.CreateTokenTable(conf.GetConf("table").token).run()
    console.log(this.GetAllToken())
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
}

export default DataBase;