krr!
====

krr! is a small rss client mostly working with backbone and node.


Are you:

- <a href="#installation-user-part">A user</a>?
- <a href="#installation-developer-part">A developer</a>?

---

## Installation: Developer part

### Ruby dependencies

```
gem install compass animation --pre
```

### NPM dependencies

```
npm install bower -g && npm install
```

### Bower dependencies

```
bower install
```

### WebFont dependencies

#### OS X

```
brew install fontforge ttfautohint
brew install https://raw.github.com/sapegin/grunt-webfont/master/Formula/sfnt2woff.rb
npm install grunt-webfont --save-dev
```

You may need to use `sudo` for `brew`, depending on your setup.

#### Linux

```
sudo apt-get install fontforge eot-utils ttfautohint
wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip
unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/
npm install grunt-webfont --save-dev
```

*Note that if `ttfautohint` is not available in your distribution, your generated font will not be properly hinted.*

## Client compilation

```
grunt dev
```

---

## Installation: User part

For the moment, as I don't distribute an out-of-box solution, I've versioned the  ```client``` folder which is a compilation of the ```src``` folder. Later, I'll remove this folder and distribute an easy way to run the application. Just run this command:

```
npm installation
```

---

## Start the game

```
npm start
```

---

## Change my rss

Go to ```server/db/feeds.json``` and add yours.


