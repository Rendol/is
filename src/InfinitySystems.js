/**
 * Infinity Systems library
 *
 * @author Igor Sapegin aka Rendol <sapegin.in@gmail.com>
 * @type {{prototypes: {}, classes: {}, reg: Function, get: Function, cls: Function, crt: Function}}
 */
var InfinitySystems = {
	prototypes: {},
	classes: {},
	creater: function(prototype) {
		if ('Class' in window) {
			return Class.apply(arguments);
		}
		return function () {
			return prototype;
		};
	},
	reg: function (name, prototype) {
		this.prototypes[name] = prototype;
	},
	get: function (name) {
		if (!(name in this.prototypes)) {
			console.log('Not found "' + name + '" in IS.prototypes');
		}
		return this.prototypes[name]();
	},
	cls: function (name, prototype) {
		if (!(name in this.classes)) {
			this.classes[name] = this.creater(IS.extend(
				{},
				this.get(name),
				prototype
			));
		}
		return this.classes[name];
	},
	crt: function (name, config, prototype) {
		return new (this.cls(name, prototype))(config);
	},
	extend: function (obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function (source) {
			if (source) {
				for (var prop in source) {
					if (source[prop].constructor === Object) {
						if (!obj[prop] || obj[prop].constructor === Object) {
							obj[prop] = obj[prop] || {};
							IS.extend(obj[prop], source[prop]);
						} else {
							obj[prop] = source[prop];
						}
					} else {
						obj[prop] = source[prop];
					}
				}
			}
		});
		return obj;
	}
};
var IS = InfinitySystems;
