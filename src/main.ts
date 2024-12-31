import "./style.css";
import Shake from "shake.js";
import { createSnow, showSnow } from "pure-snow.js";
import * as htmlToImage from "html-to-image";
import magSound from "../public/ding.mp3";

const mag = new Audio(magSound);
const fontSizethreshold = 85;
let currentOption: string | undefined = undefined;

const options = [
  // Позитивные предсказания
  "Тебе напишет человек, с которым ты давно хотел возобновить общение",
  "Ты найдешь деньги в старой куртке",
  "Случайно выиграешь в конкурсе нудисов",
  "Твой любимый сериал продлят на новый сезон",
  "Тебе подарят что-то, о чем ты давно мечтал (бензопилу)",
  "Ты случайно окажешься на крутой вечеринке аутистов",
  "Тебя ждет неожиданное путешествие в торговый центр",
  "Ты встретишь знаменитость, и она с тобой сфотографируется и даст в долг",
  "Твои любимые сладости вдруг окажутся на скидке в Дикси",
  "Кто-то сделает тебе комплимент про член, который ты долго будешь вспоминать",
  "Ты найдешь идеальный подарок для друга (но дорогой)",
  "На улице тебя ждет прекрасная погода и теплый автобус",
  "Ты встретишь человека, с которым у тебя сразу возникнет химия (или физика)",
  "Ты проснешься с ощущением, что сегодня лучший день в твоей жизни",
  "Тебя пригласят на супер-интересное мероприятие тамадой",
  "Ты неожиданно станешь центром внимания и будешь сиять (не забудь про душ)",
  "Тебя поблагодарят за то, что ты есть",
  "Мама Санька сделает хреновуху только для тебя",
  "На работе поймут что забыли тебе выплатить премию за 2 года и выплатят",
  "Твоя любимая песня заиграет в самый подходящий момент",
  "Ты поймешь, как сильно ты любим и ценен",
  // Негативно-смешные предсказания
  "Ты случайно найдешь свой старый пост в соцсетях и будешь краснеть пару минут",
  "Ты забудешь, зачем зашел в комнату, но вспомнишь только ночью",
  "Тебя обгонит бабушка с тележкой в супермаркете, но второе место твое!",
  "Ты попытаешься пошутить, но никто не поймет, кроме Женька",
  "Тебя спросят, какой сегодня день недели, и ты убежишь",
  "Ты случайно отправишь нудисы не тому человеку",
  "Ты будешь собираться полчаса, а потом вообще никуда не пойдешь",
  "Ты постоишь в очереди, а потом поймешь, что это не твоя касса, но тебя пропустят",
  "Ты потеряешь носки, а потом найдешь их в самых неожиданных местах",
  "Ты решишь посмотреть одну серию и внезапно закончишь сезон",
  "Ты попадешь в пробку из клоунов",
  "Ты захочешь спрятаться, но все равно попадешь на фото",
  "Ты забудешь закрыть вкладку с порно, и её увидят все, и всем понравится",
];

const main = document.querySelector("#ball");
const answer = document.querySelector("#answer");
const answerText = document.querySelector("#answer-text");
const logo = document.querySelector("#logo");
const shareLink = document.getElementById("share");
const downloadLink = document.getElementById("download");

let timeoutId: number | undefined = undefined;
let timeoutId2: number | undefined = undefined;

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
      title: "Mагический шар - Разгоны Edition",
      url: "https://jem-space.ru/speedup-ball",
      text: `В 2025 мне нагадали: ${currentOption} `,
    })
  ) {
    try {
      await navigator.share({
        title: "Mагический шар - Разгоны Edition",
        text: `В 2025 мне нагадали: ${currentOption}.
`,
        url: "https://jem-space.ru/speedup-ball",
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    console.log(
      "Your browser doesn't support sharing files or there are no files to share"
    );
  }
}

downloadLink?.addEventListener("click", download);
shareLink?.addEventListener("click", share);
