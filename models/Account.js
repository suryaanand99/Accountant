const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const accountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    dailySummary: [
      {
        dailyCreatedAt: {
          type: String,
          required: true,
          unique: true,
          trim: true
        },
        profit: {
          type: Number,
          required: true
        },
        expenditure: {
          type: Number,
          required: true
        },
        income: {
          type: Number,
          required: true
        }
      }
    ],
    monthlySummary: [
      {
        monthlyCreatedAt: {
          type: String,
          required: true,
          trim: true
        },
        lastUpdated: {
          type: String,
          required: true
        },
        profit: {
          type: Number,
          required: true
        },
        expenditure: {
          type: Number,
          required: true
        },
        income: {
          type: Number,
          required: true
        }
      }
    ],
    yearlySummary: [
      {
        year: {
          type: Number,
          required: true
        },
        lastUpdated: {
          type: String,
          required: true
        },
        profit: {
          type: Number,
          required: true
        },
        expenditure: {
          type: Number,
          required: true
        },
        income: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

accountSchema.methods.toJSON = function() {
  const account = this.toObject();
  delete account.__v;
  return account;
};

const Account = model("Account", accountSchema);
module.exports = Account;
