export default (conn, mongoose) => {
  return conn.model("notifications", new mongoose.Schema({
    to: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sended: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdAt: Date,
    sendedAt: Date,
  }));
};
