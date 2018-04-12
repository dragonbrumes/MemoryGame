var app = {

  //Création d'un tableau vide qui va contenir les cards
  cards: [],

  init: function(){
    //console.log('init');

    //appelle de la méthode de génération des cards
    app.cardsGenerators();

    //appelle de la méthode d'ajout des cards au board
    app.addCardsToboard();

    //appelle de la fonction au clic;
    //$('.card').on('click', app.returnCard);

  }, // *********************fin init

    // méthode pour générer les cards ***************
    cardsGenerators: function(){
      var $i = 0;
      //on boucle autant de fois que de carte à créer
      while ($i < 28) {
        $i++;
        //création de 28 div
        var $cardDiv = $('<div>');

        //affectation des class aux div
        $cardDiv.addClass('card');
        //rangement des divs .cards dans le tableau app.cards
        app.cards[$i] = $cardDiv;
      } // fin WHILE ********************

    // ## créations des div enfants ##
      //définition de la position pour les div images
      var $positionY = 0;
      //boucle sur les divs du tableau des .cards
      app.cards.forEach(function(cards) {

        // Création des Div .cache
        var $cacheDiv = $('<div>');
        $cacheDiv.addClass('cache');

        // Création des Divs .image
        $positionY += 100; //on incrémente de 100 la position
        var $imageDiv = $('<div>');
        $imageDiv.addClass('image');
        $imageDiv.css({
          backgroundImage: 'url(../images/cards.png)',
          backgroundPosition: ' 100px '+$positionY+'px',
        });
        // ajout des divs .cache et .image aux divs .card du tableau app.cards
        cards.append($cacheDiv);
        cards.append($imageDiv);

      });//fin foreach
      //console.log(app.cards[2]);
      //console.log(app.cacheCards);

      //positionnement des div enfants de la div card
       // $('.card').append($cacheDiv);
       // $('.card').append($imageDiv);


    },//**fin cardsGenerators*****************

    SaveCardsGenerators: function(){
      // appelle de création de 28 div ou 28 cards
      var $i = 0;
      //on définit la position du background
      var $positionX = 100;
      var $positionY = 100;
      while ($i < 28) {
        $i++;
        //on incrémente la position du background
        $positionY += 100;
        //création des 28 div cache
        var $cardDiv = $('<div>');
        $cardDiv.addClass('card');
        $cardDiv.addClass('cache');
        $cardDiv.data('nbr', $i); //on affecte un data nbr pour le retrouver au clic
        $cardDiv.css({
          backgroundImage: 'url(../images/cards.png)',
          backgroundPosition: ' '+$positionX+'px '+$positionY+'px '  ,
        });
        //On range les div dans la property app.card
        app.cards[$i] = $cardDiv;
      }
      console.log(app.cards);


},//**fin cardsGenerators

    //méthode d'ajout des div aux board *************
    addCardsToboard:function(){
      $('.board-game').append(app.cards);
    }, // addCardsToboard

    returnCard: function(event){
      //on récupère le data de la carte cliquée et identifiée
      //var $clickedCard = $(this).data('nbr');

      //on cible la card qui a ce data
      //var $selectedCard = $('.card').data('nbr');

      //on retir à cette card la class .cache et remple par la classe .image
      $(this).removeClass('cache');
      $(this).addClass('image');
      // console.log($(this));
      // console.log($clickedCard);
      // console.log($selectedCard);
    }, // returnCard





};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
