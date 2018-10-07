import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-west-2' })

export default () => {
  const sms = {
    send(notification) {
      return new Promise(async(resolve, reject) => {
        const sns = new AWS.SNS({ apiVersion: '2010-03-31' })

        sns.setSMSAttributes({
          attributes: {
            DefaultSMSType: 'Transactional'
          },
          function(error) {
            if (error) reject(error)
          }
        })

        const params = {
          PhoneNumber: notification.to,
          Message: notification.body,
          MessageStructure: 'string'
        }

        sns.publish(params, (err, data) => {
          if (err) { reject(err) }
          resolve()
        })
      })
    }
  }

  return sms;
}