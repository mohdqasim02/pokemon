const fs = require("fs");

let pokeIndex = 0;
const img = () => {
  pokeIndex++;
  const pokemon = pokeIndex.toString().padStart(3, '00');
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon}.png`;

  return `<img src="${url}" alt="">`;
}

const element = (tag, content) => `<${tag}>${content}</${tag}>`;
const elementWithClass = (tag, content, cls) => `<${tag} class="${cls}">${content}</${tag}>`;

const h3 = (content) => element("h3", content);
const td = (content) => element("td", content);
const th = (content) => element("th", content);
const tr = (content) => element("tr", content);
const tbody = (content) => element("tbody", content);
const table = (content) => element("table", content);
const divCard = (content) => elementWithClass("div", content, "card");
const divData = (content) => elementWithClass("div", content, "data");
const divImage = (content) => elementWithClass("div", content, "image");
const mainCards = (content) => elementWithClass("main", content, "cards");
const spanClass = (content) => elementWithClass("span", content, content);
const sectionRows = (content) => elementWithClass("section", content, "rows");
const emptyImg = () => divImage(img());

const main = ([filePath, separator]) => {
  const data = fs.readFileSync(filePath, "utf-8").trim();
  const rows = data.split("\n").map(row => row.split(separator).slice(1));
  const feilds = rows[0].slice(1);

  const pokemonData = rows.slice(1).map(row => {
    const name = h3(row[0]);
    const tableContent = row.slice(1).map((feildData, index) => {
      const category = th(feilds[index]);
      const values = td(feildData.split(",").map(spanClass).join(""));

      return tr(category + values);
    });
    return divData(name + table(tbody(tableContent.join("\n"))));
  });

  const sections = [];
  const card = pokemonData.map(pokemon => divCard(emptyImg() + pokemon));

  for (let index = 0; index < card.length; index += 4) {
    const row = card[index] +
      "\n" + card[index + 1] +
      "\n" + card[index + 2] +
      "\n" + (card[index + 3] || "");
    sections.push(sectionRows(row));
  }

  console.log(mainCards(sections.join("\n")));
}

main(process.argv.slice(2));