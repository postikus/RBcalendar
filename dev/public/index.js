/* global jQuery, rb_calendar */

///
/// Immediately-invoked Function Expressions (IIFE)s
/// rb_calendar Extension
/// Module Pattern with Imports and Exports
///

;(function($public, $window, undefined) {
    var _private = {};
    $public.init = function(args) {
        args = args || {};
        _private = {
            state: 'start_init',
            mode: 'prod',
            mount_id: '#calendar-app'
            ,foobar: 'foobar_private'
        };

        _private.init_calendar_view = function($_calendar_v_mount_obj){
            cl('calendar view init');
            var calendar_view_html = '';
            $_calendar_v_mount_obj.html(calendar_view_html);
            cl('calendar view mounted');
        };

        _private.get_filters_html = function(){
          var filters_html = '';
            filters_html +=  '                <div>\n' +
              '                    <div class="row" id="filters-header-container">\n' +
              '                        <div class="col-12 text-right" id="filters-header-icons">\n' +
              '                            <i class="fas fa-th fa-active" id="calendar-view-button"></i>\n' +
              '                            <i class="fas fa-list" id="list-view-button"></i>\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                    <div class="row filter-row-container">\n' +
              '                        <div class="col-12 filter-col-container">\n' +
              '                            <input class="form-control" id="calendar-search" placeholder="Поиск">\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                    <div class="row filter-row-container">\n' +
              '                        <div class="col-12 filter-col-container">\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck9">\n' +
              '                                <label class="form-check-label" for="defaultCheck9">\n' +
              '                                    Я участвую\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck8">\n' +
              '                                <label class="form-check-label" for="defaultCheck8">\n' +
              '                                    Открыта регистрация\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                    <div class="row filter-row-container">\n' +
              '                        <div class="col-12 filter-col-container">\n' +
              '                            <div class="filter-name">Форма обучения:</div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">\n' +
              '                                <label class="form-check-label" for="defaultCheck1">\n' +
              '                                    Внешнее\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">\n' +
              '                                <label class="form-check-label" for="defaultCheck2">\n' +
              '                                    Внутреннее\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                    <div class="row filter-row-container">\n' +
              '                        <div class="col-12 filter-col-container">\n' +
              '                            <div class="filter-name">Для кого:</div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">\n' +
              '                                <label class="form-check-label" for="defaultCheck3">\n' +
              '                                    Для руководителей\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">\n' +
              '                                <label class="form-check-label" for="defaultCheck4">\n' +
              '                                    Для сотрудников\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                    <div class="row filter-row-container">\n' +
              '                        <div class="col-12 filter-col-container">\n' +
              '                            <div class="filter-name">Тип:</div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck5">\n' +
              '                                <label class="form-check-label" for="defaultCheck5">\n' +
              '                                    Тренинги личной эффективности\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck6">\n' +
              '                                <label class="form-check-label" for="defaultCheck6">\n' +
              '                                    Менеджерские программы\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                            <div class="form-check">\n' +
              '                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck7">\n' +
              '                                <label class="form-check-label" for="defaultCheck7">\n' +
              '                                    Профессиональное обучение\n' +
              '                                </label>\n' +
              '                            </div>\n' +
              '                        </div>\n' +
              '                    </div>\n' +
              '                </div>\n';

            return filters_html;
        };


        _private.get_calendar_header_html = function(){
            var calendar_header_html = '';
            calendar_header_html +=
                '                    <div class="row justify-content-center" id="month-select-container">\n' +
                '                        <div class="col text-center" id="month-select-arrow-name">\n' +
                '                            <span id="month-select-left-button"><button type="button" class="btn btn-outline-secondary btn-sm" id="month-select-arrow-left-button"><</button></span>\n' +
                '                            <span id="month-select-name-container">\n' +
                '                                Март 2019\n' +
                '                            </span>\n' +
                '                            <span id="month-select-right-button"><button type="button" class="btn btn-outline-secondary btn-sm" id="month-select-arrow-right-button">></button></span>\n' +
                '                            <!--<div class="position-absolute">month-select-container</div>-->\n' +
                '                        </div>\n' +
                '                    </div>\n';

            return calendar_header_html;
        };

        _private.get_weekdayheaders = function(){
            var calendar_weekday_html = '';
            calendar_weekday_html +=
            '                        <div class="col-12">\n' +
            '                            <div class="container-fluid">\n' +
            '                                <div class="row">\n' +
            '                                    <div class="col-12" id="weekdays-container">\n' +
            '                                        <div class="weekday-name">Понедельник</div>\n' +
            '                                        <div class="weekday-name">Вторник</div>\n' +
            '                                        <div class="weekday-name">Среда</div>\n' +
            '                                        <div class="weekday-name">Четверг</div>\n' +
            '                                        <div class="weekday-name">Пятница</div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                </div>\n' +
            '                            </div>\n';

            return calendar_weekday_html;
        };

        _private.get_calendar_html = function(){
            var calendar_html = '';
            calendar_html += '<div id="calendar-container">\n';
            calendar_html += _private.get_calendar_header_html();
            calendar_html += '<div class="row" id="calendar-weekdays-container">\n';
            calendar_html += _private.get_weekdayheaders();
            calendar_html += '</div>\n';

            calendar_html +=  '                    <div class="row" id="calendar-cells-container">\n' +
            '                        <div class="col-12">\n' +
            '                            <div class="container-fluid">\n' +
            '                                <div class="row calendar-cells">\n' +
            '                                    <div class="col-12">\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">3</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">4</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">5</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">6</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">7</div></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="row calendar-cells">\n' +
            '                                    <div class="col-12">\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">10</div></div>\n' +
            '                                        <div class="calendar-cell calendar-cell-today"><div class="calendar-cell-date text-right">11</div></div>\n' +
            '                                        <div class="calendar-cell">\n' +
            '                                            <div class="calendar-cell-date text-right">12</div>\n' +
            '                                            <div class="calendar-event ce-2">\n' +
            '                                                <div class="calendar-event-container container-fluid">\n' +
            '                                                    <div class="row">\n' +
            '                                                        <div class="col-9">\n' +
            '                                                            <div class="calendar-event-type calendar-event-type-red"></div>\n' +
            '                                                            <span class="calendar-event-name">Welcome</span>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="col-3">\n' +
            '                                                            <div class="calendar-event-icons text-right">\n' +
            '                                                                12 <i class="fa fa-users"></i>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">13</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">14</div></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="row calendar-cells">\n' +
            '                                    <div class="col-12">\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">17</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">18</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">19</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">20</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">21</div></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="row calendar-cells">\n' +
            '                                    <div class="col-12">\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">24</div></div>\n' +
            '                                        <div class="calendar-cell">\n' +
            '                                            <div class="calendar-cell-date text-right">25</div>\n' +
            '                                            <div class="calendar-event ce-4">\n' +
            '                                                <div class="calendar-event-container container-fluid">\n' +
            '                                                    <div class="row">\n' +
            '                                                        <div class="col-9">\n' +
            '                                                            <div class="calendar-event-type calendar-event-type-green"></div>\n' +
            '                                                            <span class="calendar-event-name">Управление временем</span>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="col-3">\n' +
            '                                                            <div class="calendar-event-icons text-right">\n' +
            '                                                                5 <i class="fa fa-users"></i>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">26</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">27</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">28</div></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="row calendar-cells">\n' +
            '                                    <div class="col-12">\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">31</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">1</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">2</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">3</div></div>\n' +
            '                                        <div class="calendar-cell"><div class="calendar-cell-date text-right">4</div></div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div id="grid-container" class="d-none">\n' +
            '                    <div class="row grid-header-container"><div class="col"></div></div>\n' +
            '                    <div class="row grid-event-container">\n' +
            '                        <div class="col-6">\n' +
            '                            <div class="card">\n' +
            '                                <h5 class="card-header card-header-blue">Управление временем</h5>\n' +
            '                                <div class="card-body">\n' +
            '                                    <div class="row">\n' +
            '                                        <div class="col-9">\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="fas fa-calendar-day"></i> 03.03.2019 - 05.03.2019\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="far fa-clock"></i> 09:00 - 18:00\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="col-3">\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <div class="text-right">\n' +
            '                                                        14 <i class="fa fa-users"></i>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <div class="text-right">\n' +
            '                                                        3 <i class="fa fa-heart fa-red"></i>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="col-6">\n' +
            '                            <div class="card">\n' +
            '                                <h5 class="card-header card-header-red">Управление временем</h5>\n' +
            '                                <div class="card-body">\n' +
            '                                    <div class="row">\n' +
            '                                        <div class="col-9">\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="fas fa-calendar-day"></i> 03.03.2019 - 05.03.2019\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="far fa-clock"></i> 09:00 - 18:00\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="col-3">\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <div class="text-right">\n' +
            '                                                        14 <i class="fa fa-users"></i>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <div class="text-right">\n' +
            '                                                        3 <i class="fa fa-heart fa-red"></i>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="row grid-event-container">\n' +
            '                        <div class="col">\n' +
            '                            <div class="card">\n' +
            '                                <h5 class="card-header card-header-green">Welcome</h5>\n' +
            '                                <div class="card-body">\n' +
            '                                    <div class="row">\n' +
            '                                        <div class="col-9">\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="fas fa-calendar-day"></i> 22.03.2019 - 25.03.2019\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="row">\n' +
            '                                                <div class="col">\n' +
            '                                                    <i class="far fa-clock"></i> 09:00 - 18:00\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                        <div class="col-3">\n' +
            '                                            <div class="text-right">\n' +
            '                                                3 <i class="fa fa-users"></i> 2 <i class="fa fa-heart fa-red"></i>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n';

            return calendar_html;

        };


        _private.init_calendar = function (_mount_id) {
            cl('Start mounting');
            var $_mount_obj = $(_mount_id);
            var _calendar_inner_html;
            if ($_mount_obj.length === 0){
                cl('No valid mount object parameter. Aborting...' + _mount_id);
            }
            else{
                _calendar_inner_html = '';
                /*magic goes here -> */
                _calendar_inner_html +=
                    '<div id="calendar-app">\n' +
                    '    <div class="container-fluid" id="calendar-app-container">\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-9" id="calendar-mount-container">\n';

                    _calendar_inner_html += _private.get_calendar_html();
                    _calendar_inner_html +=
                    '            </div>\n' +
                    '            <div class="col-3" id="filters-container">\n';
                    _calendar_inner_html += _private.get_filters_html();

                    _calendar_inner_html += '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
                /* <- magic goes here*/
                _private.state = 'mounted';
                cl('Mounted');
                $_mount_obj.html(_calendar_inner_html);
            }
        };



        var _options = (function (_private, $public){
            var __options = {};
            for (var private_attrname in _private) { __options[private_attrname] = _private[private_attrname]; }
            for (var public_attrname in $public) { __options[public_attrname] = $public[public_attrname]; }
            return __options;
        })(_private, args);

        var cl = function(msg){
            if(_options.mode === 'test'){
                console.log(msg);
            }
        };

        cl('_options:');
        cl(_options);

        _options.state = 'started';
        _options.init_calendar(_options.mount_id);
    };

    /*<-public*/
}(window.rb_calendar = (window.rb_calendar || {}), window, jQuery));