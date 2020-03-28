const todaysDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${day}-${month}-${date.getFullYear()}`;
};

const alterDailySummary = (dailySummary, { profit, expenditure, income }) => {
  const dsIndex = dailySummary.findIndex(
    ds => ds.dailyCreatedAt === todaysDate()
  );
  const dailySummaryObj = {
    dailyCreatedAt: todaysDate(),
    profit,
    expenditure,
    income
  };

  if (dsIndex === -1) dailySummary.push(dailySummaryObj);
  else dailySummary[dsIndex] = dailySummaryObj;

  return dailySummary;
};

const alterMYSummary = (
  summary,
  mode,
  dailySummary,
  { profit, income, expenditure }
) => {
  const sIndex = summary.findIndex(s => {
    if (mode === "month") {
      const [, dbMonth, dbYear] = s.monthlyCreatedAt.split("-");
      const [, todayMonth, todayYear] = todaysDate().split("-");
      return dbMonth === todayMonth && dbYear === todayYear;
    }
    return s.year === parseInt(todaysDate().split("-")[2]);
  });

  if (sIndex === -1) {
    const summaryData = {
      profit,
      expenditure,
      income,
      lastUpdated: todaysDate()
    };
    if (mode === "month") {
      summaryData.monthlyCreatedAt = todaysDate();
    } else if (mode === "year") {
      summaryData.year = parseInt(todaysDate().split("-")[2]);
    }
    summary.push(summaryData);
  } else {
    const { lastUpdated } = summary[sIndex];
    if (lastUpdated === todaysDate()) {
      const { profit: p, income: i, expenditure: e } = dailySummary.find(
        d => d.dailyCreatedAt === todaysDate()
      );
      summary[sIndex].profit = summary[sIndex].profit - p + profit;
      summary[sIndex].income = summary[sIndex].income - i + income;
      summary[sIndex].expenditure =
        summary[sIndex].expenditure - e + expenditure;
    } else {
      summary[sIndex].profit += profit;
      summary[sIndex].income += income;
      summary[sIndex].expenditure += expenditure;
    }
    summary[sIndex].lastUpdated = todaysDate();
  }
  return summary;
};

module.exports = {
  todaysDate,
  alterDailySummary,
  alterMYSummary
};
