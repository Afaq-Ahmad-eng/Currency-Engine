// //Internal modules
// import { emailTransporter as transporter } from "../emailTransporter.js";

// export const sendVerificationEmail = async (email, otp) => {
//   try {
//     const mailOptions = {
//       from: `"Your App Team" <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: "Your Account Verification Code",
//       // Plain text fallback dramatically lowers spam score
//       text: `Your verification code is: ${otp}. This code is valid for 5 minutes. If you did not request this, please ignore this email.`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Verify Your Email</title>
//         </head>
//         <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
//                 <tr>
//                     <td align="center" style="padding: 40px 10px;">
//                         <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
//                             <tr>
//                                 <td style="background-color: #4f46e5; height: 6px;"></td>
//                             </tr>
//                             <tr>
//                                 <td style="padding: 40px 30px; color: #333333;">
//                                     <h2 style="margin-top: 0; color: #1f2937; font-size: 22px; font-weight: 700; text-align: center;">Verify Your Account</h2>
//                                     <p style="font-size: 15px; line-height: 1.6; color: #4b5563; text-align: center;">
//                                         Thank you for signing up. Please use the following One-Time Password (OTP) to complete your registration. This code is active for <strong>5 minutes</strong>.
//                                     </p>
                                    
//                                     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
//                                         <tr>
//                                             <td align="center">
//                                                 <div style="background-color: #f3f4f6; border-radius: 6px; padding: 16px 24px; display: inline-block;">
//                                                     <span style="font-family: monospace; font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #1f2937;">${otp}</span>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </table>

//                                     <p style="font-size: 13px; line-height: 1.5; color: #9ca3af; text-align: center; margin-bottom: 0;">
//                                         If you didn't create an account, you can safely ignore this email.
//                                     </p>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//         </html>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw error;
//   }
// };

// sendVerificationEmail.js
import { emailTransporter as transporter } from "../emailTransporter.js";
import crypto from "crypto";

export const sendVerificationEmail = async (email, otp) => {
  try {
    const messageId = `<${crypto.randomUUID()}@${process.env.SMTP_USER.split('@')[1]}>`;

    const mailOptions = {
      from: `"Your App Team" <${process.env.SMTP_USER}>`,
      to: email,
      replyTo: process.env.SMTP_USER, // spam filters penalize missing/mismatched reply-to
      subject: "Your Account Verification Code",
      text: `Your verification code is: ${otp}\n\nThis code is valid for 5 minutes.\n\nIf you did not request this, please ignore this email.`,
      html: buildOtpHtml(otp),
      messageId,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(), // makes each message unique — identical repeated content is a spam signal
        "X-Priority": "3",                       // "normal", not marked urgent (urgency flags raise spam score)
        "Precedence": "bulk",                    // correctly signals automated transactional mail
        "Auto-Submitted": "auto-generated"
      }
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

function buildOtpHtml(otp) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;">
        <tr>
          <td align="center" style="padding:40px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:500px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
              <tr><td style="background-color:#4f46e5;height:6px;"></td></tr>
              <tr>
                <td style="padding:40px 30px;color:#333333;">
                  <h2 style="margin-top:0;color:#1f2937;font-size:22px;font-weight:700;text-align:center;">Verify Your Account</h2>
                  <p style="font-size:15px;line-height:1.6;color:#4b5563;text-align:center;">
                    Thanks for signing up. Use the code below to complete your registration. It's active for <strong>5 minutes</strong>.
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
                    <tr>
                      <td align="center">
                        <div style="background-color:#f3f4f6;border-radius:6px;padding:16px 24px;display:inline-block;">
                          <span style="font-family:monospace;font-size:28px;font-weight:700;letter-spacing:6px;color:#1f2937;">${otp}</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:13px;line-height:1.5;color:#9ca3af;text-align:center;margin-bottom:0;">
                    If you didn't create an account, you can safely ignore this email.
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
}