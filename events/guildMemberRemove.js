const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        // ពិនិត្យការកំណត់
        if (global.guildSettings) {
            const settings = global.guildSettings.get(member.guild.id);
            if (settings && !settings.leaveDM) return;
        }

        try {
            // បង្កើត Embed ចាកចេញ
            const leaveData = config.leaveMessage(member);
            
            const embed = new EmbedBuilder()
                .setTitle(leaveData.title)
                .setDescription(leaveData.description)
                .addFields(leaveData.fields)
                .setColor(0xff0000)
                .setTimestamp()
                .setFooter({ text: leaveData.footer })
                .setThumbnail(member.guild.iconURL({ dynamic: true }) || null);

            // ផ្ញើ DM
            await member.send({ embeds: [embed] });
            
            console.log(`📤 បានផ្ញើសារចាកចេញទៅ ${member.user.tag}`);

        } catch (error) {
            console.error(`❌ មិនអាចផ្ញើ DM ទៅ ${member.user.tag}:`, error.message);
            // ប្រសិនបើ DM បរាជ័យ មិនធ្វើអ្វីទេ
        }
    },
};