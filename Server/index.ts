console.log("Serveur Start")
require('dotenv-flow').config()
import WebServer from './Utils/Server'
import Store from './Utils/Store'
import DataBase from './Utils/Db'
var store = new Store();
var Serveur = new WebServer(Number(process.env.SERVER_PORT))
var Db = new DataBase(store);

console.log(process.env.SERVER_PORT)
console.log("JE suis un test2")

console.log(store.GetConf("db"))




Serveur.ListenServer(()=>{
    console.log("Serveur is listening on "+process.env.SERVER_PORT)
})