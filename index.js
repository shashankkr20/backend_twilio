// backend/server.js
require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/send', async (req, res) => {
  const {  message,customers } = req.body;
  console.log(customers[0].phone,message);
  try {
    const msg = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${customers[0].phone}`,
      body: message,
    });
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/send-receipt', async (req, res) => {
  const {  receipt } = req.body;
  console.log(receipt.phone);
  try {
    const msg = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${receipt.phone}`,
      body: 'Here is your PDF document',
      mediaUrl: ['https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
    });
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000, () => console.log('Backend running on port 3000'));
