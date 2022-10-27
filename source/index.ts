import {Sequelize} from 'sequelize';
import sequelizemaker from './database/database';
import fs from 'fs';
import {ButtonInteraction, Client, Interaction, Message, ModalSubmitInteraction} from 'discord.js';

require('dotenv').config({
    path: __dirname + "/.env",
})
console.log(process.env.MYSQL_PASS)
const sequelize: Sequelize = sequelizemaker("tokens", "localhost", "root", process.env.MYSQL_PASS as string);

fs.readdirSync(__dirname + "/database/models").forEach((filename, i, arr) => {
    const model = require(__dirname + "/database/models/" + filename.replace(".ts", ""));
    model(sequelize);
});

sequelize.sync();

const client = new Client({
    intents: ['Guilds', 'MessageContent', 'GuildMessages']
})

import commandHandler from './commands';
client.on('messageCreate', (msg: Message) => {
    commandHandler(msg, sequelize);
})

import buttonHandler from "./buyableCreator";
import modalHandler from "./modalHandler";
client.on('interactionCreate', async (int:Interaction) =>{
    let interaction:ButtonInteraction | ModalSubmitInteraction;
    if(int.isButton()){
       interaction = int as ButtonInteraction;
        buttonHandler(interaction, sequelize);
    }else if(int.isModalSubmit()){
        interaction = int as ModalSubmitInteraction;
        modalHandler(interaction);
    }

})
client.once('ready', client => {
    console.log("ready")
})

client.login(process.env.TOKEN).then(() => console.log("Im ready")).catch(err => console.log(err))