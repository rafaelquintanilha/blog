// This is stored in Netlify
const API_KEY = process.env.REACT_APP_MAILCHIMP_API_KEY
const LIST_ID = process.env.REACT_APP_MAILCHIMP_LIST_ID

const mailchimp = new (require('mailchimp-api-v3'))(API_KEY)

exports.handler = async (event, context) => {
  const { email, path } = JSON.parse(event.body)
  return mailchimp
    .post(`/lists/${LIST_ID}/members`, {
      email_address: email,
      status: 'subscribed',
      tags: ['Blog'],
      merge_fields: {
        URL: path,
      },
    })
    .then(result => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch(err => ({
      statusCode: err.status,
      body: JSON.stringify(err),
    }))
}
