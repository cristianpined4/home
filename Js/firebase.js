var config = {
  apiKey: "AIzaSyCpCRHhJNHmQygDb_BK6He9cMrKECWg-kI",
  authDomain: "mobileshop-bed7c.firebaseapp.com",
  databaseURL: "https://mobileshop-bed7c.firebaseio.com",
  projectId: "mobileshop-bed7c",
  storageBucket: "mobileshop-bed7c.appspot.com",
  messagingSenderId: "884064899565"
};
firebase.initializeApp(config);

function celulare (Nombre,Sistema,Pantalla,Camara,Red,Bateria,Precio,Imagen){
  return '<div class="col s12 m12 l4">' +
         '<div class="card horizontal">'+
         '<div class="card-image">'+
         '<img src="'+Imagen+'" width="100%" height="302">'+
         '</div>'+
         '<div class="card-stacked">'+
         '<div class="card-content center">'+
         '<p><strong>'+Nombre+'</strong><br>'+Sistema+'<br>'+Pantalla+'<br>'+Camara+'<br>'+Bateria+'<br>'+Red+'<br>$'+Precio+'</p>'+
         '</div>'+
         '<div class="card-action center">'+
         '<a class="grey darken-4 btn producto"'+' precio="'+Precio+'" titulo="'+Nombre+'" role="button" title="Agregar Al Carrito">Agregar</a>'+
         '</div'+
         '</div>'+
         '</div>'+
         '</div>';
}
function Lista(Nombres){
  return '<a href="Mobil" class="collection-item">'+Nombres+'</a>';
}
function Lista2(Nombres) {
  return '<li><a href="Mobil" class="collection-item black-text">' + Nombres + '</a><li>';
}
function watchmovil(){
  var mobil = firebase.database().ref().child("Mobiles");
  mobil.on("child_added",function(data){
    var mobilValues = data.val();
    var Telefonos = celulare(mobilValues.Nombre,mobilValues.Sistema,mobilValues.Pantalla,mobilValues.Camara,mobilValues.Bateria,mobilValues.Red,mobilValues.Precio,mobilValues.Imagen);
    var celulareLista = document.getElementById("MostrarCelulares");
    celulareLista.innerHTML += Telefonos;

    var ListaMovil = Lista(mobilValues.Nombre);
    var ListaDisponibles = document.getElementById("ListaMovilDiposnible");
    ListaDisponibles.innerHTML += ListaMovil;
    var ListaMovil2 = Lista2(mobilValues.Nombre);
    var ListaDisponibles2 = document.getElementById("ListaMovilDiposnible2");
    ListaDisponibles2.innerHTML += ListaMovil2;

    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    M.AutoInit();

    paypal.minicart.render({
    strings:{
      button:'Pagar'
     ,buttonAlt: "Total"
     ,subtotal: 'Total:'
     ,empty: 'No hay productos en el carrito'
    }
    });
     $('.producto').click(function(e){
         e.stopPropagation();
        paypal.minicart.cart.add({
      business: 'MobileShop@gmail.com',
      item_name: $(this).attr("titulo"),
       amount: $(this).attr("precio"),
       currency_code: 'USD',
      
      });
     });
  });
}