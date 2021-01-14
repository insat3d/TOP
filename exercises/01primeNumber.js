function isPrime(num) {
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function init() {
  let limit,
    i = 2,
    message = "";
  do {
    i = 2;
    message = "";
    limit = prompt("Enter Limit as integer (Enter any non-integer to exit)");
    while (i <= limit) {
      message += isPrime(i) ? `${i}, ` : "";
      i++;
    }
    message.length && Number(limit) === Math.round(limit)
      ? console.log(
          `Prime number sequence till ${limit} is ${message.substring(
            0,
            message.length - 2
          )}`
        )
      : true;
  } while (limit > 1 && limit && Number(limit) === Math.round(limit));
}

init();
