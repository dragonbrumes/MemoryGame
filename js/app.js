var app = {

  //Création d'un tableau vide qui va contenir les cards
  cards: [],

  init: function(){
    //console.log('init');

    //appelle de la méthode de génération des cards
    app.cardsGenerators();

    //on méange les cartes
    app.shuffleCards(app.cards);

    //appelle de la méthode d'ajout des cards au board
    app.addCardsToboard();

    //appelle de la fonction de retournement au clic;
    $('.card').on('click', app.returnCard);

  }, // *********************fin init

  // méthode pour générer les cards ***************
  cardsGenerators: function(){
    // appelle de création des x div
    var $i = 0;
    //on définit la position du background de .image avt la boucle
    var $positionX = 100;
    var $positionY = 0;

    for (var index in app.cardsName) {
      //console.log(app.cardsName[index]);
      var $cardName = cardsName.name[index];
    }

    while ($i < 36) {

      //création des x div .card
      var $cardDiv = $('<div>');
      $cardDiv.addClass('card');
      $cardDiv.data('idCard', cardsName.name[$i]); //on affecte un data  au cas où
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
      console.log(app.cards);
  },//**fin cardsGenerators

  bourrinCardsGenerators: function(){
    var $i = 0;
    var $positionY = 0;
    //on boucle autant de fois que de carte à créer
    while ($i < 36) {
      $i++;
      //création de x div
      var $cacheDiv = '<div class="cache"></div>';
      $positionY += 100; //on incrémente de 100 la position
      var $imageDiv = '<div class="image" style="background-image: url(../images/cards.png), background-position:  100px '+$positionY+'px;" ></div>';
      //var $imageDiv = '<div class="image"></div>';
      var $cardDiv = '<div class="card">'+$cacheDiv+''+$imageDiv+'</div>';
      app.cards.push($cardDiv);
      console.log(app.cards);

    } // fin WHILE ********************

  },//**fin cardsGenerators*****************

  //mélange des cartes positions
  shuffleCards: function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },//fin shuffle

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
    $(this).children().hide('cache');
    $(this).children().next().show('image');

  }, // returnCard





};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
