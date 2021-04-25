import sq from "sqlite3";
import sqlite, { open } from "sqlite";
import Store from "./Store";
import { ModuleLog } from "../Utils/Log";
class DataBase {
  db?: sqlite.Database;
  Table: any;
  constructor(conf: Store, onceReady?: Function) {
    open({
      filename: conf.GetConf("db"),
      driver: sq.cached.Database,
    }).then((db) => {
      this.db = db;
      this.Table = conf.GetConf("table");
      this.CreateTokenTable(conf.GetConf("table").token);
      this.CreateTabTable(conf.GetConf("table").tab);
      if (onceReady !== undefined) onceReady();
      ModuleLog("DataBase", undefined, true);
    });
  }
  CreateTokenTable = (TokenTableName: string) =>
    this.db?.run(
      `CREATE TABLE IF NOT EXISTS ${TokenTableName} (
      id integer PRIMARY KEY,
      label varchar(55) NOT NULL,
      token varchar(255) NOT NULL
    )`
    );
  CreateTabTable = (TabTableName: string) =>
    this.db?.run(
      `CREATE TABLE IF NOT EXISTS ${TabTableName} (
      id integer PRIMARY KEY,
      label varchar(55) NOT NULL,
      content TEXT
    )`
    );

  FormatString = (stringContent: string) => {
    return stringContent.split("'").join("''");
  };

  InsertToken = (label: string, token: string) =>
    this.db?.run(`INSERT INTO ${this.Table.token} (label,token) VALUES (?,?)`, [
      this.FormatString(label),
      token,
    ]);
  GetAllToken = async () => this.db?.all(`select * from ${this.Table.token} `);
  GetToken = async (id: string) =>
    this.db?.get(`Select * from ${this.Table.token} where id = ?`, id);
  DeleteToken = (idToken: number) =>
    this.db?.exec(`Delete from ${this.Table.token} where id=${idToken}`);
  EditToken = (idToken: number, label: string, token: string) =>
    this.db?.run(
      `Update ${this.Table.token} set label = '${this.FormatString(
        label
      )}', token = '${token}' where id=${idToken}`
    );

  GetAllTab = async () => this.db?.all(`select * from ${this.Table.tab}`);
  DeleteTab = (TabId: number) => {
    this.db?.exec(`Delete from ${this.Table.tab} where id=${TabId}`);
  };
  InsertTab = (label: string) =>
    this.db?.run(`INSERT INTO ${this.Table.tab} (label,content) VALUES (?,?)`, [
      this.FormatString(label),
      "[]",
    ]);
  EditTabLabel = (TabId: number, label: string) =>
    this.db?.run(
      `Update ${this.Table.tab} set label = '${this.FormatString(
        label
      )}' where id=${TabId}`
    );
  EditTabContent = (TabId: number, content: string) =>
    this.db?.run(
      `Update ${this.Table.tab} set content = '${this.FormatString(
        content
      )}' where id=${TabId}`
    );
  InsertOrUpdate = (TabId: number, label: string, content: string) =>
    this.db?.run(
      `REPLACE INTO ${this.Table.tab} (label,content) VALUES ('${label}','${content}')`
    );
}

export default DataBase;
