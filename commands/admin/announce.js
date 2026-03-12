const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, RoleMention, UserMention } = require('discord.js');
const config = require('../../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('ប្រកាសសារសំខាន់ដល់សមាជិកមានតួនាទីជាក់លាក់ (Send announcement to specific roles)')
        .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone)
        .addStringOption(option =>
            option.setName('title')
                .setDescription('ចំណងជើងនៃប្រកាស')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('ខ្លឹមសារនៃប្រកាស')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('តួនាទីដែលត្រូវប្រកាស (បើមិនបញ្ជាក់ នឹងប្រកាសដល់គ្រប់គ្នា)')
                .setRequired(false))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('ឆានែលសម្រាប់ប្រកាស (default: ឆានែលបច្ចុប្បន្ន)')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('mention')
                .setDescription('តើត្រូវ mention តួនាទីឬទេ? (default: false)')
                .setRequired(false)),

    async execute(interaction) {
        const title = interaction.options.getString('title');
        const message = interaction.options.getString('message');
        const role = interaction.options.getRole('role');
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const shouldMention = interaction.options.getBoolean('mention') || false;

        // ពិនិត្យតួនាទីប្រកាស (Announcement Role)
        const announcementRoleId = process.env.ANNOUNCEMENT_ROLE_ID;
        const member = interaction.member;

        // ពិនិត្យថាតើអ្នកប្រើមានតួនាទីប្រកាសឬទេ (ឬមាន permission អភិបាល)
        const hasAnnouncementRole = announcementRoleId && member.roles.cache.has(announcementRoleId);
        const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);

        if (!hasAnnouncementRole && !isAdmin) {
            return await interaction.reply({
                content: '❌ អ្នកមិនមានសិទ្ធិប្រកាសសារទេ! ត្រូវការតួនាទីប្រកាស ឬការអនុញ្ញាតជាអភិបាល។',
                ephemeral: true
            });
        }

        try {
            // បង្កើត Embed
            const announceData = config.announcementMessage(
                interaction.user,
                title,
                message,
                role ? role.name : 'គ្រប់គ្នា'
            );

            const embed = new EmbedBuilder()
                .setTitle(announceData.title)
                .setDescription(announceData.description)
                .addFields(announceData.fields)
                .setColor(config.colors.warning)
                .setTimestamp()
                .setFooter({ text: announceData.footer });

            // ប្រកាសសារ
            const mentionText = shouldMention && role ? `${role}` : '';
            
            const sentMessage = await channel.send({
                content: mentionText,
                embeds: [embed],
                allowedMentions: { roles: shouldMention ? [role?.id] : [] }
            });

            // បញ្ជាក់ថាបានប្រកាសជោគជ័យ
            const confirmEmbed = new EmbedBuilder()
                .setTitle('✅ ប្រកាសជោគជ័យ!')
                .setDescription(`សារប្រកាសត្រូវបានផ្ញើទៅ ${channel}`)
                .addFields(
                    { name: '📋 ចំណងជើង', value: title, inline: true },
                    { name: '👥 សម្រាប់', value: role ? role.name : 'គ្រប់គ្នា', inline: true },
                    { name: '🔗 Link', value: `[ចុចទីនេះដើម្បីមើល](${sentMessage.url})`, inline: true }
                )
                .setColor(config.colors.success)
                .setTimestamp();

            await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });

        } catch (error) {
            console.error('Error sending announcement:', error);
            await interaction.reply({
                content: '❌ មានបញ្ហាក្នុងការប្រកាសសារ។ សូមពិនិត្យមើលថាខ្ញុំមានសិទ្ធិផ្ញើសារក្នុងឆានែលនោះ។',
                ephemeral: true
            });
        }
    },
};