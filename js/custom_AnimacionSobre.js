
      function animacionSobre() {

        window.sr = ScrollReveal();

        sr.reveal('.nombre1', {
            duration: 3000,
            delay: 2100,
            origin: 'buttom',
            distance: '-100px'
        });
        sr.reveal('.nombre2', {
            duration: 3000,
            delay: 2100,
            opacity: 0,
            distance: '0px'
        });
        sr.reveal('.nombre3', {
            duration: 3000,
            delay: 2100,
            origin: 'left',
            distance: '-100px'
        });

        var element = document.getElementById("sobre1");
        element.classList.add("moved");
        var element2 = document.getElementById("sobre2");
        element2.classList.add("moved2");
        boton.click();
        setTimeout(cerrarModal, 2000)
      }

      function cerrarModal() {
        $("#myModal").modal('hide');//ocultamos el modal
        $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
        $('.modal-backdrop').remove();//eliminamos el backdrop del modal
      }

      $(document).ready(function(){
        $("#myModal").modal('show');
      });