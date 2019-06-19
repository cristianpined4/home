var config = {
  apiKey: "AIzaSyCpCRHhJNHmQygDb_BK6He9cMrKECWg-kI",
  authDomain: "mobileshop-bed7c.firebaseapp.com",
  databaseURL: "https://mobileshop-bed7c.firebaseio.com",
  projectId: "mobileshop-bed7c",
  storageBucket: "mobileshop-bed7c.appspot.com",
  messagingSenderId: "884064899565"
};
firebase.initializeApp(config);

function Titulo(title){
  return title + ' - MobileShop';
}
function Lista2(Nombres2){
  return '<a href="Mobil" class="collection-item">'+Nombres2+'</a>';
}
function Lista3(Nombres) {
  return '<li><a href="Mobil" class="collection-item black-text">' + Nombres + '</a><li>';
}
function Mobilesd(Nombre3,Sistema2,Pantalla2,Camara2,CamaraFrontal,Procesador,Ram,Interna,Red2,Bateria2,Precio2,Imagen2){
  return  '<h3>'+Nombre3+'</h3>'+
          '<img src="'+Imagen2+'" width="150" height="300">'+
          '<h5>Caracteristicas</h5>'+
          '<table>'+
          '<tbody>'+
          '<tr>'+
          '<th>Pantalla</th>'+
          '<td>'+Pantalla2+'</td>'+
          '</tr>'+
          '<tr>'+
          '<th>Versión software</th>'+
          '<td>'+Sistema2+'</td>'+
          '</tr>'+      
          '<tr>'+
          '<th>Cámara</th>'+
          '<td>'+Camara2+'</td>'+
          '<tr>'+
          '<tr>'+
          '<tr>'+
          '<th>Cámara Frontal</th>'+
          '<td>'+CamaraFrontal+'</td>'+
          '<tr>'+
          '<tr>'+
          '<th>Procesador</th>'+
          '<td>'+Procesador+'</td>'+
          '<tr>'+
          '<tr>'+
          '<th>Ram/Memoria Interna</th>'+
          '<td>'+Ram+"/ "+Interna+'</td>'+
          '<tr>'+
          '<th>Batería</th>'+
          '<td>'+Bateria2+'</td>'+
          '</tr>'+
           '<tr>'+
          '<th>Red</th>'+
          '<td>'+Red2+'</td>'+
          '</tr>'+
          '<tr>'+
          '<th>Precio</th>'+
          '<td>$'+Precio2+'</td>'+
          '</tr>'+
          '</tbody>'+
          '</table>'+
          '<br>'+
          '<a class="grey darken-4 btn producto"'+' precio="'+Precio2+'" titulo="'+Nombre3+'" role="button" title="Agregar Al Carrito">Agregar</a>' +
          '<br>'+
          '<br>';
}


function watchmovil(){
  var mobil2 = firebase.database().ref().child("Mobiles");
  mobil2.on("child_added",function(data){
    var mobilValues2 = data.val();
    if(mobilValues2.Nombre == "Huawei Y9 2018"){
      var Telefonos2 = Mobilesd(mobilValues2.Nombre,mobilValues2.Sistema,mobilValues2.Pantalla,mobilValues2.Camara,mobilValues2.CamaraFrontal,mobilValues2.Procesador,mobilValues2.Ram,mobilValues2.Interna,mobilValues2.Red,mobilValues2.Bateria,mobilValues2.Precio,mobilValues2.Imagen);
      var celulareLista2 = document.getElementById("MovilLugar");
      celulareLista2.innerHTML = Telefonos2;

      var TituloPagina = Titulo(mobilValues2.Nombre);
      var Titulos = document.getElementById("Titular");
      Titulos.innerHTML = TituloPagina;
    }

    var ListaMovil2 = Lista2(mobilValues2.Nombre);
    var ListaDisponibles2 = document.getElementById("ListaMovilDiposnible");
    ListaDisponibles2.innerHTML += ListaMovil2;
    var ListaMovil3 = Lista3(mobilValues2.Nombre);
    var ListaDisponibles3 = document.getElementById("ListaMovilDiposnible2");
    ListaDisponibles3.innerHTML += ListaMovil3;

    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
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

function UsuarioInformacion() {
  var mobil2 = firebase.database().ref().child("Mobiles");
  mobil2.on("child_added", function (data) {
    var mobilValues2 = data.val();
    var ListaMovil2 = Lista3(mobilValues2.Nombre);
    var ListaDisponibles2 = document.getElementById("ListaMovilDiposnible2");
    ListaDisponibles2.innerHTML += ListaMovil2;
    var ListaMovil3 = Lista2(mobilValues2.Nombre);
    var ListaDisponibles3 = document.getElementById("ListaMovilDiposnible3");
    ListaDisponibles3.innerHTML += ListaMovil3;

    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    M.AutoInit();

    paypal.minicart.render({
      strings: {
        button: 'Pagar'
        , buttonAlt: "Total"
        , subtotal: 'Total:'
        , empty: 'No hay productos en el carrito'
      }
    });
    $('.producto').click(function (e) {
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