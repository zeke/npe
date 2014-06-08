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

# Use a file other than the current directory's package.json
npe name --package=some/other/package.json
npe name other --package=some/other/package.json
