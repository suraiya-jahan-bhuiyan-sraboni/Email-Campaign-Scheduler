
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions);

const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [{
    email: { type: String, required: true },
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
  }],
  scheduledTime: Date,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});


const Campaign = mongoose.model("campaign", campaignSchema);

module.exports = { Campaign };
