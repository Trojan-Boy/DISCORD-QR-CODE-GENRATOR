const { Client } = require('discord.js');
const qrcode = require('qrcode');
const fs = require('fs');

const client = new Client();
const prefix = '/';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'on') {
        const qrCodeData = args.join(' '); // Join all arguments to form the QR code data

        if (!qrCodeData) {
            message.channel.send('Please provide input for the QR code.');
            return;
        }

        const color = args[0] || '#000000'; // Default color is black

        // Generate QR code with custom color
        const options = {
            width: args[1] || 300,
            color: {
                dark: color,
                light: '#ffffff' // Light color (default: white)
            }
        };

        try {
            const qrCodeURL = await qrcode.toFile('./tmp/qrcode.png', qrCodeData, options);
            message.channel.send({
                files: [{
                    attachment: './tmp/qrcode.png',
                    name: 'qrcode.png'
                }]
            });
        } catch (error) {
            console.error('Error generating QR code:', error);
            message.channel.send('Failed to generate QR code.');
        }
    }
});

client.login('Your bot Token');
