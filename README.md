# React JWT Auth

### Token based authentication for react.

[![Build Status](https://travis-ci.org/fullstackforger/react-jwt-auth.svg?branch=master)](https://travis-ci.org/fullstackforger/react-jwt-auth)
[![Coverage Status](https://coveralls.io/repos/github/fullstackforger/react-jwt-auth/badge.svg?branch=master)](https://coveralls.io/github/fullstackforger/react-jwt-auth?branch=master)
[![Code Climate](https://codeclimate.com/github/fullstackforger/react-jwt-auth/badges/gpa.svg)](https://codeclimate.com/github/fullstackforger/react-jwt-auth)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4d2136784d334d7f8f4178c7b979d9f2)](https://www.codacy.com/app/fullstackforger/react-jwt-auth?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fullstackforger/react-jwt-auth&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/react-jwt-auth.svg)](https://www.npmjs.com/package/react-jwt-auth)  
[![dependencies Status](https://david-dm.org/fullstackforger/react-jwt-auth/status.svg)](https://david-dm.org/fullstackforger/react-jwt-auth)
[![devDependencies Status](https://david-dm.org/fullstackforger/react-jwt-auth/dev-status.svg)](https://david-dm.org/fullstackforger/react-jwt-auth?type=dev)
[![peerDependencies Status](https://david-dm.org/fullstackforger/react-jwt-auth/peer-status.svg)](https://david-dm.org/fullstackforger/react-jwt-auth?type=peer)

> **Work in progress. Contributions are welcomed!**

## Inspiration

Satellizer, for its simplicity, clear code and maturity was initial source of inspiration. 
As there is no need to reinvent the wheel, some of Satellizer code has been reused where possible and adopted to React.

## Setup

Before you start using component you should configure it, eg:
```
ReactDOM.render(
	<Auth baseUrl="http://localhost:8080/api/">
		<YourAwesomeComponents />
	</Auth>,
	document.getElementById('app')
);
```

More in docs, [configuration](./docs/configuration.md) section. 

## Social buttons

Here is simplest example of social buttons in use inside of your component `reder()` method.

```
render () {
	return (
		<div className="form-group">
			<Facebook clientId="310178806023492" />
			<Google clientId="389760969675-u3h2dgm1v3lqd22u8aloimkgd10i0rvf.apps.googleusercontent.com"	/>
		</div>
	)
}
```

## Testing

You can run all tests with:
```
npm test
```

### Test coverage

We run test coverage with [nyc](https://www.npmjs.com/package/nyc) and [here][nyc-why] is why.
[nyc-why]: http://stackoverflow.com/a/33725069/6096446)

You can run test coverage task locally with:
```
npm run test:coverage
```
It will:
* run all tests
* generate coverage data
* create coverage report files in `./coverage` folder
* check minimum coverage requirements set to 95%

Additionally we use [coveralls.io](https://coveralls.io/) for coverage badge generation.
[![Coverage Status](https://coveralls.io/repos/github/fullstackforger/react-jwt-auth/badge.svg?branch=master)](https://coveralls.io/github/fullstackforger/react-jwt-auth?branch=master)
