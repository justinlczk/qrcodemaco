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

  console.log(link);

  new QRCode(document.getElementById("qrcode"), {
    text: link,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
});