# npe [![Build Status](https://travis-ci.org/zeke/npe.png?branch=master)](https://travis-ci.org/zeke/npe)

Node Package Editor: a CLI for one-off inspection and editing of properties in package.json files.

See also [dot-json](https://github.com/maikelvl/dot-json), a CLI for editing
any JSON file.

## Installation

```sh
npm install npe --global
```

## Usage

```sh
cd some/node/project

# Get stuff from package.json
npe name
npe scripts
npe scripts.test
npe repository.url
open $(npe repository.url)

# Set stuff in package.json
npe name foo
npe scripts.start "node index.js"

# Keywords string will be turned into an array
# If commas are present, they'll be the delimiter. Otherwise spaces.
npe keywords "foo, bar, cheese whiz"
npe keywords "foo bar baz"

# The current working directory's package.json is used by default,
# but you can point to another package file with a flag:
npe name --package=some/other/package.json
npe name other --package=some/other/package.json
```

## License

MIT
