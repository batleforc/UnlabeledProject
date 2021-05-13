import Discordjs, {
  ActivityType,
  PresenceData,
} from "discord.js";
import { Log, ModuleLog } from "../Utils/Log";
class Discord {
  client: Discordjs.Client;
  Ready: Boolean;
  BotId: number;
  constructor() {
    this.BotId = -1;
    this.client = new Discordjs.Client();
    this.Ready = false;
    ModuleLog("Discord", undefined, true);
  }

  //#region Auth
  LoginClient = (token: string, botId: number) => {
    this.client.login(token);
    this.BotId = botId;
  };
  DisconnectClient = (
    { onLeave, whenReady,GuildUpdate,BotUpdate }: { onLeave?: Function; whenReady?: Function,GuildUpdate?:Function,BotUpdate?:Function }
  ) => {
    this.client = new Discordjs.Client();
    this.DefaultFire(BotUpdate,GuildUpdate,whenReady);
    this.BotId = -1;
    this.Ready = false;
    if (onLeave) onLeave();
    if (BotUpdate) BotUpdate();
  };
  //#endregion

  //#region FireEvent
  DefaultFire = (BotUpdate?:Function,GuildUpdate?:Function, WhenReady?: Function) => {
    this.FireWhenReady(BotUpdate, () => {
      if (WhenReady) WhenReady();
    });
    this.FireWhenDisconnect(BotUpdate, () => {});
    this.FireWhenGuildJoin(GuildUpdate, () => {});
    if (process.env.NODE_ENV == "development") {
      this.FireWhenDebug();
      this.FireWhenWarn();
      this.FireWhenError();
    }
    ModuleLog("Discord", "Event initialiser");
  };
  FireWhenDebug = () =>
    this.client.on("debug", (message: string) => Log("Discord", message));
  FireWhenWarn = () =>
    this.client.on("warn", (message: string) => Log("Discord", message));
  FireWhenError = () =>
    this.client.on("error", (message: Error) =>
      Log("Discord", message.message)
    );
  FireWhenReady = (BotUpdate?: Function, toDo?: Function) =>
    this.client.on("ready", () => {
      this.Ready = true;
      Log("Discord", "Bot Started");
      Log("Socket", "Tout les client sont actualiser");
      if (BotUpdate)BotUpdate();
      if(toDo)toDo();
    });
  FireWhenDisconnect = (BotUpdate?: Function, toDo?: Function) =>
    this.client.on("disconnect", () => {
      this.Ready = false;
      if (BotUpdate)BotUpdate();
      if(toDo)toDo();
      Log("Discord", "Bot Off");
    });
  FireWhenGuildJoin = (GuildUpdate?: Function, toDo?: Function) =>
    this.client.on("guildCreate", (guild) => {
      if (GuildUpdate) GuildUpdate();
      if(toDo) toDo();
      Log("Discord", "Bot join guild " + guild.name);
      Log("Socket", "Tout les client sont actualiser");
    });
  //#endregion

  //#region Getter
  GetBotId = () => this.BotId;
  GetClient = () => this.client;
  GetUser = () => this.client.user;
  GetPresence = () => this.GetUser()?.presence;
  GetAllServer = () => this.client.guilds.cache;
  GetOneServer = (guildId: string) =>
    this.client.guilds.cache.find((value, index) => index === guildId);
  GetAllChan = (guildId: string) => this.GetOneServer(guildId)?.channels.cache;
  GetOneChan = (guildId: string, ChanId: string) =>
    this.GetAllChan(guildId)?.find((value, index) => index === ChanId);
  //#endregion

  //#region PresenceHandler
  SetPresenceFromPresenceData = (presence: PresenceData) =>
    this.client.user?.setPresence(presence);
  SetPresence = (online: boolean, name: string, type: ActivityType) =>
    this.SetPresenceFromPresenceData({
      status: online ? "online" : "idle",
      activity: {
        name: name,
        type: type,
      },
    });
  //#endregion
}

export default Discord;
