module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ Bot ${client.user.tag} បានភ្ជាប់ជោគជ័យ!`);
        console.log(`📊 ភ្ជាប់ទៅ ${client.guilds.cache.size} សឺវើរ`);
        
        // Set activity
        client.user.setActivity('/setup សម្រាប់ការកំណត់', { type: 'PLAYING' });
    },
};