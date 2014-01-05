// Code goes here
var dom = {
  body: document.querySelector('body'),
  // slider: document.getElementById('rowCountSlider'),
  // sliderCount: document.getElementById('rowCountDisplay'),
  // buildButton: document.getElementById('buildTableButton'),
  // offsetSlider: document.getElementById('offsetSlider'),
  // offsetDisplay: document.getElementById('offsetDisplay'),
  // brailleButton: document.getElementById('getBrailleButton')
  brailleButton: document.getElementById('createBrailleVertical'),
  runCountSlider: document.getElementById('runCountSlider'),
  runCountDisplay: document.getElementById('runCountDisplay')
}

var tmpl = {
    table: function() { return document.createElement('table'); },
    row: function() { return document.createElement("tr"); },
    cell: function() { return document.createElement("td"); },
    note: function() { return document.createElement('em'); }
}

function buildTable(el, dataset) {
  var t = new tmpl.table();
  var r = new tmpl.row();
  var dataLen = dataset.length;
  var letterCount = (dataLen - (dataLen.length % 6) ) / 6;
  var resliced = reSliceArray(dataset, letterCount);

  for (var i=0; i < letterCount; i++) {
    var nt = new tmpl.table();
    buildRows(nt, resliced.out[i], 3);

    var sr = new tmpl.row();
    var sc = new tmpl.cell();

    sc.setAttribute('colspan', 2);
    sc.textContent = brailleComparator(resliced.out[i], "G")

    sr.appendChild(sc);
    nt.appendChild(sr);    

    r.appendChild(nt);
  }

  t.appendChild(r);
  el.appendChild(t);  
}

function buildRows(el, arr, rowCount) {
  var nr;
  var resliced = reSliceArray(arr, rowCount;

  for (var i=0; i < rowCount; i++) {
    nr = new tmpl.row();
    buildCells(nr, resliced.out)    
  }

  el.appendChild(nr);
}

function buildCells(el, arr) {
  var nc;
  for (var i=0; i < arr.length; i++) {
    nc = new tmpl.cell();
    nc.className = colorMap[arr[i]];
    nc.textContent = arr[i];

    el.appendChild(nc);
  }
}

function reSliceArray(data, rowcount) {
  var perrow = (data.length - data.length % rowcount) / rowcount
  var out = [];
  for (var i=0; i < rowcount; i++) {
    out.push(data.slice((i * perrow), ((i * perrow) + (perrow -1))))
  }
  return { out: out, perrow: perrow, remainder: data.length % rowcount, rowCount: out.length };
}

function brailleComparator(inArr, key) {
  for (var i=0; i < inArr.length; i++) {
    inArr[i] = (inArr[i] == key) ? 1 : 0;
  }
  
  for (var letter in braille) {
    if (inArr.compare(braille[letter])) {
      return letter;
    }
  }
  return "null";
}

dom.brailleButton.addEventListener('click', function() {
  for (var i=0; i < dom.runCountSlider.value; i++) {
    buildTable(dom.body, lightdata.singlearray, )
  }
})

dom.runCountSlider.addEventListener('change', function(e) {
  dom.runCountDisplay.textContent = e.target.value;
})

// function createBrailleTable(count) {
//   var na = lightdata.singlearray.multishift(count || dom.offsetSlider.value)
//   na = reSliceArray(na, 3);
//   var checkArray = [];
  
//   var t = new tmpl.table();
//   var r = new tmpl.row();
//   var idx = 0;
//   var letterCount = (na.perrow - na.perrow % 3) / 3;
//   for (var i=0; i < letterCount; i++) {
//     checkArray = [];
//     var pc = new tmpl.cell();
//     var nt = new tmpl.table();
    
//     for (var j=0; j < na.rowCount; j++) {
//       var nr = new tmpl.row();
      
//       for (var k=idx; k < (idx + 2); k++) {
//         var nc = new tmpl.cell();
//         nc.el.className = colorMap[na.out[j][k]]
//         nc.el.textContent = '__'
//         nr.el.appendChild(nc.el);
//         checkArray.push(na.out[j][k])
//       }
      
//       nt.el.appendChild(nr.el)
//     }
    
//     var sr = new tmpl.row();
//     var sc = new tmpl.cell();
//     sc.el.setAttribute('colspan', 2)
//     sc.el.textContent = brailleComparator(checkArray, "G")
    
//     sr.el.appendChild(sc.el)
//     nt.el.appendChild(sr.el)
    
//     idx += 2;
//     pc.el.appendChild(nt.el)
//     r.el.appendChild(pc.el);
//   }
//   t.el.appendChild(r.el);
//   dom.body.appendChild(t.el)
  
// }

// dom.slider.addEventListener('change', function(e) {
//   dom.sliderCount.textContent = e.target.value;
// })
// dom.offsetSlider.addEventListener('change', function(e) {
//   dom.offsetDisplay.textContent = e.target.value;
// })
// dom.buildButton.addEventListener('click', function() {
//   var nt = reSliceArray(lightdata.singlearray, dom.slider.value);
  
//   var note = new tmpl.note();
//   note.el.textContent = "Row Length: " + nt.perrow + ", remainder count: " + nt.remainder
//   dom.body.appendChild(note.el)
  
//   buildTable(dom.body, nt.out)
// })

// dom.brailleButton.addEventListener('click', function() {
//   for (var i=0; i < 60; i++) {
//     createBrailleTable(i)
//   }
// })


// buildTable(dom.body, lightdata.arrayset);
// buildTable(dom.body, [lightdata.singlearray]);
