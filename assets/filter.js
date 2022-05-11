function filterByCategory(cat) {
  $("tbody tr").show();
  $("tbody tr")
    .not("." + cat)
    .hide();
}

function getLocations() {
  return _.sortBy(
    _.uniq(
      $("tbody tr")
        .map(function () {
          return this.getAttribute("data-location");
        })
        .get()
    )
  );
}
// main funktion eksekveres ved side genfresk

function resetfilter() {
  $("tbody tr").show();
  $("tbody tr td").show();
}
$(function () {
  // initialise lokation filter
  $("#filter-location").append(new Option("", ""));
  getLocations().forEach(function (v) {
    $("#filter-location").append(new Option(v, v));
  });
  // initialise dato filter
  $("#filter-created").append(new Option("", ""));
  $("#filter-created").append(new Option("100 dage", "100"));
  $("#filter-created").append(new Option("200 dage", "200"));
  $("#filter-created").append(new Option("300 dage", "300"));
//initalize price for at modtage kun nummer
  $("#filter-price").numeric({ decimal : ".",  negative : false, scale: 3 });
});

//filter efter lokation
$('#filter-location').change(function() {
  var location = $(this).val()
  if ( location !== '' ) {
    $("tr[data-location!=" + location+ "] td").hide()
    $("tr[data-location=" + location+ "] td").show()
  } else {
    $("tbody tr td").show();
  }
});
// filter efter dato
$('#filter-created').change(function() {
  var created = $(this).val()
  if ( created !== '' ) {
    $("tr").show();
    $("tbody tr").filter(function() {
      
      return dayjs().diff(dayjs($(this).attr("data-created")), 'day')<created
    }).hide()
  } else {
    $("tbody tr").show();
  }
});

// filter efter pris
$('#filter-price').change(function() {
  var price = $(this).val()
  if ( price !== '' ) {
    $("tr").show();
    $("tbody tr").filter(function() {
      return $(this).attr("data-price") >= price;
    }).hide()
  } else {
    $("tbody tr").show();
  }
});