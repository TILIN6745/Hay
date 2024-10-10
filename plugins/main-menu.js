import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '𝐈𝐍𝐅𝐎×𝐁𝐎𝐓',
  'info': '𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍',
  'rg': '𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎',
  'nable': '𝐎𝐅𝐅/𝐎𝐍',
  'fun': '𝐃𝐈𝐕𝐄𝐑𝐒𝐈Ó𝐍',
  'game': '𝐉𝐔𝐄𝐆𝐎𝐒',
  'emox': '𝐄𝐌𝐎𝐗-𝐀𝐍𝐈𝐌𝐄',
  'rollwaifu': '𝐑𝐎𝐋𝐋𝐖𝐀𝐈𝐅𝐔𝐒',
  'economy': '𝐄𝐂𝐎𝐍𝐎𝐌Í𝐀',
  'rpg': '×𝐑×𝐏×𝐆×',
  'jadibot': '𝐒𝐄𝐑𝐁𝐎𝐓/𝐂𝐎𝐃𝐄',
  'citaboom': '𝐂𝐈𝐓𝐀𝐁𝐎𝐎𝐌',
  'free': '𝐅𝐑𝐄𝐄/𝐅𝐈𝐑𝐄',
  'buscador': '𝐁𝐔𝐒𝐂𝐀𝐃𝐎𝐑𝐄𝐒',
  'descargas': '𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒',
  'ai': '×𝐀×𝐈×',
  'grupo': '𝐆𝐑𝐔𝐏𝐎𝐒',
  'tools': '𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒',
  'transformador': '𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒',
  'sticker': '𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒',
  'anime': '𝐀𝐍𝐈𝐌𝐄𝐒',
  'nsfw': '𝐍𝐒𝐅𝐖',
  'audio': '𝐀𝐔𝐃𝐈𝐎𝐒',
  'mods': '𝐒𝐓𝐀𝐅𝐅',
  'owner': '𝐂𝐑𝐄𝐀𝐃𝐎𝐑', 
}

const defaultMenu = {
  before: `.....⁀⸱⁀⸱︵⸌⸃૰⳹․🌟․⳼૰⸂⸍︵⸱⁀⸱⁀․....
𔓕𓏲꯭֟፝੭⌑✨𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉✨⌑𓏲꯭֟፝੭𔓕
▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞

“👋 ¡𝐇𝐨𝐥𝐚! 𝐂ó𝐦𝐨 𝐄𝐬𝐭á𝐬 𝐞𝐥 𝐝í𝐚 𝐝𝐞 𝐇𝐨𝐲 *%name* 𝐒𝐨𝐲 *𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭*, %greeting ”

     ╭───এ𝕎𝔼𝕃ℂ𝕆𝕃𝕄𝔼!💖──╮
╭╼✨𑁍⃪࣭۪ٜ݊݊݊݊݊໑𝐌𝐞𝐧𝐮-𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪✨
┃֪࣪  ╰─ׅ─ׅ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬🌹፝⃟ᰯ🌹◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─๋︩︪─๋︩︪─╯
├ׁ̟̇✰👑 *𝙲𝚁𝙴𝙰𝙳𝙾𝚁:* ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
├ׁ̟̇✰🎮 *𝙼𝙾𝙳𝙾:* Público
├ׁ̟̇✰🌠 *𝙱𝙰𝙸𝙻𝙴𝚈𝚂:* Multi Device
├ׁ̟̇✰⏱️ *𝙰𝙲𝚃𝙸𝚅𝙰𝙳𝙾:* %muptime
├ׁ̟̇✰👤 *𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂:* %totalreg
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

%readmore
 .╭─ׅ─ׅ┈─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬✨፝⃟ᰯ🌟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ─๋︩︪─╮
╭╼🌟𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎໑⃪࣭۪ٜ݊݊݊݊𑁍🌟
┃֪࣪  ╰─ׅ─ׅ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬✨፝⃟ᰯ🌟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ─๋︩︪─╯
├ׁ̟̇✰🗣️ *𝙲𝙻𝙸𝙴𝙽𝚃𝙴:* %name
├ׁ̟̇✰✨ *𝙴𝚇𝙿:* %exp
├ׁ̟̇✰🍪 *𝙲𝙾𝙾𝙺𝙸𝙴𝚂:* %cookies
├ׁ̟̇✰🆙 *𝙽𝙸𝚅𝙴𝙻:* %level
├ׁ̟̇✰⚔️ *𝚁𝙰𝙽𝙶𝙾:* %role
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

%readmore
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ─*

\t*𝐋𝐈𝐒𝐓𝐀𝐃𝐎 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒᯾* 
`.trimStart(),
      header: '.    ╭─ׅ──ׅ──☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬✨፝⃟ᰯ🌟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ─╮\n╭╼🤍⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ %category ໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🤍\n┃֪࣪  ╰─ׅ─ׅ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬✨፝⃟ᰯ🌟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ─๋︩︪─╯',
  body: '├ׁ̟̇✰ %cmd\n',
  footer: '╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝\n',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, cookies, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '✨ 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🌟 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, cookies, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  let category = "video"
  const db = './src/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const rlink = db_.links[category][random]
  global.vid = rlink
  const response = await fetch(vid)
  const gif = await response.buffer()
 // const img = imagen1

/*await conn.reply(m.chat, '╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹*\n├ ⚘݄𖠵⃕⁖𖥔.Ƈᴀʀɢᴀɴᴅᴏ,  ꪶꪾ❍̵̤̂̂ꫂ\n├Ąɢᴜᴀʀᴅᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ❞\n╰ׁ̻─ׅׄ─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪', m, { contextInfo:{ forwardingScore: 2024, isForwarded: true, externalAdReply: {title: namechannel, body: '𝐃𝐞𝐯 𝐖𝐨𝐫𝐝 𝐓𝐞𝐚𝐦 𝐎𝐟𝐢𝐜𝐢𝐚𝐥', sourceUrl: channel, thumbnail: icons }}})*/

// await conn.reply(m.chat, '🍟 Enviando el menú.....', m, rcanal)

await m.react('🪄') 

//await conn.sendFile(m.chat, imagen1, 'yaemori.jpg', text.trim(), fkontak, null, rcanal)

await conn.sendMessage(
  m.chat,
  { video: { url: vid }, caption: text.trim(),
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363322713003916@newsletter',
      newsletterName: 'CANAL 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭/☆ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜☆',
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: 'CANAL 𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉/☆ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜☆',
      body: dev,
      thumbnailUrl: icono,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  },

  gifPlayback: true, gifAttribution: 0 },
  { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat, '🔵 Lo sentimos, el menú tiene un error', m, rcanal, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'm', 'ayuda', 'allmenú', 'help', 'menucompleto'] 
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;