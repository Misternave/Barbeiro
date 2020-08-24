let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro').selectedOptions;
var hour_input = document.querySelector('.f_hour');

date_input.valueAsDate = new Date();

date_input.onchange = function () {
  var selectBarbeiro;
  //console.log(this.value);
  for (var i = 0; i < barbeiro_input.length; i++) {
    // echoes the value of the option
    selectBarbeiro = barbeiro_input[i].value;
  }

  fetch(`http://localhost:3000/availabletime?date=${this.value}&idbarbeiro=${selectBarbeiro}`)
    .then((response) => response.json())
    .then((horas) => {
      //Colocar depois da validacao
      // if (horas.length == 0) {
      //   var option = new Option('Sem horas disponíveis', 0);
      //   hour_input.appendChild(option);
      //   return;
      // }

      for (i = 0; i < horas.length; i++) {
        var option = new Option(
          horas[i].replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1'),
          horas[i].replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1')
        );
        hour_input.appendChild(option);
      }
    });
};
