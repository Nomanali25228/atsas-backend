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
        const htmlContent = ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]--><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]--><!--[if !mso]><!-- -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i"><!--<![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p0l { padding-left:0px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p20b { padding-bottom:20px!important } .es-p-default { } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; padding:10px 20px 10px 20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } .img-8342 { width:200px!important } .es-text-5003 .es-text-mobile-size-18, .es-text-5003 .es-text-mobile-size-18 * { font-size:18px!important; line-height:150%!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-header" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" bgcolor="#cfe2f3" background="https://ektnimt.stripocdn.email/content/guids/CABINET_023d4ba30c037afc1882f48c78bbd5e99e53317d1c0246f26671213a3ffa35fa/images/committee_sessions_fym.jpg" style="padding:0;Margin:0;background-color:#cfe2f3;background-image:url(https://ftueyhj.stripocdn.email/content/guids/CABINET_687c499fa91e0884e6880ba38867e2743bd4a1650063f810a94ac5e6a67b9278/images/resized_image.png);background-repeat:no-repeat;background-position:center bottom">
           <table bgcolor="transparent" align="center" cellpadding="0" cellspacing="0" class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" class="es-m-p0r" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-p10b" style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px;padding-left:25px;font-size:0px"><a target="_blank" href="https://www.atsasmun.com/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_023d4ba30c037afc1882f48c78bbd5e99e53317d1c0246f26671213a3ffa35fa/images/final101.png" alt="AtsasMUN" width="220" title="AtsasMUN" class="img-8342" style="display:block;font-size:12px;border:0;outline:none;text-decoration:none;border-radius:8px"></a></td>
                     </tr>
                     <tr>
                      <td style="padding:0;Margin:0;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif">
                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr class="links">
                          <td align="center" valign="top" width="25.00%" style="padding:0;Margin:0;border:0;padding-top:15px;padding-bottom:15px;padding-left:5px">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/dubai" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;display:block;color:#ffffff;font-size:18px;font-weight:false;font-style:italic">Dubai MUN</a>
                           </div></td>
                          <td align="center" valign="top" width="25.00%" style="padding:0;Margin:0;border:0;padding-top:15px;padding-bottom:15px;padding-left:5px">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/Istanbul" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;display:block;color:#ffffff;font-size:18px;font-weight:false;font-style:italic">Istanbul MUN</a>
                           </div></td>
                          <td align="center" valign="top" width="25.00%" style="padding:0;Margin:0;border:0;padding-top:15px;padding-bottom:15px;padding-left:5px">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/India" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;display:block;color:#ffffff;font-size:18px;font-weight:false;font-style:italic">India MUN</a>
                           </div></td>
                          <td align="center" valign="top" width="25.00%" style="padding:0;Margin:0;border:0;padding-top:15px;padding-bottom:15px;padding-left:5px">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/USA" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;display:block;color:#ffffff;font-size:18px;font-weight:false;font-style:italic">New York MUN</a>
                           </div></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" bgcolor="#cfe2f3" style="padding:0;Margin:0;background-color:#cfe2f3">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" bgcolor="#cfe2f3" style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px;padding-top:30px;background-color:#cfe2f3">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 class="es-m-txt-c" style="Margin:0;font-family:'playfair display', georgia, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:26px;color:#333333">Your Invite to Atsas MUN Dubai, UAE</h2></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l es-text-5003" style="Margin:0;padding-top:15px;padding-right:40px;padding-bottom:15px;padding-left:40px"><h6 class="es-text-mobile-size-18 es-m-txt-c" style="Margin:0;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:21.6px;color:#333333"><strong>Hello ${name}! We missed you at the previous conference. We would love to host you in Dubai from May 02-05, 2025</strong></h6></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:20px;padding-top:20px"><span class="es-button-border" style="border-style:solid;border-color:#5c68e2;background:#5c68e2;border-width:2px;display:inline-block;border-radius:6px;width:auto"><a href="https://www.atsasmun.com/RegisterNow" target="_blank" class="es-button es-button-1621629131049" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px;display:inline-block;background:#5C68E2;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #5C68E2">Register Now and GET A GIFT </a></span></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" bgcolor="#cfe2f3" style="padding:0;Margin:0;background-color:#cfe2f3">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-content-body" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" bgcolor="#cfe2f3" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;background-color:#cfe2f3">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h2 class="es-m-txt-c" style="Margin:0;font-family:'playfair display', georgia, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:31.2px;color:#333333">How is ATSASMUN different from other MUNs?</h2></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#cfe2f3" style="Margin:0;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;background-color:#cfe2f3"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="center" valign="top" class="es-m-p30b" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.atsasmun.com/USA" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_023d4ba30c037afc1882f48c78bbd5e99e53317d1c0246f26671213a3ffa35fa/images/times_square.jpg" alt="" width="270" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;border-radius:0"></a></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h3 class="es-m-txt-c" style="Margin:0;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:12px;font-style:normal;font-weight:bold;line-height:14.4px;color:#333333"><span style="background-color:#eeeeee"><strong><u>September 04th-07th, 2025</u></strong></span></h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px"><h3 class="es-m-txt-c" style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#333333">Your trip to New York, USA is free of charge</h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Delegates who win an award at ATSASMUN Dubai will receive free accommodation and visa assistance for the ATSASMUN New York conference.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.atsasmun.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDesertSafari1.f61bfe43.jpg&w=640&q=75" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_023d4ba30c037afc1882f48c78bbd5e99e53317d1c0246f26671213a3ffa35fa/images/img_4332_pdb.JPEG" alt="" width="270" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h3 class="es-m-txt-c" style="Margin:0;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:12px;font-style:normal;font-weight:bold;line-height:14.4px;color:#333333"><span style="background-color:#eeeeee">Advisor ATSASMUN</span></h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px"><h3 class="es-m-txt-c" style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#333333"><strong>The Ex-President of Istanbul MUN is your Advisor to AtsasMUN</strong></h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Mr. Fasih Ur Rehman embarks on a mission to make <strong>AtsasMUN</strong> one of the world’s greatest MUNs, empowering delegates with bold ideas to excel as diplomats.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#cfe2f3" style="Margin:0;padding-top:10px;padding-right:20px;padding-left:20px;padding-bottom:20px;background-color:#cfe2f3"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><img src="https://ektnimt.stripocdn.email/content/guids/videoImgGuid/images/image17428769849416547.jpeg" alt="" width="270" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px"><p class="es-m-txt-l" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:12px"><span style="background-color:#eeeeee;font-size:14px">Meydan Hotel&nbsp;</span></p></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px"><h3 class="es-m-txt-c" style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#333333">The Hotel with a balcony view of the Race Course of the finest Horses of Dubai</h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Just 15 minutes from the airport and 10 minutes from Dubai Mall, The Meydan Hotel offers modern luxury with an infinity pool, a top-tier golf range, tennis facilities, and a prime location by the world-famous Meydan racetrack.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><img src="https://ektnimt.stripocdn.email/content/guids/videoImgGuid/images/image17428776228496633.jpeg" alt="" width="270" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px"><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><span style="background-color:#eeeeee">Lowest Pricing MUN</span></p></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px"><h3 class="es-m-txt-c" style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#333333">What to expect from AtsasMUN Dubai?</h3></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"></p><p class="es-m-txt-c" style="Margin:0;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">The best conference fee packages so every delegate can attend. Atsas MUN offers top-notch academic simulations together with the chance to experience one of the most famous cities in the world.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:143px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="center" class="es-m-p0r es-m-p20b" style="padding:0;Margin:0;width:133px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="mailto:info@atsasmun.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/17971617974647919.png" alt="" width="45" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Lowest Pricing</p></td>
                     </tr>
                   </table></td>
                  <td class="es-hidden" style="padding:0;Margin:0;width:10px"></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:143px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="center" class="es-m-p20b" style="padding:0;Margin:0;width:133px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.atsasmun.com/uaefee" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/80801617974647921.png" alt="" width="45" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Easy Installment</p></td>
                     </tr>
                   </table></td>
                  <td class="es-hidden" style="padding:0;Margin:0;width:10px"></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:132px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="center" class="es-m-p20b" style="padding:0;Margin:0;width:132px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.atsasmun.com/uaefee" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/77861617974647919.png" alt="" width="45" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Competitive Pricing</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:10px"></td><td style="width:132px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="center" style="padding:0;Margin:0;width:132px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="mailto:info@atsasmun.com" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img src="https://ektnimt.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/59831617975283573.png" alt="" width="45" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Visa Assistance</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-footer" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px;padding-top:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.facebook.com/profile.php?id=61569368703383" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Facebook" src="https://ektnimt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://x.com/atsasmun" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="X" src="https://ektnimt.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.instagram.com/atsasmun" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Instagram" src="https://ektnimt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://youtube.com/atsasmun" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Youtube" src="https://ektnimt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:18px;letter-spacing:0;color:#333333;font-size:12px">© Copyright&nbsp;Atsas Model United Nations. All Rights Reserved.</p></td>
                     </tr>
                     <tr>
                      <td style="padding:0;Margin:0">
                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr class="links">
                          <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Visit Us </a>
                           </div></td>
                          <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;border-left:1px solid #cccccc">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/Privac" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Privacy Policy</a>
                           </div></td>
                          <td align="center" valign="top" width="33.33%" style="Margin:0;border:0;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;border-left:1px solid #cccccc">
                           <div style="vertical-align:middle;display:block">
                            <a target="_blank" href="https://www.atsasmun.com/Terms&conditions" style="mso-line-height-rule:exactly;text-decoration:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;display:block;color:#999999;font-size:12px">Terms &amp; Conditions</a>
                           </div></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="es-content" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
       </table></td>
     </tr>
   </table>
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
