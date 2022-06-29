const config = {
  mongoUrl: process.env.DATABASE_URL,
  appUrl: process.env.APP_URL,
  port: process.env.PORT,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
  },
  from: process.env.SMTP_FROM,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  emailVerificationUrl: process.env.EMAIL_VERIFICATION_URL,
  }

  export default config
