const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        // ពិនិត្យការកំណត់
        if (global.guildSettings) {
            const settings = global.guildSettings.get(member.guild.id);
            if (settings && !settings.welcomeDM) return;
        }

        try {
            // បង្កើត Embed ស្វាគមន៍
            const welcomeData = config.welcomeMessage(member);
            
            const embed = new EmbedBuilder()
                .setTitle(welcomeData.title)
                .setDescription(welcomeData.description)
                .addFields(welcomeData.fields)
                .setColor(0x00ff00)
                .setTimestamp()
                .setFooter({ text: welcomeData.footer })
                .setThumbnail(member.guild.iconURL({ dynamic: true }) || null);

            // ផ្ញើ DM
            await member.send({ embeds: [embed] });
            
            console.log(`✅ បានផ្ញើសារស្វាគមន៍ទៅ ${member.user.tag}`);

        } catch (error) {
            console.error(`❌ មិនអាចផ្ញើ DM ទៅ ${member.user.tag}:`, error.message);
            // ប្រសិនបើ DM បរាជ័យ (ឧ. អ្នកប្រើបិទ DM), យើងមិនធ្វើអ្វីទេ
        }
    },
};