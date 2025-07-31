var express = require('express');
var router = express.Router();

const {Campaign } = require('./users');

router.post('/campaigns', async (req, res) => {
    try {
        const { title, message, recipients, scheduledTime } = req.body;

        if (!Array.isArray(recipients) || !recipients.every(r => typeof r.email === 'string')) {
            return res.status(400).json({ error: 'Recipients must be an array of objects with an email string' });
        }

        const recipientsWithStatus = recipients.map(r => ({
            email: r.email.trim(),
            status:'pending'
        }));

        const campaign = new Campaign({
            title,
            message,
            recipients: recipientsWithStatus,
            scheduledTime: new Date(scheduledTime),
            status: 'pending',
            createdAt: new Date()
        });

        await campaign.save();

        res.status(201).json({ message: 'Campaign created successfully', campaign });
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;