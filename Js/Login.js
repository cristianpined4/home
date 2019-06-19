var config = {
	apiKey: "AIzaSyCpCRHhJNHmQygDb_BK6He9cMrKECWg-kI",
	authDomain: "mobileshop-bed7c.firebaseapp.com",
	databaseURL: "https://mobileshop-bed7c.firebaseio.com",
	projectId: "mobileshop-bed7c",
	storageBucket: "mobileshop-bed7c.appspot.com",
	messagingSenderId: "884064899565"
};
firebase.initializeApp(config);

function saltar2(e,id){
	(e.keyCode)?k=e.keyCode:k=e.which;
	if(k==13){
		if(id=="NuevaContraseña"){
			Inicio();
		}
		else{
			document.getElementById(id).focus();
		}
	}
}

function saltar(e,id){
	(e.keyCode)?k=e.keyCode:k=e.which;
	if(k==13){
		if(id=="IniciarSesionbtn"){
			Inicio();
		}
		else{
			document.getElementById(id).focus();
		}
	}
}

function GetId(Id){
	return document.getElementById(Id).value;
}

function Inicio(){
	var _user = GetId("email");
	var _pass = GetId("password");
	if (_user.length == 0 || _pass.length == 0) {alert("Ingrese Usuario Y Contraseña");}
	else{
		firebase.auth().signInWithEmailAndPassword(_user,_pass).catch(function(error) {
		  alert("Usuario Y Contraseña Incorreta");
		});
	}
}
function NombreDeUsuario(Nombre){
	return '<li><a class="light-blue darken-2 btn-floating producto"><i class="material-icons">local_grocery_store</i></a></li>'+
	'<li><a class="light-blue darken-2 floating dropdown-trigger btn" data-target="dropdown1"><i class="material-icons left">account_circle</i>'+Nombre +'</a></li>'+
	'<ul id="dropdown1" class="dropdown-content">'+
	'<li><a class="modal-trigger light-blue darken-2 white-text" href="#CambiarContrasena"><i class="material-icons left">lock_outline</i>Cambiar Contraseña</a></li>'+
	'<li><a id="CerrarSesion" class="light-blue darken-2 white-text" onclick="CerraSesion()"><i class="material-icons left">exit_to_app</i>Cerrar Sesion</a></li>'+
	'</ul>';
}

function NombreU(){
	firebase.auth().onAuthStateChanged(function(user) {
		var email = user.email;
	    var Usuario = NombreDeUsuario(email);
	    var LugarEmail = document.getElementById("Usuario2");
			LugarEmail.innerHTML = Usuario;
		$('#Menu').html('<li><img width="170" height="100" class="responsive-img" src="../Media/Logo/Logo.png"></a></li>'+
			'<li><a href="Inicio"><i class="material-icons">home</i>Inicio</a></li>'+
			'<li><a href="Conocenos"><i class="material-icons">shop</i>Conocenos</a></li>'+
			'<li><a class="producto"><i class="material-icons">local_grocery_store</i>Carrito De Compra</a></li>' +
			'<li><a style="font-size:10px"><i class="material-icons">account_circle</i>'+email+'</a></li>'+
			'<li><a class="modal-trigger" href="#CambiarContrasena"><i class="material-icons left">lock_outline</i>Cambiar Contraseña</a></li>' +
			'<li><a id="CerrarSesion" onclick="CerraSesion()"><i class="material-icons left">exit_to_app</i>Cerrar Sesion</a></li>'+
			'<li><div class="card-panel grey darken-4 white-text">Modelos Disponibles</div>'+
			'<div class="collection" id="ListaMovilDiposnible2"></div></li>');
	});
}

function Observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    if (emailVerified) {window.location.replace('Inicio');}
	    else{
	    	alert("Verifique su Correo");
	    	CerraSesion2();
		}
	    document.getElementById("Usuario2").value = NombreDeUsuario(email);
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	  } else {
	  }
	});
}
Observador();

function CerraSesion2(){
	firebase.auth().signOut().then(function() {
  	window.location.replace('index');
	}).catch(function(error) {
		window.location.replace('index');
	});
}

function CerraSesion(){
	firebase.auth().signOut().then(function() {
  	window.location.replace('../');
	}).catch(function(error) {
		window.location.replace('../');
	});
}

function RecuperarPass(){
	var email = GetId("Email2");
	var auth = firebase.auth();
	var emailAddress = email;
	if (email.length == 0) {alert("Ingrese Su Usuario");}
	else{
		auth.sendPasswordResetEmail(emailAddress).then(function() {
		  alert("Se Ha Enviado Un Correo A '" + email + "'\nRevise Su Correo \nGracias");
		}).catch(function(error) {
		  alert("Error: no hay registro de usuario correspondiente a este correo. El usuario puede haber sido eliminado");
		});
		document.getElementById("Formulario3").reset();
	}
}

function NuevaClave(){
	var user = firebase.auth().currentUser;
	var _passNuevo = GetId("NewPass");
	var _verificado = GetId("Verificar2");
	if (_passNuevo.length == 0||_verificado.length ==0) {alert("LLene Los Campos");}
	else{
		if (_passNuevo == _verificado) {
			user.updatePassword(_passNuevo).then(function() {
			  alert("Se Ha Cambiado Su Contraseña");
			  document.getElementById("Formulario4").reset();
			}).catch(function(error) {
			  alert("No Se pudo Cambiar Su Contraseña");
			});
		} else {
			alert("Las Contraseñas No Coiciden");
		}
	}
}

function BorrarUsuario(){
	var user = firebase.auth().currentUser;
	user.delete().then(function() {
	  alert("Se Ha Borrado Su Cuenta");
	}).catch(function(error) {
	  alert("No Se pudo Borrar Su Cuenta");
	  window.location.replace('../');
	});
}