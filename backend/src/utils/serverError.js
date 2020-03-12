export default class ServerError extends Error {
  constructor(message, code = 400) {
    super(message)

    Error.call(this)
    Error.captureStackTrace(this, ServerError)
    this.code = code
  }
}