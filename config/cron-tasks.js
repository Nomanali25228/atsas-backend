const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');

module.exports = {
  '*/1 * * * *': async ({ strapi }) => {
    try {
      const eightHoursAgo = new Date(Date.now() - 1 * 60 * 1000); // 10 minutes ago
      


      // 📨 Get notifications older than 2 minutes where email not sent
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

      // 📤 Email transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@atsasmun.com',
          pass: 'ucnculvwigndwkix',
        },
      });

      for (const [userEmail, userNotifications,] of Object.entries(emailGroups)) {
        const userName = userNotifications[0]?.FirstName || 'User';
        const userid = userNotifications[0]?.Idname || 'User';
        const destination = userNotifications[0]?.Destinations || 'User';
        const notificationIds = userNotifications.map(n => n.id);
        if (destination == "Dubai, UAE") {
          var desname = "Dubai, UAE";
          var country = "UAE";
          var date = "22<sup>th</sup> - 25<sup>th</sup> May,"
          var cheackoutdate = "22nd May 2025 and check-out on 25th May 2025,"
          var payment = "UAEpayment"
          var basicprice = "459"
          var fullprice = "679"
          var serves1 = "Visa invitation letter"
          var serves2 = "Airport Assistance (Arrival)"
          var Hotel = "Meydan Hotel, Meydan"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN UAE."
          var CityTour = "Dubai City Tour"


        } else if (destination == "Goa, India") {
          var desname = "Goa, India";
          var country = "India";
          var date = "26<sup>th</sup> - 29<sup>th</sup> june,"
          var cheackoutdate = "26th June 2025 and check-out on 29th June 2025,"
          var payment = "Indiapayment"
          var basicprice = "249"
          var fullprice = "579"
          var Hotel = "Grand Hyatt"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN India."
          var CityTour = "Goa City Tour"


        } else if (destination == "New York, USA") {
          var desname = "New York, USA";
          var country = "USA";
          var date = "04<sup>th</sup> - 07<sup>th</sup> September,"
          var cheackoutdate = "04th September 2025 and check-out on 07th September 2025,"
          var payment = "USApayment"
          var basicprice = "979"
          var fullprice = "1599"
          var serves1 = "Visa invitation letter"
          var serves2 = "Airport Assistance (Arrival)"
          var Hotel = "East Brunswick Hotel"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN USA."
          var CityTour = "New York City Tour"




        } else if (destination == "Riyadh, Saudi Arabia") {
          var desname = "Riyadh, Saudi Arabia";
          var country = "Saudi Arabia";
          var date = "16<sup>th</sup> - 19<sup>th</sup> october,"
          var cheackoutdate = "16th October 2025 and check-out on 19th October 2025,"
          var payment = "Saudipayment"
          var basicprice = "649"
          var fullprice = "799"
          var Hotel = "Hilton Riyadh Hotel"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN Saudi Arabia."
          var CityTour = "Riyadh City Tour"




        } else if (destination == "London, UK") {
          var desname = "London, UK";
          var country = "UK";
          var date = "07<sup>th</sup> - 10<sup>th</sup> August,"
          var cheackoutdate = "07th August 2025 and check-out on 10th August 2025,"
          var payment = "UKpayment"
          var basicprice = "959"
          var fullprice = "1659"
          var Hotel = "Sunway Putra Hotel"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN UK."
          var CityTour = "London City Tour"





        } else if (destination == "Istanbul, Turkey") {
          var desname = "Istanbul, Turkey";
          var country = "Turkey";
          var date = "12<sup>th</sup> - 15<sup>th</sup> June,"
          var cheackoutdate = "12th June 2025 and check-out on 15th June 2025,"
          var payment = "Istanbulpayment"
          var basicprice = "389"
          var fullprice = "579"
          var serves1 = "Visa invitation letter"
          var serves2 = "Airport Assistance (Arrival)"
          var Hotel = "G Rotana Hotel"
          var CityTour = "Istanbul City Tour"


        }
        try {
          // 📄 Generate PDF
          const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome', // This path works on Render
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          });
          const page = await browser.newPage();

          const htmlContent = `
                                              
          `;

          await page.setContent(htmlContent);
          const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));
          await browser.close();

          // 📧 Send email
          const info = await transporter.sendMail({
            from: 'Atsas MUN',
            to: userEmail,
            subject: 'YOUR LETTER OF ACCEPTANCE',
            html: `
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

          // ✅ Update records to prevent duplicate emails
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
