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


function Class(bases, body) {
	var _bases, init, i, k, proto;
	/*
	A simple constructor factory based on class-like definition syntax.
	The inheritance works for the bases' prototypes only instead of both
	prototypes and static properties.
	*/
	if (bases && bases.constructor != Array) {
		body = bases;
		bases = [];
	}
	if (!bases) bases = [];
	if (!body) body = {};
	
	init = function () {
		if (this.constructor === init && proto.__init__)
			proto.__init__.apply(this, arguments);
	};

	proto = init.prototype;
	_bases = [];

	init.__bases__ = function () {
		return _bases;
	};

	init._extend = function (ext)
	{ var k;
		if (ext.constructor !== Function)
			throw new TypeError('extension should be a constructor.');

		_bases.push(ext);
		
		ext = ext.prototype;
		for (k in ext)
			if (ext.hasOwnProperty(k) && !proto.hasOwnProperty(k))
				proto[k] = ext[k];
	};

	proto._super = _super;

	for (i = 0; i < bases.length; i++)
		init._extend(bases[i]);
	
	for (k in body)
		if (body.hasOwnProperty(k))
			if (!k.indexOf('$'))  // static properties
				init[k.slice(1)] = body[k];
			else
				proto[k] = body[k];
	
	proto.constructor = init;

	return init;
}

function _super(method_name)
{ var method, this_;
	this_ = this;

	function search(constructor)
	{ var proto, bases, i, method;
		bases = constructor.__bases__()
		for (i = 0; i < bases.length; i++) {
			proto = bases[i].prototype;

			if (proto.hasOwnProperty(method_name)
			&& proto[method_name] !== this_[method_name])
				return proto[method_name];
			
			if (method = search(bases[i]))
				return method;
		}
	}

	if (method = search(this.constructor))
		return function () {
			return method.apply(this_, arguments);
		}
}


var Mandoo = Class({
	$__version__: 2.9
});


window.Class = Class;
window.Mandoo = Mandoo;

}()
