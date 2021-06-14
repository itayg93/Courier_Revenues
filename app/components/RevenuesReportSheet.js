import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { List, Divider } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { formatTime } from "../util";

export const RevenuesReportSheet = ({ data }) => {
  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [taxesExpanded, setTaxesExpanded] = useState(true);
  const [expensesExpanded, setExpensesExpanded] = useState(true);
  const [earningsExpanded, setEarningsExpanded] = useState(true);
  const [netExpanded, setNetExpanded] = useState(true);

  return (
    <View style={styles.container}>
      {/** shifts and time */}
      <List.Accordion
        style={styles.accordion}
        title="General"
        expanded={generalExpanded}
        onPress={() => setGeneralExpanded(!generalExpanded)}
      >
        <View style={styles.rowWrapper}>
          <Text>Shifts:</Text>
          <Text>{data.totalAmountOfShifts}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Time:</Text>
          <Text>{formatTime(data.totalTimeInSeconds)}</Text>
        </View>
      </List.Accordion>
      {/** taxes */}
      <List.Accordion
        style={styles.accordion}
        title="Taxes"
        expanded={taxesExpanded}
        onPress={() => setTaxesExpanded(!taxesExpanded)}
      >
        <View style={styles.rowWrapper}>
          <Text>Company Fee:</Text>
          <Text>{data.totalCommissionFee.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>National insurance:</Text>
          <Text>{data.totalNationalInsurance.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Income tax:</Text>
          <Text>{data.totalIncomeTax.toFixed(2) + " ₪"}</Text>
        </View>
      </List.Accordion>
      {/** expenses */}
      <List.Accordion
        style={styles.accordion}
        title="Expenses"
        expanded={expensesExpanded}
        onPress={() => setExpensesExpanded(!expensesExpanded)}
      >
        <View style={styles.rowWrapper}>
          <Text>Monthly insurances:</Text>
          <Text>{data.totalInsurancesPerMonth + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Fuel:</Text>
          <Text>{data.totalFuel.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Maintenance:</Text>
          <Text>{data.totalMaintenance.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Equipment:</Text>
          <Text>{data.totalEquipment.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Other:</Text>
          <Text>{data.totalOther.toFixed(2) + " ₪"}</Text>
        </View>
      </List.Accordion>
      {/** earnings */}
      <List.Accordion
        style={styles.accordion}
        title="Earnings"
        expanded={earningsExpanded}
        onPress={() => setEarningsExpanded(!earningsExpanded)}
      >
        <View style={styles.rowWrapper}>
          <Text>Wolt:</Text>
          <Text>{data.totalWoltAfterCommission.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Credit tips:</Text>
          <Text>{data.totalCreditTipsAfterCommission.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Cash tips:</Text>
          <Text>{data.totalCashTips.toFixed(2) + " ₪"}</Text>
        </View>
      </List.Accordion>
      {/** net */}
      <List.Accordion
        style={styles.accordion}
        title="Net"
        expanded={netExpanded}
        onPress={() => setNetExpanded(!netExpanded)}
      >
        <View style={styles.rowWrapper}>
          <Text>Net earnings:</Text>
          <Text>{data.netEarnings.toFixed(2) + " ₪"}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.rowWrapper}>
          <Text>Hourly wage:</Text>
          <Text>{data.avgHourlyWage.toFixed(2) + " ₪"}</Text>
        </View>
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
    marginVertical: AppSpacing.m,
  },
  accordion: {
    backgroundColor: AppColors.white,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: AppSpacing.s,
  },
  title: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
  },
  text: {
    fontSize: AppSizes.m,
  },
});
