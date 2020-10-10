//BACKUP codigo SweetAlert2
// */
// const urlBase = 'http://localhost:3000/';

// (async () => {
//   let txtBarbeiros = ` <select class="swal2-input" id="selectBarbeiro" name="barbeiro">
//   <option value="default">Escolha um Barbeiro</option>`;

//   const response = await fetch(`${urlBase}/barbeiro`);
//   const barbeiros = await response.json();
//   let i = 1;
//   for (const barbeiro of barbeiros) {
//     txtBarbeiros += `
//     <option value="${barbeiro._id}">${barbeiro.name} </option>
//     `;
//     i++;
//   }
//   txtBarbeiros += '</select>';

//   var btnReserve = document.querySelector('.btn-outline-dark');

//   btnReserve.addEventListener('click', function () {
//     Swal.fire({
//       title: 'Reservas',
//       html: `
//       <input id="selectDate" class="swal2-input" type="date" name="data" placeholder = "MÊS / DIA / ANO">
//       <select class="swal2-input" id="selectHour" name="hour" placeholder="hora"><option value="default">Hora</option></select>
//       ${txtBarbeiros}
//       <select class="swal2-input" id="FormControlSelectService" name="tipo_corte" required>
//       <option value="default">Escolha um Serviço</option>
//       <option value="1">Cabelo + Barba - 18€</option>
//       <option value="2">Cabelo - 13€</option>
//       <option value="3">Barba - 8.5€</option>
//       <option value="4">Cabelo Criança - 10€</option>
//    </select>
//    <input type="text" class="swal2-input" name="nome_cliente" placeholder="Nome">
//    <input type="email" class="swal2-input" name="email_cliente" placeholder="Email">
//    <input type="text" class="swal2-input" name="contato_cliente" placeholder="Contato">
//    `,
//       showCancelButton: true,
//       confirmButtonText: 'Confirmar',
//       cancelButtonText: 'Cancelar',
//       showLoaderOnConfirm: true,
//       preConfirm: () => {
//         const name = document.getElementById('swal-input1').value;
//         const email = document.getElementById('swal-input2').value;
//         return fetch(`${urlBase}/conferences/1/participants/${email}`, {
//           method: 'GET',
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error(response.statusText);
//             }
//             return response.json();
//           })
//           .catch((error) => {
//             swal.showValidationError(`Request failed: ${error}`);
//           });
//       },
//     });
//   });
// })();
$(function () {
  $(".navbar a,footer a[href='#mypage']").on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({ scrollTop: 0 }, 'slow');
      return false;
    }
  });
});
