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

    //ecoute les boutons de choix du nbre de cartes et on affecte cette nelle valeurs
    //à app.cardsOnBoard
    $('.button').on('click', function (){
      app.cardsOnBoard = $(this).val();
      app.addCardsToBoard($(this).val());
    });

    //création des cartes à jouer
    app.cardsGenerators();

    //appelle de la méthode d'ajout des cards au plateau avec une valeur par défault
    //pour lancer le jeu avec un minimun de carte
    app.addCardsToBoard(app.cardsOnBoard);

    //appelle de la fonction de RETOURNEMENT au clic;
    $('.card').on('click', app.game);

    //appelle de la fonction RESET;
    $('.reset').on('click', app.resetBoard);


  }, // *******************************************************fin init

  /************** GENERATORS ***********************************/

  // ProgressBar
  progressTimer: function() {

    // si app.startTimer est null c'est qu'il n'a pas été déjà lancer. On peut le lancer
    if (app.startTimer == null) {
      // valeur en second
      let $a = 60;
      // valeur de la barre de progression
      let $s = 100;
      let $oneSecond = setInterval(step, 1000);
      function step() {
        if ($a === 0) {
          // si le compteur arrive à zero
          clearInterval($oneSecond);
          alert('LOOOOSER!');
          app.resetBoard();
        } else {
          // pour faire correspondre la barre de % (s) et le temps en s(a), la barre % descend plus vite
          $s-=1.66;
          $a-=1;
          // on update toutes le second le style html de la barre
          $('.progress-bar').css("width", " "+$s+"% ");
          $('.progress-bar').attr("aria-valuenow", " "+$a+" ");
          $('.progress-bar').text($a+'s');
          if ($a === 30) {$('.progress-bar').text(' HURRY UP!');}
        }
      } //step
    } // if
    //on affecte un valeur pour ne pas relancer le timer après un 1er clic
    return app.startTimer = 'on';
  },// progressTime

  // création du menu
  menuGen: function(){
    //36 18 9
    //24 12 6

    //div nav
    var $navButtons = $('<div>');
    $navButtons.addClass('nav-buttons');
    $('main').after($navButtons);

    //boutton 9 cartes
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('btn btn-warning');
    $button.addClass('6');
    $button.text('12 cartes');
    $button.val('6');
    $('.nav-buttons').append($buttonDiv);


    //boutton 18 cartes
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('btn btn-warning');
    $button.addClass('button');
    $button.addClass('14');
    $button.text('28 cartes');
    $button.val('14');
    $('.nav-buttons').append($buttonDiv);

    //boutton 36
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('btn btn-warning');
    $button.addClass('button');
    $button.addClass('18');
    $button.text('36 cartes');
    $button.val('18');
    $('.nav-buttons').append($buttonDiv);

    //reset
    //boutton 38
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('btn btn-danger');
    $button.addClass('button');
    $button.addClass('reset');
    $button.text('reset');
    $button.val('reset');
    $('.nav-buttons').append($buttonDiv);
  },

  // Génération des cartes
  cardsGenerators: function(){
    // appelle de création des x div
    var $i = 0;
    //on définit la position du background de .image avt la boucle
    var $positionX = 100;
    var $positionY = 0;

    // boucle de création de toutes les cartes
    while ($i < 36) {

      //création des div .card
      var $cardDiv = $('<div>');
      $cardDiv.addClass('card');
      //$cardDiv.addClass(cardsName.name1[$i]);
      $cardDiv.data('idCard', cardsName.name[$i]); //on affecte un data caché

      //création des div .cache
      var $cacheDiv = $('<div>');
      $cacheDiv.addClass('cache');
      //création des div .image
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
  },//**fin cardsGenerators

  // Ajout des div au plateau selon le nbre voulu selectionné
  addCardsToBoard:function(cardsNbr){
    //remise à zéro du nombre de card sur le plateau
     // $( "div" ).remove( ".cache" );
     // $( "div" ).remove( ".image" );
     // $( "div" ).remove( ".card" );
     //$( "div" ).css( "" );
    $( ".board-game" ).empty();
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

    /******************/
    // 6 = 12 cartes //
    // 14 = 28 cartes//
    // 18 = 36 cartes//
    /****************/
    // on récupre le nbre de carte demandé
    let $howManyCards = cardsNbr;
    let i = 0;
    // on créer 2 tableau pour accueilir le nom des cartes
    var $cardTab1 = [];
    var $cardTab2 = [];
    // selection des data-id dans 2 tableaux avec un décalage de 18 pour avoir deux fois les memes id
    for (i; i < $howManyCards; i++) {
       $cardTab1[i] = app.cards[i];
       $cardTab2[i] = app.cards[(i+18)];
    }
    //on mélange les positions des cartes dans les 2 tableaux
    app.shuffleCards($cardTab1);
    app.shuffleCards($cardTab2);

    // on attache les deux tab de div au plateau
    $('.board-game').append($cardTab1);
    $('.board-game').append($cardTab2);
    //app.game();
  }, // addCardsToboard

  // Mélange de la positions des cartes
  shuffleCards: function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },//fin shuffle

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

   //on empeche le clic sur toutes les cards
   $('.card').css("pointerEvents", "none");

   //on permet à nouveau le clic après 1sec
   window.setTimeout(app.noClickOff, 1000);

   //on retourne les image non correspondentes
   app.clickedDiv1.children(":first").delay( 1100 ).fadeIn(140, "linear" );
   app.clickedDiv1.children(":nth-child(2)").delay( 900 ).fadeOut(300, "linear" );
   app.clickedDiv2.children(":first").delay( 1100 ).fadeIn(120, "linear" );
   app.clickedDiv2.children(":nth-child(2)").delay( 900 ).fadeOut(250, "linear" );

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

    // on récupère et affecte les valeurs du data et de la div cliqué
    app.clickedDiv2.children().hide('cache');
    app.clickedDiv2.children().next().show('image');
    app.clickedDiv1.addClass('checked');
    app.clickedDiv2.addClass('checked');

    //check si il reste des cartes à découvrir, si aucune c'est gagné
    let $checked = Number($('.checked').length);

    if ($checked === (app.cardsOnBoard*2)) {
      alert('YOU ARE AWESOME. YOU WIN!');
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
