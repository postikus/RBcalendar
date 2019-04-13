/* global jQuery, rb_calendar */

///
/// Immediately-invoked Function Expressions (IIFE)s
/// rb_calendar Extension
/// Module Pattern with Imports and Exports
///

;(function($public, $window, $, undefined) {
    var _private = {};
    _private = {
        state: 'start_init',
        mode: 'test',
        mount_id: '#calendar-app',
        foobar: 'foobar_private',
        cur_date: new Date(),
        days_in_row: 7
    };
    var cl = function(msg, msg2){
        msg2 = msg2 || '';
        if(_private.mode === 'test'){
            console.log(msg, msg2?msg2:'');
        }
    };
    _private.CalendarObj = function (__date, __days_in_row){
        var __self = this;
        __self.init_date = __date;
        __self.date_with_first_day = new Date((1900 + __date.getYear()), __date.getMonth(), 1);
        __self.days_in_row = __days_in_row;
        __self.month_array = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        __self.date_month = __self.date_with_first_day.getMonth();
        __self.date_month_name_ru = __self.month_array[__self.date_month];
        __self.date_year = (1900 + __self.date_with_first_day.getYear());
        __self.date_days_in_month = __self.daysInMonth(__self.date_year, __self.date_month);
        __self.date_with_last_day = new Date((1900 + __date.getYear()), __date.getMonth(), __self.date_days_in_month);
        __self.date_month_first_dayweek = new Date(__self.date_year, __self.date_month, 1).getDay();
        __self.date_month_first_dayweek === 0 ? __self.date_month_first_dayweek = 7 : '';
        __self.next_month_num = __self.get_next_month_num(__self.date_month);
        __self.prev_month_num = __self.get_prev_month_num(__self.date_month);
        __self.events = [];
    };
    _private.CalendarObj.prototype.cl = function () {
        var __self = this;
        // cl('-----------CALENDAR OBJ------------------->');
        cl(__self);
        // cl('<-----------CALENDAR OBJ-------------------');
    };
    _private.CalendarObj.prototype.change_hash = function(__hash_object){
        //cl('__hash_object', __hash_object);
        var new_hash = '';
        window.location.hash = __hash_object.month
            + '/' + __hash_object.year
            + '/' + __hash_object.filters.join('&')
            + '/' + __hash_object.opened_event;
    };
    _private.CalendarObj.prototype.get_hash_object_from_url = function(){
        var hash_object = {month: undefined, year: undefined, filters: undefined, opened_event: undefined}
        var hash = window.location.hash.replace('#', '').split('/');
        hash_object.month = hash[0];
        hash_object.year = hash[1];
        hash_object.filters = hash[2].split('&');
        hash_object.opened_event = hash.length > 3 ? hash[3] : '';
        return hash_object;
    };
    _private.CalendarObj.prototype.set_date_month = function (){
        this.date_month = this.date_with_first_day.getMonth();
    };
	_private.CalendarObj.prototype.opacity_change = function(){



        function arr_diff (a1, a2) {

            var a = [], diff = [];

            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }

            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }

            for (var k in a) {
                diff.push(k);
            }

            return diff;
        }


		//cl('opacity change start');
        var this_hash_obj = _private.CalendarObj.prototype.get_hash_object_from_url();
        cl('this_hash_obj111111111!', this_hash_obj);
        var $fc = $('.filters-container');
        $('.calendar-event').removeClass('event-opacity02');
		var $not_checked_cb = $fc.find('input:not(:checked)');
        var filter_arr = [];
        var checked_filter_arr = [];
        var cb_counter = 0;
        $('.filter-col-container').map(function (t) {
            filter_arr[cb_counter] = [];
            // cl('ww',$(this).attr('data-id'));
            // cl('gg',$(this).attr('data-value').split(';'));
            checked_filter_arr.push($(this).attr('data-value').split(';'));
            // cl('mm', $(this).find('input:checkbox'));
            $(this).find('input:checkbox').map(function(){filter_arr[cb_counter].push($(this).attr('id'))});
            // $(this).find('input:checkbox');
            cb_counter++;
        });



        // cl('filter_arr!!!!!!!',filter_arr);
        // cl('checked_filter_arr!!!!!!!',checked_filter_arr);
        var show_arr_values = [];
        var all_arr_values = [];
        for (var l=0;l<filter_arr.length;l++){
            for (var acf=0; acf<filter_arr[l].length; acf++){
                all_arr_values.push(filter_arr[l][acf]);
            }
        }
        for (var checked_counter=0; checked_counter < checked_filter_arr.length; checked_counter++){
            if (checked_filter_arr[checked_counter][0] !== ''){
                //cl('filter_arr', filter_arr[checked_counter]);
                //cl('checked_filter_arr[checked_counter]', checked_filter_arr[checked_counter]);
                for (var cf=0; cf < checked_filter_arr[checked_counter].length; cf++){
                    show_arr_values.push(checked_filter_arr[checked_counter][cf]);
                }
            }
            else{
                for (var ncf=0; ncf<filter_arr[checked_counter].length; ncf++){
                     show_arr_values.push(filter_arr[checked_counter][ncf]);
                }
                // cl('checked_filter_arr!!!!!!!',filter_arr[checked_counter]);
            }
        }



        cl('show_arr_values', show_arr_values);
        cl('all_arr_values', all_arr_values);
        cl(arr_diff(all_arr_values,show_arr_values));
        arr_diff(all_arr_values,show_arr_values).map(function (t) {
            $('.calendar-event[data-'+t+'="1"]').addClass('event-opacity02');
            //cl('t', t);
        });

        // hide solo checkboxs ->
        cl('yo', filter_arr);
        var solo_checked;
        for (var _filter_c = 0; _filter_c < filter_arr.length; _filter_c++){
            if (filter_arr[_filter_c].length == 1){
                cl('solo found', filter_arr[_filter_c]);
                //check is checked
                solo_checked = $('#'+filter_arr[_filter_c][0]).prop('checked');
                cl('solo_checked', solo_checked);
                if (solo_checked === true){
                    $('.calendar-event[data-'+filter_arr[_filter_c][0]+'="0"]').addClass('event-opacity02');
                }
            }
        }
        
        // <- hide solo checkboxs


        //cl('show_arr_values',"$('.calendar-event[data-"+show_arr_values.join('="1"][data-')+'="1"]\')');
        // $('.calendar-event[data-'+show_arr_values.join('="1"][data-')+'="1"]').removeClass('event-opacity02');
        //$('.calendar-event[data-registred="1"][data-spec="1"][data-manp="1"]')
        // for (cb_counter=0; cb_counter < this_hash_obj.filters.length; cb_counter++){
        //     filter_arr = this_hash_obj.filters[cb_counter].split('=');//.filter(function(t){return t!==''});
        //     if (filter_arr.length > 1){
        //         cl('w00t', filter_arr[1].split(';'));
        //     }
        // }



       // cl('$not_checked_cb', $not_checked_cb);
        //cl('$cb', $cb);
        // if ($not_checked_cb.length !== $cb.length){
		    //cl('opicaty accepted');
            // $not_checked_cb.map(function (cb) {
            //     var this_id = $(this).attr('id');
                // $('[data-'+this_id+'="1"]').addClass('event-opacity02');
            // });
        // }

    };
    _private.CalendarObj.prototype.set_month_name_ru = function (){
        this.date_month_name_ru = this.month_array[this.date_month];
    };
    _private.CalendarObj.prototype.set_date_with_first_day = function (){
        this.date_year = (1900 + this.date_with_first_day.getYear());
    };
    _private.CalendarObj.prototype.set_date_days_in_month = function (){
        var __self = this;
        __self.date_days_in_month = __self.daysInMonth(__self.date_year, __self.date_month);
    };
    _private.CalendarObj.prototype.set_date_with_last_day = function (){
        var __self = this;
        __self.date_with_last_day = new Date(__self.date_year, __self.date_month, __self.date_days_in_month);
    };
    _private.CalendarObj.prototype.set_date_month_first_dayweek = function (){
        this.date_month_first_dayweek = new Date(this.date_year, this.date_month, 1).getDay();
        this.date_month_first_dayweek === 0 ? this.date_month_first_dayweek = 7 : '';
    };
    _private.CalendarObj.prototype.set_next_prev_num = function (){
        var __self = this;
        __self.next_month_num = __self.get_next_month_num(__self.date_month);

    };
    _private.CalendarObj.prototype.set_next_month_num = function (){
        var __self = this;
        __self.prev_month_num = __self.get_prev_month_num(__self.date_month);
    };
    _private.CalendarObj.prototype.daysInMonth = function (__year, __month) {
        return new Date(__year, __month+1, 0).getDate();
    };
    _private.CalendarObj.prototype.get_next_month_num = function (__month_num) {
        var __next_month_num = __month_num;
        return (__next_month_num === 11 ? 0 : ++__next_month_num);
    };
    _private.CalendarObj.prototype.get_prev_month_num = function (__month_num) {
        var __prev_month_num = __month_num;
        return (__prev_month_num === 0 ? 11 : --__prev_month_num);
    };
    /*_private.CalendarObj.prototype.change_month_num = function (__calendar_obj, __new_month) {
        __calendar_obj.date_with_first_day = new Date(__calendar_obj.date_year, __new_month, 1);
    }; */
    _private.CalendarObj.prototype.init_calendar_view = function(__$_calendar_v_mount_obj){
        // cl('calendar view init');
        var __calendar_view_html = '';
        __$_calendar_v_mount_obj.html(__calendar_view_html);
        // cl('calendar view mounted');
    };
    _private.CalendarObj.prototype.get_calendar_view_button_container = function () {
        var __calendar_view_button_html = '';
        __calendar_view_button_html += '<div class="col-12 text-right filters-header-icons">';
        //__calendar_view_button_html += '<i class="fas fa-th fa-active calendar-view-button"></i> ';
        //__calendar_view_button_html += '<i class="fas fa-list list-view-button"></i>';
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
        // cl('__q_object', );
        __checkbox_html +=   '<div class="form-check">';
        __checkbox_html +=   '<input class="form-check-input" type="checkbox" id="'+__q_object.id+'">';
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
            __checkboxs_html += '<input class="form-check-input" type="checkbox" id="'+__q_object.checkbox_array[__checkbox_counter].id+'">';
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
        __filter_row_html += '<div class="col-12 filter-col-container" data-id="'+q_object.id+'" data-value="">';
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
        var __filters_html = '';
        __filters_html += '<div class="row" id="filters-header-container">';
        __filters_html += _private.CalendarObj.prototype.get_calendar_view_button_container();
        __filters_html += '</div>';
        // __filters_html += _private.CalendarObj.prototype.get_filters_row_container('search');
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkbox', {id: 'registred', label: 'Мои мероприятия'});
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkbox', {id: 'is_open', label: 'Открыта регистрация'});
        // __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkbox', {id: 'beexpert', label: '<span style="color: red; font-weight:700">Be</span>Expert'});
        /*
		__filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'test1',
            label: 'Форма обучения:',
            checkbox_array:[
                {id: 'defaultCheck1', label: 'Внешнее'},
                {id: 'defaultCheck2', label: 'Внутреннее'}
            ]
        });
		*/
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'for_type',
            label: 'Для кого:',
            checkbox_array:[
                {id: 'boss', label: 'Для руководителей'},
                {id: 'spec', label: 'Для сотрудников'}
            ]
        });
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'type_type',
            label: 'Тип:',
            checkbox_array:[
                {id: 'tle', label: 'Тренинги личной эффективности'},
                {id: 'manp', label: 'Менеджерские программы'},
                {id: 'prof', label: 'Профессиональное обучение'},
                {id: 'all', label: 'Общебанковские тренинги'}
            ]
        });
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'Hub',
            label: 'Регион:',
            checkbox_array:[
                {id: 'msc', label: 'Москва'},
                {id: 'west_hub', label: 'Западный хаб'},
                {id: 'east_hub', label: 'Восточный хаб'},
            ]
        });
        __filters_html += _private.CalendarObj.prototype.get_filters_row_container('checkboxs', {
            id: 'training_type',
            label: 'Тип:',
            checkbox_array:[
                {id: 'type_raining', label: 'Тренинг'},
                {id: 'type_webinar', label: 'Вебинар'},
                {id: 'type_confcall', label: 'Конференц-колл'},
                {id: 'type_onlinetraining', label: 'Он-лайн тренинг'},
                {id: 'type_marathon', label: 'Марафон'},
                {id: 'type_buisnesssim', label: 'Бизнес-симуляция'}
            ]
        });

        __filters_html += '<div class="row" style="margin: 10px auto; "><div class="col-12">' +
            '<button type="button" id="filters-clear" class="btn btn-primary btn-lg btn-block">' +
            'Сбросить фильтры' +
            '</button>' +
            '</div></div>';
        return __filters_html;
    };
    _private.CalendarObj.prototype.get_calendar_header_html = function(__calendar_object){
        var __calendar_header_html = '';
        __calendar_header_html += '<div class="row justify-content-center month-select-container">';
        __calendar_header_html += '<div class="col text-center month-select-arrow-name">';
        __calendar_header_html += '<span class="month-select-left-button">' +
            '<button type="button" class="btn btn-outline-secondary btn-sm month-select-arrow-left-button "><</button>' +
            '</span>';
        __calendar_header_html += '<span class="month-select-name-container"><span class="month-select-name-container_color">';
        __calendar_header_html += __calendar_object.date_month_name_ru + '</span> <span>' + __calendar_object.date_year;
        __calendar_header_html += '</span></span>';
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
    _private.CalendarObj.prototype.get_calendar_cell_html = function (__date, __row, __cell, __id, __ex, __calendar_object) {
        var __calendar_cell_html = '';
        __calendar_cell_html += '<div class="calendar-cell' +
            ( ( ((new Date()).setHours(0,0,0,0))
                === (new Date(__calendar_object.date_year, __calendar_object.date_month, __date, 0).setHours(0,0,0,0))
                && !__ex ) ? " calendar-cell-today" : "" ) +
            '"'+( __ex ? " data-ex" : "" )+
            ' '+( __id ? " data-id="+__id+"" : "" ) +
            ' '+( (__row !== undefined) ? " data-row="+__row+"" : "" ) +
            ' '+( (__cell !== undefined) ? " data-cell="+__cell+"" : "" ) +
            '>' +'<div class="calendar-cell-date text-right">'+__date+'</div>' +
            '<div class="calendar-cell-event-wrapper"></div>' +
            '</div>';
        return __calendar_cell_html;
    };
    _private.CalendarObj.prototype.get_calendar_row_cells_html = function (__calendar_object, __cells_array) {
        var __row_cells_html = '';
        __row_cells_html += '<div class="row calendar-cells">';
        __row_cells_html += '<div class="col-12">';
        for (var __cell_counter = 0; __cell_counter < __calendar_object.days_in_row; __cell_counter++){
            __row_cells_html += _private.CalendarObj.prototype.get_calendar_cell_html(
                __cells_array[__cell_counter].date
                ,__cells_array[__cell_counter].row
                ,__cells_array[__cell_counter].cell
                ,__cells_array[__cell_counter].id
                ,__cells_array[__cell_counter].ex
                ,__calendar_object
            );
        }
        __row_cells_html += '</div>';
        __row_cells_html += '</div>';
        return __row_cells_html;
    };
    _private.CalendarObj.prototype.get_calendar_block_html = function (__calendar_object){
        // __calendar_object.cl();
        var __calendar_obj_array = []; //[[{},{}...],[...],[],[],[]]
        var row_count = 5;
        var __overall_date_counter = 1;
        var __this_row_cell_counter = 0;
        var prev_months_days_count = __calendar_object.daysInMonth(__calendar_object.date_year, __calendar_object.prev_month_num);
        var this_ex = 1;
        var next_month = 0;
        for (var __date_row_counter = 0; __date_row_counter < __calendar_object.days_in_row; __date_row_counter++){

            __calendar_obj_array[__date_row_counter] = [];
            if (__date_row_counter === 0){
                if (__calendar_object.date_month_first_dayweek <= __calendar_object.days_in_row){
                    for (var __prev_month_counter = 1; __prev_month_counter < __calendar_object.date_month_first_dayweek; __prev_month_counter++){
                        __calendar_obj_array[__date_row_counter].push(
                            {
                                date: ( ( prev_months_days_count - __calendar_object.date_month_first_dayweek) + ( 1 + __prev_month_counter )),
                                ex: this_ex, row: __date_row_counter, cell: (__prev_month_counter-1)
                            }
                        );
                        __this_row_cell_counter++;
                    }
                }
                else{
                    __overall_date_counter = ( 7 - __calendar_object.days_in_row ) + (7 - __calendar_object.date_month_first_dayweek);
                }
            }
            if (!next_month){
                this_ex = 0;
            }
            for (var __date_cell_counter = __this_row_cell_counter; __date_cell_counter < 7; __date_cell_counter++){
                __calendar_obj_array[__date_row_counter].push(
                    {
                        date: __overall_date_counter
                        , ex: this_ex
                        , row: __date_row_counter
                        , cell: (__date_cell_counter)
                        ,  id: (this_ex === 0 ? __overall_date_counter : '')
                    }
                );
                if (__overall_date_counter >= __calendar_object.date_days_in_month){
                    next_month = 1;
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
        // cl('Start mounting');
        var $_mount_obj = $(_mount_id);
        var _calendar_inner_html;
        if ($_mount_obj.length === 0){
            // cl('No valid mount object parameter. Aborting...' + _mount_id);
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
            // cl('Mounted');
            $_mount_obj.html(_calendar_inner_html);
        }
        return _calendar_obj;
    };
    _private.CalendarObj.prototype.change_month = function(direction){ //f/b
        // cl(this.date_month);
		var __self = this;
        __self.date_with_first_day = new Date(this.date_year, direction ==='f' ? (this.date_month + 1) : (this.date_month - 1), 1);
        __self.render_calendar(function(){
			//cl(__self.date_year);
			//cl(__self.date_month);
		});

        $public.get_events(this_calendar.date_month, this_calendar.date_year).then( function( resp ){
            events = resp;
            this_calendar.events = events;
            this_calendar.render_events(this_calendar.events);
			$('.calendar-event').removeClass('d-none');
            this_calendar.opacity_change();
        } ).catch( function( e ){ console.error( e ); } );
    };
    _private.CalendarObj.prototype.render_calendar = function (callback) {
        var __self = this;
        __self.set_date_with_first_day();
        __self.set_date_month();
        __self.set_month_name_ru();
        __self.set_date_days_in_month();
        __self.set_date_with_last_day();
        __self.set_date_month_first_dayweek();
        __self.set_next_month_num(__self.date_month);
        __self.set_next_prev_num(__self.date_month);
        $(__self.mount_id+' .calendar-mount-container').html(_private.CalendarObj.prototype.get_calendar_html(__self));
		callback();
    };
    _private.find_index_event_by_id = function(__events_array, __id){
        // return __events_array.filter(function(_events){
        //     return ( _events.id === __id);
        // });
        for (var i=0; i<__events_array.length; i++){
            if (__events_array[i].id === __id){
                return i;
            }
        }
    };
    _private.morph_events_array = function (__event_array) {
        var __morphed_array = __event_array.slice();


        var event_cell_row_array = new Array(32);
        for (var i = 0; i < event_cell_row_array.length; i++){
            event_cell_row_array[i] = [];
        }

        __morphed_array.map(function(self){

            // self.length = (Math.abs((new Date(self.finish_date)).getTime() - (new Date(self.start_date)).getTime())) / (1000 * 3600 * 24);
            self.length = ((new Date(self.finish_date)).getDate() - (new Date(self.start_date)).getDate())+1;
            self.length = self.length > 0 ? self.length : 31+self.length;
            self.length_round = Math.ceil(self.length);
            self.day_start = new Date(self.start_date).getDate();
            self.day_end = new Date(self.finish_date).getDate();
            self.position = self.position ? self.position++ : 0;
            self.break = 'none';
            // // cl('day_start', self.day_start);
        });

        __morphed_array.sort(function(a,b){
            return (a.day_start - b.day_start);
        });


        // __morphed_array = __morphed_array.slice(1, 5);

        var additional_cells = 0;
        var date_start_length = 0;
        for (var __event = 0; __event < __morphed_array.length; __event++){


            // cl(__morphed_array[__event].day_start);
            // cl(event_cell_row_array);
            date_start_length = event_cell_row_array[__morphed_array[__event].day_start].length;
            for (var n = 0; n <= date_start_length; n++) {
                // cl(!event_cell_row_array[__morphed_array[__event].day_start][n] === true);
                if(!event_cell_row_array[__morphed_array[__event].day_start][n] ){
                    event_cell_row_array[__morphed_array[__event].day_start][n] = __morphed_array[__event];
                    break;
                }
            }



            additional_cells = 0;
            for (var _event_length = 0; _event_length < (__morphed_array[__event].length_round-1); _event_length++){
                // cl(__morphed_array[__event].name + ' 1 ->', additional_cells);

                additional_cells = __morphed_array[__event].day_start + _event_length+1;
                // cl(__morphed_array[__event].name + ' 2 ->', additional_cells);
                if (additional_cells < 32){
                    // if (__morphed_array[__event].id === "5c97cb0095a8b5441d9b026f"){
                    //     cl(additional_cells);
                    //     cl(event_cell_row_array[__morphed_array[__event].day_start]);
                    // }
                    event_cell_row_array[additional_cells][n] = __morphed_array[__event];
                }
            }
        }

        for (var __cell = 0; __cell < 32; __cell++){
            for (var _event = 0; _event<event_cell_row_array[__cell].length; _event++){
                if (event_cell_row_array[__cell][_event]){
                    // cl('event_cell_row_array[__cell][_event]',_private.find_index_event_by_id(__morphed_array, event_cell_row_array[__cell][_event].id));
                    __morphed_array[ _private.find_index_event_by_id(__morphed_array, event_cell_row_array[__cell][_event].id) ].top = _event;
                }
            }
        }


         cl('event_cell_row_array', event_cell_row_array);






        // cl(__morphed_array);

        var morphed_lenth = __morphed_array.length;
        for (var __event_counter = 0; __event_counter < morphed_lenth; __event_counter++){
            var __this_event = Object.assign({}, __morphed_array[__event_counter]);
            var __event_start_date = new Date(__this_event.start_date);
            var __event_weekday = __event_start_date.getDay();
            if (__morphed_array[__event_counter].id === '0x5B7A86A426EE5661')
                cl (' __event_start_date',  __event_start_date.getDay());
            __event_weekday = __event_weekday === 0 ? 7 : __event_weekday;
            // cl(__event_weekday);


            // cl('7 - '+ __event_weekday, 7 - __event_weekday - __morphed_array[__event_counter].length_round );

            var this_week_length =  (8 - __event_weekday - __morphed_array[__event_counter].length_round) < 0
                ?  8 - __event_weekday
                : __morphed_array[__event_counter].length_round;


            if (__morphed_array[__event_counter].length_round !== this_week_length){
                var next_week_length = __morphed_array[__event_counter].length_round - this_week_length;
                // cl('next_week_length',next_week_length);
                __morphed_array[__event_counter].length_round = this_week_length;
                __morphed_array[__event_counter].break = 'end';
                __this_event.length_round = next_week_length;
                __this_event.day_start += this_week_length;
                __this_event.break = 'start';
                __morphed_array.push(__this_event);
            }


        }

        this_calendar.events = __morphed_array;
        cl (this_calendar.events);
        return __morphed_array;
    };
    $public.init = function(args) {
        args = args || {};
        var _options = (function (_private, $public){
            var __options = {};
            for (var private_attrname in _private) { __options[private_attrname] = _private[private_attrname]; }
            for (var public_attrname in $public) { __options[public_attrname] = $public[public_attrname]; }
            return __options;
        })(_private, args);
        //cl('_options:', _options);
        _options.state = 'started';
        _private.calendar_object = new _private.CalendarObj(_options.cur_date, _options.days_in_row);
		
        var new_calendar = _private.calendar_object.init_calendar(_options.mount_id, _private.calendar_object);
        new_calendar.mount_id = _options.mount_id;



        $(_options.mount_id+' .weekday-name').css('width', Math.floor(100/_options.days_in_row)+'%');
		
		
        $(_options.mount_id).on('click', '.month-select-arrow-left-button', function () {
            // cl('prev');
            new_calendar.change_month('b');
			make_url();
			$('.calendar-event').removeClass('d-none');
        });
        $(_options.mount_id).on('click', '.month-select-arrow-right-button', function () {
            // cl('next');
            new_calendar.change_month('f');
			make_url();
			
			$('.calendar-event').removeClass('d-none');
			//cl(get_hash_object_from_url());
        });


        $(_options.mount_id).on('mouseenter','.calendar-event',function () {
            if (!$(this).hasClass('event-hover') && !$(this).hasClass('event-hover')){
                var this_id = $(this).attr('data-id');
                $('[data-id="'+this_id+'"]').not('.calendar-event_btn').addClass('event-hover');
            }
            // cl(this_id);
            // cl('hover');
        });

        $(_options.mount_id).on('mouseleave','.calendar-event',function () {
            var this_id = $(this).attr('data-id');
            $('[data-id="'+this_id+'"]').removeClass('event-hover');
            // cl(this_id);
            // cl('hover');
        });

		$(_options.mount_id).on('click','.calendar-event_btn',function () {
            var this_id = $(this).attr('data-id');
            this_hash_obj = _private.CalendarObj.prototype.get_hash_object_from_url();
			//cl('this_id', this_id);
			this_hash_obj.opened_event = this_id;
			//cl('this_hash_obj ', this_hash_obj);
            _private.CalendarObj.prototype.change_hash(this_hash_obj);
            // cl(this_id);
            // cl('hover');
        });
		
		$(document).on('change','#modalTrigger', function () {
			//cl("$(this).prop('checked')", $(this).prop('checked'));
			if (!$(this).prop('checked')){
				this_hash_obj = _private.CalendarObj.prototype.get_hash_object_from_url();
				this_hash_obj.opened_event = '';
				//cl('this_hash_obj ', this_hash_obj);
                _private.CalendarObj.prototype.change_hash(this_hash_obj);
			}
            // cl(this_id);
            // cl('hover');
        });
		
		$(document).on('click','#reg-button', function () {
			var __event_id = $(this).attr('data-id');
			var __event_idx = $(this).attr('data-idx');
			//cl(__event_idx);
			
			$.ajax({
			  // url: "./custom_web_template.html?object_id=6675296127857605162",
			  data: {event_id: __event_id, user_id: $('#curUserID').val(), method: 'reg'}
			
			}).done(function() {
				//cl('__event_idx', __event_idx);
				this_calendar.events[__event_idx].registred = 1;
				$('.calendar-event[data-id="'+__event_id+'"]').attr('data-registred', 1);
				new_calendar.opacity_change();
			  $( '#reg-container' ).html( "<span style='font-weight:700'>Вы успешно зарегистрированы!</span>" );
			});
			//&user_id=6263149697912937503&event_id=6675247569081145555
			
			
		});
		
		$(document).on('click','#unreg-button', function () {
			var __event_id = $(this).attr('data-id');
			var __event_idx = $(this).attr('data-idx');
			//cl(__event_id);
			
			$.ajax({
			  // url: "./custom_web_template.html?object_id=6675296127857605162",
			  data: {event_id: __event_id, user_id: $('#curUserID').val(), method: 'unreg'}
			
			}).done(function() {
				this_calendar.events[__event_idx].registred = 0;
				$('.calendar-event[data-id="'+__event_id+'"]').attr('data-registred', 0);
				new_calendar.opacity_change();
			  $( '#reg-container' ).html( "<span style='font-weight:700'>Вы успешно отменили регистрацию!</span>" );
			});
			//&user_id=6263149697912937503&event_id=6675247569081145555
			
			
		});
		
		/*
		{
			month: 1
			,year: 2019
			,filters:['is_open', 'prof']
			,opened_event: 3523984723749
		}
		1/2019/is_open&prof/3523984723749
		*/
		
		

		
		// var get_hash_object_from_url = function(){
		// 	var hash_object = {month: undefined, year: undefined, filters: undefined, opened_event: undefined}
		// 	var hash = window.location.hash.replace('#', '').split('/');
		// 	hash_object.month = hash[0];
		// 	hash_object.year = hash[1];
		// 	hash_object.filters = hash[2].split('&');
		// 	hash_object.opened_event = hash.length > 3 ? hash[3] : '';
		// 	return hash_object;
		// };
		
		
		
		
        var make_url = function(is_inited){
			this_hash_obj = {opened_event: '', month: new_calendar.date_month, year: new_calendar.date_year, filters: []};
			if (is_inited){
			    cl('is_inited', is_inited);
				this_hash_obj = _private.CalendarObj.prototype.get_hash_object_from_url();
			}



            var checked_cbs = this_hash_obj.filters;
            // cl('checked_cbs', checked_cbs);

            var __this_cb_id_value_array = [];
            for (var _checked_counter=0; _checked_counter < checked_cbs.length; _checked_counter++){
                __this_cb_id_value_array = checked_cbs[_checked_counter].split('=');
                if (__this_cb_id_value_array.length > 1){

                    if(__this_cb_id_value_array[1] !== ''){
                        $(__this_cb_id_value_array[1].split(';')).each(function(){
                            $('.filter-col-container[data-id="'+__this_cb_id_value_array[0]+'"]').find('#'+this).prop('checked', true);
                        });
                    }
                }
            }

            var $checked_cb = $('.filter-col-container');//.find('input:checked');

            $checked_cb.map(function () {
                var self = this;
                var checked_ids_arr = [];

                $($(self).find('.form-check-input:checked')).map(function (t) {
                    checked_ids_arr.push($(this).attr('id'));
                });
                $(self).attr('data-value', checked_ids_arr.join(';'));

            });

			var checked_cb_ids = [];
            $checked_cb.map(function (cb) {
                // cl(cb);
                checked_cb_ids.push($(this).attr('data-id')+'='+$(this).attr('data-value'));
            });
			cl('checked_cb_ids!', checked_cb_ids);
			var new_hash_obj = {month: this_hash_obj.month, year: this_hash_obj.year, filters: checked_cb_ids, opened_event: this_hash_obj.opened_event};
            _private.CalendarObj.prototype.change_hash(new_hash_obj);
            cl('new_hash_obj', new_hash_obj);











            new_calendar.opacity_change();
			$('.calendar-event').removeClass('d-none');



            /*
			var $checked_cb = $('.filters-container').find('input:checked');
            // cl($checked_cb);
            var checked_cb_ids = [];
            $checked_cb.map(function (cb) {
                // cl(cb);
                checked_cb_ids.push($(this).attr('id'));
            });
            var hash = window.location.hash.split('?');
            var new_hash = checked_cb_ids.join('&') + ( hash.length > 1 ? hash[1] : '' );
            window.location.hash = checked_cb_ids.join('&');
			*/
        };


        $(_options.mount_id).on('click','#filters-clear',function () {
            //cl('click');
            $(this).toggleClass('cb_toggled');
            var $all_inputs;
            $all_inputs = $('.filters-container').find('input');
            // cl($all_inputs);
            $all_inputs.prop('checked', false);
            make_url();
        });

        // $(_options.mount_id+' .filters-container').on('change ','input',function () {
        //     $(this).toggleClass('this_cb_toggled');
        //     $(this).prop('checked', $(this).hasClass('cb_toggled'));
        // });
        // $('.filters-container').find('input');

		//cl(window.location.hash);
        if (window.location.hash === '' || window.location.hash === '#'){
            // cl('make');
            make_url();
			$public.get_events(new_calendar.date_month, new_calendar.date_year).then( function( resp ){
				events = resp;
				this_calendar.events = events;
				_private.calendar_object.render_events(this_calendar.events);
				$('.calendar-event').removeClass('d-none');
			} ).catch( function( e ){ cl( e ); } );
        }
        else{
			hash_obj = _private.CalendarObj.prototype.get_hash_object_from_url();

			
			_private.calendar_object = new _private.CalendarObj(new Date(hash_obj.year, hash_obj.month, 1), _options.days_in_row);
			//cl('bad'); //dev
			new_calendar = _private.calendar_object.init_calendar(_options.mount_id, _private.calendar_object);
			new_calendar.mount_id = _options.mount_id;
			//cl('new_calendar', new_calendar);

			
			$public.get_events(new_calendar.date_month, new_calendar.date_year).then( function( resp ){
				events = resp;
				//cl('rresp', events);
				this_calendar.events = events;
				_private.calendar_object.render_events(this_calendar.events);
				
				if (hash_obj.opened_event){
					$($('[data-id="'+hash_obj.opened_event+'"]')[1]).click();
					//cl('click!');
				}
				make_url(1);
				
				
				
			} ).catch( function( e ){ cl( e ); } );

			$(_options.mount_id+' .weekday-name').css('width', Math.floor(100/_options.days_in_row)+'%');
			

        }



        $(_options.mount_id).on('change','.form-check-input',function () {
            make_url();
        });

        return new_calendar;
    };
    $public.get_events = function(date_month, date_year){
        //args = args || {};

        // get this month events: delete after backend configured
        var middleware = function( _events ){
            // cl(this_calendar.date_with_first_day);
			
            _events = _events
                .filter(function(_events){
                    return (
                        ( new Date(_events.start_date) > new Date(this_calendar.date_with_first_day) )
                        && ( new Date(_events.start_date) < new Date(this_calendar.date_with_last_day) )
                        && _events.type !== 'conf'
                    );
                });
			
            // cl('gogo powerRangers:', _events);
            return _events;
        };

        // cl('get_events args:', args);
        return new Promise ( function( resolve, reject ) {
            /* TODO fetch */
            $.ajax({
                method: "GET",
                dataType: 'json',
                // url: "./custom_web_template.html?object_id=6673451655755009275" //dev
                url: "./server/db.json" //dev
                ,data: { date_month: date_month, date_year: date_year }
            })
                .done( function( msg ) {
                    //cl( "Event data loaded: ", msg );
                    msg = middleware(msg); // dev
                    resolve( msg );
                });
        } );
    };
    _private.CalendarObj.prototype.render_events = function (__events) {
        // cl('rendering events... ', __events);
        __events = _private.morph_events_array(__events);
        // cl('morphed events... ', __events);

        function _a( idx ) {
			var _event_rb_real_type = [];
			__events[idx].event_rb_type.split(';').map(function(__ev){
                _event_rb_real_type.push(__ev.split('][')[0]);
			});
			
			var _for_real_type = [];
			__events[idx].for_type.split(';').map(function(__ev){
				_for_real_type.push(__ev.split('][')[0]);
			});
			
            var __event_html = '<div data-event-type="' + __events[idx].type + '" ' +
                'data-id="'+__events[idx].id+'" ' +

                'data-registred="'+ __events[idx].registred +'" ' +
                'data-is_open="'+ __events[idx].is_open  +'" ' +
                'data-beexpert="'+  __events[idx].beexpert +'" ';
				
				
				
				for (var _rt=0; _rt<_for_real_type.length; _rt++){
					__event_html += 'data-'+_for_real_type[_rt]+'="1"';
				}
				
				for (var _rbt=0; _rbt<_event_rb_real_type.length; _rbt++){
					__event_html += 'data-'+_event_rb_real_type[_rbt]+'="1"';
				}
				
             //   'data-for_type="'+_for_real_type.join(';')+'" ' +
               // 'data-event_rb_type="'+_event_rb_real_type.join(';')+'" ' +


                __event_html += 'class="d-none calendar-event ct-'+__events[idx].top+' ' +
                'ce-'+(__events[idx].length_round) +'">\n' +
                '<div class="calendar-event-container container-fluid">\n' +
                '<div class="row">\n' +
                '<div class="col-12">\n';
            if (__events[idx].break === 'start'){
                __event_html+= '<div class="calendar-event-break "></div>\n';
            }
            else{
                __event_html+= '<div class="calendar-event-type "></div>\n';
            }

            __event_html+= '<span class="calendar-event-name">' + __events[idx].name + '</span>\n' +
                '</div>\n' +
                '<div class="calendar-event-pers">\n' +
                '<div class="calendar-event-icons text-right">\n' + __events[idx].max_pers +
                ' <i class="fa fa-users"></i>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '<label for="modalTrigger" data-modalBtn class="calendar-event_btn" ' +
                'data-idx="' + idx + '" ' +
                'data-id="' + __events[idx].id + '" ' +
                'data-opt-event-type="' + __events[idx].type + '" ' +
                'title="' + __events[idx].name + ' ">' +
                '</label>\n'
            return __event_html;
        }


        for (var _event = 0; _event < __events.length; _event++){
            $('[data-id="'+__events[_event].day_start+'"]').append( _a( _event ) );
        }



        // $( $('.calendar-cell-event-wrapper')[6]).append( _a( 1 ) );
        // $( $('.calendar-cell-event-wrapper')[10]).append( _a( 3 ) );
        // $( $('.calendar-cell-event-wrapper')[15]).append( _a( 7 ) );
    };
    /*<-public*/
}(window.rb_calendar = (window.rb_calendar || {}), window, jQuery));
