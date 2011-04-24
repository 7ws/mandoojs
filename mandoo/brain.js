+function (undefined) {
'use strict';

// logs debug messages if there is a [active] console
function log(message) {
	window.console && console.log('Mandoo: ' + message);
}

var PATH;
log('the core was loaded from ' +
(PATH = (function () {
	for (
	var scripts = document.getElementsByTagName('script'), i = 0,
	l = scripts.length; i < l; i++)
		if (scripts[i].src.slice(-15) === 'mandoo/brain.js')
			return scripts[i].src.slice(0, -8);
})()));

var Mandoo = function () {};
Mandoo.__version__ = 2.9;


window.Mandoo = Mandoo;

}()
