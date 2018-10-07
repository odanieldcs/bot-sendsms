export default (model) => {
  const service = {
    getAllToSend(amount) {
      return new Promise((resolve, reject) => {
        model.find({ sended: false }).sort({ createdAt: 'asc' }).limit(amount)
          .then(items => {
            if (items) { resolve(items) }
            resolve();
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    updateToSended(id) {
      return new Promise((resolve, reject) => {
        model.findById(id)
          .then(notification => {
            const update = notification;

            update.sended = true;
            update.sendedAt = Date.now()

            update.save()

            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }

  return service;
}