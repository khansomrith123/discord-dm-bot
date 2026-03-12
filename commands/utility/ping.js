const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ពិនិត្យល្បឿននៃ bot (Check bot latency)'),

    async execute(interaction) {
        const sent = await interaction.deferReply({ fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setDescription('ព័ត៌មានអំពីល្បឿន Bot')
            .addFields(
                { name: '⏱️ ពេលវេលា Roundtrip', value: `${latency}ms`, inline: true },
                { name: '💓 API Heartbeat', value: `${apiLatency}ms`, inline: true },
                { name: '📊 ស្ថានភាព', value: latency < 100 ? '🟢 ល្អណាស់' : latency < 200 ? '🟡 ធម្មតា' : '🔴 យឺត', inline: true }
            )
            .setColor(latency < 100 ? 0x00ff00 : latency < 200 ? 0xffa500 : 0xff0000)
            .setTimestamp()
            .setFooter({ text: `ស្នើសុំដោយ ${interaction.user.tag}` });

        await interaction.editReply({ embeds: [embed] });
    },
};