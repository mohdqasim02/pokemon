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
const divValue = (content) => elementWithClass("div", content, "value");
const divCategory = (content) => elementWithClass("div", content, "category");
const divCard = (content) => elementWithClass("div", content, "card");
const divData = (content) => elementWithClass("div", content, "data");
const divContent = (content) => elementWithClass("div", content, "Content");
const divImage = (content) => elementWithClass("div", content, "image");
const divDetail = (content) => elementWithClass("div", content, "detail");
const mainCards = (content) => elementWithClass("main", content, "cards");
const spanClass = (content) => elementWithClass("span", content, content);
const orderedImage = () => divImage(img());

const main = ([filePath, separator]) => {
  const data = fs.readFileSync(filePath, "utf-8").trim();
  const rows = data.split("\n").map(row => row.split(separator).slice(1));
  const feilds = rows[0].slice(1);

  const pokemonData = rows.slice(1).map(row => {
    const name = h3(row[0]);
    const tableContent = row.slice(1).map((feildData, index) => {
      const category = divCategory(element("span", feilds[index]));
      const values = divValue(feildData.split(",").map(spanClass).join(""));

      return divDetail(category + values);
    });
    return divContent(name + divData(tableContent.join("\n")));
  });

  const card = pokemonData.map(pokemon => divCard(orderedImage() + pokemon));

  console.log(mainCards(card.join("\n")));
}

main(process.argv.slice(2));