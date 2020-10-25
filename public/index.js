let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro');
var hour_input = document.getElementById('selectHora');
const form = document.querySelector('form');
const emailError = document.querySelector('.email_cliente.error');
const nomeError = document.querySelector('.nome_cliente.error');
const contatoError = document.querySelector('.contato_cliente.error');

//date_input.valueAsDate = new Date(); colocar data atual
//FUNCAO PARA DATA Portugal
function fdate(timestamp) {
  const date = new Date(timestamp);

  //yyyy
  const year = date.getUTCFullYear();

  //mm
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);

  //dd
  const day = `0${date.getUTCDate()}`.slice(-2);

  return {
    day,
    month,
    year,
    iso: `${year}-${month}-${day}`,
  };
}

date_input.onchange = function (event) {
  if (date_input.value !== '' || date_input.value !== undefined) {
    GetReservations();
  }
};

barbeiro_input.onchange = function (event) {
  if (date_input.value !== '' || date_input.value !== undefined) {
    GetReservations();
  }
};

function GetReservations() {
  let selectBarbeiro = barbeiro_input.value;
  //let selectDate = date_input.valueAsDate;
  let selectDate = date_input.value;

  hour_input.options.length = 0;

  let NOW = fdate(Date.now());
  console.log('selected-' + selectDate);
  console.log('NOW' + NOW.iso);

  //dia de hoje
  if (selectDate === NOW.iso) {
    console.log('antes do FETCH');
    fetch(`http://localhost:3000/defaulttime?date=${selectDate}&idbarbeiro=${selectBarbeiro}`)
      .then((response) => response.json())
      .then((horas) => {
        console.log('entrou' + horas);
        if (horas.length == 0) {
          var option = new Option('Sem horas disponíveis', 0);
          hour_input.appendChild(option);
          return;
        }
        for (i = 0; i < horas.length; i++) {
          var option = new Option(horas[i], horas[i]);
          hour_input.appendChild(option);
        }
      });
  }
  //dias anteriores
  else if (selectDate < NOW.iso) {
    var option = new Option('Sem horas disponíveis', 0);
    hour_input.appendChild(option);
  }
  //dias seguintes
  else if (selectDate > NOW.iso) {
    fetch(`http://localhost:3000/availabletime?date=${selectDate}&idbarbeiro=${selectBarbeiro}`)
      .then((response) => response.json())
      .then((horas) => {
        if (horas.length == 0) {
          var option = new Option('Sem horas disponíveis', 0);
          hour_input.appendChild(option);
          return;
        }
        for (i = 0; i < horas.length; i++) {
          var option = new Option(horas[i], horas[i]);
          hour_input.appendChild(option);
        }
      });
  }
}

//Validações dos dados introduzidos
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //get values from form
  const barbeiro = form.barbeiro.value;
  const data = form.data.value;
  const hora = form.hora.value;
  const tipoCorte = form.tipo_corte.value;
  const comentario = form.comentario_cliente.value;
  const email = form.email_cliente.value;
  const nome = form.nome_cliente.value;
  const contato = form.contato_cliente.value;

  // reset errors
  emailError.textContent = '';
  nomeError.textContent = '';
  contatoError.textContent = '';

  try {
    const res = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({
        barbeiro: barbeiro,
        data: data,
        hora: hora,
        tipo_corte: tipoCorte,
        email_cliente: email,
        contato_cliente: contato,
        nome_cliente: nome,
        comentario_cliente: comentario,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await res.json();
    console.log(response);
    if (response.errors) {
      emailError.textContent = response.errors.email;
      nomeError.textContent = response.errors.nome;
      contatoError.textContent = response.errors.contato;

      //Bootstrap validation//
      //Reset
      let tempErrorsEmailInput = document.getElementsByClassName('email_cliente error');
      let tempErrorsEmail = document.getElementsByName('email_cliente');
      let tempErrorsNomeInput = document.getElementsByClassName('nome_cliente error');
      let tempErrorsNome = document.getElementsByName('nome_cliente');
      let tempErrorsContatoInput = document.getElementsByClassName('contato_cliente error');
      let tempErrorsContato = document.getElementsByName('contato_cliente');
      tempErrorsEmailInput[0].classList.remove('invalid-feedback');
      tempErrorsEmail[0].classList.remove('is-invalid');
      tempErrorsNomeInput[0].classList.remove('invalid-feedback');
      tempErrorsNome[0].classList.remove('is-invalid');
      tempErrorsContatoInput[0].classList.remove('invalid-feedback');
      tempErrorsContato[0].classList.remove('is-invalid');

      if (response.errors.email != '') {
        tempErrorsEmailInput[0].classList.add('invalid-feedback');
        tempErrorsEmail[0].classList.add('is-invalid');
      }

      if (response.errors.nome != '') {
        tempErrorsNomeInput[0].classList.add('invalid-feedback');
        tempErrorsNome[0].classList.add('is-invalid');
      }

      if (response.errors.contato != '') {
        tempErrorsContatoInput[0].classList.add('invalid-feedback');
        tempErrorsContato[0].classList.add('is-invalid');
      }
      //End Bootstrap validation//
    }

    if (response.reserva) {
      // location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
});
