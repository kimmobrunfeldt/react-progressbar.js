# Contribution documentation

Pull requests and contributions are warmly welcome.
Please follow existing code style and commit message conventions. Also remember to keep documentation
updated.

**Pull requests:** You don't need to bump version numbers or modify anything related to releasing. That stuff is fully automated, just write the functionality.

## Get started with development

* Run `npm install`
* Run `npm start`

Then you can edit `src/main.js` and changes can be tested in browser.
Edit `local-dev/main.js` to your testing needs.

## General project stuff

This package uses npm/node tools just in the developer environment. NPM scripts are used as a task runner.

#### Versioning

Versioning follows [Semantic Versioning 2.0.0](http://semver.org/). The release script makes sure
that for each release, there exists only one commit in history where version number in *bower.json*
matches the release's version. That commit is tagged as the release, for example `0.4.1`. Commits after that have -dev suffix(*0.4.1-dev*) in the version number to avoid any possible confusion.

In other words, if you look into *bower.json*, you can tell if the code base is a released version or not.

## Testing

No tests for this wrapper module. Original progressbar.js contains tests.

## Release

**Before releasing, make sure there are no uncommitted files,
tests pass and jshint gives no errors.**

Creating a new release of the package is simple:

1. Commit and push all changes
2. Run local tests and linters with `npm test`
3. Make sure Sauce Labs tests pass
4. Run `grunt release`, which will create new tag and publish code to GitHub

    Bower detects your new version of git tag.

5. Edit GitHub release notes

By default, patch release is done. You can specify the version bump as a parameter:

    grunt release:major

Valid version bump values: `major`, `minor`, `patch`.


## Decision log
