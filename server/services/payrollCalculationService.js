/**
 * @fileoverview Service for handling complex payroll calculations.
 */

const calculatePAYE = (grossPay, nssf, ahl) => {
  const taxablePay = grossPay - nssf - ahl;

  let tax = 0;
  if (taxablePay > 800000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + (300000 * 0.325) + ((taxablePay - 800000) * 0.35);
  } else if (taxablePay > 500000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + ((taxablePay - 500000) * 0.325);
  } else if (taxablePay > 32333) {
    tax = (24000 * 0.1) + (8333 * 0.25) + ((taxablePay - 32333) * 0.3);
  } else if (taxablePay > 24000) {
    tax = (24000 * 0.1) + ((taxablePay - 24000) * 0.25);
  } else {
    tax = taxablePay * 0.1;
  }

  const personalRelief = 2400;
  const insuranceRelief = 0; // Assuming no insurance relief for now
  const affordableHousingRelief = Math.min(ahl * 0.15, 9000);
  const totalReliefs = personalRelief + insuranceRelief + affordableHousingRelief;

  const paye = tax - totalReliefs;
  return paye > 0 ? paye : 0;
};

const calculateNSSF = (grossPay) => {
  const LEL = 8000;
  const UEL = 72000;

  let tier1 = 0;
  let tier2 = 0;

  if (grossPay > 0) {
    tier1 = Math.min(grossPay, LEL) * 0.06;
  }

  if (grossPay > LEL) {
    const tier2Pay = Math.min(grossPay, UEL) - LEL;
    tier2 = tier2Pay * 0.06;
  }

  const totalNSSF = tier1 + tier2;

  //The employee contribution is half of the total NSSF
  return totalNSSF / 2;
};

const calculateSHIF = (grossPay) => {
  const contribution = grossPay * 0.0275;
  return Math.max(contribution, 300);
};

const calculateAffordableHousingLevy = (grossPay) => {
  return grossPay * 0.015;
};

const calculateStatutoryDeductions = (grossPay) => {
  const nssf = calculateNSSF(grossPay);
  const shif = calculateSHIF(grossPay);
  const affordableHousingLevy = calculateAffordableHousingLevy(grossPay);
  const paye = calculatePAYE(grossPay, nssf, affordableHousingLevy);

  return {
    paye,
    nssf,
    shif,
    affordableHousingLevy,
    helb: 0, // Placeholder for HELB
  };
};

module.exports = {
  calculateStatutoryDeductions,
};
