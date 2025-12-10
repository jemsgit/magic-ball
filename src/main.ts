import "./style.css";
import Shake from "shake.js";
import { createSnow, showSnow } from "pure-snow.js";
import * as htmlToImage from "html-to-image";
import magSound from "../public/ding.mp3";

const mag = new Audio(magSound);
const fontSizethreshold = 85;
let currentOption: string | undefined = undefined;

const options = [
  "Купишь мультиспид, кикнут из FG чата",
  "Соберешь сетап за 200к на алике (потеряется в доставке)",
  "Шестигранник будет всегда с тобой (проглотишь по синьке)",
  "Разъебешь камаз на встречке",
  "Пробьешься дважды в один день",
  "Перейдешь на безкамерки и будешь часами доказывать в чате что это топ",
  "Проедешь SKVOZ первым (потом проснешься)",
  "Проедешь HotLine по Саратову, но корешь забудет включить REC",
  "Перейдешь на 51/16 и будешь страдать",
  "Поставишь катафотики (лох)",
  "Разложишься на рельсах так, что прохожие будут апплодировать",
  "Погнешь спицы открывая пиво о колесо",
  "Перейдешь на карбон (но быстрее ездить не станешь)",
  "Поймешь, что нужно было брать седло с дыркой (но будет поздно)",
  "Перейдешь на контакты, но следующий сезон будешь копить на ботинки",
  "Будешь дальше дрочить на Cinelli, но так и не купишь",
  "Научишься делать bunny hop",
  "Начнешь курьерить для души",
  "Депсы поймают за проезд на красный",
  "Шлем наконец то пригодится",
  "Тебя поймает полиция зазоров",
  "Твой вел будет 1923 в bikecheckbot",
  "Узнаешь, что в велопамперс не надо было срать",
  "Твоя средняя - 40 в этом сезоне (все думают что ты пиздишь)",
  "Спиздят задний фонарь (но ты его тоже спиздил)",
  "Научишься скидить (заебешься менять покрышки)",
  "Начнешь попадать в стрепы неглядя",
  "Твое лицо на стикерах FG твоего города",
  "Из-за твоего стиля езды кореша начнут думать, что ты натурал",
  "Начнешь брить ноги ради аэродинамики",
  "Погнешь раму и твоя реакция на это станет мемом в чате",
  "Въебешься в курьера (получишь пиццу в качестве извенений)",
  "Твой вел угонят, но поймут что гейская хуйня и вернут",
  "Станешь дальтоником и будешь спокойно ездить на серый",
  "Поставишь 2 тормоза, кикнут из FG чата",
  "Купишь джерси (максимально гейскую)",
  "Пафосно въебешься в толпу пешеходов на красном",
  "Мать узнает что такое fixed gear и вызовет дурку",
  "Скрип твоей каретки будет слышно за 2 квартала",
  "Отец пропьет твой вилсет (и это будет финансово правильно)",
];

const main = document.querySelector("#ball");
const answer = document.querySelector("#answer");
const answerText = document.querySelector("#answer-text");
const logo = document.querySelector("#logo");
const shareLink = document.getElementById("share");
const downloadLink = document.getElementById("download");

let timeoutId: NodeJS.Timeout | undefined = undefined;
let timeoutId2: NodeJS.Timeout | undefined = undefined;

setTimeout(() => {
  createSnow(); // creates snowflakes and generate css for them
  showSnow(true); // snow can be disabled using showSnow function
}, 2000);

function showNextPrediction(e: Event) {
  try {
    e.stopPropagation();
  } catch (error) {
    console.log(error);
  }
  clearTimeout(timeoutId);
  clearTimeout(timeoutId2);
  answer?.classList.add("hide");
  logo?.classList.add("hide");
  main?.classList.add("shake");

  timeoutId2 = setTimeout(() => {
    try {
      mag.play();
    } catch (e) {
      console.log(e);
    }
  }, 900);

  timeoutId = setTimeout(() => {
    let pos = Math.round(Math.random() * (options.length - 1));
    const text = options[pos] || options[0];
    currentOption = text;
    shareLink?.classList.remove("invisible");
    downloadLink?.classList.remove("invisible");
    if (text.length > fontSizethreshold) {
      answerText?.classList.add("small-font");
    } else {
      answerText?.classList.remove("small-font");
    }
    (answerText as HTMLElement).innerText = text;
    answer?.classList.remove("hide");
    main?.classList.remove("slide-in-elliptic-top-fwd");
    main?.classList.remove("shake");
  }, 1200);
}

main?.addEventListener("click", showNextPrediction);

var myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 400, // optional, determines the frequency of event generation
});

myShakeEvent.start();

window.addEventListener("shake", showNextPrediction, false);

async function download(e: MouseEvent) {
  e.preventDefault();
  const ball = document.getElementById("ball");
  ball?.classList.add("snap");
  htmlToImage
    .toPng(ball!, { pixelRatio: 4 })
    .then((image) => {
      const link = document.createElement("a");
      link.download = `magic-ball-result.png`;
      link.href = image;
      link.click();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      ball?.classList.remove("snap");
    });
}

async function share(e: MouseEvent) {
  e.preventDefault();
  if (
    navigator.canShare &&
    navigator.canShare({
      title: "Mагический шар - Fixed Gear Edition",
      url: "https://jem-space.ru/ball",
      text: `В 2026 мне нагадали: ${currentOption} `,
    })
  ) {
    try {
      await navigator.share({
        title: "Mагический шар - Fixed Gear Edition",
        text: `В 2026 мне нагадали: ${currentOption}.
`,
        url: "https://jem-space.ru/ball",
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    console.log(
      "Your browser doesn't support sharing files or there are no files to share."
    );
  }
}

downloadLink?.addEventListener("click", download);
shareLink?.addEventListener("click", share);
