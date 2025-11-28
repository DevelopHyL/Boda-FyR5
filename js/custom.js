/*
 * Version: 2.1.2
 */

const db = firebase.firestore();

function getGET()
{
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0)
    {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

var guiInvitado


    // Cogemos los valores pasados por get
    var valores = getGET();
    if(valores)
    {
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
         guiInvitado = valores['gui'];
         console.log(guiInvitado);
    }else{
        // no se ha recibido ningun parametro por GET
        document.write("No se ha recibido ningún parámetro");
    }

////////////// Hide website in case de gui is delete //////////////
/*
    var docRef = db.collection("eventoPlantilla").doc(guiInvitado);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        document.getElementById("bodyId").style.display = "none"; 
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
*/



  //document.getElementById("bodyId").style.display = "none"; 

////////////// Leer Data y la invitación reacciona de acuerdo a //////////////

db.collection("eventoPlantilla").where("gui", "==", guiInvitado)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const cadaInvitado = doc.data();
            $('#nombreInvitados').html(cadaInvitado.nombre);
            $('#mensajeEspecialParrafo').html(cadaInvitado.mensajeEspecial);

            if (cadaInvitado.pases == 1){
              var pasesString = cadaInvitado.pases + " Pase "
            }else{
              var pasesString = cadaInvitado.pases + " Pases "
            }
            $('#numPasesInv').html(pasesString);
            $('#numPasesInv2').html(pasesString);

            ////////////// Codigo QR //////////////

            var qrcode = new QRCode("qrcode");

            function makeCode () {

              var mensaje = "¡Bienvenido! " + "\n" + cadaInvitado.nombre + " " + "\n" + pasesString + "\nElisa & Marcos" ;
              console.log(mensaje);
              qrcode.makeCode(mensaje);
            }

            makeCode();

            //////////////////////////////

            ////////////// Display or no //////////////
            
            if(cadaInvitado.status == 1 || cadaInvitado.status == 2){
              document.getElementById("QrSection").style.display = "none";
            }else{
              document.getElementById("ConfirmSection").style.display = "none";
            }

            if(cadaInvitado.status == 2){
              document.getElementById("ConfirmSection").style.display = "none";
              document.getElementById("invValida").style.display = "none";
            }

            if(cadaInvitado.mensajeNoNinos == 0){
              document.getElementById("MsjNinos").style.display = "none";
            }

            //////////////////////////////

            ////////////// Numero de pases en modal reactivo //////////////

            if (cadaInvitado.pases == 1){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option>`;
            }
            if (cadaInvitado.pases == 2){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option>`;
            }
            if (cadaInvitado.pases == 3){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option>`;
            }
            if (cadaInvitado.pases == 4){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option>`;
            }
            if (cadaInvitado.pases == 5){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> `;
            }
            if (cadaInvitado.pases == 6){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option>`;
            }
            if (cadaInvitado.pases == 7){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>`;
            }
            if (cadaInvitado.pases == 8){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>  <option value="8">8 Pases</option>`;
            }
            if (cadaInvitado.pases == 9){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>  <option value="8">8 Pases</option> <option value="9">9 Pases</option>`;
            }
            if (cadaInvitado.pases == 10){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>  <option value="8">8 Pases</option> <option value="9">9 Pases</option> <option value="10">10 Pases</option>`;
            }
            if (cadaInvitado.pases == 11){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>  <option value="8">8 Pases</option> <option value="9">9 Pases</option> <option value="10">10 Pases</option> <option value="11">11 Pases</option>`;
            }
            if (cadaInvitado.pases == 12){
              document.getElementById("select_passes").innerHTML += `<option value="1">1 Pase</option> <option value="2">2 Pases</option> <option value="3">3 Pases</option> <option value="4">4 Pases</option> <option value="5">5 Pases</option> <option value="6">6 Pases</option> <option value="7">7 Pases</option>  <option value="8">8 Pases</option> <option value="9">9 Pases</option> <option value="10">10 Pases</option> <option value="11">11 Pases</option> <option value="12">12 Pases</option>`;
            }

            //////////////////////////////

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    ////////////// Confirmar Asistencia - Update document //////////////

    var batch = db.batch();

    var msjEspecial;

    const confirmForm_passes = document.getElementById('confirm-form-passes');

    confirmForm_passes.addEventListener('submit', async (e) => {
      e.preventDefault();

      var html_passes_adult = confirmForm_passes['select_passes'];
  
      var passes_adult = parseInt(html_passes_adult.value);

      console.log(passes_adult);

      msjEspecial = confirmForm_passes['confirmMsj'];
  
      await db.collection("eventoPlantilla").where("gui", "==", guiInvitado)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const cadaInvitado = doc.data();
              var sfRef = db.collection("eventoPlantilla").doc(doc.id);
              batch.update (sfRef, {pases: passes_adult, status: 3, mensaje: msjEspecial.value});

              // Commit the batch
              batch.commit().then(() => {
                mensaje_success();
              });
          });
      })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    })

    ////////////// Decline Asistencia - Update document //////////////

    var msjEspecial;

    const formDecline = document.getElementById('formDecline');

    formDecline.addEventListener('submit', async (e) => {
      e.preventDefault();

      msjEspecial = formDecline['declineMsj'];
  
      await db.collection("eventoPlantilla").where("gui", "==", guiInvitado)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const cadaInvitado = doc.data();
              var sfRef = db.collection("eventoPlantilla").doc(doc.id);
              batch.update (sfRef, {pases: 0, status: 2, mensaje: msjEspecial.value});
              console.log(doc.id, " => ", doc.data());

              // Commit the batch
              batch.commit().then(() => {
                mensaje_success2();
              });
          });
      })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    })

    
    function mensaje_success(){
      Swal.fire({
                      title: '¡Genial!',
                      text: 'Ha confirmado su asistencia',                 // 'Cuando es un abono, solo se permite registrar a una sola persona'
                      // html:'<b class="">Hola</b>',
                      icon: 'success',   //warning | error | success | info | question
                      confirmButtonText: '<span class="expandedClick" onclick="gotoQr()">OK</span>',
                      //footer: '<span class"">Esta ventana se cerrará en 20 segundos</span>',
                      //timer: 20000,
                      timerProgressBar: false,
                      // width:'90%',
                      padding: '1rem',
                      // background:'#000',
                      // grow: 'row',    // row | column | fullscreen
                      backdrop: true,  //Es lo oscuro de atrás
                      // toast:true,    //ventana de tamaño pequeño
                      position: 'center',      //ubicación de la ventana center | top |  bottom | bottom-end | bottom-start | top-end | top-start
                      allowOutsideClick: false,  //permitir click afuera
                      allowEscapeKey: false,    //permitir ESC
                      allowEnterKey: false,     //permitir Enter
                      // stopKeydownPropagation: false,
  
                      // Async await se usa para obtener los valores del Input o select
                      // input:'text',
                      // inputPlaceholder:'Escribe tu nombre',
                      // inputValue:'sin nombre',
                      // inputOptions:{
                      //        MXN: 'Pesos',
                      //        USD: 'Dólares'
                      //  },
  
                      showConfirmButton: true,
                      // confirmButtonColor:'#000',
                      // confirmButtonAriaLabel:'Confirmar'
  
                      // showCancelButton:false,
                      // cancelButtonText:'Cancelar',
                      // cancelButtonColor:'#000',
                      // cancelButtonAriaLabel:'Cancelar',
  
                      // buttonsStyling:true,
                      showCloseButton: false
                      // closeButtonAriaLabel:'Cerrar',
  
                      // imageUrl:'Content/themes/images/Logo_empresa.png',
                      // imageWidth:'200px',
                      // imageHeight:'100px',
                      // imageAlt:'Logo'
                  }).then($(function () {
                    
                      
                   }));
                  return false;
              }

              function mensaje_success2(){
                Swal.fire({
                                title: '¡Gracias por confirmar!',
                                text: 'Lamentamos no poder verte este día, pero otra ocasión será',                 // 'Cuando es un abono, solo se permite registrar a una sola persona'
                                // html:'<b class="">Hola</b>',
                                icon: 'success',   //warning | error | success | info | question
                                confirmButtonText: '<span class="expandedClick" onclick="gotoQr()">OK</span>',
                                //footer: '<span class"">Esta ventana se cerrará en 20 segundos</span>',
                                //timer: 20000,
                                timerProgressBar: false,
                                // width:'90%',
                                padding: '1rem',
                                // background:'#000',
                                // grow: 'row',    // row | column | fullscreen
                                backdrop: true,  //Es lo oscuro de atrás
                                // toast:true,    //ventana de tamaño pequeño
                                position: 'center',      //ubicación de la ventana center | top |  bottom | bottom-end | bottom-start | top-end | top-start
                                allowOutsideClick: false,  //permitir click afuera
                                allowEscapeKey: false,    //permitir ESC
                                allowEnterKey: false,     //permitir Enter
                                // stopKeydownPropagation: false,
            
                                // Async await se usa para obtener los valores del Input o select
                                // input:'text',
                                // inputPlaceholder:'Escribe tu nombre',
                                // inputValue:'sin nombre',
                                // inputOptions:{
                                //        MXN: 'Pesos',
                                //        USD: 'Dólares'
                                //  },
            
                                showConfirmButton: true,
                                // confirmButtonColor:'#000',
                                // confirmButtonAriaLabel:'Confirmar'
            
                                // showCancelButton:false,
                                // cancelButtonText:'Cancelar',
                                // cancelButtonColor:'#000',
                                // cancelButtonAriaLabel:'Cancelar',
            
                                // buttonsStyling:true,
                                showCloseButton: false
                                // closeButtonAriaLabel:'Cerrar',
            
                                // imageUrl:'Content/themes/images/Logo_empresa.png',
                                // imageWidth:'200px',
                                // imageHeight:'100px',
                                // imageAlt:'Logo'
                            }).then($(function () {
                              
                                
                             }));
                            return false;
                        }


              function gotoQr(){
                window.location.reload();
                      window.location.hash = "sectionQr";
              }




  function mensaje_error(){
    Swal.fire({
                    title: 'Ooops',
                    text: '¡Creo te falto algún dato!',                 // 'Cuando es un abono, solo se permite registrar a una sola persona'
                    // html:'<b class="">Hola</b>',
                    icon: 'warning',   //warning | error | success | info | question
                    confirmButtonText: 'OK',
                    //footer: '<span class"">Esta ventana se cerrará en 20 segundos</span>',
                    //timer: 20000,
                    timerProgressBar: false,
                    // width:'90%',
                    padding: '1rem',
                    // background:'#000',
                    // grow: 'row',    // row | column | fullscreen
                    backdrop: true,  //Es lo oscuro de atrás
                    // toast:true,    //ventana de tamaño pequeño
                    position: 'center',      //ubicación de la ventana center | top |  bottom | bottom-end | bottom-start | top-end | top-start
                    allowOutsideClick: false,  //permitir click afuera
                    allowEscapeKey: false,    //permitir ESC
                    allowEnterKey: false,     //permitir Enter
                    // stopKeydownPropagation: false,

                    // Async await se usa para obtener los valores del Input o select
                    // input:'text',
                    // inputPlaceholder:'Escribe tu nombre',
                    // inputValue:'sin nombre',
                    // inputOptions:{
                    //        MXN: 'Pesos',
                    //        USD: 'Dólares'
                    //  },

                    showConfirmButton: true,
                    // confirmButtonColor:'#000',
                    // confirmButtonAriaLabel:'Confirmar'

                    // showCancelButton:false,
                    // cancelButtonText:'Cancelar',
                    // cancelButtonColor:'#000',
                    // cancelButtonAriaLabel:'Cancelar',

                    // buttonsStyling:true,
                    showCloseButton: true
                    // closeButtonAriaLabel:'Cerrar',

                    // imageUrl:'Content/themes/images/Logo_empresa.png',
                    // imageWidth:'200px',
                    // imageHeight:'100px',
                    // imageAlt:'Logo'
                })
                return false;
            }