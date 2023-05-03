// Flatpickr

setTimeout(() => {
  if (document.getElementById('basicFlatpickr')) {
    var f1 = flatpickr(document.getElementById('basicFlatpickr'), {
      defaultDate: new Date()

    });
  }

},500);

