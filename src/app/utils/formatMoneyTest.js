export const formatMoney = (amountOfMoney) => {
  //(1)
  const amountOfMoneyInString = amountOfMoney.toString(); //(2)

  if (amountOfMoneyInString.length <= 3)
    //(3)
    return amountOfMoneyInString; //(4)

  const formated = [];
  let pointIndex = 0; //(5)

  for (
    let i = amountOfMoneyInString.length - 1 /*(6)*/;
    i >= 0;
    /*(7)*/ i-- /*(11)*/
  ) {
    formated.push(amountOfMoneyInString[i]);
    pointIndex += 1; //(8)

    if (pointIndex === 3) {
      //(9)
      formated.push(".");
      pointIndex = 0; //(10)
    }
  } //(12)

  if (formated[formated.length - 1] === ".")
    //(13)
    formated.pop(); //(14)

  return formated.reverse().join(""); //(15)
};
