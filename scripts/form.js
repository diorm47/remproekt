const botToken = "8116777352:AAHGeEPXZpn1pvLnBwqJrnIwXi4dQjH1Y3g";
const chatId = "1809341426";

function sendTelegramMessage() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const agreed = document.getElementById("privacy").checked;

  if (!name || !phone) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  if (!agreed) {
    alert("Пожалуйста, подтвердите согласие на обработку данных.");
    return;
  }

  const message = `Новая заявка с сайта:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        alert("Заявка отправлена!");
      } else {
        alert("Ошибка при отправке сообщения.");
        console.error(data);
      }
    })
    .catch((error) => {
      alert("Ошибка соединения.");
      console.error("Error:", error);
    });
}
