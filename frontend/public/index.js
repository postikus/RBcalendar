/* global jQuery, rb_calendar */

///
/// Immediately-invoked Function Expressions (IIFE)s
/// rb_calendar Extension
/// Module Pattern with Imports and Exports
///

;(function($public, $window, undefined) {
    var _private = {};
    _private = {
        state: 'start_init',
        mode: 'test',
        mount_id: '#calendar-app',
        foobar: 'foobar_private',
        cur_date: new Date(),
        days_in_row: 7
    };

    var cl = function(msg){
        if(_private.mode === 'test'){
            console.log(msg);
        }
    };

    _private.CalendarObj = function (_date, _days_in_row){
        var self = this;
        self.init_date = _date;
        self.this_full_date = new Date((1900 + _date.getYear()), _date.getMonth(), 1);
        self.days_in_row = _days_in_row;
        // console.log(self.this_full_date);
        self.month_array = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        self.this_month = self.this_full_date.getMonth();
        self.this_month_name_ru = self.month_array[self.this_month];
        self.this_year = (1900 + self.this_full_date.getYear());
        self.this_days_in_month = self.daysInMonth(self.this_year, self.this_month);
        self.this_month_first_dayweek = new Date(self.this_year, self.this_month, 1).getDay();
        self.this_month_first_dayweek === 0 ? self.this_month_first_dayweek = 7 : '';
        self.next_month_num = self.get_next_month_num(self.this_month);
        self.prev_month_num = self.get_prev_month_num(self.this_month);
    };
    _private.CalendarObj.prototype.cl = function () {
        var self = this;
        cl('-----------CALENDAR OBJ------------------->');
        cl(self);
        cl('<-----------CALENDAR OBJ-------------------');
    };
    _private.CalendarObj.prototype.set_this_month = function (){
        this.this_month = this.this_full_date.getMonth();
    };
    _private.CalendarObj.prototype.set_month_name_ru = function (){
        this.this_month_name_ru = this.month_array[this.this_month];
    };
    _private.CalendarObj.prototype.set_this_full_date = function (){
        this.this_year = (1900 + this.this_full_date.getYear());
    };
    _private.CalendarObj.prototype.set_this_days_in_month = function (){
        var self = this;
        self.this_days_in_month = self.daysInMonth(self.this_year, self.this_month);
    };
    _private.CalendarObj.prototype.set_this_month_first_dayweek = function (){
        this.this_month_first_dayweek = new Date(this.this_year, this.this_month, 1).getDay();
        this.this_month_first_dayweek === 0 ? this.this_month_first_dayweek = 7 : '';
    };
    _private.CalendarObj.prototype.set_next_prev_num = function (){
        var self = this;
        self.next_month_num = self.get_next_month_num(self.this_month);

    };
    _private.CalendarObj.prototype.set_next_month_num = function (){
        var self = this;
        self.prev_month_num = self.get_prev_month_num(self.this_month);
    };
    _private.CalendarObj.prototype.daysInMonth = function (year, month) {
        // console.log(year);
        // console.log(month);
        // console.log('wa' + new Date(year, (month+1), 0));
        // console.log(new Date(year, (month+1), 0));

        return new Date(year, month+1, 0).getDate();
    };
    _private.CalendarObj.prototype.get_next_month_num = function (month_num) {
        var next_month_num = month_num;
        return next_month_num === 11 ? 0 : ++next_month_num;
    };
    _private.CalendarObj.prototype.get_prev_month_num = function (month_num) {
        var prev_month_num = month_num;
        return prev_month_num === 0 ? 11 : --prev_month_num;
    };
    _private.CalendarObj.prototype.change_month_num = function (_this, _new_month) {
        _this.this_full_date = new Date(_this.this_year, _new_month, 1);
    };
    _private.CalendarObj.prototype.init_calendar_view = function($_calendar_v_mount_obj){
        cl('calendar view init');
        var calendar_view_html = '';
        $_calendar_v_mount_obj.html(calendar_view_html);
        cl('calendar view mounted');
    };
    _private.CalendarObj.prototype.get_calendar_view_button_container = function () {
        var __calendar_view_button_html = '';
        __calendar_view_button_html += '<div class="col-12 text-right filters-header-icons">';
        __calendar_view_button_html += '<i class="fas fa-th fa-active calendar-view-button"></i> ';
        __calendar_view_button_html += '<i class="fas fa-list list-view-button"></i>';
        __calendar_view_button_html += '</div>';
        return __calendar_view_button_html;
    };
    _private.CalendarObj.prototype.get_search_html = function () {
        var __search_html = '';
        __search_html += '<input class="form-control" class="calendar-search" placeholder="Поиск">';
        return __search_html;
    };
    _private.CalendarObj.prototype.get_checkbox_html = function (__q_object) {
        var __checkbox_html = '';
        __checkbox_html +=   '<div class="form-check">';
        __checkbox_html +=   '<input class="form-check-input" type="checkbox" value="" id="'+__q_object.id+'">';
        __checkbox_html += '<label class="form-check-label" for="'+__q_object.id+'">';
        __checkbox_html += __q_object.label;
        __checkbox_html += '</label>';
        __checkbox_html += '</div>';
        return __checkbox_html;
    };
    _private.CalendarObj.prototype.get_checkboxs_html = function (__q_object) {
        var __checkboxs_html = '';
        __checkboxs_html += '<div class="filter-name" id="'+__q_object.id+'">'+__q_object.label+'</div>';
        for (var __checkbox_counter = 0; __checkbox_counter < __q_object.checkbox_array.length; __checkbox_counter++){
            __checkboxs_html += '<div class="form-check">';
            __checkboxs_html += '<input class="form-check-input" type="checkbox" value="" id="'+__q_object.checkbox_array[__checkbox_counter].id+'">';
            __checkboxs_html += '<label class="form-check-label" for="'+__q_object.checkbox_array[__checkbox_counter].id+'">';
            __checkboxs_html += __q_object.checkbox_array[__checkbox_counter].label;
            __checkboxs_html += '</label>';
            __checkboxs_html += '</div>';
        }
        return __checkboxs_html;
    };
    _private.CalendarObj.prototype.get_filters_row_container = function (type, q_object) { //search/checkbox/checkboxs
        var __filter_row_html = '';
        __filter_row_html += '<div class="row filter-row-container">';
        __filter_row_html += '<div class="col-12 filter-col-container">';
        switch (type){
            case 'search':
                __filter_row_html += _private.CalendarObj.prototype.get_search_html();
                break;
            case 'checkbox':
                __filter_row_html += _private.CalendarObj.prototype.get_checkbox_html(q_object);
                break;
            case 'checkboxs':
                __filter_row_html += _private.CalendarObj.prototype.get_checkboxs_html(q_object);
                break;
            default:
                __filter_row_html += '';
                break;
        }
        __filter_row_html += '</div>';
        __filter_row_html += '</div>';
        return __filter_row_html;
    };
    _private.CalendarObj.prototype.get_filters_html = function(){
        var filters_html = '';
        filters_html += '<div class="row" id="filters-header-container">';
        filters_html += _private.CalendarObj.prototype.get_calendar_view_button_container();
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('search');
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkbox', {id: 'defaultCheck9', label: 'Я участвую'});
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkbox', {id: 'defaultCheck8', label: 'Открыта регистрация'});
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'test1',
            label: 'Форма обучения:',
            checkbox_array:[
                {id: 'defaultCheck1', label: 'Внешнее'},
                {id: 'defaultCheck2', label: 'Внутреннее'}
            ]
        });
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'test2',
            label: 'Для кого:',
            checkbox_array:[
                {id: 'defaultCheck3', label: 'Для руководителей'},
                {id: 'defaultCheck4', label: 'Для сотрудников'}
            ]
        });
        filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'test3',
            label: 'Тип:',
            checkbox_array:[
                {id: 'defaultCheck5', label: 'Тренинги личной эффективности'},
                {id: 'defaultCheck6', label: 'Менеджерские программы'},
                {id: 'defaultCheck7', label: 'Профессиональное обучение'}
            ]
        });


        return filters_html;
    };
    _private.CalendarObj.prototype.get_calendar_header_html = function(__calendar_object){
        var __calendar_header_html = '';
        __calendar_header_html += '<div class="row justify-content-center month-select-container">';
        __calendar_header_html += '<div class="col text-center month-select-arrow-name">';
        __calendar_header_html += '<span class="month-select-left-button">' +
            '<button type="button" class="btn btn-outline-secondary btn-sm month-select-arrow-left-button"><</button>' +
            '</span>';
        __calendar_header_html += '<span class="month-select-name-container">';
        __calendar_header_html += __calendar_object.this_month_name_ru + ' ' + __calendar_object.this_year;
        __calendar_header_html += '</span>';
        __calendar_header_html += '<span class="month-select-right-button">' +
            '<button type="button" class="btn btn-outline-secondary btn-sm month-select-arrow-right-button">></button>' +
            '</span>';
        __calendar_header_html += '</div>';
        __calendar_header_html += '</div>';

        return __calendar_header_html;
    };
    _private.CalendarObj.prototype.get_weekdayheaders = function(__calendar_object){
        var calendar_weekday_html = '';
        var weekdays_name_rus_array = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскреcение'];
        calendar_weekday_html += '<div class="row" class="calendar-weekdays-container">';
        calendar_weekday_html += '<div class="col-12" class="weekdays-container">';
        for (var weekday_counter = 0; weekday_counter < __calendar_object.days_in_row; weekday_counter++){
            calendar_weekday_html += '<div class="weekday-name">'+weekdays_name_rus_array[weekday_counter]+'</div>';
        }
        calendar_weekday_html += '</div>';
        calendar_weekday_html += '</div>';

        return calendar_weekday_html;
    };
    _private.CalendarObj.prototype.get_calendar_cell_html = function (__date, __id, ex, __calendar_object) {
        var __calendar_cell_html = '';
        cl(new Date(__calendar_object.this_year, __calendar_object.this_month, __date, 0).setHours(0,0,0,0));
        cl(__calendar_object.init_date.setHours(0,0,0,0));
        __calendar_cell_html += '<div class="calendar-cell' + ( ( (__calendar_object.init_date.setHours(0,0,0,0)) === (new Date(__calendar_object.this_year, __calendar_object.this_month, __date, 0).setHours(0,0,0,0)) ) ? " calendar-cell-today" : "" ) + '"'+( ex ? " data-ex" : "" )+' '+( __id ? " data-id="+__id+"" : "" ) + '>' +
            '<div class="calendar-cell-date text-right">'+__date+'</div>' +
            '<div class="calendar-cell-event-wrapper"></div>' +
            '</div>';
        return __calendar_cell_html;
    };
    _private.CalendarObj.prototype.get_calendar_row_cells_html = function (__calendar_object, __cells_array) {
        var __row_cells_html = '';
        __row_cells_html += '<div class="row calendar-cells">';
        __row_cells_html += '<div class="col-12">';
        for (var __cell_counter = 0; __cell_counter < __calendar_object.days_in_row; __cell_counter++){
            __row_cells_html += _private.CalendarObj.prototype.get_calendar_cell_html(__cells_array[__cell_counter].date, __cells_array[__cell_counter].id, __cells_array[__cell_counter].ex, __calendar_object);
        }
        __row_cells_html += '</div>';
        __row_cells_html += '</div>';
        return __row_cells_html;
    };
    _private.CalendarObj.prototype.get_calendar_block_html = function (__calendar_object) {
        __calendar_object.cl();
        var __calendar_obj_array = []; //[[{},{}...],[...],[],[],[]]
        var row_count = 5;
        var __overall_date_counter = 1;
        var __this_row_cell_counter = 0;
        var prev_months_days_count = __calendar_object.daysInMonth(__calendar_object.this_year, __calendar_object.prev_month_num);
        var this_ex = 1;

        for (var __date_row_counter = 0; __date_row_counter < __calendar_object.days_in_row; __date_row_counter++){

            __calendar_obj_array[__date_row_counter] = [];
            if (__date_row_counter === 0){
                if (__calendar_object.this_month_first_dayweek <= __calendar_object.days_in_row){
                    for (var __prev_month_counter = 1; __prev_month_counter < __calendar_object.this_month_first_dayweek; __prev_month_counter++){
                        __calendar_obj_array[__date_row_counter].push( { date: ( ( prev_months_days_count - __calendar_object.this_month_first_dayweek) + ( 1 + __prev_month_counter )), ex: this_ex } );
                        __this_row_cell_counter++;
                    }
                }
                else{
                    __overall_date_counter = ( 7 - __calendar_object.days_in_row ) + (__calendar_object.this_month_first_dayweek - __calendar_object.days_in_row);
                }
            }
            this_ex = 0;
            for (var __date_cell_counter = __this_row_cell_counter; __date_cell_counter < 7; __date_cell_counter++){

                __calendar_obj_array[__date_row_counter].push({date: __overall_date_counter, ex: this_ex});
                if (__overall_date_counter === __calendar_object.this_days_in_month){
                    this_ex = 1;
                    __overall_date_counter = 1;
                }
                else{
                    __overall_date_counter++;
                }

                __this_row_cell_counter = 0;
            }
        }




        var __calendar_block_html = '';
        __calendar_block_html +=  '<div class="row" class="calendar-cells-container">';
        __calendar_block_html +=  '<div class="col-12">';
        __calendar_block_html +=  '<div class="container-fluid no-padding">';
        for (var __month_row=0; __month_row < row_count; __month_row++){
            __calendar_block_html += _private.CalendarObj.prototype.get_calendar_row_cells_html(__calendar_object, __calendar_obj_array[__month_row]);
        }
        __calendar_block_html += '</div>';
        __calendar_block_html += '</div>';
        __calendar_block_html += '</div>';
        return __calendar_block_html;
    };
    _private.CalendarObj.prototype.get_calendar_html = function(__calendar_object){
        var calendar_html = '';
        calendar_html += '<div class="calendar-container">';
        calendar_html += _private.CalendarObj.prototype.get_calendar_header_html(__calendar_object);
        calendar_html += _private.CalendarObj.prototype.get_weekdayheaders(__calendar_object);
        calendar_html += _private.CalendarObj.prototype.get_calendar_block_html(__calendar_object);
        calendar_html += '</div>';

        return calendar_html;

    };
    _private.CalendarObj.prototype.init_calendar = function (_mount_id, _calendar_obj) {
        cl('Start mounting');
        var $_mount_obj = $(_mount_id);
        var _calendar_inner_html;
        if ($_mount_obj.length === 0){
            cl('No valid mount object parameter. Aborting...' + _mount_id);
        }
        else{
            _calendar_inner_html = '';
            /*magic goes here -> */
            _calendar_inner_html += '<div class="calendar-app">';
            _calendar_inner_html += '<div class="container-fluid calendar-app-container">';
            _calendar_inner_html += '<div class="row">';
            _calendar_inner_html += '<div class="col-9 calendar-mount-container">';
            _calendar_inner_html += _private.CalendarObj.prototype.get_calendar_html(_calendar_obj);
            _calendar_inner_html += '</div>';
            _calendar_inner_html += '<div class="col-3 filters-container">';
            _calendar_inner_html += _private.CalendarObj.prototype.get_filters_html();
            _calendar_inner_html += '</div>';
            _calendar_inner_html += '</div>';
            _calendar_inner_html += '</div>';
            _calendar_inner_html += '</div>';
            /* <- magic goes here*/
            _private.CalendarObj.prototype.state = 'mounted';
            cl('Mounted');
            $_mount_obj.html(_calendar_inner_html);
        }

        return _calendar_obj;
    };
    _private.CalendarObj.prototype.change_month = function(direction){ //f/b
        cl(this.this_month);
        this.this_full_date = new Date(this.this_year, direction ==='f' ? (this.this_month + 1) : (this.this_month - 1), 1);
        this.render_calendar();
    };
    _private.CalendarObj.prototype.render_calendar = function () {
        var self = this;
        // this.cl();
        self.set_this_full_date();
        self.set_this_month();
        self.set_month_name_ru();
        self.set_this_days_in_month();
        self.set_this_month_first_dayweek();
        self.set_next_month_num(self.this_month);
        self.set_next_prev_num(self.this_month);
        // self.cl();
        $(self.mount_id+' .calendar-mount-container').html(_private.CalendarObj.prototype.get_calendar_html(self));
    };

    $public.init = function(args) {
        args = args || {};

        var _options = (function (_private, $public){
            var __options = {};
            for (var private_attrname in _private) { __options[private_attrname] = _private[private_attrname]; }
            for (var public_attrname in $public) { __options[public_attrname] = $public[public_attrname]; }
            return __options;
        })(_private, args);

        cl('_options:');
        cl(_options);

        _options.state = 'started';


        _private.calendar_object = new _private.CalendarObj(_options.cur_date, _options.days_in_row);
        var new_calendar = _private.calendar_object.init_calendar(_options.mount_id, _private.calendar_object);

        new_calendar.mount_id = _options.mount_id;


        $(_options.mount_id+' .weekday-name').css('width', Math.floor(100/_options.days_in_row)+'%');

        $(_options.mount_id).on('click', '.month-select-arrow-left-button', function () {
            cl('prev');
            new_calendar.change_month('b');
        });
        $(_options.mount_id).on('click', '.month-select-arrow-right-button', function () {
            cl('next');
            new_calendar.change_month('f');
        });

        return new_calendar;
    };

    /*<-public*/
}(window.rb_calendar = (window.rb_calendar || {}), window, jQuery));