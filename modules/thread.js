const API = require("../core/api.js");

/**
 * Thread is an API module for managing Textile threads
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
class Thread extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /** Retrieves a list of threads */
  async get() {
    const threads = await this.sendGet("/api/v0/threads");
    return threads.data;
  }

  /**
   * Retrieves a thread by its name
   *
   * @param {string} name Name of the thread to find
   */
  async getByName(name) {
    const threads = await this.get();
    for (let i = 0; i < threads.length; i += 1) {
      const thrd = threads[i];
      if (thrd.name.toUpperCase() === name.toUpperCase()) {
        return thrd;
      }
    }
    return null;
  }

  /**
   * Add a new thread to your Textile node
   *
   * @param {string} name The name of the new thread
   * @param {Object} options Additional options to send as headers
   * @param {string} options.schema Schema ID for the new thread
   * @param {string} options.sharing Sharing type for the new thread
   * @example
   * await textile.thread.add("MyMedia", {
   *   schema: mediaSchema.id,
   *   type: "open",
   *   sharing: "shared"
   * })
   */
  async add(name, options) {
    const added = await this.sendPost("/api/v0/threads", [name], options);
    return added.data;
  }
}

module.exports = Thread;
