function Result({ total, monthly }) {
  return (
    <div className="flex flex-col gap-4 mb-10 ">
      <p className="text-slate-200 text-2xl font-sans">Your results</p>
      <p className="text-slate-400 text-sm font-sans">
        Your results are shown below based on the information you provided. To
        adjust the resuls, edit the form and click "calculate repayments" again.
      </p>
      <div className="flex flex-col bg-gray-900 border-t-4 border-[#bcbe34] mt-4 rounded-lg">
        <div className="flex flex-col gap-2 pl-5 pb-1 pt-5">
          <p className="text-slate-400 font-sans">Your monthly repayments</p>
          <span className="text-5xl text-[#c1c435] font-bold font-sans">
            £{monthly}
          </span>
        </div>
        <div className="border-t border-slate-700 m-5" />
        <div className="flex flex-col pl-5 pb-5 pt-1">
          <p className="text-slate-400 font-sans">
            Total you'll repay over the term
          </p>
          <p className="text-2xl text-slate-200 font-bold font-sans">
            £{total}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Result;
