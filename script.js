// Code goes here
var dom = {
  body: document.querySelector('body'),
  // slider: document.getElementById('rowCountSlider'),
  // sliderCount: document.getElementById('rowCountDisplay'),
  // buildButton: document.getElementById('buildTableButton'),
  // offsetSlider: document.getElementById('offsetSlider'),
  // offsetDisplay: document.getElementById('offsetDisplay'),
  // brailleButton: document.getElementById('getBrailleButton')
  displayDataList: document.getElementById('displayDataList'),
  displayDataSingle: document.getElementById('displayDataSingle'),
  brailleInput: document.getElementById('brailleInput'),
  colorInput: document.getElementById('colorInput'),
  brailleButton: document.getElementById('createBrailleVertical'),
  runCountSlider: document.getElementById('runCountSlider'),
  runCountDisplay: document.getElementById('runCountDisplay')
}

var config = {
  color: 'G',
  order: 'horiz'
}

var tmpl = {
    table: function() { return document.createElement('table'); },
    row: function() { return document.createElement("tr"); },
    cell: function() { return document.createElement("td"); },
    note: function(inp) { 
      var nt = document.createElement('p');
      nt.textContent = inp;
      return nt},
    li: function() { return document.createElement('li'); },
    textInput: function(value) { 
      var ti = document.createElement('input');
      ti.setAttribute('type', 'text');
      ti.setAttribute('value', value);

      return ti;      
    }
}

function buildTable(el, dataset) {
  var p = new tmpl.note(JSON.stringify(dataset))
  var t = new tmpl.table();
  var r = new tmpl.row();

  var dataLen = dataset.length;
  var letterCount = (dataLen - (dataLen % 6) ) / 6;
  var resliced = reSliceArray(dataset, letterCount);

  for (var i=0; i < letterCount; i++) {
    var c = new tmpl.cell();
    var nt = new tmpl.table();
    var data = resliced.out[i];

    if (config.order == 'vert')
      data = changeOrientation(data);

    buildRows(nt, data, 3);

    var sr = new tmpl.row();
    var sc = new tmpl.cell();

    sc.setAttribute('colspan', 2);
    sc.textContent = brailleComparator(data, config.color)

    sr.appendChild(sc);
    nt.appendChild(sr);    

    c.appendChild(nt);
    r.appendChild(c);
  }

  t.appendChild(r);
  el.appendChild(p);
  el.appendChild(t);  
}

function buildRows(el, arr, rowCount) {
  var resliced= reSliceArray(arr, rowCount);

  for (var i=0; i < rowCount; i++) {
    var nr = new tmpl.row();
    buildCells(nr, resliced.out[i])
    el.appendChild(nr);
  } 
}

function buildCells(el, arr) {
  for (var i=0; i < arr.length; i++) {
    var nc = new tmpl.cell();
    nc.className = colorMap[arr[i]];
    nc.textContent = arr[i];

    el.appendChild(nc);
  }
}

function changeOrientation(arr) {
  var out = [];
  out.push(arr[0]);
  out.push(arr[3]);
  out.push(arr[1]);
  out.push(arr[4]);
  out.push(arr[2]);
  out.push(arr[5]);
  return out;
}

function reSliceArray(data, rowcount) {
  var perrow = (data.length - data.length % rowcount) / rowcount
  var out = [];
  for (var i=0; i < rowcount; i++) {
    out.push(data.slice((i * perrow), ((i * perrow) + (perrow))))
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
  setConfigValues();

  var na;
  for (var i=0; i < dom.runCountSlider.value; i++) {
    na = JSON.parse(dom.brailleInput.value);
    na = na.multishift(i);
    buildTable(dom.body, na)
  }
})

dom.runCountSlider.addEventListener('change', function(e) {
  dom.runCountDisplay.textContent = e.target.value;
})

function buildDisplayValues() {
  for (var i=0; i < lightdata.arrayset.length; i++) {
    var li = new tmpl.li();
    var inp = new tmpl.textInput(JSON.stringify(lightdata.arrayset[i]))

    li.appendChild(inp);
    dom.displayDataList.appendChild(li);
  }

  dom.displayDataSingle.value = JSON.stringify(lightdata.singlearray);
}

function setConfigValues() {  
  config.color = getCheckedValue(document.querySelectorAll('input[name="colorInput"]'))
  config.order = getCheckedValue(document.querySelectorAll('input[name="interpOrder"]'))
}
function getCheckedValue(elArr) {
  var val;
  for (var i=0; i < elArr.length; i++) {
    if (elArr[i].checked)
      val = elArr[i].value
  }
  return val;
}

buildDisplayValues()

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
