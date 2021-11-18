
cd some/node/package

# Get values from package.json
npe name
npe scripts
npe scripts.test
npe repository.url
open $(npe repository.url)

# Set values in package.json
npe name foo
npe scripts.start "node index.js"

# Keywords string will be convert to an array
# If commas are present, they're the delimiter. Otherwise spaces.
npm keywords "foo, bar, cheese whiz"
npm keywords "foo bar baz"

# 'true' and 'false' strings will be converted to booleans
npm private true

# The current working directory's package.json is used by default,
# but you can point to another package file with the --package flag:
npe name --package=some/other/package.json
npe name other --package=some/other/package.json

# Deleting a key is done with the --delete flag:
npe --delete main
