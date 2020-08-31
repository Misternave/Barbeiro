let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro');
var hour_input = document.querySelector('.f_hour');
//date_input.valueAsDate = new Date(); colocar data atual

barbeiro_input.onchange = function () {
  GetReservations();
};

date_input.onchange = function (event) {
  GetReservations();
};

function GetReservations() {
  let selectBarbeiro = barbeiro_input.value;
  let selectDate = date_input.valueAsDate;
  hour_input.options.length = 0;
  if (selectDate < Date.now()) {
    var option = new Option('Sem horas disponíveis', 0);
    hour_input.appendChild(option);
  } else {
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
