import datasource from './util/datasource'
import sms from './src/sms'
import service from './src/service'
import interval from 'interval-promise'

const db = datasource()
const model = db.models.notifications
const controller = service(model)

async function main() {
  try {
    const notifications = await controller.getAllToSend(5);
  
    if (notifications !== undefined && notifications.length > 0) {
      console.log(`Sending ${notifications.length} SMS`)

      for (let index = 0; index < notifications.length; index++) {
        const notification = notifications[index];
        
        await sms().send(notification)
          .then(() => {
            controller.updateToSended(notification.id)
          })
          .catch(err => {
            console.log('Could not send.')
            console.error(err)
          })
      }
    } else {
      console.log('No SMS to send.')
    } 
  } catch (error) {
    console.error(error)
  }
}

interval(async () => {
  await main()
}, 5000)
