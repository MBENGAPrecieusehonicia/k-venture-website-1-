// Service d'envoi d'emails avec nodemailer
import nodemailer from "nodemailer"

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export class EmailService {
  static async sendEmail({ to, subject, html, from = "K-Venture <fabriqueecole241@gmail.com>" }: EmailData) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
      })

      return { success: true, data: info }
    } catch (error) {
      console.error("Erreur service email:", error)
      return { success: false, error }
    }
  }

  // Template pour email de bienvenue newsletter
  static getWelcomeNewsletterTemplate(firstName?: string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Bienvenue chez K-Venture</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #2E7D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Bienvenue chez K-Venture !</h1>
              <p>Merci de vous être inscrit(e) à notre newsletter</p>
            </div>
            <div class="content">
              <p>Bonjour ${firstName || ""},</p>
              <p>Nous sommes ravis de vous compter parmi nos abonnés ! Vous recevrez désormais :</p>
              <ul>
                <li>📚 Nos meilleurs conseils en leadership</li>
                <li>🎯 Des stratégies de transformation organisationnelle</li>
                <li>📈 Les tendances du management moderne</li>
                <li>🎪 Nos invitations exclusives aux événements</li>
              </ul>
              <p>En attendant, découvrez nos services de coaching transformationnel :</p>
              <a href="https://k-venture.com/services" class="button">Découvrir nos services</a>
              <p>À très bientôt,<br><strong>L'équipe K-Venture</strong></p>
            </div>
            <div class="footer">
              <p>K-Venture - Coaching Transformationnel<br>
              Libreville, Gabon | fabriqueecole241@gmail.com</p>
              <p><a href="{{unsubscribe_url}}">Se désabonner</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  // Template pour confirmation de contact
  static getContactConfirmationTemplate(firstName: string, lastName: string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Demande reçue - K-Venture</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #C8E6C9; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Demande bien reçue !</h1>
              <p>Nous vous recontacterons sous 24h</p>
            </div>
            <div class="content">
              <p>Bonjour ${firstName} ${lastName},</p>
              <p>Merci pour votre intérêt pour K-Venture ! Nous avons bien reçu votre demande.</p>
              <div class="highlight">
                <p><strong>⏰ Prochaines étapes :</strong></p>
                <ul>
                  <li>Analyse de votre demande par notre équipe</li>
                  <li>Prise de contact sous 24h ouvrées</li>
                  <li>Proposition d'un rendez-vous découverte gratuit</li>
                </ul>
              </div>
              <p>En attendant, n'hésitez pas à :</p>
              <ul>
                <li>📖 Consulter nos <a href="https://k-venture.com/blog">articles de blog</a></li>
                <li>📱 Nous suivre sur <a href="#">LinkedIn</a></li>
                <li>📧 Télécharger notre <a href="https://k-venture.com/blog">e-book gratuit</a></li>
              </ul>
              <p>À très bientôt,<br><strong>Sylvère Boussamba</strong><br>Coach Certifié John C. Maxwell</p>
            </div>
            <div class="footer">
              <p>K-Venture - Coaching Transformationnel<br>
              📞 +241 77 32 32 11| 📧 fabriqueecole241@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  // Template pour téléchargement e-book
  static getEbookDownloadTemplate(firstName: string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Votre e-book est prêt ! - K-Venture</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2E7D32, #4CAF50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .download-button { display: inline-block; background: #2E7D32; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; }
            .ebook-preview { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2E7D32; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📚 Votre e-book est prêt !</h1>
              <p>Guide du Leadership Transformationnel</p>
            </div>
            <div class="content">
              <p>Bonjour ${firstName},</p>
              <p>Merci pour votre intérêt ! Voici votre exemplaire gratuit du <strong>"Guide du Leadership Transformationnel"</strong>.</p>
              
              <div class="ebook-preview">
                <h3>📖 Ce que vous allez découvrir :</h3>
                <ul>
                  <li>✅ Les 7 piliers du leadership transformationnel</li>
                  <li>✅ Outils d'auto-évaluation et exercices pratiques</li>
                  <li>✅ Études de cas et exemples concrets</li>
                  <li>✅ Plan d'action personnalisé</li>
                  <li>✅ Méthodes éprouvées par 500+ leaders</li>
                </ul>
              </div>

              <div style="text-align: center;">
                <a href="#" class="download-button">📥 Télécharger l'e-book (PDF)</a>
              </div>

              <p><strong>💡 Conseil :</strong> Imprimez les pages d'exercices pour une meilleure expérience d'apprentissage !</p>
              
              <p>Besoin d'un accompagnement personnalisé ? Réservez votre consultation gratuite de 30 minutes :</p>
              <p style="text-align: center;">
                <a href="https://k-venture.com/contact" style="color: #2E7D32; font-weight: bold;">📅 Réserver ma consultation gratuite</a>
              </p>

              <p>Excellente lecture !<br><strong>Sylvère Boussamba</strong></p>
            </div>
            <div class="footer">
              <p>K-Venture - Coaching Transformationnel<br>
              Libreville, Gabon | fabriqueecole241@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
}
