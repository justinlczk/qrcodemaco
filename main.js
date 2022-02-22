const form = document.querySelector("#form");
let nameForm,
  firstname,
  title,
  tel,
  adresse,
  ville,
  region,
  cp,
  pays,
  email,
  link;

form.addEventListener("input", () => {
  nameForm = document.querySelector("#nom").value;
  firstname = document.querySelector("#prenom").value;
  title = document.querySelector("#poste").value;
  tel = document.querySelector("#tel-mobile").value;
  adresse = document.querySelector("#adresse").value;
  ville = document.querySelector("#ville").value;
  region = document.querySelector("#region").value;
  cp = document.querySelector("#cp").value;
  pays = document.querySelector("#pays").value;
  email = document.querySelector("#email").value;

  // Without helper methods
  var johnDoe = vCard.create(vCard.Version.FOUR);
  johnDoe.add(vCard.Entry.NAME, `${nameForm};${firstname};;`);
  johnDoe.add(vCard.Entry.FORMATTEDNAME, `${firstname} ${nameForm}`);
  johnDoe.add(vCard.Entry.TITLE, `${title}`);
  johnDoe.add(vCard.Entry.PHONE, `${tel}`, vCard.Type.CELL);
  johnDoe.add(vCard.Entry.EMAIL, `${email}`, vCard.Type.WORK);
  johnDoe.add(vCard.Entry.ORGANIZATION, `Macopharma`);
  johnDoe.add(
    vCard.Entry.ADDRESS,
    `;;${adresse};${ville};${region};${cp}`,
    vCard.Type.WORK
  );
  johnDoe.add(vCard.Entry.URL, `https://macopharma.com`);

  link = vCard.dump(johnDoe); // use parameter true to force download
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("qrcode").innerHTML = ""

  

  new QRCode(document.getElementById("qrcode"), {
    text: link,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  let dataPng = document.querySelector("#qrcode > canvas").toDataURL("image/png");
  let dataJpeg = document.querySelector("#qrcode > canvas").toDataURL("image/png");

  document.querySelector('#qrcode').insertAdjacentHTML("beforeend", "<a id=\"dl\" download=\"maco_qr_code.png\" >Télécharger le Qr Code</a>")

  var canvas = document.querySelector("#qrcode > canvas");

  function dlCanvas() {
    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  
    this.href = dt;
  };
  document.getElementById("dl").addEventListener('click', dlCanvas, false);

  var doc = new jsPDF({
    orientation: "landscape",
    unit: "cm",
    format: [8.5, 5.5]
  })

  doc.setFontSize(11)
  doc.text(.8, 1, 'Pauline')
  doc.text(.8, 1.6, 'DESTOMBES')

  doc.setFontSize(9)
  doc.text(.8, 4.3, '06 00 00 00 00')
  doc.text(.8, 4.9, 'pauline.destombes@macopharma.com')

  
  doc.addImage(canvas.toDataURL('image/svg', 1.0), 'SVG', 4.5, 1, 3.2, 3.2)
  doc.save('a3.pdf')




  //document.querySelector('#qrcode').insertAdjacentHTML("beforeend", `<a download='qrcode.png' href="data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=qrcode.png;base64,${dataPng}">Télécharger l'image</a>`)
});