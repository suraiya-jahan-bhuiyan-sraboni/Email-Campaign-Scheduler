# 📧 Email Campaign Scheduler

A full-stack application to schedule and send email campaigns using Node.js, Express, MongoDB, Nodemailer, and node-cron. Includes a Handlebars-powered frontend to create and view campaigns.

---

## 🚀 Features

- ✅ Create campaigns with title, message, recipients, and scheduled time.
- 📬 Automatically send emails using `node-cron` at the scheduled time.
- 🔄 Track delivery status for each recipient: **pending**, **sent**, or **failed**.
- 📄 List all campaigns and view individual delivery statuses.
- 🎨 Frontend using Express and Handlebars for creating and listing campaigns.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Native Driver + Mongoose)
- **Frontend**: Express with Handlebars
- **Email Service**: Nodemailer with SMTP
- **Scheduler**: node-cron

---

## 📂 Folder Structure

```

project-root/
│
├── routes/
│   └── campaigns.js        # Campaign API routes
|   ├── mailer.js           # Nodemailer configuration
|   ├── schedule.js         # Cron job logic
|   ├── users.js            # Mongoose schema
│
├── views/
│   ├── index.hbs           # Home page (form to submit campaigns and seeing all campaigns)
│   └── layout.hbs          # Base layout for Handlebars
│
├──.env                     # Environment variable 
├── app.js                  # Entry point (not shown here)
└── README.md               # You're reading this

````

---

## 📄 MongoDB Schema

```js
const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [
    {
      email: { type: String, required: true },
      status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
    }
  ],
  scheduledTime: Date,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
````

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/email-campaign-scheduler.git
cd email-campaign-scheduler
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root with the following:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/campaignDB?....appName=cluster0
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

---

## 🚦 Usage

### 🌐 Start the Server

```bash
npm start
```

### ✍️ Create Campaign

* Go to `http://localhost:5000`
* Fill out the form with:

  * Title
  * Message (plain text)
  * Recipients (newline per emails)
  * Scheduled Time (format: `YYYY-MM-DDTHH:MM`, e.g., `2025-07-31T22:30`)
* Submit to schedule the campaign

### 📋 View Campaigns

* Visit `http://localhost:5000/campaigns` (or create a route for it)
* See a list of all campaigns, their statuses, and recipient delivery logs

---

## 🔁 Cron Job Logic

* The cron job runs **every minute**
* Checks for campaigns with `status: "pending"` and `scheduledTime <= now`
* Sends emails to all recipients using `nodemailer`
* Updates each recipient's status individually
* Updates campaign status to `sent` or `failed`

---

## 🧪 Testing

* Try creating a campaign scheduled 2–5 minutes in the future.
* Check the console and DB logs for delivery.
* Emails should be delivered at the exact scheduled minute.
* Each recipient’s status will show as `sent` or `failed`.


