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
    // if (app.cardsOnBoard == null) {
    //   console.log('c\'est null');
    //   var sessionData = sessionStorage.getItem(app.cardsOnBoard);
    //   var sessionData = sessionStorage.setItem(app.cardsOnBoard, '6');
    // } else {
    //   var sessionData = sessionStorage.getItem(app.cardsOnBoard);
    //   console.log('sessionData '+sessionData);
    // };

    //on appelle la création du menu
    app.menuGen();

    //création des cartes à jouer
    //app.cardsGenerators();

    //appelle de la méthode d'ajout des cards au plateau avec une valeur par défault
    //pour lancer le jeu avec un minimun de carte
    app.addCardsToBoard(app.cardsOnBoard);

    //ecoute les boutons de choix du nbre de cartes et on affecte cette nelle valeurs
    //à app.cardsOnBoard
    $('.button').on('click', function (){
      // on met à jour le nbre de carte par défault
      app.cardsOnBoard = $(this).val();
      //on envoi à la fonction le nbre de carte qu'on veut attacher au plateau
      app.addCardsToBoard($(this).val());
    });

    //appelle de la fonction de RETOURNEMENT au clic;
    //mais n'ecoute pas directement .card, sinon au changement de DOM pour le nbre de carte,
    //le listener ne fonctionne plus. On écoute donc à partir de leurs parent, .board-game
    $('.board-game').on('click', '.card', app.game);

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
    // Get saved data from sessionStorage
    var cNbr = sessionStorage.getItem(app.cardsOnBoard);
    console.log('cNbr '+cNbr);
    // mise ou remise à zéro du nombre de card sur le plateau
    //on vide toutes les div déjà crées
     $( ".board-game" ).empty();
     // on vide le tableau déjà créer
     app.cards = [];
     //on génère les cates
     app.cardsGenerators();

    /******************/
    // 6 = 12 cartes //
    // 14 = 28 cartes//
    // 18 = 36 cartes//
    /****************/
    // on récupre le nbre de carte demandée
    //let $howManyCards = sessionStorage.getItem(app.cardsOnBoard);
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
    // au 1er clic on lance la progressBar et lui dit en parametre
    app.progressTimer('start');

    //si le 1er clic est vide
    if (!app.clickedDiv1) {
      //on range le nom de la div et la div cliquée dans une var
      app.clickedId1 = $(this).data('idCard');
      app.clickedDiv1 = $(this);
      //on affiche la div image avec l'image
      app.clickedDiv1.children().hide('cache');
      app.clickedDiv1.children().next().show('image');
      //console.log('clickedId1: ' +app.clickedId1);

      //si au 2eme clic les id images ne correspondent pas
    } else if ($(this).data('idCard') !== app.clickedId1) {
       //app.clickedId2 = $(this).attr('class').slice(0,-1);
       app.clickedId2 = $(this).data('idCard');
       app.clickedDiv2 = $(this);
       //console.log('ko '+app.clickedId2);
       //on renvoi vers la méthode de non correspondance
       app.unmatchedCard();

      /****** if it's a match! ******/
    } else if ($(this).data('idCard') === app.clickedId1){
      app.clickedId2 = $(this).data('idCard');
      app.clickedDiv2 = $(this);
      //console.log('ok '+app.clickedId2);
      //on renvoi vers la méthode de correspondance si 2 cartes sont identiques
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
    //console.log(app.cardsOnBoard);
    // on compte le nombre de carte à checked (trouvés).
    let $checked = Number($('.checked').length);
    // si le nbre de carte checked est égal au nbre de carte sur le plateau, c'est gagné
    if ($checked === (app.cardsOnBoard*2)) {
      app.clickedDiv2.children().hide('cache');
      app.clickedDiv2.children().next().show('image');
      alert('YOU ARE AWESOME. YOU WIN!');
      app.resetBoard();
    }
    //console.log('YEAH!');
    //on remet les valeurs à zéro
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


};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
