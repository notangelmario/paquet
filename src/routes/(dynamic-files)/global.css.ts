import { asset } from "$fresh/runtime.ts"

const globalCss = `

/* poppins-100 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  src: local(''),
       url(${asset('/fonts/poppins-v20-latin-100.woff2')}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${asset('/fonts/poppins-v20-latin-100.woff')}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* poppins-300 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  src: local(''),
       url(${asset('/fonts/poppins-v20-latin-300.woff2')}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${asset('/fonts/poppins-v20-latin-300.woff')}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url(${asset('/fonts/poppins-v20-latin-regular.woff2')}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${asset('/fonts/poppins-v20-latin-regular.woff')}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* poppins-500 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: local(''),
       url(${asset('/fonts/poppins-v20-latin-500.woff2')}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${asset('/fonts/poppins-v20-latin-500.woff')}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* poppins-700 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  src: local(''),
       url('/fonts/poppins-v20-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/poppins-v20-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}


:root {
	--primary: #8267be;
	--secondary: #D77fa1;
	--error: #ff0000;
	--light: #dddddd;
	--light-dark: #bcbcbc;
	--light-light: #fefefe;
	--dark: #121212;
	--dark-light: #1d1d1d;
	--dark-dark: #070707;
	--border-radius: 1.25rem;
	color-scheme: light dark;
}

html,
body {
	scroll-padding-top: 4rem;
	margin: 0;
	font-family: "Poppins", sans-serif !important;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	overflow-x: hidden;
	background-color: #dddddd;
}

@media (prefers-color-scheme: dark) {
	html,
	body {
		background-color: #121212;
		color: #dddddd;
	}
}

html {
	height: 100%;
}

body {
	display: flex;
	flex-direction: column;
	min-height: 100%;
}

main {
	flex: 1;
}

@media (hover: none) {
	* {
		box-sizing: border-box;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	input,
	input::after,
	input::before {
		-webkit-touch-callout: initial;
		-webkit-user-select: initial;
		-khtml-user-select: initial;
		-moz-user-select: initial;
		-ms-user-select: initial;
		user-select: initial;
	}

	*::-webkit-scrollbar {
		display: none;
	}

	* {
		scrollbar-width: none;
	}
}

*::-webkit-scrollbar {
	width: 0.75rem;
	height: 0.75rem;
}

*::-webkit-scrollbar-track {
	background: #dddddd;
}

*::-webkit-scrollbar-thumb {
	background: #cccccc;
	transition: background 0.2s ease-in-out;
	border-radius: 0.95rem;
}

*::-webkit-scrollbar-thumb:hover {
	background: #bbbbbb;
}

@media (prefers-color-scheme: dark) {
	*::-webkit-scrollbar-track {
		background: #121212;
	}

	*::-webkit-scrollbar-thumb {
		background: #212121;
	}

	*::-webkit-scrollbar-thumb:hover {
		background: #323232;
	}
}

::selection {
	background-color: #8267be;
	color: #fff;
}

button:focus {
	outline: none !important;
}

a {
	color: inherit;
	text-decoration-line: none;
}
`

export const handler = () =>
	new Response(globalCss, {
		headers: {
			"content-type": "text/css",
			"cache-control": "public, max-age=31536000, immutable",
		},
	});
