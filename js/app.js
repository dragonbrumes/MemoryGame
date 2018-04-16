var app = {

  cards: [], // le tableau vide des cartes
  cardsOnBoard: 6, // le nbre de carte à jouer dans le board par défaut
  // valeur vide des cartes et div selectionnées
  clickedCard1: null,
  clickedDiv1: null,
  clickedCard2: null,
  clickedDiv2: null,
  // timer data
  startTimer: null,
  secondTimer: 60, //le temps du compte à rebours
  //score
  gamesWin: Number(localStorage.getItem('gameslocalWin')),
  gamesLose: Number(localStorage.getItem('gameslocalLose')),
  gameslocalWin: null,
  gameslocalLose: null,

  init: function() {
    console.log('init');

    // appel la création du menu
    app.menuGen();

    // tableau des scoreWin
    app.scoreBoard();

    //appel de la méthode d'ajout des cards au plateau avec une valeur par défault
    //pour lancer le jeu avec un minimun de carte (contient la fonction de création des cartes)
    app.addCardsToBoard(app.cardsOnBoard);

    //ecoute les boutons de choix du nbre de cartes et on affecte cette nelle valeurs
    //à app.cardsOnBoard
    $('.button').on('click', app.difficultyLevel);

    //appel de la fonction de RETOURNEMENT au clic;
    //mais n'ecoute pas directement .card, sinon au changement de DOM pour le nbre de carte,
    //le listener ne fonctionne plus. On écoute donc à partir de leur parent, .board-game
    $('.board-game').on('click', '.card', app.game);

    //appel de la fonction RESET pour recharger la page;
    $('.reset').on('click', app.resetBoard);


  }, // *************************************************fin init

  /************** GENERATORS ***********************************/

  // règle le niveau de difficulté au niveau des boutons
  difficultyLevel: function() {
    // on met à jour le nbre de carte par défault
    app.cardsOnBoard = Number($(this).val());
    //on envoi à la fonction le nbre de carte qu'on veut attacher au plateau
    app.addCardsToBoard($(this).val());
    //on règle le timer sur un valeur diff selon le nombre de cartes
    if (app.cardsOnBoard === 18) {
      app.secondTimer = 90;
    } else {
      app.secondTimer = 60;
    }
  }, // end of difficultyLevel

  //Score board
  scoreBoard: function() {
    //on affiche les scores dans les td respectives. Issues du localStorage.
    $('#scoreTotal').text(app.gamesWin + app.gamesLose);
    $('#scoreWin').text(app.gamesWin);
    $('#scoreLose').text(app.gamesLose);
  },

  // ProgressBar and LOSE process
  progressTimer: function() {

    // si app.startTimer est null c'est qu'il n'a pas été déjà lancé. On peut le lancer
    if (app.startTimer == null) {
      // valeur en second indiqué par les boutons de difficulté
      let $a = app.secondTimer;
      // valeur de la barre de progression
      let $s = 100;
      // La barre de width:%($s) décrémente plus vite que la barre de temps $a (attr aria)
      // il faut faire correspondre la vitesse de décrémentation avec ($s/$a)
      let $d = (100 / $a);
      // on lance le compteur
      let $oneSecond = setInterval(step, 1000);

      function step() {
        // si le compteur arrive à zero la partie s'arrête
        if ($a === 0) {
          // stockage en local de la partie perdue
          app.gamesLose = Number(localStorage.getItem('gameslocalLose'));
          app.gamesLose += 1;
          app.gamesLose = localStorage.setItem('gameslocalLose', Number(app.gamesLose));
          clearInterval($oneSecond);
          alert('LOOOOSER!');
          app.resetBoard();
        } else {
          // pour faire correspondre la barre de % (s) et le temps en s(a), la barre % descend plus vite
          $s -= $d;
          // toutes les secondes, on retir une seconde
          $a -= 1;
          // on update toutes le second le style html de la barre
          $('.progress-bar').css("width", " " + $s + "% ");
          $('.progress-bar').attr("aria-valuenow", " " + $a + " ");
          $('.progress-bar').text($a + 's');
          if ($a === 30) {
            $('.progress-bar').text(' HURRY UP!');
          }
        }
      } //step
    } // if
    //on affecte un valeur pour ne pas relancer le timer après un 1er clic
    return app.startTimer = 'on';
  }, // progressTime

  // création du menu
  menuGen: function() {

    //div nav
    var $navButtons = $('<div>');
    $navButtons.addClass('nav-buttons');
    $('main').after($navButtons);

    //boutton easy
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('button');
    $button.addClass('btn btn-warning');
    $button.addClass('6');
    $button.text('12 cards');
    $button.val('6');
    $('.nav-buttons').append($buttonDiv);

    //boutton medium
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('btn btn-warning');
    $button.addClass('button');
    $button.addClass('9');
    $button.text('18 cards');
    $button.val('9');
    $('.nav-buttons').append($buttonDiv);

    //boutton hard
    var $buttonDiv = $('<div>');
    $button = $('<button>');
    $($buttonDiv).append($button);
    $button.addClass('btn btn-warning');
    $button.addClass('button');
    $button.addClass('18');
    $button.text('36 cards');
    $button.val('18');
    $('.nav-buttons').append($buttonDiv);

    //reset
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
  cardsGenerators: function() {
    // appel de création des x div
    let $i = 0;
    //on définit la position du background de .image avt la boucle
    let $positionX = 100;
    let $positionY = 0;

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
        backgroundPosition: ' 100px ' + $positionY + 'px',
      });
      //compteur du while
      $i++;
      //on décrémente la position du background pour matcher avec l'odre descendant du sprit
      //la 1ere position est donc 0 avant la décrémentation de la taille de l'image
      $positionY -= 100;
      //ajout des .cache et .image au .card
      $cardDiv.append($cacheDiv);
      $cardDiv.append($imageDiv);

      //On range les div dans la property tableau app.card
      app.cards.push($cardDiv);
    }
  }, //**fin cardsGenerators

  // Ajout ou enlève des div au plateau selon le nbre voulu selectionné
  addCardsToBoard: function(cardsNbr) {

    //on vide toutes les div déjà crées
    $(".board-game").empty();
    // on vide le tableau des cartes déjà crée
    app.cards = [];
    //on génère les cartes
    app.cardsGenerators();

    // on récupre le nbre de carte demandée
    let $howManyCards = cardsNbr;
    let i = 0;
    // on créer 2 tableaux vide pour accueilir les infos des cartes
    var $cardTab1 = [];
    var $cardTab2 = [];
    // selection des cartes dans 2 tableaux avec un décalage de 18 pour avoir deux fois les memes id
    for (i; i < $howManyCards; i++) {
      $cardTab1[i] = app.cards[i];
      $cardTab2[i] = app.cards[(i + 18)];
    }
    //on mélange les cartes et leures positions des cartes dans les 2 tableaux
    app.shuffleCards($cardTab1);
    app.shuffleCards($cardTab2);

    // on attache les deux tableaux de div au plateau
    $('.board-game').append($cardTab1);
    $('.board-game').append($cardTab2);

  }, // addCardsToboard

  // Mélange des cartes et leures positions
  shuffleCards: function(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, //fin shuffle

  /************************ GAME LOGIC *************************/
  game: function(event) {
    // au 1er clic on lance la progressBar et on l'indique en parametre
    app.progressTimer('start');

    //si le 1er clic est vide
    if (!app.clickedDiv1) {
      //on stocke le nom data-idCard de la div et la div cliquée dans une var
      app.clickedId1 = $(this).data('idCard');
      app.clickedDiv1 = $(this);
      //on affiche la div image avec l'image et on cache la div .cache
      app.clickedDiv1.children().hide('cache');
      app.clickedDiv1.children().next().show('image');

      // on prévient le double clic sur la carte retournée
      // pour éviter d'envoyer deux fois l'idCard et marquer la carte avec un checked
      app.clickedDiv1.css("pointerEvents", "none");

      //si au 2eme clic les id images ne correspondent pas au 1er clic
    } else if ($(this).data('idCard') !== app.clickedId1) {

      app.clickedId2 = $(this).data('idCard');
      app.clickedDiv2 = $(this);

      //on renvoi vers la méthode de non correspondance
      app.unmatchedCard();

      /****** if it's a match! ******/
    } else if ($(this).data('idCard') === app.clickedId1) {

      app.clickedId2 = $(this).data('idCard');
      app.clickedDiv2 = $(this);

      //on renvoi vers la méthode de correspondance si 2 cartes sont identiques
      app.matchedCard();
    }
  }, // fin function returnCard

  //si les cartes ne sont pas identiques
  unmatchedCard: function() {

    //on cache le cache et on montre l'image
    app.clickedDiv2.children().hide('cache');
    app.clickedDiv2.children().next().show('image');

    //on empeche le clic sur toutes les cards
    $('.card').css("pointerEvents", "none");

    //on permet à nouveau le clic après 1sec
    window.setTimeout(app.noClickOff, 1000);

    //on retourne les image non correspondentes
    app.clickedDiv1.children(":first").delay(1100).fadeIn(140, "linear");
    app.clickedDiv1.children(":nth-child(2)").delay(900).fadeOut(300, "linear");
    app.clickedDiv2.children(":first").delay(1100).fadeIn(120, "linear");
    app.clickedDiv2.children(":nth-child(2)").delay(900).fadeOut(250, "linear");

    //remise à 0 des valeurs clickedCard et clickedDiv
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
  },

  // rétablissment de l'écoute sur les clics
  noClickOff: function() {
    //on rétablit les clics
    $('.card').css("pointerEvents", "");
  },

  //si deux cartes sont identiques et WIN process
  matchedCard: function() {

    // on récupère et affecte les valeurs du data et de la div cliquée
    app.clickedDiv2.children().hide('cache');
    app.clickedDiv2.children().next().show('image');
    app.clickedDiv1.addClass('checked');
    app.clickedDiv2.addClass('checked');

    // on compte le nombre de carte à checked (trouvés).
    let $checked = Number($('.checked').length);

    // si le nbre de carte checked est égal au nbre de carte sur le plateau, c'est gagné
    if ($checked === (app.cardsOnBoard * 2)) {

      // stockage en local de la partie gagnée
      // récupération du local
      let $addWin = Number(localStorage.getItem('gameslocalWin'));
      //j'ajoute 1
      $addWin += 1;
      // on renvoi au local
      app.gameslocalWin = Number(localStorage.setItem('gameslocalWin', $addWin));
      // on set la valeur win
      app.gamesWin = app.gameslocalWin;

      // message de victoire
      setTimeout(function() {
        alert('YOU ARE AWESOME. YOU WIN!');
        app.resetBoard();
      }, 1000);
    }

    //on remet les valeurs à zéro
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;

  }, //fin matched cards

  // reset le board après un win ou un lose
  resetBoard: function() {
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
    location.reload();
  },

}; //**********fin app

// quand le DOM est chargé, appel la méthode app.init();
$(app.init);
