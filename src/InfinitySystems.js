"use strict";
/**
 * Infinity Systems library
 *
 * @author Igor Sapegin aka Rendol <sapegin.in@gmail.com>
 * @type {{prototypes: {}, classes: {}, reg: Function, get: Function, cls: Function, crt: Function}}
 */
var InfinitySystems = {
	prototypes: {},
	classes: {},
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
			this.classes[name] = Class($.extend(
				true,
				this.get(name),
				prototype
			));
		}
		return this.classes[name];
	},
	crt: function (name, config, prototype) {
		return new (this.cls(name, prototype))(config);
	}
};
var IS = InfinitySystems;