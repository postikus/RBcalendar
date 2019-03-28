"use strict";

;( function( window, undefined ) {

    var modal = document.createElement( "div" );
    modal.setAttribute( "data-modal", "" );

    var modalTrigger = document.createElement( "input" );
    modalTrigger.setAttribute( "type", "checkbox" );
    modalTrigger.setAttribute( "id", "modalTrigger" );
    modalTrigger.setAttribute( "data-hiddenElement", "" );
    modalTrigger.setAttribute( "data-modalTrigger", "" );

    var modalOverlay = document.createElement( "label" );
    modalOverlay.setAttribute( "for", "modalTrigger" );
    modalOverlay.setAttribute( "data-modalOverlay", "" );
    modalOverlay.setAttribute( "title", "close popup" );

    var modalWindow = document.createElement( "div" );
    modalWindow.setAttribute( "data-modalWindow", "" );

    var modalContent = document.createElement( "div" );
    modalContent.setAttribute( "data-modalContent", "" );

    var modalSpiner = document.createElement( "div" );
    modalSpiner.setAttribute( "data-modalSpiner", "" );
    modalSpiner.innerHTML = '<div class="circle"></div>';

    var modalClose = document.createElement( "label" );
    modalClose.setAttribute( "for", "modalTrigger" );
    modalClose.setAttribute( "data-modalClose", "" );


    modal.appendChild( modalTrigger );
    modal.appendChild( modalOverlay );
    modal.appendChild( modalWindow );
    modalWindow.appendChild( modalSpiner );
    modalWindow.appendChild( modalContent );
    modalWindow.appendChild( modalClose );
    document.body.appendChild( modal );


    /* todo delete */
    /*
    var mBtn = document.querySelector( "[data-modalBtn][for='modalTrigger']" );

    function changeApply() {
      if ( modalTrigger.checked == true ) {

        //modalWindow.innerHTML = data.innerHTML ;
        mBtn.classList.add( "active" );
      } else {
        mBtn.classList.remove( "active" );
      }
    }
    */

    if ("onpropertychange" in modalTrigger) {
        // старый IE
        modalTrigger.onpropertychange = function() {
            // проверим имя изменённого свойства
            if (event.propertyName == "checked") {
                //changeApply();
                // do something
            }
        };
    } else {
        // остальные браузеры
        modalTrigger.onchange = function() {
            //changeApply();
            // do something
        };
    }

    window.modal = modal;
    modal.content = modalContent;
    modal.window = modalWindow;
    modal.spiner = modalSpiner;


}( window, void( 0 ) ) );


/* типа обработчик клика и эмуляция запроса */
;( function() {

    /* replacer function */
    if ( !window.replacer ) window['replacer'] = function ( item ){
        return item.replace( /&amp;/g, "&" )
            .replace( /&amp;/g, "&" )
            .replace( /&nbsp;/g, " " )
            .replace( /&raquo;/g, "»" )
            .replace( /&laquo;/g, "«" )
            .replace( /&quot;/g, "\"" )
            .replace( /&lsquo;/g, "‘" )
            .replace( /&rsquo;/g, "’" )
            .replace( /&copy;/g, "©" )
            .replace( /&bull;/g, "•" )
            .replace( /&reg;/g, "®" )
            .replace( /&deg;/g, "°" )
            .replace( /&lt;/g, "<" )
            .replace( /&gt;/g, ">" )
            .replace( /&tilde;/g, "~" )
            .replace( /&ndash;/g, "–" )
            .replace( /&mdash;/g, "—" )
            .replace( /&ldquo;/g, "“" )
            .replace( /&rdquo;/g, "”" )
            .replace( /&bdquo;/g, "„" )
            .replace( /&hellip;/g, "…" )
            .replace( /&trade;/g, "™" )
    }

    window.modal || console.error( "not loaded module popup" );

    function getInfo( name ) {
        var resp;

        /* ajax or fetch or xhr */
        /* geve me event -> response obj */

        /* todo check data into storage, if none -> send ajax */

        return new Promise ( function( resolve, reject ){

            setTimeout( function() {
                if ( name == "event1" ) {
                    resp = {
                        name: "event1",
                        who: "collaborator1 text",
                        a1: "a1 text",
                        a2: "a2 text",
                        description: "<h2>title title 1</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non.</p><h2> title 2</h2>"
                        + "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non."
                    };
                }
                if ( name == "event2" ) {
                    resp = {
                        name: "event2",
                        who: "collaborator2 text",
                        a1: "a1 text rrrr",
                        a2: "a2 text rrrr",
                        description: "<h2>title title tt2</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non.</p><h2> title 2</h2>"
                        +"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non."
                    }
                }
                resolve( {name:name,data:resp} );

            }, 300 );
        } );


    }

    function createContent( idx ) {

        modal.content.innerHTML = '';

        var obj = this_calendar.events[ idx ];

        var _data = document.createDocumentFragment();

        var mHeader = document.createElement( "div" );
        mHeader.classList.add( "m-header" );

        // console.log( idx, obj );
        // console.log( replacer("&laquo;Рец&lsquo;&rsquo;епт&amp;amp;©успе&bull;шной®презе&ldquo;нт&rdquo;ац&bdquo;ии&deg;от&nbsp;ай&mdash;&hellip;ай&lt;ен&gt;ан&trade;ка&raquo;") );

        /* TODO */
        mHeader.innerHTML = '<div class="m-cell-1">'
            +'<div class="m-name">' + obj.name + '</div>'
            +'</div>'
            +'<div class="m-cell-2">'
            +'<div class="m-icons">'
            +'<span class="m-icons-item" title="title1"><i class="fa-2x far fa-clock"></i></span>'
            +'<span class="m-icons-item" title="item"><i class="fa-2x far fa-compass"></i></span>'
            +'<span class="m-icons-item" title="item"><i class="fa-2x far fa-handshake"></i></span>'
            +'<span class="m-icons-item" title="item"><i class="fa-2x far fa-heart"></i></span>'
            +'<span class="m-icons-item" title="item"><i class="fa-2x far fa-lightbulb"></i></span>'
            +'</div>'
            +'</div>';

        var mMain = document.createElement( "div" );
        mMain.classList.add( "m-main" );
        /* TODO */
        mMain.innerHTML = '<div class="m-cell-1">'
            + replacer(obj.description) +
            '</div>'
            +'<div class="m-cell-2">'
            +'<div class="m-title">Type:</div>'
            +'<p>' + obj.type + '</p>'
            +'<div class="m-title">Start:</div>'
            +'<p>' + obj.start_date + '</p>'
            +'<div class="m-title">Finish:</div>'
            +'<p>' + obj.finish_date + '</p>'
            +'<div class="m-title">Max-persons:</div>'
            +'<p>' + obj.max_pers + '</p>'
            +'<div class="m-title">Price:</div>'
            +'<p>' + obj.price + '</p>'
            +'<div class="m-title">Company:</div>'
            +'<p>' + obj.company + '</p>'
            +'</div>'


        var mFooter = document.createElement( "div" );
        mFooter.classList.add( "m-footer" );
        /* TODO */
        mFooter.innerHTML = '<div class="m-cell-1">'
            +'<button class="btn m-btn m-btn_black">Зарегистрироваться</button>    '
            +'</div>'
            +'<div class="m-cell-2">'
            +'<button class="btn m-btn m-btn_white">Зарегистрироваться</button>    '
            +'</div>';

        _data.appendChild( mHeader );
        _data.appendChild( mMain);
        _data.appendChild( mFooter );

        modal.content.appendChild( _data );
        modal.window.setAttribute( "data-loaded", "" );

    }

    function catchEventOpen( e ) {
        if ( !e.target.classList.contains( "calendar-event_btn" ) || !e.target.hasAttribute( "for" )  ) return false;

        //var response = getInfo( e.target.getAttribute( "data-name" ) );
        //var response = get_events( e.target.getAttribute( "data-name" ) );

        modal.window.removeAttribute( "data-loaded" );

        // response.then( function( resp ){
        // createContent( resp );
        // } ).catch( function( e ){ console.error( e ); } )

        //console.log( events[e.target.getAttribute( "data-idx" )].name );
        var data_opt_event_type = e.target.getAttribute( "data-opt-event-type" );
        //if ( modal.window.hasAttribute( e.target.getAttribute( "data-opt" ) ) ) modal.window.removeAttribute( e.target.getAttribute( "data-opt" ) );
        modal.window.setAttribute( "data-event-type", data_opt_event_type );
        //console.log( e.target.getAttribute( "data-opt-event-type" )  );
        createContent( e.target.getAttribute( "data-idx" ) );

    }
    document.body.addEventListener( "click", catchEventOpen, false );
}());