"use strict";
/**
 * Infinity Systems component Base
 *
 * @author Igor Sapegin aka Rendol <sapegin.in@gmail.com>
 */
IS.reg('components.Base', function () {
	return {
		'extends': MK,

		mixins: {},
		target: null,

		constructor: function (data) {
			var me = MK.extend(this, data);
			MK.prototype.constructor.apply(me, arguments);
			me.runInit();
		},
		runInit: function () {
			var me = this;
			if (me.target) {
				me.bindNode('sandbox', me.target);
			}

			MK.each(me.mixins, function (mixin, name) {
				MK.each(mixin, function (value, prop) {
					if (mixin[prop] instanceof Object) {
						MK.extend(me[prop], mixin[prop]);
					}
				});
			});

			// Bindings
			MK.each(me.bindings(), function (callback) {
				callback.call(me, me);
			});

			// Events
			MK.each(me.events(), function (callback) {
				callback.call(me, me);
			});

			me.init();
			me.trigger('init', me);
		},

		init: function () {
		},

		_bindings: {
			//name: function (me) {me.bindNode('name', ':sandbox js-name')}
		},
		_events: {
			//name: function (me) {me.on('name', function (evt) {});}
		},

		bindings: function () {
			return this._bindings;
		},
		events: function () {
			return this._events;
		}
	}
});