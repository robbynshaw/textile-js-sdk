# textile-js-sdk

> Javascript SDK for interacting with [Textile nodes](github/textileio/textile-go).

## Installation

```sh
# Clone the repo
git clone github.com/robbynshaw/textile-js-sdk
cd textile-js-sdk
npm install
```

## Getting started

```js
const Textile = require("./textile-js-sdk");

const textile = new Textile();
await textile.peer.get();
// return PeerID of local node
```

## Development

```sh
// Run all the tests
npm test

// Linting
npm run lint

// Build the docs
npm run build-docs

// See package.json for other scripts
```

## Roadmap

- [ ] Add to npm
- [ ] Add docs to github pages
