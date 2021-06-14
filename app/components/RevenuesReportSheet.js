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
      <View style={styles.accordionContainer}>
        {/** shifts and time */}
        <List.Accordion
          style={styles.accordion}
          title="General"
          titleStyle={styles.accordionTitle}
          expanded={generalExpanded}
          onPress={() => setGeneralExpanded(!generalExpanded)}
        >
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Shifts:</Text>
            <Text style={styles.data}>{data.totalAmountOfShifts}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Time:</Text>
            <Text style={styles.data}>
              {formatTime(data.totalTimeInSeconds)}
            </Text>
          </View>
        </List.Accordion>
      </View>
      {/** taxes */}
      <View style={styles.accordionContainer}>
        <List.Accordion
          style={styles.accordion}
          title="Taxes"
          titleStyle={styles.accordionTitle}
          expanded={taxesExpanded}
          onPress={() => setTaxesExpanded(!taxesExpanded)}
        >
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Company Fee:</Text>
            <Text style={styles.data}>
              {data.totalCommissionFee.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>National insurance:</Text>
            <Text style={styles.data}>
              {data.totalNationalInsurance.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Income tax:</Text>
            <Text style={styles.data}>
              {data.totalIncomeTax.toFixed(2) + " ₪"}
            </Text>
          </View>
        </List.Accordion>
      </View>
      {/** expenses */}
      <View style={styles.accordionContainer}>
        <List.Accordion
          style={styles.accordion}
          title="Expenses"
          titleStyle={styles.accordionTitle}
          expanded={expensesExpanded}
          onPress={() => setExpensesExpanded(!expensesExpanded)}
        >
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Monthly insurances:</Text>
            <Text style={styles.data}>
              {data.totalInsurancesPerMonth + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Fuel:</Text>
            <Text style={styles.data}>{data.totalFuel.toFixed(2) + " ₪"}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Maintenance:</Text>
            <Text style={styles.data}>
              {data.totalMaintenance.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Equipment:</Text>
            <Text style={styles.data}>
              {data.totalEquipment.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Other:</Text>
            <Text style={styles.data}>{data.totalOther.toFixed(2) + " ₪"}</Text>
          </View>
        </List.Accordion>
      </View>
      {/** earnings */}
      <View style={styles.accordionContainer}>
        <List.Accordion
          style={styles.accordion}
          title="Earnings"
          titleStyle={styles.accordionTitle}
          expanded={earningsExpanded}
          onPress={() => setEarningsExpanded(!earningsExpanded)}
        >
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Wolt:</Text>
            <Text style={styles.data}>
              {data.totalWoltAfterCommission.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Credit tips:</Text>
            <Text style={styles.data}>
              {data.totalCreditTipsAfterCommission.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Cash tips:</Text>
            <Text style={styles.data}>
              {data.totalCashTips.toFixed(2) + " ₪"}
            </Text>
          </View>
        </List.Accordion>
      </View>
      {/** net */}
      <View style={styles.accordionContainer}>
        <List.Accordion
          style={styles.accordion}
          title="Net"
          titleStyle={styles.accordionTitle}
          expanded={netExpanded}
          onPress={() => setNetExpanded(!netExpanded)}
        >
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Net earnings:</Text>
            <Text style={styles.data}>
              {data.netEarnings.toFixed(2) + " ₪"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.rowWrapper}>
            <Text style={styles.title}>Hourly wage:</Text>
            <Text style={styles.data}>
              {data.avgHourlyWage.toFixed(2) + " ₪"}
            </Text>
          </View>
        </List.Accordion>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: AppSpacing.m,
    borderRadius: AppSpacing.l,
    marginTop: AppSpacing.m,
  },
  accordionContainer: {
    backgroundColor: AppColors.light,
    padding: AppSpacing.m,
    borderRadius: AppSpacing.l,
    marginBottom: AppSpacing.s,
  },
  accordion: {
    backgroundColor: AppColors.light,
  },
  accordionTitle: {
    color: AppColors.primary,
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
  data: {
    fontSize: AppSizes.m,
  },
});
