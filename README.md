# textile-js-sdk

> Javascript SDK for interacting with [Textile nodes](github/textileio/textile-go).

[Detailed API Documentation](https://robbynshaw.github.io/textile-js-sdk/textile-js-sdk/0.1.0/)

## Installation

### From npm

```sh
npm install textile-js-sdk
```

### From Source

```sh
# Clone the repo
git clone github.com/robbynshaw/textile-js-sdk
cd textile-js-sdk
npm install
```

## Getting started

```js
const { Textile } = require("textile-js-sdk");

const textile = new Textile();
const peerid = await textile.peer.get();
console.log("PeerID", peerid);
```

## Development

```sh
# Run all the tests
npm test

# Linting
npm run lint

# Build the docs
npm run build-docs

# See package.json for other scripts
```

## Roadmap

- [x] Add to npm
- [x] Add docs to github pages
