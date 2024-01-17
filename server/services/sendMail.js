import sgEmail from "@sendgrid/mail";

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, body) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
          <div>
              <h1>${subject}</h1>
              <p>${body}</p>
          </div>
          `,
    };
    await sgEmail.send(msg);
  } catch (error) {
    console.log("Error en el envío del email", error);
  }
};

export default sendMail;
