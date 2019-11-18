const request = require('request');
const chalk = require('chalk');
const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'token';

bot.on('ready', () => {
    console.log('Ready');
});

bot.on('message', async (message) => {
    var MessageArgs = message.content.split(' ');
    MessageArgs.forEach((str) => {
        //dont bully over gay if statement cba to do it propperly
        if(str.includes('discord.gift/')) {
            var codeUntrimmed = message.content.split('discord.gift/').pop();
            var code = codeUntrimmed.substring(0, 24);
            request.post('https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem', {
                headers: {
                    'Authorization': token
                },
                json: true
            }, (err, resp) => {
                if(err) console.log(`[${chalk.bgBlack('INFO')}] - Error while sending HTTP request to activate nitro code, ${err}`);
                console.log(`[${chalk.bgBlack('INFO')}] - ${resp.body.message}`);
                if(resp.statusCode === 200 || resp.statusCode === 204 || resp.statusCode === 201) setTimeout(async() => await message.reply('OMG YES I GOT IT THANKS!'), 1000);
            });
        } else if(str.includes('discordapp.com/gifts/')) {
            var codeUntrimmed = message.content.split('discordapp.com/gifts/').pop();
            var code = codeUntrimmed.substring(0, 24);
            request.post('https://discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem', {
                headers: {
                    'Authorization': token
                },
                json: true
            }, (err, resp) => {
                if(err) console.log(`[${chalk.bgBlack('INFO')}] - Error while sending HTTP request to activate nitro code, ${err}`);
                console.log(`[${chalk.bgBlack('INFO')}] - ${resp.body.message}`);
                if(resp.statusCode === 200 || resp.statusCode === 204 || resp.statusCode === 201) setTimeout(async() => await message.reply('OMG YES I GOT IT THANKS!'), 1000);
            });
        }
    });
});

bot.login(token);
