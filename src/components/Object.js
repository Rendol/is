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
				.iSet(data)
				._setOld(data)
				.on('render', function (evt) {
					me.runInit();
				})
			;
		},

		iSet: function() {
			this._setOld(this.toObject());
			this.set.apply(this, arguments);
			return this;
		},

		_setOld: function(data) {
			this.old = $.extend({}, data);
			return this;
		}
	});
});