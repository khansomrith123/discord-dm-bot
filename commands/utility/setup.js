const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('កំណត់រចនាសម្ព័ន្ធ bot សម្រាប់សឺវើរ (Setup bot configuration)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('បង្ហាញព័ត៌មានការកំណត់រចនាសម្ព័ន្ធ'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('បើក/បិទសារស្វាគមន៍ផ្ទាល់ខ្លួន (Toggle welcome DM)')
                .addBooleanOption(option =>
                    option.setName('enabled')
                        .setDescription('បើក (true) ឬបិទ (false)')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('leave')
                .setDescription('បើក/បិទសារចាកចេញផ្ទាល់ខ្លួន (Toggle leave DM)')
                .addBooleanOption(option =>
                    option.setName('enabled')
                        .setDescription('បើក (true) ឬបិទ (false)')
                        .setRequired(true))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        // ទាញយក Guild Settings (នៅក្នុងករណីពិតប្រាកដ អ្នកគួររក្សាទុកនៅក្នុង Database)
        // នៅទីនេះយើងប្រើ Map សាមញ្ញសម្រាប់ឧទាហរណ៍
        if (!global.guildSettings) global.guildSettings = new Map();
        
        const guildId = interaction.guild.id;
        if (!global.guildSettings.has(guildId)) {
            global.guildSettings.set(guildId, {
                welcomeDM: true,
                leaveDM: true
            });
        }

        const settings = global.guildSettings.get(guildId);

        switch (subcommand) {
            case 'info': {
                const embed = new EmbedBuilder()
                    .setTitle('⚙️ ការកំណត់រចនាសម្ព័ន្ធ Bot')
                    .setDescription(`ការកំណត់សម្រាប់សឺវើរ **${interaction.guild.name}**`)
                    .addFields(
                        { 
                            name: '📩 សារស្វាគមន៍ (Welcome DM)', 
                            value: settings.welcomeDM ? '🟢 បើក' : '🔴 បិទ',
                            inline: true 
                        },
                        { 
                            name: '🚪 សារចាកចេញ (Leave DM)', 
                            value: settings.leaveDM ? '🟢 បើក' : '🔴 បិទ',
                            inline: true 
                        },
                        {
                            name: '📝 ព័ត៌មានផ្សេងទៀត',
                            value: `**សឺវើរ ID:** ${guildId}\n**ចំនួនសមាជិក:** ${interaction.guild.memberCount}`,
                            inline: false
                        }
                    )
                    .setColor(0x0099ff)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            }

            case 'welcome': {
                const enabled = interaction.options.getBoolean('enabled');
                settings.welcomeDM = enabled;
                global.guildSettings.set(guildId, settings);

                const embed = new EmbedBuilder()
                    .setTitle('✅ បានធ្វើបច្ចុប្បន្នភាព')
                    .setDescription(`សារស្វាគមន៍ផ្ទាល់ខ្លួនត្រូវបាន **${enabled ? 'បើក' : 'បិទ'}**`)
                    .setColor(enabled ? 0x00ff00 : 0xff0000)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            }

            case 'leave': {
                const enabled = interaction.options.getBoolean('enabled');
                settings.leaveDM = enabled;
                global.guildSettings.set(guildId, settings);

                const embed = new EmbedBuilder()
                    .setTitle('✅ បានធ្វើបច្ចុប្បន្នភាព')
                    .setDescription(`សារចាកចេញផ្ទាល់ខ្លួនត្រូវបាន **${enabled ? 'បើក' : 'បិទ'}**`)
                    .setColor(enabled ? 0x00ff00 : 0xff0000)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            }
        }
    },
};