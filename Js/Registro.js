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
		if(id=="Registro"){
			registra();
		}
		else{
			document.getElementById(id).focus();
		}
	}
}

function GetId(Id){
	return document.getElementById(Id).value;
}

function registra(){
	var _user2 = GetId("email");
	var _pass2 = GetId("password2");
	var _passv = GetId("passwordv");
	if (_user2.length == 0 || _pass2.length == 0 ||_passv.length == 0) {alert("LLene Todos Los Campos");}
	else{
		if(_pass2 == _passv){
			firebase.auth().createUserWithEmailAndPassword(_user2,_pass2)
			.then(function(){
				Verificar();
				alert("El Usuario Fue creado Exitosamente");
			})
			.catch(function(error) {
	  			alert("El Usuario Ya Existe");
			});
		}
		else{
			alert("Contraseña No Coiciden");
		}
	}
}

function Verificar(){
	var user = firebase.auth().currentUser;
	user.sendEmailVerification().then(function() {
		alert("Se ha Enviado Un Correo Para Verificar Su Cuenta");
		window.location.replace('../');
	}).catch(function(error) {
	});
}