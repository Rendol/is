"use strict";
/**
 * Infinity Systems component Object
 *
 * @author Igor Sapegin aka Rendol <sapegin.in@gmail.com>
 */
IS.reg('components.Object', function () {
	return MK.extend(IS.get('components.Base'), {
		'extends': MK.Object,

		old: {},

		constructor: function (data) {
			var me = this;
			MK.Object.prototype.constructor.apply(me, arguments);
			me
				._setOld(data)
				.set(data)
				.on('render', function (evt) {
					me.runInit();
				})
			;
		},

		_setOld: function(data) {
			this.old = data;
			return this;
		}
	});
});