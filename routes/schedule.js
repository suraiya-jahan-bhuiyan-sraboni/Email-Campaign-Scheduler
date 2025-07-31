const cron = require('node-cron');
const { Campaign } = require('./users');
const sendEmail = require('./mailer');

cron.schedule('* * * * *', async () => {
    const now = new Date();
    console.log(`Running cron at ${now.toISOString()}`);

    try {
        const campaigns = await Campaign.find({
            status: 'pending',
            scheduledTime: { $lte: now }
        });

        for (const campaign of campaigns) {
            for (const recipient of campaign.recipients) {
                const result = await sendEmail({
                    to: recipient.email,
                    subject: campaign.title,
                    html: campaign.message
                });

                recipient.status = result.success ? 'sent' : 'failed';
                console.log(`Email to ${recipient.email} => ${recipient.status}`);
            }

            campaign.markModified('recipients');

            campaign.status = campaign.recipients.every(r => r.status === 'sent') ? 'sent' : 'failed';

            await campaign.save();
            console.log(`Campaign "${campaign.title}" status: ${campaign.status}`);
        }

    } catch (error) {
        console.error('[CRON ERROR]', error);
    }

    console.log('📬 Campaign check completed.');
});
