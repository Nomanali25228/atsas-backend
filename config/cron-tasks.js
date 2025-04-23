const nodemailer = require('nodemailer');
const pdf = require('html-pdf'); // Changed from html-pdf-chrome to html-pdf

module.exports = {
  // CRON: Runs every minute
  '*/1 * * * *': async ({ strapi }) => {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 1000);

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
        // Add other destination-specific conditions here...
        
        // Create the HTML content
        const htmlContent = ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Computer Course</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 11px;
      margin: 0;
      padding: 0;
    }

    table {
      width: 794px;
      margin: 0 auto;
      border-collapse: collapse;
    }

    td {
      vertical-align: top;
    }

    .left-col {
      background-color: #f2f2f2;
      width: 110px;
      padding: 15px 5px 0 5px;
      text-align: center;
    }

    .left-col img {
      width: 70px;
      margin-bottom: 10px;
    }

    .right-col {
      padding: 25px 20px;
    }

    h2 {
      font-size: 16px;
      margin-bottom: 10px;
      color: #333;
    }

    ul {
      margin-top: 8px;
      padding-left: 16px;
    }

    ul ul {
      margin-top: 4px;
      padding-left: 14px;
    }

    .footer {
      text-align: center;
      padding: 10px;
      font-size: 9px;
      color: #555;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="left-col">
        <img src="https://via.placeholder.com/70" alt="Course Icon">
        <p><strong>Basic Computer</strong></p>
        <p>Course Outline</p>
      </td>
      <td class="right-col">
        <h2>Basic Computer Course</h2>
        <ul>
          <li><strong>Introduction to Computer</strong></li>
          <ul>
            <li>What is Computer?</li>
            <li>History of Computer</li>
            <li>Types of Computer</li>
            <li>Computer Components (Hardware & Software)</li>
          </ul>

          <li><strong>Operating System Basics</strong></li>
          <ul>
            <li>Windows Introduction</li>
            <li>Using Desktop, Taskbar, and Start Menu</li>
            <li>File and Folder Management</li>
            <li>Using Control Panel</li>
          </ul>

          <li><strong>MS Word</strong></li>
          <ul>
            <li>Creating & Formatting Documents</li>
            <li>Using Tables, Images, Shapes</li>
            <li>Page Setup and Printing</li>
          </ul>

          <li><strong>MS Excel</strong></li>
          <ul>
            <li>Basics of Worksheets</li>
            <li>Formulas and Functions</li>
            <li>Charts and Formatting</li>
          </ul>

          <li><strong>MS PowerPoint</strong></li>
          <ul>
            <li>Creating Presentations</li>
            <li>Slide Design & Transitions</li>
            <li>Animations and Slide Show</li>
          </ul>

          <li><strong>Internet & Email</strong></li>
          <ul>
            <li>Using Web Browsers</li>
            <li>Searching Information</li>
            <li>Creating and Using Email</li>
          </ul>

          <li><strong>Typing Practice</strong></li>
          <ul>
            <li>English Typing</li>
            <li>Urdu Typing (Optional)</li>
          </ul>

          <li><strong>Social Media & Online Safety</strong></li>
          <ul>
            <li>Using Facebook, WhatsApp (Web)</li>
            <li>Online Safety & Cyber Awareness</li>
          </ul>
        </ul>
      </td>
    </tr>
  </table>

  <div class="footer">
    &copy; 2025 Basic Computer Training. All Rights Reserved.
  </div>
</body>
</html>

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
              html: `
<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#ffffff; color:#333;">
            <table
                style="width: 100%; max-width: 800px; margin: 20px auto; text-align: center; background: #ffffff; border-collapse: collapse;">
                <!-- Logo Row -->
                <tr>
                    <td align="center" style=" background-color:#fff;">
                        <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/dnd/vya/qic/Without-01-removebg-preview.png"
                            alt="ATSAS MUN Logo" width="170">
                    </td>
                </tr>
                <!-- Background Image Section -->
                <tr>
                       <td align="center" style=" text-align: center;
                                background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png');
                                background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 30vh;
                            max-width: 100%;
                            background-position: center; 
                            color:#fff; 
                            padding:70px;">
                                    <h1 style="margin:0; font-size:50px; color: white;">CONGRATULATIONS!</h1>
                        <!-- Name -->
                        <p
                            style="font-size: 1.4rem; font-weight: bold; margin: 10px 0; color: white; text-decoration: underline;">
                          ${userName}</p>
                        <!-- Subtext -->
                        <p style="font-size: 0.9rem; margin: 30px 30px 10px 20px; color: white;">
                            You have been selected as one of the delegates at AtsasMUN ${desname}
                            Please find attached the official acceptance letter in this email.
                        </p>
                        <p style="font-size: 0.9rem; margin: 5px 40px 10px 20px; color: white;">
                        ${para?para:""}
                        </p>
                    </td>
                </tr>

            </table>

            <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td style="margin-bottom: 30px;">
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 450px; object-fit: cover; ">
                </td>

            </table>


            <table style="width: 100%; max-width: 800px; margin: 40px auto; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td>
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 450px; object-fit: cover; ">
                </td>

            </table>

            <table style="width: 100%; margin: 0px auto; margin-top: -50px; background-color: #fff; padding: 25px 2px 2px 2px;">
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Committee
                        Allocation Policy</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants
                                to select alternatives if necessary.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Payments</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Payments must be made through the official AtsasMUN website.</li>
                            <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent
                                the organization.</li>
                            <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Refund Policy</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Subject to the following restrictions, delegates who have made their full payment may ask for a
                                credit voucher or transfer their participation to another AtsasMUN location.</li>
                            <li>Requests have to be submitted sixty days prior to the start of the event. Credit coupons or
                                transfers are only good for AtsasMUN activities.</li>
                            <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers;
                                the installment will be kept as a cancellation charge.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Code of Conduct
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Participants must ensure all information provided during registration is accurate. False
                                information will result in disqualification and potential legal action.</li>
                            <li>All submitted materials must be original; plagiarism will result in disqualification.</li>
                            <li>Participants must obey the host country’s laws and are personally responsible for any damages or
                                violations.</li>
                            <li>AtsasMUN is not liable for participant misconduct; individuals will bear sole responsibility for
                                their actions.</li>
                            <li>Participants must adhere to the Code of Conduct outlined in the Conference Handbook.</li>
                        </ul>
                    </td>
                </tr>
            </table>


            <table
                style="width: 100%; max-width: 800px; margin: 10px auto; margin-bottom: 0px; margin-top: 0px; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td>
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gdl/53b/vsi/Capture3.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 350px; object-fit: cover; ">
                </td>

            </table>

            <table role="presentation" width="100%"  cellspacing="0" cellpadding="0" border="0"
                style="background-color:#ffffff;  margin-top: -5px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
                            style="background-color:#fff;  box-shadow:0 4px 8px rgba(0,0,0,0.1);">

                            <!-- payment//////////////////////// -->
                            <table role="presentation" width="100%" cellpadding="10" cellspacing="0" border="0"
                                style="max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                                <!-- Title Section -->
                                <tr>
                                    <td colspan="2" align="center"
                                        style="padding: 40px 20px 20px 10px ; font-size: 20px; font-weight: bold; color: #000; ">
                                        Conference Fee Packages
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="center" style="padding-bottom: 20px; font-size: 16px; color: #555;">
                                        New Year Early Bird Packages
                                    </td>
                                </tr>
                                <!-- Packages Section -->
                                <tr>
                                    <!-- Non-Accommodation Column -->
                                    <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
          color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 8px 0 0 0; text-align: center;">
                                        Non-Accommodation $${basicprice}
                                    </td>
                                    <!-- Accommodation Column -->
                                    <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
        ; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 0 8px 0 0; text-align: center;">
                                        Accommodation $${fullprice}
                                    </td>
                                </tr>
                                <tr>
                                    <!-- Non-Accommodation Details -->
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align:left;">
                                        ATSASMUN Merch and Kit
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Everything in Non-Accommodation Package
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        United Nations Simulation Committee Sessions
                                    </td>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        5 Star Accommodation-Twin Shared/3 Nights
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        ATSASMUN UNHCR Endorsed Certificates
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        3 Buffet Breakfasts
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Cultural Global Village and Performances
                                    </td>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        2 Lunch and 3 Dinners
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Ice-breaking Session
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        ${CityTour}                         </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Diplomatic Dinner Gala
                                    </td>
                                    <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                       ${serves1?serves1:""}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        1 Lunch and 2 Dinners
                                    </td>
                                    <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                    ${serves2?serves2:""}
                                    </td>
                                </tr>
                            </table>

                            <table
                                style="width: 100%; max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
                                <tr>
                                    <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 10px;">Payment
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 15px; color: #333; padding-bottom: 20px;">You can pay at the link
                                        below</td>
                                </tr>
                                <tr>
                                    <td>

                                           <a href="http://localhost:3000/${payment}/1?userid=${userId}"
                                            style="display: inline-block; padding: 10px 100px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none;  background: linear-gradient(to right, #00509E, #003A70, #002855);">Pay
                                            Now</a>
                                    </td>
                                </tr>
                            </table>


                            <table
                                style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
                                <!-- First Line -->


                                <tr>
                                    <td style="padding: 20px; font-size:19px; color:#333; line-height: 1.5;">
                                        A formal Visa Invitation Letter can be obtained from us upon request after the payment
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-size: 17px; color: #333;">
                                        Should you have any questions, feel free to reach us at
                                        <a href="mailto:info@atsasmun.com" target="_blank"
                                            style="text-decoration: underline;  font-weight: bold; color: #000000;">info@atsasmun.com</a>
                                        We will be happy to assist you.
                                    </td>
                                </tr>
                                <!-- Assistance Line -->
                                <tr>
                                    <td style="padding: 10px; font-size: 1rem; color: #333;">
                                        <hr>
                                    </td>
                                </tr>
                                <!-- Highlighted Line -->
                                <tr>
                                    <td style="padding: 20px; font-size: 1rem; color: black; font-weight: bold;">
                                        We look forward to meeting you in ${desname}!
                                    </td>
                                </tr>
                                <!-- Final Thank You Line -->
                                <tr>
                                    <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #333; line-height: 1.5; ">
                                        Once again, thank you for registering yourself as a part of this powerful Diplomatic
                                        Conference!
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                                <tr>
                                    <td align="center"
                                        style="background-color:#003366; color:#fff; padding:20px; margin:0; font-size:14px;">
                                        <p style="margin:0; font-size:14px;">Atsas MUN ${country}© 2024 Atsas Creation
                                            International Ltd</p>
                                        <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>"Forging a Diplomatic World
                                                of Unity and Peace"</em></p>
                                    </td>
                                </tr>
                            </table>

                    </td>
                </tr>
            </table>

        </body>

        </html>`,
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
