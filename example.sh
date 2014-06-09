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
npm keywords "foo, bar, cheese whiz"
npm keywords "foo bar baz"

# The current working directory's package.json is used by default,
# but you can point to another package file with a flag:
npe name --package=some/other/package.json
npe name other --package=some/other/package.json
