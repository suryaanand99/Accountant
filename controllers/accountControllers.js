const Account = require("../models/Account");
const { todaysDate, alterDailySummary, alterMYSummary } = require("../utils");

module.exports = {
  createAccount: async (req, res) => {
    const user = req.user;
    try {
      let account = await Account.findOne({ user: user._id });
      if (!account) account = await Account.create({ user: user._id });
      res.json({ statusCode: 200, account });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },

  addTodaysDetails: async (req, res) => {
    const user = req.user;
    try {
      const { profit, expenditure, income } = req.body;
      // Testing data
      if (
        profit === undefined ||
        expenditure === undefined ||
        income === undefined
      )
        return res
          .status(400)
          .json({ statusCode: 400, message: "Details missing" });
      const account = await Account.findOne({ user: user._id });

      // Destructuring monthly, yearly, daily.
      let { dailySummary, monthlySummary, yearlySummary } = account;

      // Monthly summary
      monthlySummary = [
        ...alterMYSummary(monthlySummary, "month", dailySummary, {
          profit,
          income,
          expenditure
        })
      ];
      // Yearly summary
      yearlySummary = [
        ...alterMYSummary(yearlySummary, "year", dailySummary, {
          profit,
          income,
          expenditure
        })
      ];
      // Daily summary
      dailySummary = [
        ...alterDailySummary(dailySummary, { profit, income, expenditure })
      ];

      await account.save();
      return res.status(202).json({ statusCode: 202, account });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  }
};
