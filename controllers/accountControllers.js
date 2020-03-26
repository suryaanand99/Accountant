const Account = require("../models/Account");

const todaysDate = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${day}-${month}-${new Date().getFullYear()}`;
};

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
      console.log(profit, expenditure, income, typeof expenditure);
      if (
        profit === undefined ||
        expenditure === undefined ||
        income === undefined
      )
        return res
          .status(400)
          .json({ statusCode: 400, message: "Details missing" });
      const account = await Account.findOne({ user: user._id });
      const dsIndex = account.dailySummary.findIndex(
        ds => ds.createdAt === todaysDate()
      );

      const dailySummary = {
        createdAt: todaysDate(),
        profit,
        expenditure,
        income
      };

      if (dsIndex === -1) account.dailySummary.push(dailySummary);
      else account.dailySummary[dsIndex] = dailySummary;
      await account.save();
      return res.status(202).json({ statusCode: 202, account });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  }
};
