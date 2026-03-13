import Brevo from "sib-api-v3-sdk";

const client = Brevo.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const transEmailApi = new Brevo.TransactionalEmailsApi();

export async function sendVerificationEmail(to: string, token: string) {
  const link = `${process.env.APP_URL}/verify-email?token=${token}`;

  const sendSmtpEmail = {
    subject: "Verify your email",
    sender: { name: "Your App", email: "no-reply@glowingalien.com" },
    to: [{ email: to }],
    htmlContent: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
    params: {
      verification_link: link,
    },
  };

  await transEmailApi.sendTransacEmail(sendSmtpEmail);
}