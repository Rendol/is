"use strict";
/**
 * Infinity Systems component Array
 *
 * @author Igor Sapegin aka Rendol <sapegin.in@gmail.com>
 */
IS.reg('components.Array', function () {
    return MK.extend(IS.get('components.Base'), {
        'extends': MK.Array,

        primaryKey: 'id',

        constructor: function (data) {
            var me = MK.extend(this, data);
            MK.Array.prototype.constructor.apply(me);
            me.runInit();
        },

        find: function () {
            var me = this;
            if (+arguments[0] > 0) {
                var id = arguments[0];
                return this.filter(function (item) {
                    return item[me.primaryKey] == id;
                });
            }
            else if (arguments.length == 2) {
                var key = arguments[0];
                var val = arguments[1];
                return this.filter(function (item) {
                    return item[key] == val;
                });
            }
        },
        findOne: function () {
            return this.find.apply(this, arguments)[0];
        },
        index: function () {
            var result = -1,
                val,
                key = this.primaryKey;

            if (arguments.length == 2) {
                key = arguments[1];
            }

            if (+arguments[0] > 0) {
                val = arguments[0];
            }
            else if (arguments[0] instanceof Object) {
                val = arguments[0][key];
            }

            this.each(function (item, index) {
                if (item[key] == val) {
                    result = index;
                    return false;
                }
            });

            return result;
        },
        del: function () {
            var index = this.index.apply(this, arguments);
            if (-1 !== index) {
                var item = this[index];
                this.trigger('del', item);
                return this.splice(index, 1);
            }
            return null;
        },
        delWithDom: function () {
            var index = this.index.apply(this, arguments);
            if (-1 !== index) {
                var item = this[index];
                this.trigger('del', item);
                return this.splice_(index, 1, {moveSandbox: true});
            }
            return null;
        },

        load: function (data) {
            this._update(data, 'load');
        },
        create: function (data) {
            this._update(data, 'create');
        },
        update: function (data) {
            this._update(data, 'update');
        },

        _update: function (data, action) {
            var me = this;
            if (!(data instanceof Array)) {
                data = [data];
            }
            $.each(data, function () {
                var dataItem = this;
                var exists = me.filter(function (item) {
                    return item[me.primaryKey] == dataItem[me.primaryKey];
                });
                if (exists.length) {
                    exists[0].iSet(dataItem);
                }
                else {
                    var method = action == 'load' ? 'unshift' : 'push';
                    var record = new me.Model(dataItem);
                    record.parent = me;
                    me[method](record);
                }
            });
            me.trigger(action, data);
        }
    });
});