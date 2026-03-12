# 🤖 Discord DM Notification Bot

A comprehensive Discord.js bot that sends DM notifications to members for server announcements, welcome messages, and leave messages.

## ✨ Features

- 📢 **Announcement DMs**: Automatically DM members with a specific role when announcements are posted
- 👋 **Welcome DMs**: Send personalized welcome messages to new members
- 😢 **Leave DMs**: Send farewell messages when members leave
- ⚙️ **Easy Setup**: Configure everything with slash commands
- 🛡️ **Rate Limiting**: Built-in protection against Discord rate limits

## 📁 Folder Structure
discord-dm-bot/
├── commands/           # Slash commands
│   ├── ping.js        # Test command
│   └── setup.js       # Configuration commands
├── events/            # Event handlers
│   ├── ready.js       # Bot startup
│   ├── guildMemberAdd.js    # Welcome DM
│   ├── guildMemberRemove.js # Leave DM
│   ├── messageCreate.js     # Announcement detection
│   └── interactionCreate.js # Command handling
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment file
├── .gitignore         # Git ignore rules
├── deploy-commands.js # Register slash commands
├── index.js           # Main entry point
├── package.json       # Dependencies
└── README.md          # This file


## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js 18.x or higher
- A Discord account
- Discord server with admin permissions

### 2. Installation

```bash
# Clone or download the project
cd discord-dm-bot

# Install dependencies
npm install

# Copy environment example
cp .env.example .env