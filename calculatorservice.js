



    function ready(){

    const quantityInput = document.getElementById('quantity');
    const serviceRadioButtons = document.querySelectorAll('input[name="service"]');
    const optionsSelect = document.getElementById('options');
    const priceSpan = document.getElementById('price');
    const optionsContainer = document.getElementById('options-container');
    const propertyContainer = document.getElementById('property-container');

    const allProps = document.querySelectorAll('#property-container input[type="checkbox"]');

    const options = {
      '2': [
        { value: 'ул. Красная, 96 (+50 руб)', price: 50 },
        { value: 'ул. Ставропольская, 149 (+55 руб)', price: 55 },
        { value: 'ул. Российская, 50 (+40 руб)', price: 40 },
        { value: 'ул. Школьная, 5 (+30 руб)', price: 35 }
      ]
    };



    function calculatePrice() {
        let price = 0;
        const quantityValue = quantityInput.value;
        const quantity = parseInt(quantityValue);
        if (quantityValue.length == 0) {
            document.getElementById("price").innerText = "Вы не ввели число!";
            return false;
        }
        if (!quantityValue.match(/^\d+$/) || !quantity) {
            document.getElementById("price").innerText = "Вы ввели не целое положительное число!";
            return false;
        }
    
        const selectedService = document.querySelector('input[name="service"]:checked').value;
  
        switch (selectedService) {
          case '1':
            price = quantity * 20;
            break;
            case '2':
            price = 30;
            if (optionsSelect.value) {
              const selectedOption = options[selectedService].find(option => option.value === optionsSelect.value);
              if (selectedOption) {
                price += selectedOption.price;
              }
            }
            price = price*quantity;
            break;
            case '3':
            price = 50;
            allProps.forEach(function(propertyCheckbox) {
              if (propertyCheckbox.checked) {
                    price += parseInt(propertyCheckbox.value);
              }
            });
            price = price*quantity;
            break;
        }
  
        priceSpan.textContent = price + " рублей";
      }
  
      function updateOptions() {
        const selectedService = document.querySelector('input[name="service"]:checked').value;
        optionsSelect.innerHTML = '';
  
        if (selectedService === '2') {
          optionsContainer.style.display = 'block';
          propertyContainer.style.display = 'none';
  
          options[selectedService].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.value;
            optionsSelect.appendChild(optionElement);
          });
        } else if (selectedService === '3') {
          optionsContainer.style.display = 'none';
          propertyContainer.style.display = 'block';
        } else {
          optionsContainer.style.display = 'none';
          propertyContainer.style.display = 'none';
        }
      }
  


    quantityInput.addEventListener('change', calculatePrice);
    serviceRadioButtons.forEach(button => button.addEventListener('change', () => {
      updateOptions();
      calculatePrice();
    }));
    allProps.forEach(button => button.addEventListener('change', () => {
      updateOptions();
      calculatePrice();
    }));
    optionsSelect.addEventListener('change', calculatePrice);

    const button = document.querySelector('button');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');
const html = document.querySelector('html');

button.addEventListener('click', () => {
  form.classList.add('open');
  html.classList.add('open');
  popup.classList.add('popup_open');
  history.pushState({ form: 1 }, "Форма для заявки", "?form=1");
});

window.addEventListener("popstate", (event) => {
  //alert(
  //  `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
  //);
  if (event.state != null) {
    form.classList.add('open');
    html.classList.add('open');
    popup.classList.add('popup_open');  
  } else {
    form.classList.remove('open');
    html.classList.remove('open');
    popup.classList.remove('popup_open');
  }
});

function processForm(e)
{
  if (e.preventDefault) e.preventDefault();
  $.ajax({
		url: 'https://formcarry.com/s/oM_kDcxld8K',
		method: 'post',
		dataType: 'html',
		data: $(this).serialize(),
		success: function(data){
  //alert(
    //`data: ${JSON.stringify(data)}`,
  //);
  alert(
      'Форма успешно отправлена, спасибо!'
      );
		},
    error: function (jqXHR, exception) {
      alert('Ошибка отправки формы ');
    }
	});
  return false;
}

form.addEventListener("submit", processForm);

    // Инициализация при загрузке страницы
    updateOptions();
    calculatePrice();
}


document.addEventListener("DOMContentLoaded", ready);