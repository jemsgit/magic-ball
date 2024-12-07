import "./style.css";
import Shake from "shake.js";

const fontSizethreshold = 90;

const options = [
  "Ваша давняя мечта сбудется.",
  "Новое путешествие наполнит вашу жизнь непередаваемыми воспоминаниями.",
  "Незнакомец скоро войдет в вашу жизнь поделиться с вами своим счастьем.",
  "В ближайшем будущем вас ждут волнующие события.",
  "У очень привлекательного человека есть для вас сообщение.",
  "Прими свое прошлое без сожалений. Справляйся с настоящим уверенно. Смотри в глаза будущему без страха.",
  "Вовремя начатые действия помогут вам противостоять судьбе.",
  "Спроси себя, что из сделанного сегодня приблизит тебя к тому, кем ты хочешь стать завтра.",
  "Один человек ищет дорогу к вашему сердцу.",
  "Все согласны с тем, что вы лучший.",
  "Удача благоволит смелым.",
  "Хочешь быть счатливым? Действуй.",
  "Если вы чувствуете, что правы, будьте тверды в своих намерениях.",
  "Если вы чувствуете, что за это стоит бороться, боритесь.",
  "Красивый, умный и любящий человек войдет в вашу жизнь.",
  "Будьте осторожны, вашим врагом может оказаться сомнительный друг.",
  "Верный друг встанет на вашу защиту.",
  "Синица в руке лучше, чем журавль в небе.",
  "Вас ждет начало нового пути.",
  "Помните, что настоящему другу нужно ваше время, а не деньги.",
  "В ближайшем будущем вам предстоит в чем-то рискнуть.",
  "Игрок потеряет не только то, что имеет, но и то, чего у него нет.",
  "Золотой шанс свалится на вас в этом месяце.",
  "Крепкая дружба часто важнее страстного романа.",
  "Хорошее время, чтобы завершить старые дела.",
  "Ваша интуиция пытается вам что-то подсказать.",
  "Скоро вы познакомитесь с человеком, который станет вам другом на всю жизнь.",
  "Впереди вас ждет безграничное счастье.",
  "Легкое сердце поможет вам пройти через все сложные времена.",
  "С Новым годом вас ждут новые перспективы.",
  "Человек никогда не бывает слишком стар, чтобы учиться.",
  "Вас ждет приятный сюрприз.",
  "От вас потребуется небольшое пожертвование. Это станет правильным решением.",
  "Ваша улыбка откроет вам многие двери.",
  "Вас ждет долгое путешествие, которые оправдает ваши ожидания.",
  "Занимайтесь тем, что вы любите. Остальное встанет на свои места.",
  "По-настоящему богатая жизнь невозможна без любви.",
];

console.log(Shake);

const main = document.querySelector("#ball");
const answer = document.querySelector("#answer");
const answerText = document.querySelector("#answer-text");
const logo = document.querySelector("#logo");
let timeoutId: number | undefined = undefined;

function showNextPrediction() {
  clearTimeout(timeoutId);
  answer?.classList.add("hide");
  logo?.classList.add("hide");
  main?.classList.add("shake");
  timeoutId = setTimeout(() => {
    let pos = Math.round(Math.random() * (options.length - 1));
    const text = options[pos] || options[0];
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
