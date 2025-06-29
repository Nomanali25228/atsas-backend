const nodemailer = require('nodemailer');
const pdf = require('html-pdf'); // Changed from html-pdf-chrome to html-pdf

module.exports = {
  // CRON: Runs every minute
  '*/1 * * * *': async ({ strapi }) => {
    try {
      const oneHourAgo = new Date(Date.now() - 8 * 60 * 60 * 1000);

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
          var date = "2<sup>nd</sup> - 5<sup>th</sup> October 2025 ,"
          var cheackoutdate = "2nd September 2025 and check-out on 5th October  2025,"
          var payment = "UAEpayment"
          var basicprice = "459"
          var fullprice = "679"
          var serves1 = "Visa invitation letter"
          var serves2 = "Airport Assistance (Arrival)"
          var Hotel = "Meydan Hotel, Meydan"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN UAE."
          var CityTour = "Dubai City Tour"


        } else if (destination == "Baku, Azerbaijan") {
          var desname = "Baku, Azerbaijan";
          var country = "Azerbaijan";
          var date = "6<sup>th</sup> - 9<sup>th</sup> November 2025,"
          var cheackoutdate = "6th November 2025 and check-out on 9th November 2025,"
          var payment = "Azerbaijanpayment"
          var basicprice = "349"
          var fullprice = "499"
          var Hotel = "Hilton Baku"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN Azerbaijan."
          var CityTour = "Baku City Tour"


        } else if (destination == "New York, USA") {
          var desname = "New York, USA";
          var country = "USA";
          var date = "12<sup>th</sup> - 15<sup>th</sup> February 2026,"
          var cheackoutdate = "12th February 2026 and check-out on 15th February 2026,"
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
          var date = "16<sup>th</sup> - 19<sup>th</sup> october 2025,"
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
          var date = "20<sup>th</sup> - 24<sup>th</sup> November 2025,"
          var cheackoutdate = "20th November 2025 and check-out on 24th November 2025,"
          var payment = "UKpayment"
          var basicprice = "959"
          var fullprice = "1659"
          var Hotel = "Sunway Putra Hotel"
          var para = "  You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN UK."
          var CityTour = "London City Tour"





        } else if (destination == "Istanbul, Turkey") {
          var desname = "Istanbul, Turkey";
          var country = "Turkey";
          var date = "11<sup>th</sup> - 14<sup>th</sup> September 2025,"
          var cheackoutdate = "11th September 2025 and check-out on 14th September 2026,"
          var payment = "Istanbulpayment"
          var basicprice = "389"
          var fullprice = "639"
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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Letter of Acceptance</title>
</head>
<style>
  .page-break {
    page-break-after: always;
  }

  body {
    font-size: 12px;
  }

  img {
    width: 100px;
  }

  /* Ensure content is within page */
  table {
    width: 100%;
    table-layout: fixed;
  }

  td {
    /* padding: 5px; */
    word-wrap: break-word;
  }

  /* Reduce font size and line spacing for content */
  h2 {
    font-size: 16px;
  }

  p,
  ul {
    font-size: 12px;
    line-height: 1.4;
  }
</style>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa; color:#333; font-size:12px;">

  <table class="page-break" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;">
    <tr>
      <td align="center">
        <table width="800" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Left Column with blue background and images -->
            <td width="120" valign="top"
              style="background-color:#ffffff; border-right: 4px solid #003c71; position: relative;">
              <!-- Logo -->
              <div style="text-align:center; padding: 20px 10px 0px 10px;">
                <img
                  src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/image_zAB.png"
                  alt="Logo" style="width:100px; display:block; margin: 0 auto;" />
              </div>
              <p style="font-size: 8px; text-align:center; margin: 5px 0; color:#333333;">
                <span style="color: #003c71;"> Diplomatic </span> Simulation <span style="color: #003c71;"> of </span>
                <br> <span style="color: #003c71;"> the </span> United Nations
              </p>
              <div style="height: 459px;"></div>
              <div style="width: 100%;">
                <img
                  src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/whatsapp_image_20250409_at_111009_97810a2aremovebgpreview.png"
                  alt="Leaf" style="width:100%; display: block;" />
              </div>
            </td>

            <!-- Right Column with Content -->
            <td valign="top"
              style="padding: 20px 15px; font-family: Arial, sans-serif; font-size:12px; line-height: 1.6;">
              <h2 style="text-align: center; margin: 0; font-size: 18px; color: #26427e;">
                LETTER OF ACCEPTANCE
              </h2>
              <p style="text-align: center; font-weight: bold; margin: 30px 0; color:#333333;">
                CONGRATULATIONS
              </p>

              <p style="color:#333333;">
                Dear Applicant,<br /><br />
                We are grateful to inform you that you have been selected to join the Atsas International MUN ${desname}
                2025 United Nations Simulation Conference Crafting Future Leaders in the Post-Pandemic Era, to be held
                from ${date} in ${desname}.
              </p>

              <p style="color:#333333;">
                Atsas Creation International is a High Wycombe, UK Based Diplomatic Simulation Organizer which serves
                as a platform for Young Leaders and Change makers to exchange ideas and resolve the most challenging
                global issues.
              </p>

              <p style="color:#333333;">We are pleased to accept and invite you, with detailed information as follows:</p>
         
              <p style="color:#333333;">
                <strong>Name:</strong> ${userName}<br />
                <strong>Duration of stay:</strong> ${date} <br />
                <strong>Venue:</strong> ${Hotel} ${desname} <br />
                <strong>Destination:</strong> ${desname}
              </p>

              <p style="color:#333333;">
                <em>You are requested to pay your delegate fee in order to become a confirmed delegate at Atsasmun ${country}
                  on the following link:</em><br />
                <a href="https://www.atsasmun.com/${payment}/1?userid=${userId}" style="color:#003c71;">
                  https://www.atsasmun.com/${payment}
                </a>
              </p>

              <p style="font-size: 10px; color: #666; text-align: center; margin-top: 286px;">
                Address: 42 Heneretton Way High Wycombe, HP13 7UE, United Kingdom<br />
                Website: www.atsasmun.com | Email: info@atsasmun.com<br />
                Phone: +44 7487 302322
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;">
    <tr>
      <td align="center">
        <table width="800" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Left Column with blue background and images -->
            <td width="120" valign="top"
              style="background-color:#ffffff; border-right: 4px solid #003c71; position: relative;">
              <!-- Logo -->
              <div style="text-align:center; padding:40px 10px 0px 10px;">
                <img
                  src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/image_zAB.png"
                  alt="Logo" style="width:100px; display:block; margin: 0 auto;" />
              </div>
              <p style="font-size: 8px; text-align:center; margin: 5px 0; color:#333333;">
                <span style="color: #003c71;"> Diplomatic </span> Simulation <span style="color: #003c71;"> of </span>
                <br> <span style="color: #003c71;"> the </span> United Nations
              </p>
              <div style="height: 100px;"></div>
              <div style="width: 100%; margin-top: 328px;">
                <img
                  src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/whatsapp_image_20250409_at_111009_97810a2aremovebgpreview.png"
                  alt="Leaf" style="width:100%; display: block;" />
              </div>
            </td>

            <!-- Right Column with Content -->
            <td valign="top"
              style="padding: 40px 15px; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.6;">
              <ul style="padding-left: 15px; margin-top: 0; color:#333333; ">
                <li>
                  Each participant will be responsible for his/her visa fee
                  and flight ticket to and from ${desname}.
                </li>
                <li>
                  We will accommodate your Visa Invitation Letter.
                </li>
                <li>
                  We provide visa services for ${desname}.
                </li>
                <li>
                  Hotel check-in will be on ${cheackoutdate} except for those who will be taking the Full
                  Experience Package.
                </li>
                <li>
                  The committee will provide accommodation (including stay,
                  meals, local transportation and T-shirts) to the
                  participants with Accommodation and Full Experience
                  packages during the event.
                </li>
                <li>
                  Before departure, please ensure you are carrying the
                  following mandatory items on you:
                </li>
                <li>Valid Passport</li>
                <li>Valid Visa</li>
              </ul>

              <p style="margin-top: 20px; color:#333333;">
                We would like to thank you in advance for your cooperation and
                kind attention. Looking forward to seeing you in ${desname}
              </p>

              <p style="margin-top: 30px">Regards</p>
              <table cellpadding="0" cellspacing="0" border="0" >
                <tr>
                  <td style=" padding: 0; margin: 0; vertical-align: middle;">
                    <img
                      src="https://ftueyhj.stripocdn.email/content/guids/CABINET_2931b97566d3407768315cf288299eaf675e4b98b62ac690766b987c273adeb9/images/image_gkX.png"
                      alt="Signature"
                      style=" max-width: 70px; height: auto; display: inline-block; vertical-align: middle;"/>
                  </td>
                  <td style=" padding: 0; margin: 0; vertical-align: middle;">
                    <img
                      src="https://ftueyhj.stripocdn.email/content/guids/CABINET_2931b97566d3407768315cf288299eaf675e4b98b62ac690766b987c273adeb9/images/stamp_atsasmun.png"
                      alt="Stamp"
                      style=" max-width: 80px; height: auto; display: inline-block; vertical-align: middle;"/>
                  </td>
                </tr>
              </table>

              <p style="margin-top: 6px; font-weight: bold; color:#333333;">
                Fasih Ur Rehman<br />
                <span style="font-weight: normal">info@atsasmun.com<br />
                  Office of the Secretariat<br />
                  ATSAS International MUN</span>
              </p>

               <p style="font-size: 10px; color: #666; text-align: center; margin-top: 238px;">
                Address: 42 Heneretton Way High Wycombe, HP13 7UE, United Kingdom<br />
                Website: www.atsasmun.com | Email: info@atsasmun.com<br />
                Phone: +44 7487 302522
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

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

                                           <a href="https://www.atsasmun.com/${payment}/1?userid=${userId}"
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
