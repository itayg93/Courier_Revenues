import { fetchRevenuesData } from "../api/AppFirebseApi";
import { formatTime } from "../util";

export const xyz = async (uid, month, setLoading) => {
  var totalAmountOfShifts = 0;
  var totalTimeInSeconds = 0;
  var totalTimeAsDecimalNumber = 0;
  var totalCommissionFee = 0;
  var userTaxPoints = 0;
  var totalNationalInsurance = 0;
  var totalIncomeTax = 0;
  var totalInsurancesPerMonth = 0;
  var totalFuel = 0;
  var totalMaintenance = 0;
  var totalEquipment = 0;
  var totalOther = 0;
  var totalWolt = 0;
  var totalWoltAfterCommission = 0;
  var totalCreditTips = 0;
  var totalCreditTipsAfterCommission = 0;
  var totalCashTips = 0;
  var totalEarningsForTaxCalculation = 0;
  var grossEarnings = 0;
  var grossAvgHourlyWage = 0;
  var netEarnings = 0;
  var netAvgHourlyWage = 0;

  var data = await fetchRevenuesData(uid, month, setLoading);
  const { userProfile, expenses, shifts } = data;
  userTaxPoints = userProfile.taxPoints * 218;
  // calculate earnings
  shifts.forEach((currentShift) => {
    totalAmountOfShifts += 1;
    totalTimeInSeconds += currentShift.timeInSeconds;
    totalWolt += currentShift.wolt;
    totalCreditTips += currentShift.creditTipsAfterVAT;
    totalCommissionFee =
      totalCommissionFee +
      currentShift.woltDelta +
      currentShift.creditTipsDelta;
    totalWoltAfterCommission += currentShift.woltAfterCommission;
    totalCreditTipsAfterCommission +=
      currentShift.creditTipsAfterVatAndCommission;
    totalCashTips += currentShift.cashTips;
  });
  // calculate gross earnings
  grossEarnings = totalWolt + totalCreditTips + totalCashTips;
  //
  totalTimeAsDecimalNumber = formatTime(totalTimeInSeconds, true);
  // calculate horly wage
  grossAvgHourlyWage = grossEarnings / totalTimeAsDecimalNumber;
  // calculate expenses
  expenses.forEach((currentExpense) => {
    switch (currentExpense.type) {
      case "Fuel":
        totalFuel += currentExpense.cost;
        break;
      case "Maintenance":
        totalMaintenance += currentExpense.cost;
        break;
      case "Equipment":
        totalEquipment += currentExpense.cost;
        break;
      case "Other":
        totalOther += currentExpense.cost;
        break;
    }
  });
  // calculate insurances
  totalInsurancesPerMonth = (
    (userProfile.compulsoryInsurance +
      userProfile.collateralInsurance +
      userProfile.personalInsurance) /
    12
  ).toFixed(2);
  // calculate earnings for tax calculation
  if (userProfile.isSubmitExpenses) {
    totalEarningsForTaxCalculation =
      totalWoltAfterCommission +
      totalCreditTipsAfterCommission -
      totalFuel -
      totalMaintenance -
      totalEquipment -
      totalOther;
  } else {
    totalEarningsForTaxCalculation =
      totalWoltAfterCommission + totalCreditTipsAfterCommission;
  }
  // calculate taxes
  // national insurance
  if (totalEarningsForTaxCalculation <= 6331) {
    totalNationalInsurance = totalEarningsForTaxCalculation * 0.0705;
  } else {
    var earningsA = 6331;
    var earningsB = totalEarningsForTaxCalculation - earningsA;
    totalNationalInsurance = earningsA * 0.0705 + earningsB * 0.196;
  }
  // income tax
  var currentIncomeTax = 0;
  var currentIncomeTaxA = 0;
  var currentIncomeTaxB = 0;
  var currentIncomeTaxC = 0;
  var currentIncomeTaxD = 0;
  if (totalEarningsForTaxCalculation <= 6290) {
    currentIncomeTax = totalEarningsForTaxCalculation * 0.1;
  } else {
    if (totalEarningsForTaxCalculation > 6290) {
      currentIncomeTaxA = 6290 * 0.1;
      var remainEarnings = totalEarningsForTaxCalculation - 6290;
      if (remainEarnings > 2740) {
        currentIncomeTaxB = 2740 * 0.14;
        remainEarnings -= 2740;
        if (remainEarnings > 5460) {
          currentIncomeTaxC = 5460 * 0.2;
          remainEarnings -= 5460;
          if (remainEarnings > 5650) {
            currentIncomeTaxD = 5650 * 0.31;
            remainEarnings -= 5650;
          } else {
            currentIncomeTaxD = remainEarnings * 0.31;
          }
        } else if (remainEarnings < 5460) {
          currentIncomeTaxC = remainEarnings * 0.2;
        }
      } else if (remainEarnings < 2740) {
        currentIncomeTaxB = remainEarnings * 0.14;
      }
      currentIncomeTax =
        currentIncomeTaxA +
        currentIncomeTaxB +
        currentIncomeTaxC +
        currentIncomeTaxD;
    }
  }
  if (currentIncomeTax - userTaxPoints > 0) {
    totalIncomeTax = currentIncomeTax - userTaxPoints;
  }
  // calculate net earnings
  netEarnings =
    totalWoltAfterCommission +
    totalCreditTipsAfterCommission +
    totalCashTips -
    totalNationalInsurance -
    totalIncomeTax -
    totalInsurancesPerMonth -
    totalFuel -
    totalMaintenance -
    totalEquipment -
    totalOther;
  // format time in seconds as number
  totalTimeAsDecimalNumber = formatTime(totalTimeInSeconds, true);
  // calculate horly wage
  netAvgHourlyWage = netEarnings / totalTimeAsDecimalNumber;
  return {
    totalAmountOfShifts,
    totalTimeInSeconds,
    grossEarnings,
    grossAvgHourlyWage,
    totalCommissionFee,
    totalNationalInsurance,
    totalIncomeTax,
    totalInsurancesPerMonth,
    totalFuel,
    totalMaintenance,
    totalEquipment,
    totalOther,
    totalWoltAfterCommission,
    totalCreditTipsAfterCommission,
    totalCashTips,
    netEarnings,
    netAvgHourlyWage,
  };
};
