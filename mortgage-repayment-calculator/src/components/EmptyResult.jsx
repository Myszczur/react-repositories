import calcResult from "../assets/images/illustration-empty.svg";

function EmptyResult() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={calcResult} alt="calc-result" className="p-2" />
      <p className="text-slate-200 font-bold text-2xl font-sans">
        Result shown here
      </p>
      <p className="text-slate-400 text-center text-sm font-sans">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

export default EmptyResult;
