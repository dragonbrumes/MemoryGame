var app = {

  //Création d'un tableau vide qui va contenir les cards
  cards: [],
  openedCard: [],
  clickedCard1: null,
  clickedDiv1: null,
  clickedCard2: null,
  clickedDiv2: null,

  init: function(){
    //console.log('init');

    //appelle de la méthode de génération des cards
    app.cardsGenerators();

    //on méange les cartes
    //app.shuffleCards(app.cards);

    //appelle de la méthode d'ajout des cards au board
    app.addCardsToboard();

    //appelle de la fonction de retournement au clic;
    $('.card').on('click', app.game);

  }, // *********************fin init

  // méthode pour générer les cards ***************
  cardsGenerators: function(){
    // appelle de création des x div
    var $i = 0;
    //on définit la position du background de .image avt la boucle
    var $positionX = 100;
    var $positionY = 0;

    // for (var index in app.cardsName) {
    //   //console.log(app.cardsName[index]);
    //   var $cardName = cardsName.name[index];
    // }
    // var demandCard = 7;
    // var totalCards = cardsName.name1.length;
    // for (let i; i < totalCards; i++) {
    //   //console.log(app.cardsName[index]);
    //   var $cardName1 = cardsName.name1[i];
    //   var $cardName2 = cardsName.name2[i];
    // }

    // 36 ou 28
    while ($i < 36) {

      //création des x div .card
      var $cardDiv = $('<div>');
      $cardDiv.addClass('card');
      //$cardDiv.addClass(cardsName.name1[$i]);
      $cardDiv.data('idCard', cardsName.name1[$i]); //on affecte un data caché

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

  //méthode d'ajout des div aux board *************
  addCardsToboard:function(){
    $('.board-game').append(app.cards);
  }, // addCardsToboard

  game: function(event){
    //si le 1er clic est vide
    if (!app.clickedDiv1) {
      //on range le nom de la div et la div cliquée dans une var
      //app.clickedId1 = $(this).attr('class').slice(0,-1);
      app.clickedId1 = $(this).data('idCard').slice(0,-1);
      app.clickedDiv1 = $(this);
      //on affiche la div image avec l'image
      app.clickedDiv1.children().hide('cache');
      app.clickedDiv1.children().next().show('image');

      //si au 2eme clic les id images ne correspondent pas
    } else if ($(this).data('idCard').slice(0,-1) !== app.clickedId1) {
       //app.clickedId2 = $(this).attr('class').slice(0,-1);
       app.clickedId2 = $(this).data('idCard').slice(0,-1);
       app.clickedDiv2 = $(this);
       //on renvoi vers la méthode de non correspondance
       app.unmatched();

      /****** if it's a match! ******/
    } else if ($(this).data('idCard').slice(0,-1) == app.clickedId1){
      app.clickedId2 = $(this).data('idCard').slice(0,-1);
      app.clickedDiv2 = $(this);
        //on renvoi vers la méthode de correspondance
        app.matchedCard();
     }
  }, // fin function returnCard

  //si les cartes ne sont pas identiques
  unmatched: function(){

   //on cache le cache et on montre l'image
   app.clickedDiv2.children().hide('cache');
   app.clickedDiv2.children().next().show('image');
   //console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);
   //console.log('$clickedCard2: '+app.clickedId2);
   //on empeche le clic sur toutes les cards
   $('.card').css("pointerEvents", "none");
   //on permet à nouveau le clic après 1sec
   window.setTimeout(app.noClickOff, 1200);
   //on retourne les image non correspondentes
   app.clickedDiv1.children(":first").delay( 2300 ).fadeIn(200, "linear" );
   app.clickedDiv1.children(":nth-child(2)").delay( 1000 ).fadeOut(800, "linear" );
   app.clickedDiv2.children(":first").delay( 2100 ).fadeIn(200, "linear" );
   app.clickedDiv2.children(":nth-child(2)").delay( 1000 ).fadeOut(1000, "linear" );

   //remise à 0 des valeurs clickedCard et clickedDiv
    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
  },

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
    console.log($checked);

    if ($checked === 36) {
      alert('YOU ARE AWSOME. YOU WIN!');
      console.log('You Win!');
    }


    console.log('YEAH!');

    app.clickedCard1 = null;
    app.clickedCard2 = null;
    app.clickedDiv1 = null;
    app.clickedDiv2 = null;
  },//fin matched cards


  timer: function(){

  },



};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
