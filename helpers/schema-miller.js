const toposort = require("toposort");

class SchemaMiller {
  static sortLinksByDependency(links) {
    // Create an array of [ name, dependency ] for sorting
    const linkAndDepends = Object.entries(links).map(([name, link]) => {
      return [name, link.use];
    });

    // Sort the array into an execution order
    const sorted = toposort(linkAndDepends).reverse();

    // Refill the items in the sorted array
    return (
      sorted
        // File is the original form so we don't need a method
        .filter(name => {
          return name !== ":file";
        })
        .map(name => {
          const link = links[name];
          link.name = name;
          return link;
        })
    );
  }

  static normalizeOptions(schemaLink) {
    const opts = schemaLink.opts || {};

    // Check for top level opts
    opts.plaintext = schemaLink.plaintext || opts.plaintext || false;
    opts.pin = schemaLink.pin || opts.pin || false;

    return {
      ...schemaLink,
      opts
    };
  }

  static resolveDependency(method, payloadsByName) {
    let use;

    // Convert 'use' to hash of payload
    if (method.use !== ":file") {
      use = payloadsByName[method.use].hash;
    }

    const resolvedMethod = {
      ...method
    };
    resolvedMethod.opts = resolvedMethod.opts || {};
    resolvedMethod.opts.use = use;
    return resolvedMethod;
  }

  // payload = Form: { 'file', file, file.name }
  // TODO payload could be a stream or a form
  static async mill(payload, schemaLinks, remoteMill) {
    const sorted = SchemaMiller.sortLinksByDependency(schemaLinks);

    const payloadsByName = {};
    for (let i = 0; i < sorted.length; i += 1) {
      let body = payload;
      const normal = SchemaMiller.normalizeOptions(sorted[i]);
      const resolved = SchemaMiller.resolveDependency(normal, payloadsByName);

      if (resolved.opts.use) {
        // It's a file. The hash will pass as the payload.
        // Don't send the file again
        body = undefined;
      }

      // Must be synchronous for dependencies
      // eslint-disable-next-line no-await-in-loop
      const milled = await remoteMill(resolved, body);
      payloadsByName[milled.name] = milled;
    }

    return payloadsByName;
  }
}

module.exports = SchemaMiller;
