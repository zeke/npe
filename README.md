# npm-skeleton

A boilerplate for creating healthy npm modules.

### The Setup

- [strict mode](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it) JavaScript
- [mocha](visionmedia.github.io/mocha/) test harness with nice output
- [dotenv](https://github.com/bkeepers/dotenv), which reads `.env` into `process.env`.
- a `.gitignore` for `.env` and the `node_modules` directory
- a hollowed-out `package.json`

### Usage

Put this in `.bashrc` or whatever:

```
skeleton() {
  git clone https://github.com/zeke/npm-skeleton $1
  cd $1
  rm -rf ./.git
  echo "FOO=BAR" >> .env
  echo "node_modules" >> .gitignore
  echo ".env" >> .gitignore
  npm install
  npm test
  git init
  git add .
  git commit -am "---=[ npm skeleton ]=---"
}
```

Then pass a name for your new project:

```
skeleton that-new-thang
```
