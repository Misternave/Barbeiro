// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById('myBtn');

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName('close')[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = 'block';
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = 'none';
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };

var btn = document.getElementById('myBtn');

btn.addEventListener('click', function () {
  Swal.fire({
    title: 'Reservas',
    html: `
    
      <input id="selectDate" class="swal2-input" type="date" name="data" placeholder="MÊS / DIA / ANO">
      <select class="swal2-input" id="FormControlSelectService" name="tipo_corte" required>
      <option value="default">Escolha um Serviço</option>
      <option value="1">Cabelo + Barba - 18€</option>
      <option value="2">Cabelo - 13€</option>
      <option value="3">Barba - 8.5€</option>
      <option value="4">Cabelo Criança - 10€</option>
   </select>
   <label for="inputName">Nome</label>
   <input type="text" class="swal2-input" name="nome_cliente"> 
   <label for="inputEmail">Email</label>
   <input type="email" class="swal2-input" name="email_cliente">
   <label for="inputPhone">Contato</label>
  <input type="text" class="swal2-input" name="contato_cliente">
   `,

    showCancelButton: true,
    confirmButtonText: 'Inscrever',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
      ];
    },
  });
});
