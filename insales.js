//Подключаем Axios для выполнения HTTP-запросов
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <script>
    const TOKEN = '666:AAE7Wntd4WTZwsZse_S-Bj6f1wYDkE'; //Токен Бота
    const CHAT_ID = '-1000';// ID чата куда будет приходить уведомление о новом заказе
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`; //Тут ничего не трогаем
    
    const domain = window.location.hostname; //Цепляем домен с которого была заявка
    const orderForm = document.getElementById('order_form'); //Получаем форму заказа
    const orderNameUser = document.getElementById('client_contact_name'); //Цепляем имя, которое указал клиент
    const orderNumberUser = document.getElementById('client_phone'); //Цепляем телефон, которое указал клиент

    var basketList = document.querySelectorAll('.co-basket_item-description'); //Берем содержимое корзины
  
    var orderSumTotal = document.getElementById('total_price'); //Цепляем сумму заказа

    if (orderForm){
    document.getElementById('create_order').addEventListener('click', function(){
    orderForm.submit();
      //Форма для менеджера
        let message = `<b>Новый заказ с домена</b> ${domain}\n`;
        message += `<b>Отправитель:</b> ${orderNameUser.value}\n`;
        message += `<b>Телефон:</b> ${orderNumberUser.value}\n`;
        message += `<b>Товары:</b>\n`;
        basketList.forEach(item => {
        message += `${item.innerText}\n`;
        });
        message += `<b>Сумма заказа:</b> ${orderSumTotal.innerHTML}\n`;
      //Форма для клиента
        let messageClient = `<b>Здравствуйте</b> ${orderNameUser.value}!\n`;
        messageClient += `<b>Я ваш личный менеджер.\nВы оставили заказ на следующие товары:</b>\n`;
        basketList.forEach(item => {
        messageClient += `${item.innerText}\n`;
        });
        messageClient += `<b>Сумма заказа:</b> ${orderSumTotal.innerHTML}\n`;
        messageClient += `<b>Напишите пожалуйста название вашего населенного пункта, я рассчитаю доставку.</b>\n`;

        axios.post(URI_API, {
          chat_id: CHAT_ID,
          parse_mode:'html',
          text:message
        });
        axios.post(URI_API, {
          chat_id: CHAT_ID,
          parse_mode:'html',
          text:messageClient
        });
      
    }); 
};    

  </script>
