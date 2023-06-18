const http = require('http');
http.createServer(function (req, res) {
  res.write("online");
  res.end();
}).listen(8080);

const {
  EmbedBuilder,
  ButtonInteractionType,
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  MessageActionRow,
} = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
});

// ポイントを保存するファイルのパス
const pointsFilePath = './points.json';

// ポイントデータを読み込む関数
function loadPoints() {
  try {
    const data = fs.readFileSync(pointsFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load points:', error);
    return {};
  }
}

// ポイントデータを保存する関数
function savePoints(points) {
  try {
    fs.writeFileSync(pointsFilePath, JSON.stringify(points));
    console.log('Points saved successfully.');
  } catch (error) {
    console.error('Failed to save points:', error);
  }
}

const itemsFolderPath = path.join(__dirname, 'data', 'items');

// アイテムを追加する関数
function addItem(userId, itemName) {
  const userFolderPath = path.join(itemsFolderPath, userId);

  // ユーザーのフォルダが存在しない場合は作成する
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath);
  }

  const itemFilePath = path.join(userFolderPath, `${itemName}.txt`);

  // アイテムファイルを作成する
  fs.writeFileSync(itemFilePath, '');
  console.log('Item added successfully!');
}

// ユーザーのアイテム一覧を取得する関数
function getUserItems(userId) {
  const userFolderPath = path.join(itemsFolderPath, userId);

  // ユーザーのフォルダが存在しない場合は空の配列を返す
  if (!fs.existsSync(userFolderPath)) {
    return [];
  }

  const itemFileNames = fs.readdirSync(userFolderPath);
  const items = itemFileNames.map((fileName) => fileName.replace('.txt', ''));
  return items;
}

const bnr = new ButtonBuilder()
      .setCustomId('nr')
      .setLabel('NOXCOIN')
      .setStyle(ButtonStyle.Primary);

const bplay = new ButtonBuilder()
      .setCustomId('play')
      .setLabel('🕹️PLAYS')
      .setStyle(ButtonStyle.Danger);

const bjanken = new ButtonBuilder()
      .setCustomId('janken')
      .setLabel('👊JANKEN')
      .setStyle(ButtonStyle.Primary);

const brank = new ButtonBuilder()
      .setCustomId('rank')
      .setLabel('👑RANKING')
      .setStyle(ButtonStyle.Primary);

const bitem = new ButtonBuilder()
      .setCustomId('item')
      .setLabel('🧸ITEMS')
      .setStyle(ButtonStyle.Primary);

const bscore = new ButtonBuilder()
      .setCustomId('score')
      .setLabel('📄SCORES')
      .setStyle(ButtonStyle.Primary);

const bhome = new ButtonBuilder()
      .setCustomId('home')
      .setLabel('🏠HOME')
      .setStyle(ButtonStyle.Success);

const bhelp = new ButtonBuilder()
      .setCustomId('help')
      .setLabel('🙋HELP')
      .setStyle(ButtonStyle.Secondary);

const blight = new ButtonBuilder()
      .setCustomId('alight')
      .setLabel('➡️')
      .setStyle(ButtonStyle.Secondary);

const bleft = new ButtonBuilder()
      .setCustomId('aleft')
      .setLabel('⬅️')
      .setStyle(ButtonStyle.Secondary);

const bair = new ButtonBuilder()
      .setCustomId('air')
      .setLabel('▫️')
      .setStyle(ButtonStyle.Secondary);

const bwho = new ButtonBuilder()
      .setCustomId('who')
      .setLabel('nova')
      .setStyle(ButtonStyle.Secondary);

const bping = new ButtonBuilder()
      .setCustomId('ping')
      .setLabel('📶PING')
      .setStyle(ButtonStyle.Secondary);

const bmember= new ButtonBuilder()
      .setCustomId('member')
      .setLabel('MEMBER')
      .setStyle(ButtonStyle.Secondary);

const bhb= new ButtonBuilder()
      .setCustomId('hb')
      .setLabel('BACK')
      .setStyle(ButtonStyle.Secondary);

const bsnc= new ButtonBuilder()
      .setCustomId('snc')
      .setLabel('NOXCOIN')
      .setStyle(ButtonStyle.Primary);

const bnoxsb = new ButtonBuilder()
      .setCustomId('noxsb')
      .setLabel('BACK')
      .setStyle(ButtonStyle.Secondary);

    const チョキ = new ButtonBuilder()
      .setCustomId('チョキ')
      .setLabel('チョキ✌️')
      .setStyle(ButtonStyle.Primary);

    const グー = new ButtonBuilder()
      .setCustomId('グー')
      .setLabel('グー✊')
      .setStyle(ButtonStyle.Primary);

    const パー = new ButtonBuilder()
      .setCustomId('パー')
      .setLabel('パー✋')
      .setStyle(ButtonStyle.Primary);

  const メニューj = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('continue')
      .setLabel('🔁CONTINUE')
      .setStyle(ButtonStyle.Secondary),
    bhome
  );

const ranks = new ActionRowBuilder().addComponents(bnr);

const noxscoreback = new ActionRowBuilder().addComponents(bnoxsb);

const pu2 = new ActionRowBuilder().addComponents(bleft, bhb, bwho, bhelp, blight);

const pu1 = new ActionRowBuilder().addComponents(bjanken);

const su = new ActionRowBuilder().addComponents(bhb, bsnc);

   const HB = new ActionRowBuilder().addComponents(bhb);

    const row = new ActionRowBuilder().addComponents(パー, チョキ, グー);

const mane = new ActionRowBuilder().addComponents(bplay, bscore, bitem, bhome);

const mane2 = new ActionRowBuilder().addComponents(brank);

const ma = new ActionRowBuilder().addComponents(bleft, bping, bwho, bhelp, blight);

const chatCount = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  registerSlashCommands();
});

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.systemChannel; // サーバーのシステムチャンネルを取得

  if (channel) {
    channel.send(`ようこそ, ${member}! 楽しんでいってね.`); // 入室メッセージを送信
  }
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.systemChannel; // サーバーのシステムチャンネルを取得

  if (channel) {
    channel.send(`${member}が逃げたんだが？？？？？？`); // 退室メッセージを送信
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // ボットのメッセージは無視

  const userId = message.author.id;

  // ユーザーのチャット回数をインクリメント
  chatCount[userId] = (chatCount[userId] || 0) + 1;

  // チャット回数が5の倍数になった場合、ポイントを増やす
  if (chatCount[userId] % 5 === 0) {
    incrementPoints(userId);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
   if (interaction.commandName === 'nova'){
    nova(interaction);
}
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return; // ボタンが押されたか確認

  
  // ボタンを押したユーザーのIDを取得
  const userId = interaction.user.id;
  const userName = interaction.user.username;

  if (interaction.customId === 'チョキ' || interaction.customId === 'グー' || interaction.customId === 'パー') {
    // ボタンのカスタムIDに応じてジャンケンの処理を行う
    handleJanken(interaction, interaction.customId, userId, userName);
  } else if (interaction.customId === 'continue') {
    
const row = new ActionRowBuilder().addComponents(パー, チョキ, グー);
    await interaction.deferUpdate();
    await interaction.editReply({
      content: `${userName}目と目があったな？`,
      components: [row,HB],
    });

  } else if (interaction.customId === 'ping'){
    ping(interaction);
  } else if (interaction.customId === 'home'){
     nova(interaction);
  } else if (interaction.customId === 'who'){
    who(interaction)
  } else if (interaction.customId === 'help'){
  help(interaction);
  } else if (interaction.customId === 'hb'){
  nova(interaction);
  } else if (interaction.customId === 'score'){
    score(interaction);
  } else if (interaction.customId === 'snc'){
    getUserPoints(interaction);
  } else if (interaction.customId === 'noxsb'){
    noxsb(interaction);
  } else if (interaction.customId === 'play'){
    pu(interaction);
  } else if (interaction.customId === 'janken'){
    readyj(interaction);
  } else if (interaction.customId === 'rank'){
    rankmemo(interaction);
  } else if (interaction.customId === 'nr'){
    showTopPoints(interaction);
  } else if (interaction.customId === 'alight'){
    showmane2(interaction);
  } else if (interaction.customId === 'aleft'){
    nova(interaction);
  }
});

async function readyj(interaction) {
  await deleteMyMessages(interaction);

     await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('目と目があったな')
        .setColor('#FF0000')
        .setDescription(`**ボタンを選択してバトル**`)
    ],
    components: [row,HB],
  })
}

async function handleJanken(interaction, selectedMove, userId, userName) {
  // ボットの選択（ランダムにじゃんけんの手を選ぶ）
  const moves = ['チョキ', 'グー', 'パー'];
  const botMove = moves[Math.floor(Math.random() * moves.length)];

  // 結果の判定
  let result;
  if (selectedMove === botMove) {
    result = `${userName}...引き分けです！`;
  } else if (
    (selectedMove === 'グー' && botMove === 'チョキ') ||
    (selectedMove === 'パー' && botMove === 'グー') ||
    (selectedMove === 'チョキ' && botMove === 'パー')
  ) {
    result = `${userName}の勝ちです！`;
    incrementPoints(userId);
  } else {
    result = `ボットの勝ち！${userName}の負け`;
  }

  // 結果を表示
  await interaction.deferReply(); // ボットの応答を一時停止

   await interaction.message.delete();
  // 結果を表示
  await interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setTitle('じゃんけんの結果')
        .setColor('#FF0000')
        .setDescription(`**あなたの選択: ${selectedMove}\nボットの選択: ${botMove}\n結果: ${result}**`)
    ],
    components: [メニューj],
  });
}

function incrementPoints(userId) {
  // ポイントデータを読み込む
  const points = loadPoints();

  // ユーザーのポイントをインクリメントする
  points[userId] = (points[userId] || 0) + 1;

  // ポイントデータを保存する
  savePoints(points);
}

// 以降のコードは変更なし


async function registerSlashCommands() {
  // 全てのサーバーにスラッシュコマンドを登録する
  const guilds = client.guilds.cache;
  guilds.forEach(async (guild) => {
    try {
      await guild.commands.set([
        {
          name: 'nova',
          description: 'ようこそ',
        },
      ]);
      console.log(`Registered slash commands in server: ${guild.name}`);
    } catch (error) {
      console.error(`Failed to register slash commands in server: ${guild.name}`, error);
    }
  });
}

async function showmane2(interaction) {
  await deleteMyMessages(interaction);
    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('Ncore')
        .setDescription(`**ようこそ**`)
        .setColor('#FF0000')
    ],
    components: [mane2, ma],
  });
}

async function nova(interaction) {
  await deleteMyMessages(interaction);
    await interaction.user.send({
    embeds: [
      new EmbedBuilder()
        .setTitle('Ncore')
        .setDescription(`**ようこそ**`)
        .setColor('#FF0000')
    ],
    components: [mane, ma],
  });
}

async function noxsb(interaction) {
  await deleteMyMessages(interaction);

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('SCORE')
        .setDescription(`**自分のスコアが見れます**`)
        .setColor('#FF0000')
    ],
    components: [su],
  });
}

async function rankmemo(interaction) {
  await deleteMyMessages(interaction);

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('RANKING')
        .setDescription(`**ランキングが見れます**`)
        .setColor('#FF0000')
    ],
    components: [ ranks, HB],
  });
}

async function getUserPoints(interaction) {
  await deleteMyMessages(interaction);
  // ポイントデータを読み込む
  const points = loadPoints();

  // ユーザーのIDを取得
  const userId = interaction.user.id;

  // ユーザーのポイントを取得
  const userPoints = points[userId] || 0;

  // ポイントを返信
    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('SCORE')
        .setDescription(`**現在のnoxcoin: ${userPoints}**`)
        .setColor('#FF0000')
    ],
    components: [noxscoreback],
  });
}
  
async function showTopPoints(interaction) {
  await deleteMyMessages(interaction);
  // ポイントデータを読み込む
  const points = loadPoints();

  // ポイントの上位5件を取得
  const topPoints = Object.entries(points)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // ユーザー名とポイント数を組み合わせて表示用のメッセージを作成
  const message = topPoints.map(([userId, points]) => {
    const user = client.users.cache.get(userId);
    const userName = user ? user.tag : 'Unknown User';
    return `${userName}さん ${points}noxpoint`;
  });

  // 応答を送信
  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('〜noxcoinTop5〜')
        .setDescription(`**👑 ${message.join('\n\n')}**`)
        .setColor('#FF0000')
    ],
    components: [HB],
  });
}

const { MessageEmbed } = require('discord.js');

async function help(interaction) {
  await deleteMyMessages(interaction);

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('help')
        .setDescription(`**どうもnovaです\n基本的な使い方\nこのbotではnoxcoinという通貨を持っていて\nユーザーが喋ったりじゃんけんで勝つとポイントが増える！\nポイントの確認はSCORESから見てね\nまたPLAYSでジャンケンができたり\nランキングの表示もできるよ\nまた入退出でも喋るよ**`)
        .setColor('#FF0000')
    ],
    components: [HB],
  });
}

async function deleteMyMessages(interaction) {
    await interaction.user.send('(・ω・｀)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n　　　　　　　　(・ω・｀)');

}


async function score(interaction) {
  await deleteMyMessages(interaction);

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('SCORE')
        .setDescription(`**自分のスコアが見れます**`)
        .setColor('#FF0000')
    ],
    components: [su],
  });
}

async function ping(interaction){
   await deleteMyMessages(interaction);
  
    const replyTime = Date.now() - interaction.createdTimestamp;

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('PING')
        .setDescription(`Ping: ${replyTime}ms`)
        .setColor('#FF0000')
    ],
    components: [HB],
  });
}

async function who(interaction){
   await deleteMyMessages(interaction);

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('人に物聞く態度がなってないな')
        .setDescription(`ボタンの長さ揃えるようなのにさ、なんで押したん？`)
        .setColor('#FF0000')
    ],
    components: [HB],
  });
}

async function pu(interaction){
   await deleteMyMessages(interaction);
  

    await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle('PLAY')
        .setDescription(`いろんなゲームができるよ`)
        .setColor('#FF0000')
    ],
    components: [pu1,pu2],
  });
}

client.on('messageCreate', async (message) => {
  if (message.author.bot && message.channel.type === 'DM') {
    try {
      await message.delete();
      console.log('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }
});

client.login(process.env.TOKEN);
