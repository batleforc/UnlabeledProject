import {Client, VoiceChannel} from 'discord.js'

export const getPermission = (voiceChan : VoiceChannel) =>
  voiceChan.guild.me&&voiceChan.permissionsFor(voiceChan.guild.me)

export const canJoin = ( voiceChan : VoiceChannel) =>
  getPermission(voiceChan)?.has("CONNECT")&&getPermission(voiceChan)?.has("SPEAK") || false