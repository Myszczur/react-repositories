import { useState } from "react";
import calculatorImg from "../assets/images/icon-calculator.svg";
import EmptyResult from "../components/EmptyResult";
import Result from "../components/Result";

function MortgageCalculator() {
  const [formData, setFormData] = useState({
    amount: "",
    years: "",
    interestRate: "",
    mortgageType: "",
  });

  const [total, setTotal] = useState(0);
  const [monthlyResult, setMonthlyResult] = useState(0);
  const [errors, setErrors] = useState({});

  const handleMortgageTypeChange = (e) => {
    setFormData({
      ...formData,
      mortgageType: e.target.value,
    });
  };

  const validateInputs = (name, value) => {
    if (name === "amount" && value === "") {
      return "This field is required!";
    }
    if (name === "amount" && value === 0) {
      return "Mortgage Amount cannot be a zero!";
    }

    if (name === "years" && value === "") {
      return "This field is required!";
    }
    if (name === "years" && value === 0) {
      return "MortgageTerm cannot be a zero!";
    }

    if (name === "interestRate" && value === "") {
      return "This field is required!";
    }
    if (name === "interestRate" && value === 0) {
      return "Interest Rate cannot be a zero!";
    }

    if (name === "mortgageType" && value === "") {
      return "This field is required!";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    const errorValidate = validateInputs(name, numericValue);
    setErrors((prev) => ({ ...prev, [name]: errorValidate }));

    setFormData({
      ...formData,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    });
  };

  const handleClearAll = () => {
    setFormData({
      amount: "",
      years: "",
      interestRate: "",
      selectedMortgageType: "",
    });
    setMonthlyResult(0);
    setTotal(0);
    setErrors({});
  };

  const calculateRepayment = () => {
    const { amount, years, interestRate } = formData;

    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = years * 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;

    return amount * (numerator / denominator);
  };

  const calculateInterestOnly = () => {
    const { amount, years, interestRate } = formData;

    const monthlyInterest = (amount * interestRate) / 100 / 12;
    const totalInterest = monthlyInterest * years * 12;

    return {
      monthly: monthlyResult,
      total: amount + totalInterest,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateInputs(key, formData[key]);
    });

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    if (formData.mortgageType === "repayment") {
      const payment = calculateRepayment();

      setMonthlyResult(payment.toFixed(2));
      setTotal((payment * formData.years).toFixed(2));
    } else {
      const { monyhly, total: totalInterest } = calculateInterestOnly();

      setMonthlyResult(monyhly);
      setTotal(totalInterest);
    }
  };

  return (
    <div className="min-h-screen items-center justify-center place-content-center">
      <div className="flex rounded-[20px] drop-shadow-md bg-slate-100">
        <div className="p-8 w-[420px] space-y-5">
          <header className="flex items-center justify-between">
            <p className="text-[20px] text-slate-800 font-bold font-sans">
              Mortgage Calculator
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="underline underline-offset-1 text-[14px] text-slate-400 cursor-pointer font-sans"
            >
              Clear All
            </button>
          </header>
          <form onSubmit={handleSubmit} className="space-y-4">
            <section>
              <label className="block text-xs text-slate-400 pb-2 font-sans">
                Mortgage Amount
              </label>
              <div className="border flex gap-2 items-center hover:shadow-md duration-100 border-gray-400 hover:border-[#d7da2f] group delay-50 rounded-[4px]">
                <span className="flex items-center justify-center rounded-s-[3px] group-hover:rounded-s-[1px] bg-sky-200 group-hover:bg-[#d7da2f] duration-100 delay-50 px-3 py-1 text-slate-500 font-sans">
                  £
                </span>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="focus:outline-none cursor-pointer font-bold w-full pl-3"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </section>

            <section className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-slate-400 mb-2 font-sans">
                  Mortgage Term
                </label>
                <div className="border flex gap-2 items-center hover:shadow-md duration-100 border-gray-400 hover:border-[#d7da2f] group delay-50 rounded-[4px]">
                  <input
                    type="number"
                    name="years"
                    value={formData.years}
                    onChange={handleInputChange}
                    className="focus:outline-none cursor-pointer font-bold pl-3 w-full"
                  />
                  <span className="flex items-center justify-center rounded-s-[3px] group-hover:rounded-s-[1px] bg-sky-200 group-hover:bg-[#d7da2f] duration-100 delay-50 px-3 py-1 text-slate-500 font-sans">
                    years
                  </span>
                </div>
                {errors.years && (
                  <p className="text-red-500 text-sm mt-1">{errors.years}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-400 mb-2 font-sans">
                  Interest Rate
                </label>
                <div className="border flex gap-2 items-center hover:shadow-md duration-100 border-gray-400 hover:border-[#d7da2f] group delay-50 rounded-[4px]">
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="focus:outline-none cursor-pointer font-bold pl-4 w-full"
                  />
                  <span className="flex items-center justify-center rounded-s-[3px] group-hover:rounded-s-[1px] bg-sky-200 group-hover:bg-[#d7da2f] duration-100 delay-50 px-3 py-1 text-slate-500 font-sans">
                    %
                  </span>
                </div>
                {errors.interestRate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interestRate}
                  </p>
                )}
              </div>
            </section>

            <section>
              <p className="text-xs text-slate-400 mb-2 font-sans">
                Mortgage Type
              </p>
              <div className="space-y-2">
                <label className="flex items-center p-4 rounded-md shadow bg-white/40 hover:bg-white/20 cursor-pointer has-[:checked]:bg-[#f6f7dd] has-[:checked]:ring-[#eede82] has-[:checked]:ring-2">
                  <input
                    id="repayment"
                    value="repayment"
                    type="radio"
                    name="mortgageType"
                    className="h-5 w-5 checked:border-[#eede82]"
                    checked={formData.mortgageType === "repayment"}
                    onChange={handleMortgageTypeChange}
                  />
                  <span className="ml-3 text-[13px] font-bold font-sans">
                    Repayment
                  </span>
                </label>
                <label className="flex items-center p-4 rounded-md shadow bg-white/40 hover:bg-white/20 cursor-pointer has-[:checked]:bg-[#f6f7dd] has-[:checked]:ring-[#eede82] has-[:checked]:ring-2">
                  <input
                    id="interestOnly"
                    value="interestOnly"
                    type="radio"
                    name="mortgage-type"
                    className="h-5 w-5 checked:border-[#eede82]"
                    checked={formData.mortgageType === "interestOnly"}
                    onChange={handleMortgageTypeChange}
                  />
                  <span className="ml-3 text-[13px] font-bold font-sans">
                    Interest Only
                  </span>
                </label>
              </div>
              {errors.mortgageType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mortgageType}
                </p>
              )}
            </section>

            <button
              type="submit"
              className="flex items-center gap-2 bg-[#d7da2f] text-black py-3 px-6 rounded-full mt-10 hover:shadow-md duration-100 cursor-pointer font-bold font-sans"
            >
              <img src={calculatorImg} alt="calculator-icon" />
              Calculate Repayments
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center bg-gray-800 rounded-bl-[70px] rounded-r-[20px] p-8 w-[420px]">
          {total === 0 ? (
            <EmptyResult />
          ) : (
            <Result total={total} monthly={monthlyResult} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MortgageCalculator;
