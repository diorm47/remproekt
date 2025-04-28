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

async function sendForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const privacy = document.getElementById("privacy").checked;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!name || !phone) {
    showSnackbar("Пожалуйста, заполните все поля.", "error");
    return;
  }

  if (!privacy) {
    showSnackbar("Подтвердите согласие на обработку данных.", "error");
    return;
  }

  if (!file) {
    showSnackbar("Пожалуйста, прикрепите файл проекта.", "error");
    return;
  }

  try {
    const textMessage = `Новая заявка с сайта:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMessage,
      }),
    });

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("document", file);

    const sendDocumentResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendDocument`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await sendDocumentResponse.json();

    if (result.ok) {
      showSnackbar("Заявка и файл успешно отправлены!", "success");
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("privacy").checked = false;
      document.getElementById("file").value = "";
    } else {
      console.error(result);
      showSnackbar("Ошибка при отправке файла.", "error");
    }
  } catch (error) {
    console.error(error);
    showSnackbar("Ошибка соединения с сервером.", "error");
  }
}
