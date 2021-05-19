const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const config = require('dotenv').config()
const prefix = '#';
let settings = { method: "Get" };
const regExp = /[a-zA-Z]/g;
var number;




client.on('message', message => {
    if (message.content.startsWith(`${prefix}`)) {

         number = message.content.slice( 1 );

        if (regExp.test(number)) {
            message.channel.send('not a valid VoxoDeus number');
        } else {

            if (number > 6313){
                message.channel.send('Only Voxos 1-6313 exist!')
            } else { 
                var voxosite = "https://api.voxodeus.io/api/voxodeus/" + number;

                fetch(voxosite, settings)
                .then(res => res.json())
                .then((json) => {

                    var archetype = json.attributes[0].value;
                    var faction = json.attributes[1].value;
                    var rarity = json.attributes[2].value;
                    var species = json.attributes[3].value;
                    var image = json.image;

                    var voxoEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('VoxoDeus #' + number)
                        .setURL('https://opensea.io/assets/0xafba8c6b3875868a90e5055e791213258a9fe7a7/' + number)
                        .addField('Species: ', '`' + species + '`')
                        .addField('Archetype: ', '`' + archetype + '`') 
                        .addField('Faction: ', '`' + faction + '`')
                        .addField('Rarity: ', '`' + rarity + '`')
                        .setImage(image)
                        .setFooter('VoxoDeus 2021', 'https://miro.medium.com/fit/c/262/262/1*SPs3dLsCpJir0leZ3yywhQ.jpeg')

                    message.channel.send(voxoEmbed);
                });
            }

        }

    }

});
client.login(process.env.BOT_TOKEN);
