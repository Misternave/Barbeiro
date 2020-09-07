let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro');
var hour_input = document.querySelector('.f_hour');

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

barbeiro_input.onchange = function () {
  if (!selectDate.value) {
    alert('Introduza  a data primeiro');
  } else {
    GetReservations();
  }
};

date_input.onchange = function (event) {
  GetReservations();
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
