const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { constEnv: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, VIZIT_URL },
  variables: { GMAIL, EMAIL_TEMPLATES } } = require('../config');
const allTemplates = require('../email_templates');
const { ErrorHandler, code,
  errorMessage } = require('../errors');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), EMAIL_TEMPLATES)
  }
});

const transporter = nodemailer.createTransport({
  service: GMAIL,
  auth: {
    user: NO_REPLY_EMAIL,
    pass: NO_REPLY_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, emailAction, context = {
}) => {
  const templateInfo = allTemplates[emailAction];

  if (!templateInfo) {
    throw new ErrorHandler(code.SERVER_ERROR, errorMessage.TemplateNotFound);
  }

  const { subject, templateName } = templateInfo;
  context = {
    ...context, frontendURL: VIZIT_URL
  };

  const html = await templateParser.render(templateName, context);

  return transporter.sendMail({
    from: 'NO reply',
    to: userMail,
    subject,
    html
  });
};

module.exports = {
  sendMail,
};
