import MailSlurp from 'mailslurp-client'

// @ts-ignore
const mailslurp = new MailSlurp({ apiKey: import.meta.env.VITE_MAILSLURP_API_KEY })

/**
 * Extract the id from an email inbox from mailsurp.
 * @param email
 */
function extractIdFromEmail(email: string): string {
  return email.split('@')[0]
}

export { mailslurp, extractIdFromEmail }
