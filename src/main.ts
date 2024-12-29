import "./style.css";
import Shake from "shake.js";
import { createSnow, showSnow } from "pure-snow.js";
import * as htmlToImage from "html-to-image";
import magSound from "../public/wob.mp3";

const mag = new Audio(magSound);
const fontSizethreshold = 85;
let currentOption: string | undefined = undefined;

const options = [
  "Ты забудешь переключиться на правильную ветку и запушишь прямо в `master`",
  "Твоя следующая миграция базы данных пройдет без ошибок",
  "Сегодня ты случайно решишь баг, который долго не давал покоя",
  "Кто-то оставит комментарий в твоем PR, который полностью изменит твою реализацию",
  "Скоро ты обнаружишь, что дебаггер — твой лучший друг",
  "Забудешь про `git stash` и потеряешь важные изменения",
  "В следующем спринте ты станешь героем команды благодаря оптимизации",
  "Твоя следующая попытка настроить окружение пройдет без боли",
  "Пакет, на который ты полагаешься, внезапно перестанет поддерживаться",
  "Твой тест-кейс поймает критический баг в проде",
  "Напишешь компонент, который идеально соответствует дизайну",
  "Твой пайплайн внезапно перестанет работать на пустом месте",
  "Запушишь .env с кредами от прода в master",
  "Новая версия твоего любимого фреймворка сломает половину твоего проекта",
  "Кто-то похвалит твой код на ревью",
  "Ты потратишь час, пытаясь найти незакрытую скобку",
  "Скоро ты найдешь библиотеку, которая сделает твою задачу в разы проще",
  "Ты будешь разбираться с merge conflict на протяжении нескольких часов",
  "Твое решение по доработке логики зарелизит проект до дедлайна",
  "Перед комитом ты поймешь, что лучше переписать модуль с нуля",
  "Твоя команда наконец вернется к использованию jQuery",
  "В коде появится `console.log('here')`, который попадет в прод",
  "Ты станешь мастером использования `git rebase`",
  "Ты случайно удалишь ветку, а затем долго будешь ее восстанавливать",
  "Твой следующий PR будет принят без единого комментария",
  "Перепишешь проект на другой фреймворк",
  "Новая зависимость в проекте окажется полной головной болью",
  "Кто-то предложит архитектурное решение, которое тебе не понравится, но оно сработает",
  "Ты забудешь про `npm i` и удивишься, почему ничего не работает",
  "Твой сайт заблокирует РКН",
  "Уронишь прод (опять)",
  "Начнешь менторить",
  "Проспишь стендап (опять)",
  "Пропадет интернет на твоей очереди говорить на стендапе",
  "Будешь месяц разбираться с флаки тестами",
  "Коллеги будут гадать почему тебе вообще платят зарплату",
  "Заведешь блог по разработке или про мемы",
  "Купишь эргономичную клавиатуру, но это не поможет",
  "Будешь работать за лида",
  "Тебе повысят грейд, но не зп",
  "Выступишь на HolyJs",
  "Твоя PR-ветка будет называться fix-final-really-final",
  "Получишь баг-репорт без шагов воспроизведения и с текстом 'не работает'",
  "Упадет сервер, и тебе придется дебажить в пятницу вечером",
  "Забудешь про дедлайн и вспомнишь только в день релиза",
  "Кто-то сделает force-push в твою ветку",
  "Будешь дебажить проблему, которая исправится после перезагрузки",
  "Пропустишь важное сообщение в Slack, а потом пожалеешь об этом",
  "Сделаешь hotfix на продакшене и сломаешь другой модуль",
  "Перейдешь на проект с поддержкой IE и Symbian",
  "На созвоне забудешь про вебку и микрофон и светанешь яйцами",
  "Случайно отправишь дикпик лиду",
  "СЕО услышит как ты на самом деле его называешь при коллегах",
  "Коллеги увидят твой персональный Github и ужаснутся",
  "Получишь 3000 звезд на Github",
  "Наконец разберешься с чистой архитектурой",
  "Твой pet-project станет стартапом года",
  "Будешь работать над проектом, который войдет в топ GitHub",
  "Найдешь способ ускорить CI на 90%",
  "Решишь 10-летнюю проблему команды одним коммитом",
  "Напишешь код, который никто не сможет улучшить",
  "Напишешь код с мемори ликами",
  "Окажется, что твой код уже используют в NASA",
  "Случайно сделаешь вирусный проект за один вечер",
  "Твое резюме будет просматривать только СберТех",
  "Пройдешь алго сессию в Авито за 15 минут",
];

const main = document.querySelector("#ball");
const answer = document.querySelector("#answer");
const answerText = document.querySelector("#answer-text");
const logo = document.querySelector("#logo");
const shareLink = document.getElementById("share");
const downloadLink = document.getElementById("download");

let timeoutId: number | undefined = undefined;
let timeoutId2: number | undefined = undefined;

createSnow(); // creates snowflakes and generate css for them
showSnow(true); // snow can be disabled using showSnow function

function showNextPrediction() {
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
      title: "Mагический шар - Coder Edition",
      url: "https://jem-space.ru/ball",
      text: `В 2025 мне нагадали: ${currentOption} `,
    })
  ) {
    try {
      await navigator.share({
        title: "Mагический шар - Coder Edition",
        text: `В 2025 мне нагадали: ${currentOption}.
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
