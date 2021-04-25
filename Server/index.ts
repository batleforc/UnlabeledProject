require('dotenv-flow').config()
import { Log, ModuleLog, LogObject } from './Utils/Log'
ModuleLog("Serveur","Starting")
import ReduxStore from './Actions'
import WebServer from './Utils/Server'
import Store from './Utils/Store'
import DataBase from './Utils/Db'
import Discord from './Utils/Discord'
import Api from './Router/Api'
import { BoardGetter } from './Actions/Board'


export var store = new Store();
export var DiscordClient = new Discord();
export var Serveur = new WebServer(Number(process.env.SERVER_PORT)||5000)
export var Db = new DataBase(store, () => {
  ReduxStore.dispatch(BoardGetter({force:false}))
});

ReduxStore.subscribe(() => LogObject("Redux",ReduxStore.getState()))

Serveur.AddToAppContext("Db",Db)
Serveur.AddToAppContext("discord",DiscordClient)
Serveur.AddToAppContext("store",store)
Serveur.AddToAppContext("io",Serveur.GetSocket())
Serveur.AddRouter(Api)

Serveur.GetSocket().on('connection',(socket:any)=>{
  Log("Socket","Un utilisateur est connecter")
})
Serveur.AddListener("message",(socket : any,param : any)=>{
  socket.emit("test",param)
})
DiscordClient.DefaultFire(Serveur.GetSocket())

process.stdin.resume();

function exitHandler() {

  process.exit();
}


process.on('exit', exitHandler);

process.on('SIGINT', exitHandler);

process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

Serveur.ListenServer(()=>{
  ModuleLog("Serveur",`Le serveur est en écoute sur le port ${String(process.env.SERVER_PORT)} et fonctionne en ${String(process.env.NODE_ENV)}`)
})