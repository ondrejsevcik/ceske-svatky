const puppeteer = require("puppeteer");
const path = require("path");

async function getPoster({ date }) {
  // no-sandbox to make it run in heroku
  // https://github.com/jontewks/puppeteer-heroku-buildpack
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const page = await browser.newPage();

  // 1080 is instagrams max resolution
  // height is irrelevant as we will take a full page screenshot
  // (anything that's overflowing will be screenshotted as well)
  await page.setViewport({ width: 1080, height: 200 });

  let posterHtmlPath = path.resolve(__dirname, "poster.html");
  await page.goto("file://" + posterHtmlPath, { timeout: 60000 });

  let namedayMessage = getNameDayFor(date);

  await page.evaluate((namedayMessage) => {
    document.querySelector(".name").innerText = namedayMessage;
  }, namedayMessage);

  const posterName = "poster.png";

  let posterBase64 = await page
    .screenshot({
      path: posterName,
      fullPage: true,
    })
    .then((buffer) => buffer.toString("base64"));

  await browser.close();

  return posterBase64;
}

function getNameDayFor(date) {
  console.assert(date, `date can't be null`);
  let dayMonth = date.toISOString().substring(5, 10);
  let names = jmeniny[dayMonth];
  if (!names || names.length < 1) {
    return "";
  }
  names = names.join(", ");
  names = replaceLast(names, ", ", " a ");
  return names;
}

function replaceLast(str, pattern, replacement) {
  var pos = str.lastIndexOf(pattern);
  if (pos <= -1) {
    return str;
  }

  return (
    str.substring(0, pos) + replacement + str.substring(pos + pattern.length)
  );
}

const jmeniny = {
  "01-02": ["Karina", "Karína", "Karin"],
  "01-03": ["Radmila"],
  "01-04": ["Diana"],
  "01-05": ["Dalimil", "Dalemil"],
  "01-06": ["Kašpar", "Melichar", "Baltazar"],
  "01-07": ["Vilma", "Wilhelmina"],
  "01-08": ["Čestmír"],
  "01-09": ["Vladan"],
  "01-10": ["Břetislav"],
  "01-11": ["Bohdana"],
  "01-12": ["Pravoslav"],
  "01-13": ["Edita"],
  "01-14": ["Radovan"],
  "01-15": ["Alice"],
  "01-16": ["Ctirad", "Česlav"],
  "01-17": ["Drahoslav"],
  "01-18": ["Vladislav"],
  "01-19": ["Doubravka"],
  "01-20": ["Ilona"],
  "01-21": ["Běla"],
  "01-22": ["Slavomír"],
  "01-23": ["Zdeněk", "Zdenek", "Zdenko"],
  "01-24": ["Milena"],
  "01-25": ["Miloš"],
  "01-26": ["Zora"],
  "01-27": ["Ingrid"],
  "01-28": ["Otýlie", "Otilie"],
  "01-29": ["Zdislava", "Zdeslava"],
  "01-30": ["Robin"],
  "01-31": ["Marika"],
  "02-01": ["Hynek"],
  "02-02": ["Nela"],
  "02-03": ["Blažej"],
  "02-04": ["Jarmila"],
  "02-05": ["Dobromila"],
  "02-06": ["Vanda", "Wanda"],
  "02-07": ["Veronika"],
  "02-08": ["Milada"],
  "02-09": ["Apolena"],
  "02-10": ["Mojmír"],
  "02-11": ["Božena"],
  "02-12": ["Slavěna"],
  "02-13": ["Věnceslav"],
  "02-14": ["Valentýn", "Valentin", "Valentýna"],
  "02-15": ["Jiřina", "Jorga"],
  "02-16": ["Ljuba"],
  "02-17": ["Miloslav"],
  "02-18": ["Gizela", "Gisela"],
  "02-19": ["Patrik"],
  "02-20": ["Oldřich"],
  "02-21": ["Lenka", "Eleonora"],
  "02-22": ["Petr"],
  "02-23": ["Svatopluk"],
  "02-24": ["Matěj", "Matej", "Matyáš"],
  "02-25": ["Liliana", "Lilian", "Lily"],
  "02-26": ["Dorota", "Dorotea"],
  "02-27": ["Alexandr", "Alexander", "Alexis"],
  "02-28": ["Lumír"],
  "02-29": ["Horymír", "Rufin"],
  "03-01": ["Bedřich"],
  "03-02": ["Anežka", "Agnes", "Ines"],
  "03-03": ["Kamil"],
  "03-04": ["Stela", "Stella"],
  "03-05": ["Kazimír"],
  "03-06": ["Miroslav", "Mirek"],
  "03-07": ["Tomáš", "Thomas", "Tom"],
  "03-08": ["Gabriela"],
  "03-09": ["Františka", "Francesca"],
  "03-10": ["Viktorie"],
  "03-11": ["Anděla", "Andělína", "Angelina"],
  "03-12": ["Řehoř", "Gregor"],
  "03-13": ["Růžena", "Rozálie", "Rosita"],
  "03-14": ["Rút", "Rut", "Matylda"],
  "03-15": ["Ida"],
  "03-16": ["Elena", "Herbert"],
  "03-17": ["Vlastimil"],
  "03-18": ["Eduard", "Edvard"],
  "03-19": ["Josef", "Jozef"],
  "03-20": ["Světlana"],
  "03-21": ["Radek", "Radomil"],
  "03-22": ["Leona"],
  "03-23": ["Ivona", "Yvona"],
  "03-24": ["Gabriel"],
  "03-25": ["Marián", "Marian", "Marius"],
  "03-26": ["Emanuel"],
  "03-27": ["Dita", "Ditta"],
  "03-28": ["Soňa", "Sonja", "Sonia"],
  "03-29": ["Taťána", "Tatiana"],
  "03-30": ["Arnošt"],
  "03-31": ["Kvido", "Quido"],
  "04-01": ["Hugo"],
  "04-02": ["Erika"],
  "04-03": ["Richard"],
  "04-04": ["Ivana", "Ivanka"],
  "04-05": ["Miroslava", "Mirka"],
  "04-06": ["Vendula", "Vendulka"],
  "04-07": ["Heřman", "Herman", "Hermína"],
  "04-08": ["Ema", "Emma"],
  "04-09": ["Dušan", "Dušana"],
  "04-10": ["Darja", "Daria", "Darya"],
  "04-11": ["Izabela", "Isabel"],
  "04-12": ["Julius", "Július", "Julian"],
  "04-13": ["Aleš"],
  "04-14": ["Vincenc", "Vincent"],
  "04-15": ["Anastázie", "Anastazia"],
  "04-16": ["Irena", "Irini"],
  "04-17": ["Rudolf", "Rolf"],
  "04-18": ["Valerie", "Valérie", "Valeria"],
  "04-19": ["Rostislava"],
  "04-20": ["Marcela"],
  "04-21": ["Alexandra"],
  "04-22": ["Evženie", "Evžénie"],
  "04-23": ["Vojtěch"],
  "04-24": ["Jiří", "Juraj", "George"],
  "04-25": ["Marek"],
  "04-26": ["Oto", "Ota", "Otto"],
  "04-27": ["Jaroslav"],
  "04-28": ["Vlastislav"],
  "04-29": ["Robert"],
  "04-30": ["Blahoslav"],
  "05-02": ["Zikmund"],
  "05-03": ["Alexej", "Alex"],
  "05-04": ["Květoslav"],
  "05-05": ["Klaudie", "Klaudia", "Claudia"],
  "05-06": ["Radoslav"],
  "05-07": ["Stanislav"],
  "05-09": ["Ctibor", "Stibor"],
  "05-10": ["Blažena"],
  "05-11": ["Svatava"],
  "05-12": ["Pankrác"],
  "05-13": ["Servác"],
  "05-14": ["Bonifác"],
  "05-15": ["Žofie"],
  "05-16": ["Přemysl"],
  "05-17": ["Aneta", "Anetta"],
  "05-18": ["Nataša"],
  "05-19": ["Ivo", "Ivoš"],
  "05-20": ["Zbyšek"],
  "05-21": ["Monika"],
  "05-22": ["Emil"],
  "05-23": ["Vladimír"],
  "05-24": ["Jana"],
  "05-25": ["Viola"],
  "05-26": ["Filip"],
  "05-27": ["Valdemar", "Waldemar"],
  "05-28": ["Vilém"],
  "05-29": ["Maxmilián", "Maxmilian", "Maximilian"],
  "05-30": ["Ferdinand"],
  "05-31": ["Kamila"],
  "06-01": ["Laura"],
  "06-02": ["Jarmil"],
  "06-03": ["Tamara"],
  "06-04": ["Dalibor"],
  "06-05": ["Dobroslav"],
  "06-06": ["Norbert"],
  "06-07": ["Iveta", "Yveta"],
  "06-08": ["Medard"],
  "06-09": ["Stanislava"],
  "06-10": ["Otta"],
  "06-11": ["Bruno"],
  "06-12": ["Antonie", "Antonina"],
  "06-13": ["Antonín", "Antonin"],
  "06-14": ["Roland"],
  "06-15": ["Vít", "Vítek"],
  "06-16": ["Zbyněk"],
  "06-17": ["Adolf"],
  "06-18": ["Milan"],
  "06-19": ["Leoš"],
  "06-20": ["Květa", "Kveta"],
  "06-21": ["Alois", "Aloys", "Alojz"],
  "06-22": ["Pavla"],
  "06-23": ["Zdeňka", "Zdena", "Zdenka"],
  "06-24": ["Jan"],
  "06-25": ["Ivan"],
  "06-26": ["Adriana"],
  "06-27": ["Ladislav"],
  "06-28": ["Lubomír", "Lubomil"],
  "06-29": ["Petr", "Pavel"],
  "06-30": ["Šárka"],
  "07-01": ["Jaroslava"],
  "07-02": ["Patricie"],
  "07-03": ["Radomír"],
  "07-04": ["Prokop"],
  "07-05": ["Cyril", "Metoděj"],
  "07-07": ["Bohuslava"],
  "07-08": ["Nora"],
  "07-09": ["Drahoslava"],
  "07-10": ["Libuše", "Amálie"],
  "07-11": ["Olga"],
  "07-12": ["Bořek"],
  "07-13": ["Markéta", "Margareta", "Margit"],
  "07-14": ["Karolína", "Karolina", "Karla"],
  "07-15": ["Jindřich"],
  "07-16": ["Luboš", "Liboslav", "Luboslav"],
  "07-17": ["Martina"],
  "07-18": ["Drahomíra"],
  "07-19": ["Čeněk"],
  "07-20": ["Ilja"],
  "07-21": ["Vítězslav"],
  "07-22": ["Magdaléna", "Magdalena"],
  "07-23": ["Libor"],
  "07-24": ["Kristýna", "Kristina", "Kristen"],
  "07-25": ["Jakub"],
  "07-26": ["Anna"],
  "07-27": ["Věroslav"],
  "07-28": ["Viktor", "Victor"],
  "07-29": ["Marta", "Martha"],
  "07-30": ["Bořivoj"],
  "07-31": ["Ignác"],
  "08-01": ["Oskar"],
  "08-02": ["Gustav"],
  "08-03": ["Miluše"],
  "08-04": ["Dominik"],
  "08-05": ["Kristián", "Milivoj", "Křišťan"],
  "08-06": ["Oldřiška"],
  "08-07": ["Lada"],
  "08-08": ["Soběslav"],
  "08-09": ["Roman"],
  "08-10": ["Vavřinec"],
  "08-11": ["Zuzana", "Susana"],
  "08-12": ["Klára", "Clara"],
  "08-13": ["Alena"],
  "08-14": ["Alan"],
  "08-15": ["Hana", "Hanka", "Hannah"],
  "08-16": ["Jáchym", "Joachim"],
  "08-17": ["Petra", "Petronila"],
  "08-18": ["Helena"],
  "08-19": ["Ludvík"],
  "08-20": ["Bernard"],
  "08-21": ["Johana"],
  "08-22": ["Bohuslav", "Božislav"],
  "08-23": ["Sandra"],
  "08-24": ["Bartoloměj", "Bartolomej"],
  "08-25": ["Radim", "Radimír"],
  "08-26": ["Luděk"],
  "08-27": ["Otakar", "Otokar"],
  "08-28": ["Augustýn", "Augustin"],
  "08-29": ["Evelína", "Evelin", "Evelina"],
  "08-30": ["Vladěna"],
  "08-31": ["Pavlína", "Paulína"],
  "09-01": ["Linda", "Samuel"],
  "09-02": ["Adéla", "Adléta", "Adela"],
  "09-03": ["Bronislav"],
  "09-04": ["Jindřiška", "Henrieta"],
  "09-05": ["Boris"],
  "09-06": ["Boleslav"],
  "09-07": ["Regina", "Regína"],
  "09-08": ["Mariana"],
  "09-09": ["Daniela"],
  "09-10": ["Irma"],
  "09-11": ["Denisa", "Denis"],
  "09-12": ["Marie"],
  "09-13": ["Lubor"],
  "09-14": ["Radka"],
  "09-15": ["Jolana"],
  "09-16": ["Ludmila"],
  "09-17": ["Naděžda"],
  "09-18": ["Kryštof", "Krištof"],
  "09-19": ["Zita"],
  "09-20": ["Oleg"],
  "09-21": ["Matouš"],
  "09-22": ["Darina"],
  "09-23": ["Berta", "Bertina"],
  "09-24": ["Jaromír"],
  "09-25": ["Zlata"],
  "09-26": ["Andrea", "Ondřejka"],
  "09-27": ["Jonáš"],
  "09-28": ["Václav", "Václava"],
  "09-29": ["Michal", "Michael"],
  "09-30": ["Jeroným", "Jeronym", "Jarolím"],
  "10-01": ["Igor"],
  "10-02": ["Olívie", "Olivia", "Oliver"],
  "10-03": ["Bohumil"],
  "10-04": ["František"],
  "10-05": ["Eliška", "Elsa"],
  "10-06": ["Hanuš"],
  "10-07": ["Justýna", "Justina", "Justin"],
  "10-08": ["Věra", "Viera"],
  "10-09": ["Štefan", "Sára"],
  "10-10": ["Marina", "Marína"],
  "10-11": ["Andrej"],
  "10-12": ["Marcel"],
  "10-13": ["Renáta", "Renata"],
  "10-14": ["Agáta"],
  "10-15": ["Tereza"],
  "10-16": ["Havel"],
  "10-17": ["Hedvika"],
  "10-18": ["Lukáš"],
  "10-19": ["Michaela", "Michala"],
  "10-20": ["Vendelín"],
  "10-21": ["Brigita", "Bridget"],
  "10-22": ["Sabina"],
  "10-23": ["Teodor", "Theodor"],
  "10-24": ["Nina"],
  "10-25": ["Beáta", "Beata"],
  "10-26": ["Erik", "Ervín"],
  "10-27": ["Šarlota", "Zoe", "Zoja"],
  "10-29": ["Silvie", "Sylva", "Silva"],
  "10-30": ["Tadeáš"],
  "10-31": ["Štepánka", "Stefanie"],
  "11-01": ["Felix"],
  "11-03": ["Hubert"],
  "11-04": ["Karel"],
  "11-05": ["Miriam"],
  "11-06": ["Liběna"],
  "11-07": ["Saskie"],
  "11-08": ["Bohumír"],
  "11-09": ["Bohdan"],
  "11-10": ["Evžen", "Eugen"],
  "11-11": ["Martin"],
  "11-12": ["Benedikt"],
  "11-13": ["Tibor"],
  "11-14": ["Sáva"],
  "11-15": ["Leopold"],
  "11-16": ["Otmar", "Otomar"],
  "11-17": ["Mahulena"],
  "11-18": ["Romana"],
  "11-19": ["Alžběta", "Elisabeth"],
  "11-20": ["Nikola"],
  "11-21": ["Albert"],
  "11-22": ["Cecílie"],
  "11-23": ["Klement", "Kliment"],
  "11-24": ["Emílie", "Emilia"],
  "11-25": ["Kateřina", "Katka", "Katarína"],
  "11-26": ["Artur"],
  "11-27": ["Xenie"],
  "11-28": ["René", "Renée"],
  "11-29": ["Zina"],
  "11-30": ["Ondřej"],
  "12-01": ["Iva"],
  "12-02": ["Blanka"],
  "12-03": ["Svatoslav", "Světoslav"],
  "12-04": ["Barbora", "Barbara", "Bára"],
  "12-05": ["Jitka"],
  "12-06": ["Mikuláš", "Mikoláš", "Nikolas"],
  "12-07": ["Ambrož"],
  "12-08": ["Květoslava"],
  "12-09": ["Vratislav"],
  "12-10": ["Julie", "Julia", "Juliana"],
  "12-11": ["Dana"],
  "12-12": ["Simona", "Šimona", "Simeona"],
  "12-13": ["Lucie", "Lucia", "Luciana"],
  "12-14": ["Lýdie", "Lydia", "Lydie"],
  "12-15": ["Radana"],
  "12-16": ["Albína"],
  "12-17": ["Daniel", "Dan"],
  "12-18": ["Miloslav"],
  "12-19": ["Ester"],
  "12-20": ["Dagmar", "Dagmara", "Dáša"],
  "12-21": ["Natálie"],
  "12-22": ["Šimon", "Simon", "Simeon"],
  "12-23": ["Vlasta"],
  "12-24": ["Adam", "Eva"],
  "12-26": ["Štepán", "Štěpán"],
  "12-27": ["Žaneta"],
  "12-28": ["Bohumila"],
  "12-29": ["Judita"],
  "12-30": ["David"],
  "12-31": ["Silvestr", "Silvester", "Sylvestr"],
};

module.exports = {
  getNameDayFor,
  getPoster,
};
