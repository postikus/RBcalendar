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
  //modalWindow.innerHTML = '<div id="spn" class="container" style="position: relative;top:150px;display: inline-block;box-sizing: border-box;padding: 0px;width: 25%;height: 140px;">'
    //+'<div class="circle" style="box-sizing: border-box;width: 140px;height: 140px;border-radius: 100%; border: 24px solid rgba(55, 255, 55, 0.2);border-top-color: #FF5;animation: spin 1s infinite linear;"></div></div>';


  modal.appendChild( modalTrigger );
  modal.appendChild( modalOverlay );
  modal.appendChild( modalWindow );
  document.body.appendChild( modal );


  var mBtn = document.querySelector( "[data-modalBtn][for='modalTrigger']" );
  
  function changeApply() {
    if ( modalTrigger.checked == true ) {
      /* data */
      //modalWindow.innerHTML = data.innerHTML ;
      mBtn.classList.add( "active" );
    } else {
      mBtn.classList.remove( "active" );
    }
  }

  if ("onpropertychange" in modalTrigger) {
    // старый IE
    modalTrigger.onpropertychange = function() {
      // проверим имя изменённого свойства
      if (event.propertyName == "checked") {
       changeApply();
     }
   };
 } else {
    // остальные браузеры
    modalTrigger.onchange = function() {
      changeApply();
    };
  }

  window.modal = modal;
  modal.window = modalWindow;


}( window, void( 0 ) ) );


/* типа обработчик клика и эмуляция запроса */
;( function() {
  window.modal || console.error( "not loaded module popup" );

  function getInfo( name ) {
    var resp;

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

      }, 0 );
    } );

    /* ajax or fetch or xhr */
    
    
  }

  function createContent( obj ) {

    modal.window.innerHTML = ''; 

    var _data = document.createDocumentFragment();

    var mHeader = document.createElement( "div" );
    mHeader.classList.add( "m-header" );

    console.log( obj.data );

    /* TODO */
    mHeader.innerHTML = '<div class="m-cell-1">'
    +'<div class="m-name"> &quot;' + obj.data.name + '!!!&quot; Lorem ipsum dolor sit  elit.</div>'
    +'</div>'
    +'<div class="m-cell-2">'
    +'<div class="m-control">'
    +'<a href="" class="m-control-link" title="link"><i class="fa-2x far fa-clock"></i></a>'
    +'<a href="" class="m-control-link" title="link"><i class="fa-2x far fa-clock"></i></a>'
    +'<a href="" class="m-control-link" title="link"><i class="fa-2x far fa-clock"></i></a>'
    +'<a href="" class="m-control-link" title="link"><i class="fa-2x far fa-clock"></i></a>'
    +'<a href="" class="m-control-link" title="link"><i class="fa-2x far fa-clock"></i></a>'
    +'</div>'
    +'</div>';
    
    var mMain = document.createElement( "div" );
    mMain.classList.add( "m-main" );
    /* TODO */
    mMain.innerHTML = '<div class="m-cell-1">'
    +'<div class="m-title">who</div>'
    +'<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non.</p>'
    +'<div class="m-title">title title 2</div>'
    +'<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, est nam perspiciatis provident esse error veritatis nulla corrupti mollitia sapiente labore, ipsum officia tenetur, cumque excepturi quo libero quis non.</p>'
    +'<img src="https://picsum.photos/140/60/" alt="" style="width:auto;height:auto;">'
    +'</div>'
    +'<div class="m-cell-2">'
    +'<div class="m-title">who?</div>'
    +'<p>' + obj.data.who + '</p>'
    +'<div class="m-title">title title 2</div>'
    +'<p>' + obj.data.a1 + '</p>'
    +'                '
    +'</div>';


    var mFooter = document.createElement( "div" );
    mFooter.classList.add( "m-footer" );
    /* TODO */
    mFooter.innerHTML = '<div class="m-cell-1">'
    +'<button class="btn">Зарегистрироваться</button>    '
    +'</div>'
    +'<div class="m-cell-2">'
    +'<button class="btn">Зарегистрироваться</button>    '
    +'</div>';

    _data.appendChild( mHeader );
    _data.appendChild( mMain);
    _data.appendChild( mFooter );

    modal.window.appendChild( _data );

  } 

  function catchEventOpen( e ) {
    if ( !e.target.classList.contains( "calendar-event_btn" ) || !e.target.hasAttribute( "for" )  ) return false;

    var response = getInfo( e.target.getAttribute( "data-name" ) );

    // modal.window.innerHTML = '<div id="spn" class="container" style="position: relative;top:70px;display: block;box-sizing: border-box;padding: 0px;width: 25%;height: 140px;">'
    // +'<div class="circle" style="box-sizing: border-box;width: 100px;height: 100px;border-radius: 100%; border: 16px solid rgba(55, 255, 55, 0.2);border-top-color: #FF5;animation: spin 1s infinite linear;"></div></div>';

    response.then( function( resp ){
      createContent( resp );  
    } ).catch( function( e ){ console.error( e ); } )
    
  }
  document.body.addEventListener( "click", catchEventOpen, false );
}());