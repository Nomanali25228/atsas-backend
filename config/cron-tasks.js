const nodemailer = require('nodemailer');
const pdf = require('html-pdf'); // Changed from html-pdf-chrome to html-pdf

module.exports = {
  // CRON: Runs every minute
  '*/1 * * * *': async ({ strapi }) => {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      const notifications = await strapi.db.query('api::notification.notification').findMany({
        where: {
          emailSent: false,
          createdAt: { $lt: oneHourAgo }
        },
      });

      const emailGroups = notifications.reduce((acc, notification) => {
        const email = notification.Email;
        if (email) {
          acc[email] = acc[email] || [];
          acc[email].push(notification);
        }
        return acc;
      }, {});

      // Email transporter setup
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@atsasmun.com',
          pass: 'ucnculvwigndwkix',
        },
      });

      for (const [email, notifs] of Object.entries(emailGroups)) {
        const {
          FirstName: userName = 'User',
          Idname: userId = '',
          Destinations: destination = '',
        } = notifs[0] || {};

        // Destination-specific data
        let desname, country, date, cheackoutdate, payment, basicprice, fullprice, serves1, serves2, Hotel, para, CityTour;
        
        // Define destination-specific variables
        if (destination == "Dubai, UAE") {
          desname = "Dubai, UAE";
          country = "UAE";
          date = "22<sup>th</sup> - 25<sup>th</sup> May,";
          cheackoutdate = "22nd May 2025 and check-out on 25th May 2025,";
          payment = "UAEpayment";
          basicprice = "459";
          fullprice = "679";
          serves1 = "Visa invitation letter";
          serves2 = "Airport Assistance (Arrival)";
          Hotel = "Meydan Hotel, Meydan";
          para = "You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN UAE.";
          CityTour = "Dubai City Tour";
        } 
        // Add other destination-specific conditions here...
        
        // Create the HTML content
        const htmlContent = ` 
        <h1>Registration Confirmation</h1>
        <p>Hello ${userName},</p>
        <p>Thank you for registering for AtsasMUN. Here are your details:</p>
        <p><strong>Destination:</strong> ${desname}</p>
        <p><strong>Dates:</strong> ${date}</p>
        <p><strong>Hotel:</strong> ${Hotel}</p>
        <p><strong>City Tour:</strong> ${CityTour}</p>
        <p>${para}</p>
        <p><strong>Full Price:</strong> $${fullprice}</p>
        <p><strong>Basic Price:</strong> $${basicprice}</p>
        `;

        try {
          // ✅ Generate PDF with html-pdf (non-chrome version)
          pdf.create(htmlContent).toBuffer((err, pdfBuffer) => {
            if (err) {
              console.error(`❌ Failed to generate PDF:`, err.message);
              return;
            }

            // 📧 Send email
            transporter.sendMail({
              from: 'Atsas MUN <info@atsasmun.com>',
              to: email,
              subject: 'YOUR LETTER OF ACCEPTANCE',
              html: `<p>Your registration details are attached in the PDF.</p>`,
              attachments: [
                {
                  filename: 'Registration_Confirmation.pdf',
                  content: pdfBuffer,
                  contentType: 'application/pdf',
                },
              ],
            }, async (err, info) => {
              if (err) {
                console.error(`❌ Failed to send email for ${email}:`, err.message);
              } else {
                console.log(`✅ Email sent to ${email}`);

                // 🔄 Update all sent notifications
                const ids = notifs.map(n => n.id);
                await strapi.db.query('api::notification.notification').updateMany({
                  where: { id: { $in: ids } },
                  data: { emailSent: true },
                });
              }
            });
          });
        } catch (err) {
          console.error(`❌ Failed to process email for ${email}:`, err.message);
          // Optionally: log more details or retry logic
        }
      }
    } catch (err) {
      console.error('❌ Cron Job Error:', err.message);
    }
  },
};
