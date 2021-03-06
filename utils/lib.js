module.exports = {
  localTime: function (timestamp) {
    const date = new Date(timestamp);
    var offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date;
  },

  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear;
    const month = today.getMonth() - birthDate.getMonth();

    //11 - 12 = -1
    // 11 -11  = 0
    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  date: function (timestamp) {
    const date = new Date(timestamp);

    //yyyy
    const year = date.getUTCFullYear();

    //mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    //dd
    const day = `0${date.getUTCDate() + 1}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthday: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
};
