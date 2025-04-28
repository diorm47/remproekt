const botToken = "8116777352:AAHGeEPXZpn1pvLnBwqJrnIwXi4dQjH1Y3g";
const chatId = "1809341426";

function showSnackbar(message, type = "success") {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = `show ${type}`;

  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

function sendTelegramMessage() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const agreed = document.getElementById("privacy").checked;

  if (!name || !phone) {
    showSnackbar("Пожалуйста, заполните все поля.", "error");
    return;
  }

  if (!agreed) {
    showSnackbar("Подтвердите согласие на обработку данных.", "error");
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
        showSnackbar("Заявка успешно отправлена!", "success");
      } else {
        showSnackbar("Ошибка при отправке сообщения.", "error");
        console.error(data);
      }
    })
    .catch((error) => {
      showSnackbar("Ошибка соединения с сервером.", "error");
      console.error("Error:", error);
    });
}
