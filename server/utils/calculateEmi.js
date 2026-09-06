const calculateEmi = (price, months, interestRate = 0) => {
  if (interestRate === 0) {
    return Math.round(price / months);
  }

  const monthlyRate = interestRate / 12 / 100;

  const emi =
    (price *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
};

module.exports = calculateEmi;