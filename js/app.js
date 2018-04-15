var app = {

  cards: [], // le tableau vide des cartes
  cardsOnBoard: 6, // le nbre de carte à jouer dans le board par défaut
  // valeur vide des cartes et div selectionnées
  clickedCard1: null,
  clickedDiv1: null,
  clickedCard2: null,
  clickedDiv2: null,
  startTimer: null,

  init: function(){
    //console.log('init');


    //on appelle la création du menu
    app.menuGen();

    //création des cartes à jouer
    app.cardsGenerators();


    //appelle de la méthode d'ajout des cards au plateau avec une valeur par défault
    //pour lancer le jeu avec un minimun de carte
    app.addCardsToBoard2(app.cardsOnBoard);

    //on méange les cartes
    //app.shuffleCards(app.cards);

    //appelle de la fonction de RETOURNEMENT au clic;
    $('.card').on('click', app.game);

    //ecoute les boutons de choix du nbre de cartes et on affecte cette nelle valeurs
    //à app.cardsOnBoard
    $('.button').on('click', function (){
      app.cardsOnBoard = $(this).val();
      app.addCardsToBoard2($(this).val());
    });

    //appelle de la fonction RESET;
    $('.reset').on('click', app.resetBoard);



  }, // *******************************************************fin init

  /************** GENERATORS ***********************************/

  //progressBar
  progressTimer: function(on) {
    let $started = on;
    console.log($started);

    if (app.startTimer == null) {
      let $a = 60;
      //a rebours
      let $s = 100;
      let $oneSecond = setInterval(step, 1000);
      function step() {
        if ($a === 0) {
          clearInterval($oneSecond);
          alert('LOOOOSER!');
          app.resetBoard();
        } else {
          $s-=1.66;
          $a-=1;
           $('.progress-bar').css("width", " "+$s+"% ");
           $('.progress-bar').attr("aria-valuenow", " "+$a+" ");
           $('.progress-bar').text($a+'s');
           console.log($a);
        }
      } //step
    } // if
    return app.startTimer = 'on';
  },// progressTime

  // création du menu
  menuGen: function(){
    //36 18 9
    //24 12 6

    //div nav
    var $navButtons = $('<div>');
    $navButtons.addClass('nav-buttons');
    $('main').append($navButtons);

    //boutton 9 cartes
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('6');
    $button.text('6 cartes');
    $button.val('6');
    $('.nav-buttons').append($buttonDiv);


    //boutton 18 cartes
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('12');
    $button.text('12 cartes');
    $button.val('12');
    $('.nav-buttons').append($buttonDiv);

    //boutton 38
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('24');
    $button.text('24 cartes');
    $button.val('24');
    $('.nav-buttons').append($buttonDiv);

    //reset
    //boutton 38
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('reset');
    $button.text('reset');
    $button.val('reset');
    $('.nav-buttons').append($buttonDiv);
  },

  // méthode pour générer les cards ***************
  cardsGenerators: function(){
    // appelle de création des x div
    var $i = 0;
    //on définit la position du background de .image avt la boucle
    var $positionX = 100;
    var $positionY = 0;

    // boucle de création de toutes les cartes
    while ($i < 36) {

      //création des x div .card
      var $cardDiv = $('<div>');
      $cardDiv.addClass('card');
      //$cardDiv.addClass(cardsName.name1[$i]);
      $cardDiv.data('idCard', cardsName.name[$i]); //on affecte un data caché

      //création des x div .cache
      var $cacheDiv = $('<div>');
      $cacheDiv.addClass('cache');
      //création des x div .image
      var $imageDiv = $('<div>');
      $imageDiv.addClass('image');
      $imageDiv.css({
        backgroundImage: 'url(../images/cards.png)',
        backgroundPosition: ' 100px '+$positionY+'px',
      });
      //compteur du while
      $i++;
      //on décrémente la position du background pour matcher avec l'odre descendant du sprit
      //la 1ere position est donc 0 avant la décrémentation
      $positionY -= 100;
      //ajout des .cache et .image au .card
      $cardDiv.append($cacheDiv);
      $cardDiv.append($imageDiv);

      //On range les div dans la property tableau app.card
      app.cards.push($cardDiv);
    }
      //console.log(app.cards);
  },//**fin cardsGenerators

  //mélange des cartes positions
  shuffleCards: function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },//fin shuffle

  //méthode d'ajout des div au plateau selon le nbre voulu selectionné *************
  addCardsToBoard2:function(cardsNbr){
    //remise à zéro du nombre de card sur le plateau
    //  $( "div" ).remove( ".cache" );
    //  $( "div" ).remove( ".image" );
    //  $( "div" ).remove( ".card" );
    //  $( ".board-game" ).empty();
    //  $('.card').unbind();
    //  app.cards = [];
    // app.cardsGenerators();
    //
    // // $('.cache').remove();
    // // $('.image').remove();
    // // $('.card').remove();
    //
    // //remise à 0 des valeurs clickedCard et clickedDiv
    //  app.clickedCard1 = null;
    //  app.clickedCard2 = null;
    //  app.clickedDiv1 = null;
    //  app.clickedDiv2 = null;

    let $howManyCards = cardsNbr;
    let i = 0;
    var $cardTab1 = [];
    var $cardTab2 = [];
    //selection des data-id dans 2 tableaux avec un décalage pour avoir  deux fois les memes id
    for (i; i < $howManyCards; i++) {
       $cardTab1[i] = app.cards[i];
       $cardTab2[i] = app.cards[(i+18)];
    }

    app.shuffleCards($cardTab1);
    app.shuffleCards($cardTab2);

    // on attache les deux tab de div au plateau
    $('.board-game').append($cardTab1);
    $('.board-game').append($cardTab2);

    //app.game();
  }, // addCardsToboard

  addCardsToBoard:function(){
    $('.board-game').append(app.cards);
  }, // addCardsToboard

  /************************ GAME LOGIC *************************/
  game: function(event){
    //progressBar au 1er clic
    var $on = 'start';
    app.progressTimer($on);

    //si le 1er clic est vide
    if (!app.clickedDiv1) {
      //on range le nom de la div et la div cliquée dans une var
      //app.clickedId1 = $(this).attr('class').slice(0,-1);
      //app.clickedId1 = $(this).data('idCard').slice(0,-1);
      app.clickedId1 = $(this).data('idCard');
      app.clickedDiv1 = $(this);
      //on affiche la div image avec l'image
      app.clickedDiv1.children().hide('cache');
      app.clickedDiv1.children().next().show('image');
      console.log(app.clickedId1);

      //si au 2eme clic les id images ne correspondent pas
    } else if ($(this).data('idCard') !== app.clickedId1) {
       //app.clickedId2 = $(this).attr('class').slice(0,-1);
       app.clickedId2 = $(this).data('idCard');
       app.clickedDiv2 = $(this);
       console.log('ko '+app.clickedId2);
       //on renvoi vers la méthode de non correspondance
       app.unmatchedCard();

      /****** if it's a match! ******/
    } else if ($(this).data('idCard') === app.clickedId1){
      app.clickedId2 = $(this).data('idCard');
      app.clickedDiv2 = $(this);
      console.log('ok '+app.clickedId2);
        //on renvoi vers la méthode de correspondance
        app.matchedCard();
     }
  }, // fin function returnCard

  //si les cartes ne sont pas identiques
  unmatchedCard: function(){

   //on cache le cache et on montre l'image
   app.clickedDiv2.children().hide('cache');
   app.clickedDiv2.children().next().show('image');
   //console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);
   //console.log('$clickedCard2: '+app.clickedId2);
   //on empeche le clic sur toutes les cards
   $('.card').css("pointerEvents", "none");
   //on permet à nouveau le clic après 1sec
   window.setTimeout(app.noClickOff, 1000);
   //on retourne les image non correspondentes
   app.clickedDiv1.children(":first").delay( 1400 ).fadeIn(150, "linear" );
   app.clickedDiv1.children(":nth-child(2)").delay( 1000 ).fadeOut(400, "linear" );

   app.clickedDiv2.children(":first").delay( 1400 ).fadeIn(110, "linear" );
   app.clickedDiv2.children(":nth-child(2)").delay( 1000 ).fadeOut(300, "linear" );

   //remise à 0 des valeurs clickedCard et clickedDiv
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
  },

  // rétablissment de l'écoute sur les clics
  noClickOff: function(){
    //on rétablit les clics
    $('.card').css("pointerEvents", "");
  },

  //si deux cartes sont identiques
  matchedCard: function(){

    app.clickedDiv2.children().hide('cache');
    app.clickedDiv2.children().next().show('image');
    app.clickedDiv1.addClass('checked');
    app.clickedDiv2.addClass('checked');

    //check si il reste des cartes à découvrir
    let $checked = Number($('.checked').length);
    //console.log($checked);

    if ($checked === (app.cardsOnBoard*2)) {
      alert('YOU ARE AWSOME. YOU WIN!');
      app.resetBoard();
    }
    console.log('YEAH!');

    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
  },//fin matched cards

  // reset
  resetBoard: function () {
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
    //$( ".board-game" ).empty();
    location.reload();
  },

  progressBar: function(){

  },



};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
