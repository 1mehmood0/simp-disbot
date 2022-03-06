require("dotenv").config();
const { Client,Intents, Message, Channel }=require("discord.js");
const PREFIX='$';

const bot=new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });
//console.log(process.env.BOT_TOKEN);
bot.once("ready",()=>{
    console.log("Bot is Ready now",bot.user.tag);
});


//message event
bot.on('messageCreate',async(msg)=>{
    try{
    if(msg.author.bot){
        return 
    }
    if(msg.content==="hi"){
     msg.reply("Ohaioooo");
    }
    else if(msg.content.startsWith(PREFIX))
    {
       const[CMD,...ARGS]= msg.content.trim().substring(PREFIX.length).split(" ");
       console.log(CMD,ARGS);
       if(CMD=='kick')
       {    
           const member=await  msg.guild.members.fetch(ARGS[0]);
           console.log(member,"<---this is member");
           const membExist=await msg.guild.members.cache.has(ARGS[0]);
           console.log(membExist)
           if(membExist)
            {
                msg.channel.send(`kicked ${ARGS[0]} ${member}`);
               await member.kick("its my rule")
            }
            else
            {
                await msg.channel.send(`The user ${ARGS[0]} does not exist`);
            }
       }
       else if(CMD=='ban')
        {
           msg.channel.send(`banned ${ARGS[0]}`)
        }
    }
    else
    {
        msg.reply("Enter the valid command");
    }
}catch(e){
    console.log(e);
}   //console.log(`[${msg.author.tag}]:${msg.content}`);
});

//On Adding new Members
bot.on("guildMemberAdd",(newbie)=>{
    console.log(newbie);
    Channel.send(`Welcome welcome welcum ${newbie.displayName}`);
})



bot.login(process.env.BOT_TOKEN);