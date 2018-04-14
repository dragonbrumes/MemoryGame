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
    console.log(app.cards);

    //appelle de la méthode de génération des cards
    app.cardsGenerators();

    //on méange les cartes
    //app.shuffleCards(app.cards);

    //appelle de la méthode d'ajout des cards au board
    app.addCardsToboard();

    //appelle de la fonction de retournement au clic;
    $('.card').on('click', app.returnCard2);

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
    // 36 ou 28
    while ($i < 28) {

      //création des x div .card
      var $cardDiv = $('<div>');
      $cardDiv.addClass('card');
      //$cardDiv.addClass(cardsName.name[$i])
      //$cardDiv.id(cardsName.name[$i]); // on affecte un id
      $cardDiv.data('idCard', cardsName.name[$i]); //on affecte un data

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
      //console.log(app.cards);

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

  returnCard2: function(event){
    //si le 1er clic est vide
    if (!app.clickedDiv1) {

      app.clickedId1 = $(this).data('idCard').slice(0,-1);
      //app.clickedId1 = $(this).attr('class').slice(0,-1);
      app.clickedDiv1 = $(this);

      $(this).children().hide('cache');
      $(this).children().next().show('image');
      console.log('clickedId1: '+app.clickedId1);

    //} else if ($(this).data('idCard').slice(0,-1) !== app.clickedCard1.slice(0,-1)) {
    } else
      //$(this).val().slice(0,-1) !== app.clickedId1
     if ($(this).data('idCard').slice(0,-1) !== app.clickedId1) {
       //app.clickedId2 = $(this).attr('class');
       app.clickedId2 = $(this).data('idCard').slice(0,-1);
       app.clickedDiv2 = $(this);
       console.log('clickedId2: '+app.clickedId2);

      //on cache le cache et on montre l'image
      $(this).children().hide('cache');
      $(this).children().next().show('image');
      //console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);
      //console.log('$clickedCard2: '+app.clickedId2);

      /****** if it's a match! or not... ******/
      //$(this).attr('class').slice(0,-1) == app.clickedId1
      if ($(this).data('idCard').slice(0,-1) == app.clickedId1){
        //on cache le cache et on montre l'image
        //app.clickedId2 = $(this).attr('class').slice(0,-1);
        app.clickedId2 = $(this).data('idCard').slice(0,-1);
        console.log('clickedId2: '+app.clickedId2);
        app.clickedDiv2 = $(this);
        $(this).children().hide('cache');
        $(this).children().next().show('image');
       console.log('YEAH!');
     } else {
      //animation de retour des caches cards
        app.clickedDiv1.children(":first").delay( 1300 ).fadeIn(300, "linear" );
        app.clickedDiv1.children(":nth-child(2)").fadeOut(800, "linear" );
        app.clickedDiv2.children(":first").delay( 1500 ).fadeIn(300, "linear" );
        app.clickedDiv2.children(":nth-child(2)").fadeOut(1000, "linear" );

        //remise à 0 des valeurs clickedCard et clickedDiv
         app.clickedCard1 = null;
         app.clickedCard2 = null;
         app.clickedDiv1 = null;
         app.clickedDiv2 = null;

      }//fin else gugu
    } // fin if elseif gal





  }, // fin function returnCard
  returnCard1: function(event){
    //si le 1er clic est vide
    if (!app.clickedCard1) {
      //on prévient le clic et ajoute la class .selectedDiv à la carte selectionnée
        //$(this).css("pointerEvents", "none").addClass('selectedDiv');
        // $(this).addClass('selectedDiv1');
        // $('.selectedDiv1').css("pointerEvents", "none");
        //$(this).off('click');

      app.clickedDiv1 = $(this);
      //on stock la valeur de la carte (un fruit) dans la variable $$clickedCard1
      //app.clickedCard1 = $(this).data('idCard');
      app.clickedCard1 = $(this).attr('id');
      //on cache le cache et on montre l'image
      $(this).children().hide('cache');
      $(this).children().next().show('image');
      //console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);

      //off le clic sur cette carte sinon la paire n'est pas cliquable
      //$(this).off("click");

      console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);
      //si la second clic n'est pas égal à la valeur du 1er
    //} else if ($(this).data('idCard').slice(0,-1) !== app.clickedCard1.slice(0,-1)) {
    } else
     if ($(this).attr('id').slice(0,-1) !== app.clickedCard1.slice(0,-1)) {
        //console.log($(this).data('idCard').slice(0,-1));
      //on prévient le clic et et ajoute la class .selectedDiv à la carte selectionnée
      //$(this).css("pointerEvents", "none").addClass('selectedDiv2');
        //$(this).addClass('selectedDiv2');
        //$('.selectedDiv2').css("pointerEvents", "none");
      app.clickedDiv2 = $(this);

      //on stock la valeur du 2eme clic
      //app.clickedCard2 = $(this).data('idCard');
      app.clickedCard2 = $(this).attr('id');

      //on cache le cache et on montre l'image
      $(this).children().hide('cache');
      $(this).children().next().show('image');
      //console.log('$clickedCard1: '+app.clickedCard1, app.clickedDiv1);
      console.log('$clickedCard2: '+app.clickedCard2, app.clickedDiv2);

      /****** if it's a match! or not... ******/
      if (app.clickedCard1.slice(0,-1) == app.clickedCard2.slice(0,-1)){
       console.log('YEAH!');
     } else { //else gugu

        //annulation des prevent click*********************
        // app.clickedDiv1.css('pointerEvents','');
        // app.clickedDiv2.css('pointerEvents','');
        //$('.selectedDiv2').css('pointerEvents','');

        //animation de retour des caches cards
        app.clickedDiv1.children(":first").delay( 1300 ).fadeIn(300, "linear" );
        app.clickedDiv1.children(":nth-child(2)").fadeOut(800, "linear" );
        app.clickedDiv2.children(":first").delay( 1500 ).fadeIn(300, "linear" );
        app.clickedDiv2.children(":nth-child(2)").fadeOut(1000, "linear" );

        //remise à 0 des valeurs clickedCard et clickedDiv
         app.clickedCard1 = null;
         app.clickedCard2 = null;
         app.clickedDiv1 = null;
         app.clickedDiv2 = null;

      }//fin else gugu
    } // fin if elseif gal





  }, // fin function returnCard

  returnCardOld: function(event){
    //on récupère le data de la carte cliquée et identifiée
    var $clickedCard = $(this).data('idCard');
    //on cible la card qui a ce data
    //var $selectedCard = $('.card').data('idCard');

    /*on enpêche le clic sur carte selectionnée pour ne pas remplir deux fois
     le tableau de contrôle openedCard avec la même carte*/
    $(this).css("pointerEvents", "none").addClass('selectedDiv');
    //on retire à cette card la class .cache et remple par la classe .image
      //div .cache
    $(this).children().hide('cache');
      // div .image
    $(this).children().next().show('image').addClass('picked');

    //si il a une valeur, on rempli le tableau de controle avec une 2eme
    if (app.openedCard.length < 1) {
      //on insert dans le tableau de controle le nom de la carte
      app.openedCard.push($clickedCard);
    }else if (app.openedCard.length < 3)  {
      //si 2 valeurs, on appelle la fonction de controle des cartes
      app.matched($clickedCard);
    }
    //console.log(app.openedCard);

  }, // returnCard

  //si deux cartes sont identiques
  matched: function($clickedCard){

    //var $currentDiv = $('div:data('+$clickedCard+')');
    //var $currentDiv = $('div:data(idCard)');
    var $currentsDivs = $('.picked');
    //$currentDiv.hide();
    console.log($currentsDivs);
    if (app.openedCard[0] == app.openedCard[1]) {
      console.log('yeah');

    } else {
      console.log('too bad');
      $('.selectedDiv').removeAttr('style').removeClass('selectedDiv');

      app.openedCard = [];
    }


  },

  //si les cartes ne sont pas identiques
  unmatched: function(){

  },

  timer: function(){

  },



};//**********fin app

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
