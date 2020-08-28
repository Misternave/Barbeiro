let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro').selectedOptions;
var hour_input = document.querySelector('.f_hour');

date_input.valueAsDate = new Date();

date_input.onchange = function () {
  var selectBarbeiro;

  for (var i = 0; i < barbeiro_input.length; i++) {
    // echoes the value of the option
    selectBarbeiro = barbeiro_input[i].value;
  }
  hour_input.options.length = 0;
  fetch(`http://localhost:3000/availabletime?date=${this.value}&idbarbeiro=${selectBarbeiro}`)
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
};
