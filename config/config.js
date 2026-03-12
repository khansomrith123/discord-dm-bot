// ការកំណត់រចនាសម្ព័ន្ធ Bot
module.exports = {
    // ពណ៌សម្រាប់ Embed Messages
    colors: {
        primary: 0x0099ff,    // ពណ៌ខៀវ
        success: 0x00ff00,    // ពណ៌បៃតង
        warning: 0xffa500,    // ពណ៌ទឹកក្រូច
        error: 0xff0000,      // ពណ៌ក្រហម
        info: 0x9b59b6        // ពណ៌ស្វាយ
    },
    
    // សារស្វាគមន៍ជាភាសាខ្មែរ
    welcomeMessage: (member) => ({
        title: "សូមស្វាគមន៍មកកាន់សឺវើររបស់យើង! 🎉",
        description: `សួស្តី **${member.user.username}**! សូមស្វាគមន៍មកកាន់ **${member.guild.name}**។\n\nយើងរីករាយណាស់ដែលអ្នកបានចូលរួមជាមួយយើង!`,
        fields: [
            {
                name: "📋 ព័ត៌មានអំពីអ្នក",
                value: `**ឈ្មោះ:** ${member.user.tag}\n**ID:** ${member.user.id}\n**ចូលមកថ្ងៃទី:** ${member.joinedAt.toLocaleDateString('km-KH')}`,
                inline: false
            },
            {
                name: "🎯 អ្វីដែលអ្នកអាចធ្វើបាន",
                value: "• ណែនាំខ្លួនឯងនៅក្នុងឆានែល #introduction\n• អានច្បាប់នៅ #rules\n• ចូលរួមសន្ទនាជាមួយសមាជិកដទៃ",
                inline: false
            }
        ],
        footer: "អរគុណចំពោះការចូលរួមជាមួយយើង!"
    }),

    // សារចាកចេញជាភាសាខ្មែរ
    leaveMessage: (member) => ({
        title: "អ្នកបានចាកចេញពីសឺវើររបស់យើង 😢",
        description: `លាហើយ **${member.user.username}**! យើងសោកស្តាយដែលអ្នកបានចាកចេញពី **${member.guild.name}**។\n\nយើងសង្ឃឹមថាអ្នកនឹងត្រឡប់មកវិញនាពេលអនាគត!`,
        fields: [
            {
                name: "📊 ស្ថិតិអ្នកប្រើ",
                value: `**ឈ្មោះ:** ${member.user.tag}\n**ID:** ${member.user.id}\n**ចំនួនថ្ងៃនៅក្នុងសឺវើរ:** ${Math.floor((Date.now() - member.joinedTimestamp) / (1000 * 60 * 60 * 24))} ថ្ងៃ`,
                inline: false
            }
        ],
        footer: "ជូនពរអ្នកឱ្យមានសំណាងល្អ!"
    }),

    // សារប្រកាសជាភាសាខ្មែរ
    announcementMessage: (author, title, content, mentions) => ({
        title: `📢 ប្រកាសសារសំខាន់: ${title}`,
        description: content,
        fields: [
            {
                name: "👤 ប្រកាសដោយ",
                value: `${author.tag}`,
                inline: true
            },
            {
                name: "⏰ ពេលវេលា",
                value: new Date().toLocaleString('km-KH', { timeZone: 'Asia/Phnom_Penh' }),
                inline: true
            },
            {
                name: "👥 សម្រាប់",
                value: mentions || "គ្រប់គ្នា",
                inline: true
            }
        ],
        footer: "សូមអានឱ្យបានដិតដល់!"
    })
};