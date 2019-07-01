require('http').createServer().listen(3000)

const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./authh.json');
const request = require('request');
const db = require('quick.db')



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(function(){
    let statusese = [
        'TOP-PUBG REBORN',
        ` ${client.users.size} ПОЛЬЗОВАТЕЛЕЙ`
    ]
        let status = statusese[Math.floor(Math.random()*statusese.length)]
        client.user.setActivity(status, {type:'PLAYING'})
    },5000)
});

client.login(auth.token);

client.on('message', messi => {
    let msg = messi

    if (msg.channel.id == "595223512738693120") {
        if(msg.author.id !== '591540649371762688'){
            messi.delete()
        //start fpp search
        if (msg.content.toLowerCase().startsWith(`!fpp`)) {
            let condition = msg.content.toLowerCase().replace('!fpp', '')
            let link = [`https://res.cloudinary.com/nik0gda/image/upload/v1561989856/1FPP_hf6j06.png`, 'https://res.cloudinary.com/nik0gda/image/upload/v1561989856/2FPP_cmylgo.png', 'https://res.cloudinary.com/nik0gda/image/upload/v1561989857/3FPP_zqwxwu.png']
            if (!msg.member.voiceChannel) {
                msg.author.send(`<@!${msg.author.id}>, чтобы воспользоваться командой \`!fpp\`, для начала нужно зайти в Squad комнату.`)
                msg.delete()
            } else {
                let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                let channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                if (channel.userLimit - (ids.length) == 0) {} else {
                    let id = ``;
                    let options = {
                        maxAge: 0,
                        maxUses: 0
                    }
                    let invite = msg.member.voiceChannel.createInvite(options)
                    invite.then(function (invite) {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`В поисках +${msg.member.voiceChannel.userLimit - (ids.length)} FPP в ${msg.member.voiceChannel.name}`, msg.member.user.avatarURL)
                            .setColor('0x#ffa500')
                            .setThumbnail(link[channel.userLimit - (ids.length) - 1])
                        for (let property in ids) {
                            id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-adr`))} ${msg.guild.emojis.get('595325240968740885!upda')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-kd`)*10)/10}+`
                        }
                        if (condition == '') {
                            id += `\n\n Зайти: ${invite} ☑\n`
                        } else {
                            id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                        }
                        embed.setDescription(id)
                        channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                        msg.channel.send(embed).then((message) => {

                            let listener = old => {
                                if (!msg.member.voiceChannel) {} else {
                                    if (channel.members.size === 0) {
                                        message.delete()
                                        client.removeListener('voiceStateUpdate', listener);
                                    } else {
                                        if (channel.full) {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-kd`)*10)/10}+`
                                            }
                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`Играют в ${channel.name}`, `https://images-ext-2.discordapp.net/external/95Klh-FvmzBQ9uWDQMIflnWkvt7jK1a5eZ-UuPZSpm4/https/i.imgur.com/zhNa0WM.png`)
                                                .setColor('0x#808080')
                                                .setThumbnail(`https://res.cloudinary.com/nik0gda/image/upload/v1561386479/full_hdqcwz.png`)
                                                .setDescription(id)

                                            message.edit(embed)
                                        } else {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            console.log(1)
                                            ids = channel.members.map(g => g.user.id)
                                            nicks = channel.members.map(g => g.user.username)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.fpp-kd`)*10)/10}+`
                                            }

                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`В поисках +${channel.userLimit - (ids.length)} FPP в ${channel.name}`, msg.member.user.avatarURL)
                                                .setColor('0x#ffa500')
                                                .setThumbnail(link[channel.userLimit - (ids.length) - 1])
                                                .setDescription(id)

                                            message.edit(embed)

                                            setTimeout(() => {
                                                client.removeListener('voiceStateUpdate', listener);
                                            }, 15 * 60 * 1000) // after 15 minutes stop

                                        }

                                    }
                                }
                            }
                            client.on('voiceStateUpdate', listener);


                        })

                    })
                }
            }
        }else if(msg.content.toLowerCase().startsWith(`!faceit`)) {
            let condition = msg.content.toLowerCase().replace('!faceit', '')
            let link = [`https://res.cloudinary.com/nik0gda/image/upload/v1561386611/faceit_1_bxgedz.png`, 'https://res.cloudinary.com/nik0gda/image/upload/v1561386479/faceit_2_bxiu98.png', 'https://res.cloudinary.com/nik0gda/image/upload/v1561386479/faceit_3_wo7xv2.png']
            if (!msg.member.voiceChannel) {
                msg.author.send(`<@!${msg.author.id}>, чтобы воспользоваться командой \`!faceit\`, для начала нужно зайти в Squad комнату.`)
                msg.delete()
            } else {
                let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                let channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                if (channel.userLimit - (ids.length) == 0) {} else {
                    let id = ``;
                    let options = {
                        maxAge: 0,
                        maxUses: 0
                    }
                    let invite = msg.member.voiceChannel.createInvite(options)
                    invite.then(function (invite) {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`В поисках +${msg.member.voiceChannel.userLimit - (ids.length)} FaceIT в ${msg.member.voiceChannel.name}`, msg.member.user.avatarURL)
                            .setColor('0x#ffa500')
                            //.setThumbnail(link[channel.userLimit - (ids.length) - 1])
                        for (let property in ids) {
                            id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-kd`)*10)/10}+`
                        }
                        if (condition == '') {
                            id += `\n\n Зайти: ${invite} ☑\n`
                        } else {
                            id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                        }
                        embed.setDescription(id)
                        channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                        msg.channel.send(embed).then((message) => {

                            let listener = old => {
                                if (!msg.member.voiceChannel) {} else {
                                    if (channel.members.size === 0) {
                                        console.log('ia v izbushke')
                                        message.delete()
                                        client.removeListener('voiceStateUpdate', listener);
                                    } else {
                                        if (channel.full) {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-kd`)*10)/10}+`
                                            }
                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`Играют в ${channel.name}`, `https://images-ext-2.discordapp.net/external/95Klh-FvmzBQ9uWDQMIflnWkvt7jK1a5eZ-UuPZSpm4/https/i.imgur.com/zhNa0WM.png`)
                                                .setColor('0x#808080')
                                            //    .setThumbnail(`https://res.cloudinary.com/nik0gda/image/upload/v1561386479/full_hdqcwz.png`)
                                                .setDescription(id)

                                            message.edit(embed)
                                        } else {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            console.log(1)
                                            ids = channel.members.map(g => g.user.id)
                                            nicks = channel.members.map(g => g.user.username)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.faceit-kd`)*10)/10}+`
                                            }

                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`В поисках +${channel.userLimit - (ids.length)} FaceIT в ${channel.name}`, msg.member.user.avatarURL)
                                                .setColor('0x#ffa500')
                                                .setThumbnail(link[channel.userLimit - (ids.length) - 1])
                                                .setDescription(id)

                                            message.edit(embed)

                                            setTimeout(() => {
                                                client.removeListener('voiceStateUpdate', listener);
                                            }, 15 * 60 * 1000) // after 15 minutes stop

                                        }

                                    }
                                }
                            }
                            client.on('voiceStateUpdate', listener);


                        })

                    })
                }
            }
        }else if (msg.content.toLowerCase().startsWith(`!tpp`)) {
            let condition = msg.content.toLowerCase().replace('!tpp', '')
            let link = [`https://res.cloudinary.com/nik0gda/image/upload/v1561989856/1TPP_nlmt6u.png`, 'https://res.cloudinary.com/nik0gda/image/upload/v1561989857/2TPP_iqfoq1.png', 'https://res.cloudinary.com/nik0gda/image/upload/v1561989856/3TPP_azlmap.png']
            if (!msg.member.voiceChannel) {
                msg.author.send(`<@!${msg.author.id}>, чтобы воспользоваться командой \`!tpp\`, для начала нужно зайти в Squad комнату.`)
                msg.delete()
            } else {
                let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                let channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                if (channel.userLimit - (ids.length) == 0) {} else {
                    let id = ``;
                    let options = {
                        maxAge: 0,
                        maxUses: 0
                    }
                    let invite = msg.member.voiceChannel.createInvite(options)
                    invite.then(function (invite) {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`В поисках +${msg.member.voiceChannel.userLimit - (ids.length)} TPP в ${msg.member.voiceChannel.name}`, msg.member.user.avatarURL)
                            .setColor('0x#ffa500')
                            .setThumbnail(link[channel.userLimit - (ids.length) - 1])
                        for (let property in ids) {
                            id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-kd`)*10)/10}+`
                        }
                        if (condition == '') {
                            id += `\n\n Зайти: ${invite} ☑\n`
                        } else {
                            id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                        }
                        embed.setDescription(id)
                        channel = msg.member.voiceChannel.guild.channels.find(x => x.id === msg.member.voiceChannel.id)
                        msg.channel.send(embed).then((message) => {

                            let listener = old => {
                                if (!msg.member.voiceChannel) {} else {
                                    if (channel.members.size === 0) {
                                        message.delete()
                                        client.removeListener('voiceStateUpdate', listener);
                                    } else {
                                        if (channel.full) {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-kd`)*10)/10}+`
                                            }
                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`Играют в ${channel.name}`, `https://images-ext-2.discordapp.net/external/95Klh-FvmzBQ9uWDQMIflnWkvt7jK1a5eZ-UuPZSpm4/https/i.imgur.com/zhNa0WM.png`)
                                                .setColor('0x#808080')
                                                .setThumbnail(`https://res.cloudinary.com/nik0gda/image/upload/v1561386479/full_hdqcwz.png`)
                                                .setDescription(id)

                                            message.edit(embed)
                                        } else {
                                            let ids = msg.member.voiceChannel.members.map(g => g.user.id)
                                            console.log(1)
                                            ids = channel.members.map(g => g.user.id)
                                            nicks = channel.members.map(g => g.user.username)
                                            id = ''
                                            for (let property in ids) {
                                                id += `\n <@!${ids[property]}> ${msg.guild.emojis.get('595325214221533232')}**ADR:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-adr`))} ${msg.guild.emojis.get('595325240968740885')}**K/D:** ${Math.floor(db.get(`${ids[property]}.stats.tpp-kd`)*10)/10}+`
                                            }

                                            if (condition == '') {
                                                id += `\n\n Зайти: ${invite} ☑\n`
                                            } else {
                                                id += `\n\n ${msg.guild.emojis.get('595325280692862976')}  ${condition} \n Зайти: ${invite} ☑\n`
                                            }
                                            embed = new Discord.RichEmbed()
                                                .setAuthor(`В поисках +${channel.userLimit - (ids.length)} TPP в ${channel.name}`, msg.member.user.avatarURL)
                                                .setColor('0x#ffa500')
                                                .setThumbnail(link[channel.userLimit - (ids.length) - 1])
                                                .setDescription(id)

                                            message.edit(embed)

                                            setTimeout(() => {
                                                client.removeListener('voiceStateUpdate', listener);
                                            }, 15 * 60 * 1000) // after 15 minutes stop

                                        }

                                    }
                                }
                            }
                            client.on('voiceStateUpdate', listener);


                        })

                    })
                }
            }
        }else  if((!msg.content.toLowerCase().startsWith(`!gll`)) && (!msg.content.toLowerCase().startsWith(`!faceit`)) && (!msg.content.toLowerCase().startsWith(`!fpp`))){
        msg.author.send(`В канале <#592814501913690115> доступны только след. команды:
        :black_small_square:!fpp:black_small_square:!faceit:black_small_square:!tpp
        Через пробел, можно указать требования: \`!fpp кд 4+, прыгаем в Pochinki\``)
        msg.delete()
        }
    }
    }
})




//
// logs-deleted ---- start
//\'
function emodji(id) {
    return client.emojis.get(id).toString()

}




function roundNumber(nr) {
    nr = Math.floor(nr * 100) / 100
    return nr
}




function requ_id_faceit(game_id) {
    return new Promise((resolve, reject) => {
        game_id.then(function (gameId) {
            gameId = JSON.parse(gameId);
            gameId = gameId.data[0].id
            var options = {
                method: 'GET',
                url: `https://open.faceit.com/data/v4/players?game=pubg&game_player_id=${gameId}`,
                headers: {
                    accept: `application/json`,
                    Authorization: `Bearer 29b9451a-23e3-4e9b-9852-246e78a7df99`
                }
            }
            request(options, (error, response, body) => {
                if (!response) {
                    reject(error);
                } else {
                    if (response.statusCode != 200) {
                        resolve('{"errors":[{"message":"The resource was not found.","code":"err_nf0","http_status":404}]}');
                        reject(error);
                    } else {
                        resolve(body)
                    }
                }
            })
        })
    })
}


function requ_stats_faceit(id) {
    return new Promise((resolve, reject) => {
        id = id.player_id
        var options = {
            method: 'GET',
            url: `https://open.faceit.com/data/v4/players/${id}/stats/pubg`,
            headers: {
                accept: `application/json`,
                Authorization: `Bearer 29b9451a-23e3-4e9b-9852-246e78a7df99`
            }
        }
        request(options, (error, response, body) => {
            if (!response) {
                reject(error);
            } else {
                if (response.statusCode != 200) {
                    resolve('{"errors":[{"message":"The resource was not found.","code":"err_nf0","http_status":404}]}')
                } else {
                    resolve(body)

                }
            }
        })
    })
}



function getPlayerId(url, msg, nick) {
    console.log(1)
    return new Promise((resolve, reject) => {
        options = { // requesting user id
            method: 'GET',
            url: url + `${nick}`,
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MWQ0N2RmMC03OTAzLTAxMzctMTNiMC0zNTcxMmIxODE5NTkiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTYxNDE3ODg4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InJldG9wcHViZyJ9._y8324teuGWaF01hFYuj1uF-4fRjLXIgWDon5KlD02E',
                'Accept': 'application/vnd.api+json'
            }
        }
        request(options, (error, response, body) => { // requesting users stats
            if (!response) {
                reject(error);
            } else {
                if (response.statusCode != 200) {
                    reject(error);
                    msg.reply(':no_entry: **Сначала зарегестрируйте свой аккаунт(Ник должен быть как в PUBG)**');
                    db.set(`${id}.stats.fpp-adr`, 0)
                    db.set(`${id}.stats.fpp-kd`, 0)
                    db.set(`${id}.stats.faceit-adr`, 0)
                    db.set(`${id}.stats.faceit-kd`, 0)
                    db.set(`${id}.stats.faceit-lvl`, 0)
                    db.set(`${id}.stats.gll-adr`, 0)
                    db.set(`${id}.stats.gll-kd`, 0)
                    console.log(db.get(id))
                } else {
                    resolve(body)
                }

            }
        })
    })
}

function getSeason(msg) { //request for pubg current Season
    console.log(1)
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: `https://api.pubg.com/shards/steam/seasons`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwY2ZlY2QyMC02NmMwLTAxMzctMjZhOS02YjhlZWYxYjg5MTEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTU5NDA5ODc1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InRvcC1wdWJnLXJlYm9yIn0.T9emREb2lj6I_5AV_r0Acj_k5hrYaKoHA_LRKTaBivk',
                'Accept': 'application/vnd.api+json'
            }
        }
        request(options, (error, response, body) => { //getting last pubg season name
            if (!response) {} else {
                if (response.statusCode != 200) {
                    msg.reply('Error with getting seasons', error)
                } else {
                    parsed = JSON.parse(body)
                    resolve(parsed.data[parsed.data.length - 1].id)
                }
            }
        })
    })
}


function pubgStats(season, id) {
    console.log(1)
    return new Promise((resolve, reject) => {
        season.then(function (season) {
            id.then(function (id) {
                ids = JSON.parse(id)
                ids = ids.data[0].id
                console.log(ids)
                options = {
                    method: 'GET',
                    url: `https://api.pubg.com/shards/steam/players/${ids}/seasons/${season}`,
                    headers: {
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwY2ZlY2QyMC02NmMwLTAxMzctMjZhOS02YjhlZWYxYjg5MTEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTU5NDA5ODc1LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InRvcC1wdWJnLXJlYm9yIn0.T9emREb2lj6I_5AV_r0Acj_k5hrYaKoHA_LRKTaBivk',
                        'Accept': 'application/vnd.api+json'
                    }
                }
                request(options, (error, response, body) => {
                    if (!response) {
                        reject(error);
                    } else {
                        if (response.statusCode != 200) {
                            reject(error);
                        } else {
                            resolve(body)
                        }
                    }
                })

            })
        })
    })
}



function requ(url, nick, msg) {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: url + `${nick}`,
            headers: {
                'Authorization': `Bearer 29b9451a-23e3-4e9b-9852-246e78a7df99`
            }
        }
        request(options, (error, response, body) => {
            if (!response) {} else {
                if (response.statusCode != 200) {
                    ;
                    resolve(body)
                } else {
                    resolve(body)
                }
            }
        })


    })
}






function reasonfunc(tempreason) {
    finalreason = '';
    for (i = 3; i <= tempreason.length - 1; i++) {
        if (finalreason == '') {
            finalreason = tempreason[i];
        } else {
            finalreason = finalreason + ' ' + tempreason[i];
        }

    }
    return finalreason
}

function reasonBan(tempreason) {
    finalreason = '';
    for (i = 3; i <= tempreason.length - 1; i++) {
        if (finalreason == '') {
            finalreason = tempreason[i];
        } else {
            finalreason = finalreason + ' ' + tempreason[i];
        }

    }
    return finalreason
}

function reasonReport(tempreason) {
    finalreason = '';
    for (i = 2; i <= tempreason.length - 1; i++) {
        if (finalreason == '') {
            finalreason = tempreason[i];
        } else {
            finalreason = finalreason + ' ' + tempreason[i];
        }

    }
    return finalreason
}

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
};
client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id)
    channel.fetchMessage(data.message_id).then(message => {
        if (channel.id === '595300996092264468') {

            let msg_work = message.content.substring(15, 45)
            let openParenthesisIndex = msg_work.indexOf('(');
            console.log(openParenthesisIndex)
            let closedParenthesisIndex = msg_work.indexOf(')', openParenthesisIndex);
            console.log(closedParenthesisIndex)
            let result_circle = msg_work.substring(openParenthesisIndex, closedParenthesisIndex + 1);
            console.log(result_circle)
            result_circle = result_circle.replace(/[^0-9]/g, "");
            console.log(result_circle)
            if (data.emoji.name == '👍') {


                console.log(result_circle)
                message.edit(`${message.content} :white_check_mark: ${user} ${data.emoji.name}`)
                let embed = new Discord.RichEmbed()
                    .setDescription(`Спасибо за обращение, к нарушителю приняты меры. \n Благодарим вас за бдительность!`)
                    .setFooter('С уважением, администрация TOP PUBG REBORN.')
                    .setColor(0x00ff00)
                client.users.get(result_circle).send(embed);

            }


            if (data.emoji.name === '👌') {
                message.edit(`${message.content} :white_check_mark: ${user} ${data.emoji.name}`)
                let embed = new Discord.RichEmbed()
                    .setDescription(`Спасибо за предоставленную информацию! \n При повторных нарушениях пользователь будет наказан.`)
                    .setFooter('С уважением, администрация TOP PUBG REBORN.')
                    .setColor(0xadd8e6)
                client.users.get(result_circle).send(embed);
            }


            if (data.emoji.name === '👎') {
                message.edit(`${message.content} :white_check_mark: ${user} ${data.emoji.name}`)
                let embed = new Discord.RichEmbed()
                    .setDescription(`К сожалению, ваш репорт был отклонён. \n Скорее всего, ваши доказательства были неубедительными.`)
                    .setFooter('С уважением, администрация TOP PUBG REBORN.')
                    .setColor(0xffa500)
                client.users.get(result_circle).send(embed);

            }


            if (data.emoji.name === '💯') {
                message.edit(`${mmessage.content} :white_check_mark: ${user} ${data.emoji.name}`)
                let channel = client.channels.find(x => x.id === '584623070954913809')
                // message_emoji = channel.fetchMessage(result_square)
                // message_emoji.then(function (msg) {
                //     msg.react('☑')
                // })
            }
        }
    });
})

client.on('message', msg => {
    if (msg.channel.type == 'dm') {} else {
        let staff = msg.guild.roles.find(x => x.id === '595300217495093258');
        if (msg.channel.id == "595223608159240192") {
            if (msg.content.startsWith('!cm')) {
                if (msg.member.roles.has(staff.id)) {
                    let member_mute = msg.mentions.members.first();
                    let mute = msg.guild.roles.find(x => x.id === '595307187165986817');
                    let tempreason = msg.content.split(" ");
                    let time = parseInt(tempreason[1]);
                    var d = new Date();
                    d.setHours(d.getHours() + time);
                    let reason = reasonfunc(tempreason);
                    member_mute.addRole(mute).then((member_mute) => {
                        let embed = new Discord.RichEmbed()
                            .addField(':raised_hand: Чат Мут!', member_mute + ' ' + 'был отправлен в мут на ' + time + ' часов.' + '\n' + '\n' + 'by ' + msg.member + ': ' + reason)
                            .setColor(0xffa500)
                            .setTimestamp(d)
                            .setFooter('Был отправлен в мут в', msg.member.user.avatarURL)
                            .setThumbnail('https://images-ext-2.discordapp.net/external/vprLEczjpqGzAM6lhN1QZoAa3egLzrt92YXGF13ucDE/https/i.imgur.com/wEvM3In.png')
                        msg.channel.send(embed);
                        msg.delete(100)
                        setTimeout(() => {
                            member_mute.removeRole(mute)
                        }, time * 3600 * 1000);
                    })

                }
            }
            if (msg.content.startsWith('!b')) {
                if (msg.member.roles.has(staff.id)) {
                    if (!msg.mentions.members.first()){
                        msg.reply('`Пожалуйста, укажите пользователя`').then(mssg => {
                            mssg.delete(10 * 1000)
                        })
                        .catch()
                    }else if(isNaN(parseInt(msg.content.split(" ")[1]))){
                        msg.reply('`Пожалуйста, укажите время бана`').then(mssg => {
                            mssg.delete(10 * 1000)
                        })
                        .catch()
                    }else if(reasonBan(msg.content.split(" ")) === ''){
                        msg.reply('`Пожалуйста, укажите причину бана`').then(mssg => {
                            mssg.delete(10 * 1000)
                        })
                        .catch()
                    }else{
                    let member_ban = msg.mentions.members.first();
                    let ban = msg.guild.roles.find(x => x.id === '595307279532687370');
                    let tempreason = msg.content.split(" ");
                    let time = parseInt(tempreason[1]);
                    var d = new Date();
                    d.setHours(d.getHours() + time);
                    if (time == 999) {
                        let reason = reasonBan(tempreason);
                        //let ban_user = msg.guild.member(user);
                        member_ban.ban({
                            'days': 7,
                            'reason': reason
                        }).then((member_ban) => {
                            let embed = new Discord.RichEmbed()
                                .addField(':no_entry: Забанен!', member_ban + ' ' + 'был забанен навсегда.' + '\n' + '\n' + 'by ' + msg.member + ': ' + reason)
                                .setColor(0xff0000)
                                .setTimestamp()
                                .setFooter('Разбанен не будет', msg.member.user.avatarURL)
                                .setThumbnail('https://images-ext-1.discordapp.net/external/LV6aSJpuIhnOJeZAH15gM_8eBg8Zyb7av6B4X134ugo/https/i.imgur.com/VpzbDx0.png')
                            msg.channel.send(embed);

                        })
                    } else if (time <= 998) {
                        let reason = reasonfunc(tempreason);
                        member_ban.addRole(ban).then((member_ban) => {
                            let embed = new Discord.RichEmbed()

                                .addField(':no_entry: Забанен!', member_ban + ' ' + 'был забанен на ' + time + ' часов.' + '\n' + '\n' + 'by ' + msg.member + ': ' + reason)
                                .setColor(0xff0000)
                                .setTimestamp(d)
                                .setFooter('Будет разбанен в ', msg.member.user.avatarURL)
                                .setThumbnail('https://images-ext-1.discordapp.net/external/LV6aSJpuIhnOJeZAH15gM_8eBg8Zyb7av6B4X134ugo/https/i.imgur.com/VpzbDx0.png')
                            msg.channel.send(embed);
                            setTimeout(() => {
                                member_ban.removeRole(ban)
                            }, time * 3600 * 1000);
                            msg.delete(100);
                        })
                    }
                }
                }
            }

            if (msg.content.toLowerCase().startsWith('!report')) {
                let user = msg.mentions.members.first();
                if (!user) {
                    msg.reply(':rage: Пожалуйста, уточните человека на которого вы хотите пожаловаться. ')
                } else {
                    let tempreason = msg.content.split(" ");
                    let why = reasonReport(tempreason);
                    if (!why) {
                        msg.reply(':pencil: Пожалуйста, уточните причину репорта.')
                    } else {
                        let channel = msg.guild.channels.find(x => x.id === '595300996092264468')
                        channel.send(`@here \`Жалоба\`:<@!${msg.member.user.id}> id(${msg.member.user.id}) **жалуется на игрока **<@!${user.id}> **причина:** \` ${why}\` `)
                        msg.react('📨');
                    }
                }

            }
        } else if (msg.channel.id == '595222881227767809') {

            if (msg.content.startsWith('!reg')) {
                let newNick = msg.content.replace('!reg ', '')
                if (newNick == '!reg') {
                    msg.reply('Ведите никнейм')
                } else {
                    id = msg.member.user.id
                    db.set(`${msg.member.user.id}`, {
                        nickname: newNick,
                        stats: {}
                    })
                    db.set(`${id}.stats.fpp-adr`, 0)
                    db.set(`${id}.stats.fpp-kd`, 0)
                    db.set(`${id}.stats.tpp-adr`, 0)
                    db.set(`${id}.stats.tpp-kd`, 0)
                    db.set(`${id}.stats.faceit-adr`, 0)
                    db.set(`${id}.stats.faceit-kd`, 0)
                    db.set(`${id}.stats.faceit-lvl`, 0)
                    console.log(db.get(`${msg.member.user.id}`))
                    id = db.get(`${msg.member.user.id}`)
                    let channel = msg.guild.channels.find(x => x.id === '595222881227767809');
                    let embed = new Discord.RichEmbed()
                        .setColor(0x808080)
                        .setDescription(`Вы успешо поменяли свой никнейм на **${newNick}**`)
                        .setTimestamp()
                        .setFooter(msg.member.user.username, msg.member.user.avatarURL)
                    channel.send(embed)
                    
                    // channel = msg.guild.channels.find(x => x.id === '584008794632093715');
                    // channel.send(`**:pencil:**  <@!${msg.member.user.id}>  ** поменял в базе данных ник на -> ** ${newNick} `)
                }
                };

            if (msg.content.startsWith('!update')) {
                let stats_embed = new Discord.RichEmbed() // creating ebed for stats
                stats_embed.setThumbnail('https://images-ext-1.discordapp.net/external/dXYiOKMMbC1T0E7lRMz8pt_vRMhF283w83PuQXsuJ0I/https/i.imgur.com/WA6dLq4.gif') // adding thumbnail image to embed
                console.log
                id = msg.member.user.id
                let nick = db.get(`${msg.member.user.id}.nickname`);
                console.log(nick)



                let roles_adr_tpp = ['TPP ADR 100+', 'TPP ADR 150+', 'TPP ADR 200+', 'TPP ADR 250+', 'TPP ADR 350+', 'TPP ADR 400+', 'TPP ADR 450+', 'TPP ADR 500++']; //roles for level pubg
                let number_adr_tpp = [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]; //number of level for getting role   pubg
                // let roles_kd_tpp = ['TPP KD 1.0+', 'TPP KD 1.5+', 'TPP KD 2.0+', 'TPP KD 2.5+', 'TPP KD 3.0+', 'TPP KD 3.5+', 'TPP KD 4.0+', 'TPP KD 4.5+', 'TPP KD 5.0++'] //roles for kills   pubg
                // let number_kd_tpp = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 50]; //number of kills to get each role pubg
                // //finishing tpp roles

                let roles_adr_fpp = ['FPP ADR 100+', 'FPP ADR 150+', 'FPP ADR 200+', 'FPP ADR 250+', 'FPP ADR 350+', 'FPP ADR 400+', 'FPP ADR 450+', 'FPP ADR 500++']; //roles for level pubg
                let number_adr_fpp = [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]; //number of level for getting role   pubg
                // let roles_kd_fpp = ['FPP KD 1.0+', 'FPP KD 1.5+', 'FPP KD 2.0+', 'FPP KD 2.5+', 'FPP KD 3.0+', 'FPP KD 3.5+', 'FPP KD 4.0+', 'FPP KD 4.5+', 'FPP KD 5.0++'] //roles for kills   pubg
                // let number_kd_fpp = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 50]; //number of kills to get each role pubg

                // //finishing pubg roles

                let roles_adr_faceit = ['Faceit ADR 100+', 'Faceit ADR 150+', 'Faceit ADR 200+', 'Faceit ADR 250+', 'Faceit ADR 350+', 'Faceit ADR 400+', 'Faceit ADR 450+', 'Faceit ADR 500++']; //roles for level faceit
                let number_adr_faceit = [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]; //number of level for getting role   Faceit
                // let roles_kd_faceit = ['Faceit KD 1.0+', 'Faceit KD 1.5+', 'Faceit KD 2.0+', 'Faceit KD 2.5+', 'Faceit KD 3.0+', 'Faceit KD 3.5+', 'Faceit KD 4.0+', 'Faceit KD 4.5+', 'Faceit KD 5.0++'] //roles for kills Faceit
                // let number_kd_faceit = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 50]; //number of kills to get each role Faceit

                // //finishing faceit roles

                for (i = 0; i <= roles_adr_tpp.length - 1; i++) {
                    let level = msg.guild.roles.find(x => x.name === roles_adr_tpp[i])
                    if (msg.member.roles.some(role => role.name === level)) {} else {
                        msg.member.removeRole(level)
                    }
                }
                // for (i = 0; i <= roles_kd_tpp.length - 1; i++) {
                //     let kills = msg.guild.roles.find(x => x.name === roles_kd_tpp[i])
                //     if (msg.member.roles.some(role => role.name === kills)) {} else {
                //         msg.member.removeRole(kills)
                //     }
                // }
                //  finish deliting gll roles
                for (i = 0; i <= roles_adr_fpp.length - 1; i++) {
                    let level = msg.guild.roles.find(x => x.name === roles_adr_fpp[i])
                    if (msg.member.roles.some(role => role.name === level)) {} else {
                        msg.member.removeRole(level)
                    }
                }
                // for (i = 0; i <= roles_kd_fpp.length - 1; i++) {
                //     let kills = msg.guild.roles.find(x => x.name === roles_kd_fpp[i])
                //     if (msg.member.roles.some(role => role.name === kills)) {} else {
                //         msg.member.removeRole(kills)
                //     }
                // }
                //  finish deliting pubg roles
                for (i = 0; i <= roles_adr_faceit.length - 1; i++) {
                    let level = msg.guild.roles.find(x => x.name === roles_adr_faceit[i])
                    if (msg.member.roles.some(role => role.name === level)) {} else {
                        msg.member.removeRole(level)
                    }
                }
                // for (i = 0; i <= roles_kd_faceit.length - 1; i++) {
                //     let kills = msg.guild.roles.find(x => x.name === roles_kd_faceit[i])
                //     if (msg.member.roles.some(role => role.name === kills)) {} else {
                //         msg.member.removeRole(kills)
                //     }
                // }
                //  finish deliting faceit roles
                let channel = msg.guild.channels.find(x => x.id === '595222881227767809') //finding the stats channel
                let command = pubgStats(getSeason(msg), getPlayerId(`https://api.pubg.com/shards/steam/players?filter[playerNames]=`, msg, nick))
                command.then(function (result) {
                    parsed = JSON.parse(result)
                    if (!parsed.error) { //verifying if api returns no error
                        if (msg.member.roles.find(r => r.id === "584008445355622401")) {
                            msg.member.removeRole(msg.guild.roles.find(x => x.id === '584008445355622401'))
                        }
                        stats_embed.setDescription(`${msg.guild.emojis.get('595325272564432914')}Пользователь: <@!${msg.member.user.id}>`)

                        console.log(parsed.data.attributes.gameModeStats)

                        if(parsed.data.attributes.gameModeStats['duo-fpp'].roundsPlayed <= parsed.data.attributes.gameModeStats['squad-fpp'].roundsPlayed) { //making decision what game mode user plays more
                            mode = parsed.data.attributes.gameModeStats['squad-fpp'] //mode assigning squad
                            text = `${msg.guild.emojis.get('595325259318558741')} SquadFPP` //cusmtomizing for field title text
                            atrRole = `591396518083297323`

                        } else {
                            mode = parsed.data.attributes.gameModeStats['duo-fpp'];
                            text = `${msg.guild.emojis.get('595325259318558741')} DuoFPP`
                            atrRole = `591396518657785856`
                        }
                        console.log((mode.damageDealt === 0) || (mode.roundsPlayed === 0) || (mode.kills === 0))
                        if((mode.damageDealt === 0) || (mode.roundsPlayed === 0) || (mode.kills === 0)){}else{
                        stats_embed.addField(`${text}`, `**Nickname**: [${nick}](https://pubg.op.gg/user/${nick}) \n${msg.guild.emojis.get('595325225168797696')} **ELO:** ${Math.floor(mode.rankPoints)} \n ${msg.guild.emojis.get('595325240968740885')} **K/D:** ${roundNumber(mode.kills/mode.roundsPlayed)} \n ${msg.guild.emojis.get('595325214221533232')} **ADR:** ${roundNumber(mode.damageDealt/mode.roundsPlayed)} \n ${msg.guild.emojis.get('595325251370352671')} **Matches:** ${mode.roundsPlayed}`, true);

                        
                        if (roundNumber(mode.damageDealt / mode.roundsPlayed) < 10) {} else { //for that attribuites role based on players avg
                            for (i = 0; i <= number_adr_fpp.length - 1; i++) {
                                if ((number_adr_fpp[i] <= roundNumber(mode.damageDealt / mode.roundsPlayed)) && (roundNumber(mode.damageDealt / mode.roundsPlayed) < number_adr_fpp[i + 1])) {
                                    let lvl = msg.guild.roles.find(x => x.name === roles_adr_fpp[i]);
                                    msg.member.addRole(lvl)
                                }
                            }

                        }




                        if(roundNumber(mode.damageDealt / mode.roundsPlayed))
                        db.set(`${id}.stats.fpp-adr`, roundNumber(mode.damageDealt / mode.roundsPlayed))
                        db.set(`${id}.stats.fpp-kd`, roundNumber(mode.kills / mode.roundsPlayed))
                        
                    }
                    
                    if(parsed.data.attributes.gameModeStats['duo'].roundsPlayed <= parsed.data.attributes.gameModeStats['squad'].roundsPlayed) { //making decision what game mode user plays more
                        mode = parsed.data.attributes.gameModeStats['squad'] //mode assigning squad
                        text = `${msg.guild.emojis.get('595325259318558741')} SquadTPP` //cusmtomizing for field title text
                        atrRole = `591396518083297323`

                    } else {
                        mode = parsed.data.attributes.gameModeStats['duo'];
                        text = `${msg.guild.emojis.get('595325259318558741')} DuoTPP`
                        atrRole = `591396518657785856`
                    }
                    console.log((mode.damageDealt === 0) || (mode.roundsPlayed === 0) || (mode.kills === 0))
                    if((mode.damageDealt === 0) || (mode.roundsPlayed === 0) || (mode.kills === 0)){}else{
                    stats_embed.addField(`${text}`, `**Nickname**: [${nick}](https://pubg.op.gg/user/${nick}) \n${msg.guild.emojis.get('595325225168797696')} **ELO:** ${Math.floor(mode.rankPoints)} \n ${msg.guild.emojis.get('595325240968740885')} **K/D:** ${roundNumber(mode.kills/mode.roundsPlayed)} \n ${msg.guild.emojis.get('595325214221533232')} **ADR:** ${roundNumber(mode.damageDealt/mode.roundsPlayed)} \n ${msg.guild.emojis.get('595325251370352671')} **Matches:** ${mode.roundsPlayed}`, true);


                    if (roundNumber(mode.damageDealt / mode.roundsPlayed) < 10) {} else { //for that attribuites role based on players avg
                        for (i = 0; i <= number_adr_tpp.length - 1; i++) {
                            if ((number_adr_tpp[i] <= roundNumber(mode.damageDealt / mode.roundsPlayed)) && (roundNumber(mode.damageDealt / mode.roundsPlayed) < number_adr_tpp[i + 1])) {
                                let lvl = msg.guild.roles.find(x => x.name === roles_adr_tpp[i]);
                                msg.member.addRole(lvl)
                            }
                        }

                    }




                    if(roundNumber(mode.damageDealt / mode.roundsPlayed))
                    db.set(`${id}.stats.tpp-adr`, roundNumber(mode.damageDealt / mode.roundsPlayed))
                    db.set(`${id}.stats.tpp-kd`, roundNumber(mode.kills / mode.roundsPlayed))
                    
                    
                }
                    command = requ_id_faceit(getPlayerId(`https://api.pubg.com/shards/steam/players?filter[playerNames]=`, msg, nick))
                    console.log(command)
                        command.then(function (result) {
                            parsed = JSON.parse(result)
                            
                            if(!parsed.errors){
                                
                            console.log(parsed)
                            stats = requ_stats_faceit(parsed)
                            stats.then(function (stats) {
                               
                                elo = parsed.games.pubg.faceit_elo
                                stats = JSON.parse(stats)
                                if(!stats.errors){
                                console.log(stats)
                                url = parsed.faceit_url.replace('{lang}', 'en')
                                console.log(url)
                                stats_embed.addField(`${msg.guild.emojis.get('595325233997807617')}FACEIT`, `**Nickname**: [${parsed.nickname}](${url}) \n**Rank:** ${parsed.games.pubg.skill_level} lvl \n ${msg.guild.emojis.get('595325225168797696')} **ELO:** ${elo} \n ${msg.guild.emojis.get('595325240968740885')} **K/D:** ${stats.lifetime['K/D Ratio']} \n ${msg.guild.emojis.get('595325214221533232')} **ADR:** ${stats.lifetime['Average Damage Dealt']} \n ${msg.guild.emojis.get('595325265786306594')} **AVG Rank:** ${stats.lifetime['Average Placement']} [${stats.lifetime['Total Matches']}]`, true);
                                if (msg.member.roles.find(r => r.id === "584008445355622401")) {
                                    msg.member.removeRole(msg.guild.roles.find(x => x.id === '584008445355622401'))
                                }
                                if (stats.lifetime['Average Damage Dealt'] < 10) {} else { //for that attribuites role based on players avg
                                    for (i = 0; i <= number_adr_faceit.length - 1; i++) {
                                        if ((number_adr_faceit[i] <= stats.lifetime['Average Damage Dealt']) && (stats.lifetime['Average Damage Dealt'] < number_adr_faceit[i + 1])) {
                                            let lvl = msg.guild.roles.find(x => x.name === roles_adr_faceit[i]);
                                            msg.member.addRole(lvl)
                                        }
                                    }

                                }
                                db.set(`${id}.stats.faceit-adr`, stats.lifetime['Average Damage Dealt'])
                                db.set(`${id}.stats.faceit-kd`, stats.lifetime['K/D Ratio'])
                                db.set(`${id}.stats.faceit-lvl`, parsed.games.pubg.skill_level)
                                channel.send(stats_embed);
                            }else{
                                db.set(`${id}.stats.faceit-adr`, 0)
                                db.set(`${id}.stats.faceit-kd`, 0)
                                db.set(`${id}.stats.faceit-lvl`, 0)
                                channel.send(stats_embed);
                                console.log(db.get(id))
                            }
                            })
                        }else{
                            db.set(`${id}.stats.faceit-adr`, 0)
                            db.set(`${id}.stats.faceit-kd`, 0)
                            db.set(`${id}.stats.faceit-lvl`, 0)
                            channel.send(stats_embed);
                            console.log(db.get(id))
                        }
                        })
                    } else {
                        db.set(`${id}.stats.fpp-adr`, 0)
                        db.set(`${id}.stats.fpp-kd`, 0)
                        db.set(`${id}.stats.tpp-adr`, 0)
                        db.set(`${id}.stats.tpp-kd`, 0)
                        db.set(`${id}.stats.faceit-adr`, 0)
                        db.set(`${id}.stats.faceit-kd`, 0)
                        db.set(`${id}.stats.faceit-lvl`, 0)
                        console.log(db.get(id))
                        msg.reply(`:warning:`)
                    }
                })

            }
        }else if(msg.channel.id == '593138626439938078'){

        }
    }
});

