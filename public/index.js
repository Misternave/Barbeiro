let date_input = document.getElementById('selectDate');
let barbeiro_input = document.getElementById('selectBarbeiro').selectedOptions;

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
    .then((data) => {
      console.log(data);
    });
};

// document.getElementById('selectDate').addEventListener('click', displayDate);

// function displayDate() {
//   alert(Date.now());
// }
