export const upgradePlanGreetingTemplate = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pumpkin AI - Plan Upgrade</title>
</head>
<body style="margin:0; padding:0; background-color:#0B0E13; font-family:Inter, Arial, sans-serif; color:#ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#0B0E13; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color:#111827; border-radius:16px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.3);">

          <!-- Header -->
          <tr>
            <td style="padding:40px 20px; text-align:center; background:linear-gradient(135deg, #2563eb, #1e3a8a);">
              <h1 style="margin:0; font-size:28px; color:#ffffff; font-weight:900;">🎉 Plan Upgraded Successfully!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 40px; font-size:16px; line-height:1.6; color:#e5e7eb;">
              <p style="margin:0 0 20px;">Hello there,</p>
              <p style="margin:0 0 20px;">We're excited to let you know that your <strong>Pumpkin AI</strong> plan has been successfully upgraded!</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0; background-color:#1f2937; border-radius:12px; padding:20px;">
                <tr>
                  <td style="color:#60a5fa; font-size:18px; font-weight:600; padding-bottom:10px;">Your Upgraded Plan:</td>
                </tr>
                <tr>
                  <td style="color:#d1d5db; font-size:14px;">
                    <p style="margin:0; padding:10px 0;">You now have access to enhanced features and capabilities with your upgraded plan.</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;">Thank you for supporting Pumpkin AI! We can't wait to see the amazing creations you'll make with your upgraded plan.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px; text-align:center; background-color:#111827; font-size:12px; color:#6b7280;">
              <p style="margin:0;">You're receiving this email because you upgraded your plan on Pumpkin AI.</p>
              <p style="margin:5px 0 0;">© 2025 Pumpkin AI. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
