# Configuration

## Initial setup

Before you start using *React JWT Auth* module you need point it to your REST URL server.
You can do it passing `baseUrl` param into `Auth` component.

```
<Auth baseUrl="http://localhost:8080/api/" />
```

### Wrapping all components

Easiest method is to wrap your custom components with Auth component.

```
ReactDOM.render(
	<Auth baseUrl="http://localhost:8080/api/">
		<YourAwesomeComponents />
	</Auth>,	
	document.getElementById('app')
)
```

### Wrapping individual components

Alternatively you can wrap only components which require authentication.

```
ReactDOM.render(
	<div>
		<YourAwesomeHeader />
		<Auth baseUrl="http://localhost:8080/api/">
			<YourAwesomeComponents />
		</Auth>	
		<YourAwesomeFooter />
	</div>,
	document.getElementById('app')
)
```

### No wrapping

Primary role of `Auth` component is setting up initial configuration, therefore you don't have to wrap.
Below code will also work.

```
ReactDOM.render(
	<div>			
		<Auth baseUrl="http://localhost:8080/api/" />				
		<YourAwesomeFooter />
	</div>,
	document.getElementById('app')
)
```

## Default configuration

Here is the list of all configuration options. 

```
const authConfig = {
	// --- DEFAULTS ---
	// tokenName: 'if-token',
	// authHeader: 'Authorization',
	// authToken: 'Bearer',
	// baseUrl: '/',
	// loginUrl: 'auth/login',
	// signupUrl: 'auth/signup',
	// refreshUrl: 'auth/refresh',
	// oauthUrl: 'auth/{provider}', // dynamic
	// profileUrl: 'me'
	// --- REQUIRED ---
	baseUrl="http://localhost:8080/api/"
}

ReactDOM.render(
	<Auth {...authConfig} >
		<YourAwesomeComponents />
	</Auth>,
	document.getElementById('app')
)
```