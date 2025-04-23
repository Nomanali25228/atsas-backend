const nodemailer = require('nodemailer');
const { chromium } = require('playwright'); // 👈 use playwright instead of puppeteer

module.exports = {
  '*/1 * * * *': async ({ strapi }) => {
    try {
      const eightHoursAgo = new Date(Date.now() - 60 * 60 * 1000);

      const notifications = await strapi.db.query('api::notification.notification').findMany({
        where: {
          emailSent: false,
          createdAt: { $lt: eightHoursAgo }
        },
      });

      const emailGroups = notifications.reduce((acc, notification) => {
        const userEmail = notification.Email;
        if (userEmail) {
          if (!acc[userEmail]) acc[userEmail] = [];
          acc[userEmail].push(notification);
        }
        return acc;
      }, {});

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@atsasmun.com',
          pass: 'ucnculvwigndwkix',
        },
      });

      for (const [userEmail, userNotifications] of Object.entries(emailGroups)) {
        const userName = userNotifications[0]?.FirstName || 'User';
        const userid = userNotifications[0]?.Idname || 'User';
        const destination = userNotifications[0]?.Destinations || 'User';
        const notificationIds = userNotifications.map(n => n.id);

        // 🔁 Destination-wise values setup (same as your code)
        // ...

        try {
          // ✅ Generate PDF with Playwright
          const browser = await chromium.launch({ headless: true });
          const context = await browser.newContext();
          const page = await context.newPage();

          const htmlContent = `
            <html>
              <body>
                <h1>Welcome ${userName}</h1>
                <p>This is your letter of acceptance for</p>
              </body>
            </html>
          `;

          await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
          const pdfBuffer = await page.pdf({ format: 'A4' });
          await browser.close();

          // 📤 Send Email
          await transporter.sendMail({
            from: 'Atsas MUN <info@atsasmun.com>',
            to: userEmail,
            subject: 'YOUR LETTER OF ACCEPTANCE',
            html: `<p>Dear ${userName}, please find your attached acceptance letter.</p>`,
            attachments: [{
              filename: 'Registration_Confirmation.pdf',
              content: pdfBuffer,
              contentType: 'application/pdf',
            }],
          });

          console.log(`✅ Email with PDF sent to ${userEmail}`);

          await strapi.db.query('api::notification.notification').updateMany({
            where: { id: { $in: notificationIds } },
            data: { emailSent: true },
          });
        } catch (err) {
          console.error(`❌ Error sending email to ${userEmail}:`, err);
        }
      }
    } catch (err) {
      console.error('❌ Error in cron job:', err);
    }
  },
};
