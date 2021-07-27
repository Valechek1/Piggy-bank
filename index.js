const inputName = document.querySelector('.goal-name');
const inputAmount = document.querySelector('.amount');
const inputDate = document.querySelector('.date');
const inputInitialPayment = document.querySelector('.initial-payment');
const inputInterest = document.querySelector('.interest');
const addButton = document.querySelector('.btn-add');
const replenishmentPercentage = document.querySelector('.replenishment-percentage');
const boxForm = document.querySelector('.box-form');
const forInsertBefore = document.querySelector('.for-insert-before');
const alertNoData = document.createElement('h2');
alertNoData.classList.add('alert-message');
const alertWrongDigits = document.createElement('h2');
alertWrongDigits.classList.add('alert-message');

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return (
    `${s4()
    + s4()
    }-${s4()
    }-${s4()
    }-${s4()
    }-${s4()
    }${s4()
    }${s4()}`
  );
};

function searchInAnArray(array, id) {
  const data = array.find((el) => el.id === id);
  inputName.value = data.name;
  inputAmount.value = data.amount;
  inputDate.value = data.date;
  inputInitialPayment.value = data.payment;
  inputInterest.value = data.interest;
}

const boxText = document.querySelector('.box-text');
const massivFromFirstBlock = [];
function getUserData() {
  const userData = {
    id: guid(),
    name: inputName.value,
    amount: inputAmount.value,
    date: inputDate.value,
    payment: inputInitialPayment.value,
    interest: inputInterest.value,
    monthsNumber: Math.ceil(
      moment(inputDate.value).diff(moment(), 'months', true),
    ),
  };
  return userData;
}

function zeroingForm() {
  inputName.value = '';
  inputAmount.value = '';
  inputDate.value = '';
  inputInitialPayment.value = '';
  inputInterest.value = '';
}

function showMyGoal(goal) {
  const goalElDiv = document.createElement('div');
  goalElDiv.classList.add('goal');

  const editButton = document.createElement('button');
  editButton.classList.add('btn-edit');

  const editPic = document.createElement('img');
  editPic.src = 'images/edit-btn.svg';
  editPic.classList.add('edit-img');

  editButton.append(editPic);

  const myGoalMetrics = document.createElement('div');
  myGoalMetrics.classList.add('text-goal');

  const nameP = document.createElement('h3');
  nameP.classList.add('p-design');
  nameP.innerText = `Ваша цель: ${goal.name}`;

  const amountP = document.createElement('p');
  amountP.classList.add('p-design');
  amountP.innerText = `Требуемая сумма: ${goal.amount}`;

  const dateP = document.createElement('p');
  dateP.classList.add('p-design');
  dateP.innerText = `Срок: ${goal.date}`;

  const paymentP = document.createElement('p');
  paymentP.classList.add('p-design');
  paymentP.innerText = `Стартовая сумма: ${goal.payment}`;

  const interestP = document.createElement('p');
  interestP.classList.add('p-design');
  interestP.innerText = `Процент: ${goal.interest}`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete');

  const deletePic = document.createElement('img');
  deletePic.src = 'images/delete-btn.svg';
  deletePic.classList.add('delete-img');

  deleteButton.append(deletePic);
  goalElDiv.append(editButton);
  goalElDiv.append(myGoalMetrics);
  myGoalMetrics.append(nameP);
  myGoalMetrics.append(amountP);
  myGoalMetrics.append(dateP);
  myGoalMetrics.append(paymentP);
  myGoalMetrics.append(interestP);
  goalElDiv.append(deleteButton);
  boxText.append(goalElDiv);

  editButton.addEventListener('click', () => {
    searchInAnArray(massivFromFirstBlock, goal.id);
    goalElDiv.remove();
  });

  deleteButton.addEventListener('click', () => {
    goalElDiv.remove();
    const dataIndex = massivFromFirstBlock.findIndex((el) => el.id === goal.id);
    massivFromFirstBlock.slice(dataIndex, 1);
  });
}

function checkEmptylInputs(data) {
  if (data.name !== '' && data.amount !== '' && !isNaN(data.monthsNumber) && data.payment !== '' && data.interest !== '') {
    return true;
  }
  return false;
}

function checkNegativeDigitalInputs(data) {
  if (data.amount > 0 && data.payment > 0 && data.interest > 0) {
    return true;
  }
  return false;
}

addButton.addEventListener('click', () => {
  const data = getUserData();
  if (!checkEmptylInputs(data)) {
    alertNoData.innerText = 'Введите значение';
    boxForm.insertBefore(alertNoData, forInsertBefore);
    return;
  }
  alertNoData.innerText = '';

  if (!checkNegativeDigitalInputs(data)) {
    alertWrongDigits.innerText = 'Введите норм цифры';
    boxForm.insertBefore(alertWrongDigits, forInsertBefore);
    return;
  }
  alertWrongDigits.innerText = '';

  massivFromFirstBlock.push(data);

  showMyGoal(data);
  zeroingForm();
  console.log(data);
});
