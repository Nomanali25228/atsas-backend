const nodemailer = require('nodemailer');
const pdf = require('html-pdf'); // ✅ Import html-pdf

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

        // Destination-specific variables (same as your current code)...
        // [copy your if-else destination logic here unchanged]

        // Example HTML content
        const htmlContent = `
          <html>
            <head><title>Acceptance Letter</title></head>
            <body>
              <h1>Hello ${userName},</h1>
           
            </body>
          </html>
        `;

        try {
          // 📄 Generate PDF using html-pdf
          const pdfBuffer = await new Promise((resolve, reject) => {
            pdf.create(htmlContent, { format: 'A4' }).toBuffer((err, buffer) => {
              if (err) reject(err);
              else resolve(buffer);
            });
          });

          // 📧 Send email
          await transporter.sendMail({
            from: 'Atsas MUN',
            to: userEmail,
            subject: 'YOUR LETTER OF ACCEPTANCE',
            html: `
              <p>Dear ${userName},</p>
              <p>Your letter of acceptance is attached as a PDF.</p>
            `,
            attachments: [
              {
                filename: 'Registration_Confirmation.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf',
              },
            ],
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
