"use server";

import transporter from "@/lib/nodemailer";

const emailTemplate = {
  // Main container styles
  container: `
    max-width: 600px;
    margin: 0 auto;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `,

  // Header section
  header: `
    background: rgba(255,255,255,0.1);
    padding: 40px 30px;
    text-align: center;
    backdrop-filter: blur(10px);
  `,

  // Logo/Brand
  brand: `
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    letter-spacing: -0.5px;
  `,

  // Subtitle
  subtitle: `
    font-size: 16px;
    color: rgba(255,255,255,0.9);
    margin: 0;
    font-weight: 400;
  `,

  // Content area
  content: `
    background: #ffffff;
    padding: 50px 40px;
    position: relative;
  `,

  // Main title
  title: `
    font-size: 32px;
    color: #2d3748;
    margin: 0 0 20px 0;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
  `,

  // Description text
  description: `
    font-size: 18px;
    color: #4a5568;
    line-height: 1.6;
    margin: 0 0 35px 0;
    text-align: center;
    font-weight: 400;
  `,

  // CTA Button
  button: `
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    border: none;
    cursor: pointer;
    letter-spacing: 0.5px;
  `,

  // Button container
  buttonContainer: `
    text-align: center;
    margin: 35px 0;
  `,

  // Footer
  footer: `
    background: #f7fafc;
    padding: 30px 40px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
  `,

  // Footer text
  footerText: `
    font-size: 14px;
    color: #718096;
    margin: 0 0 10px 0;
    line-height: 1.5;
  `,

  // Divider
  divider: `
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
    margin: 30px 0;
    border: none;
  `,

  // Decorative elements
  decoration: `
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 50%;
    z-index: 0;
  `,

  // Content wrapper to ensure content is above decoration
  contentWrapper: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  `,
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
    buttonText?: string;
  };
}) {
  const currentYear = new Date().getFullYear();

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `🚀 Reative Platform - ${subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
      </head>
      <body style="margin: 0; padding: 0; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        
        <!-- Main Container -->
        <div style="${emailTemplate.container}">
          
          <!-- Header Section -->
          <div style="${emailTemplate.header}">
            <h1 style="${emailTemplate.brand}">Reative Platform</h1>
            <p style="${emailTemplate.subtitle}">Sua plataforma de desenvolvimento reativo</p>
          </div>
          
          <!-- Content Section -->
          <div style="${emailTemplate.content}">
            <!-- Decorative Element -->
            <div style="${emailTemplate.decoration}"></div>
            
            <!-- Content Wrapper -->
            <div style="${emailTemplate.contentWrapper}">
              <h2 style="${emailTemplate.title}">${subject}</h2>
              
              <hr style="${emailTemplate.divider}">
              
              <p style="${emailTemplate.description}">${meta.description}</p>
              
              <!-- CTA Button -->
              <div style="${emailTemplate.buttonContainer}">
                <a href="${meta.link}" style="${emailTemplate.button}">
                  ${meta.buttonText || "Continuar"} →
                </a>
              </div>
              
              <hr style="${emailTemplate.divider}">
              
              <!-- Additional Info -->
              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #667eea; margin: 20px 0;">
                <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                  <strong>💡 Dica:</strong> Se você não solicitou esta ação, pode ignorar este email com segurança.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer Section -->
          <div style="${emailTemplate.footer}">
            <p style="${emailTemplate.footerText}">
              <strong>Reative Platform</strong><br>
              Desenvolvendo o futuro, hoje.
            </p>
            <p style="${emailTemplate.footerText}">
              © ${currentYear} Reative Platform. Todos os direitos reservados.
            </p>
            <p style="font-size: 12px; color: #a0aec0; margin: 15px 0 0 0;">
              Este é um email automático, por favor não responda.<br>
              Se precisar de ajuda, entre em contato conosco através do nosso suporte.
            </p>
          </div>
          
        </div>
        
        <!-- Mobile Responsive Styles -->
        <style>
          @media only screen and (max-width: 600px) {
            .email-container {
              margin: 10px !important;
              border-radius: 12px !important;
            }
            .content-padding {
              padding: 30px 20px !important;
            }
            .header-padding {
              padding: 30px 20px !important;
            }
            .footer-padding {
              padding: 20px !important;
            }
            .title-mobile {
              font-size: 24px !important;
            }
            .description-mobile {
              font-size: 16px !important;
            }
            .button-mobile {
              padding: 14px 28px !important;
              font-size: 15px !important;
            }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .email-body {
              background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
            }
          }
        </style>
        
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email enviado com sucesso!" };
  } catch (error) {
    console.error("sendEmailAction error", error);
    return {
      success: false,
      message: "Erro ao enviar email. Tente novamente mais tarde.",
    };
  }
}
