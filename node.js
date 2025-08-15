const nodemailer = require('nodemailer');
const axios = require('axios');

// Function to send WhatsApp message using CallMeBot API
async function sendWhatsAppMessage(phone, message) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=YOUR_API_KEY`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('WhatsApp message failed: ' + error.message);
    }
}

// Function to send email using nodemailer
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourgmail@gmail.com',
            pass: 'yourgmailpassword'
        }
    });

    let info = await transporter.sendMail({
        from: '"Job Booking" <yourgmail@gmail.com>',
        to: to,
        subject: subject,
        text: text
    });

    return info;
}

// Booking function
async function bookJob(jobDetails) {
    const whatsappPhone = '2348032899975'; // Nigeria country code
    const whatsappMessage = `New job booking: ${jobDetails}`;
    const emailTo = 'sysdevexpert@gmail.com';
    const emailSubject = 'New Job Booking';
    const emailText = `Details: ${jobDetails}`;

    // Send WhatsApp message
    await sendWhatsAppMessage(whatsappPhone, whatsappMessage);

    // Send Email
    await sendEmail(emailTo, emailSubject, emailText);

    return 'Booking notification sent!';
}

// Example usage
bookJob('Website development for client XYZ')
    .then(console.log)
    .catch(console.error);