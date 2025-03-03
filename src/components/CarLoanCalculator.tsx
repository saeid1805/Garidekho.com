import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CarLoanCalculatorProps {
  defaultLoanAmount?: number;
  defaultInterestRate?: number;
  defaultLoanTerm?: number;
  defaultDownPayment?: number;
  onCalculate?: (results: LoanCalculationResult) => void;
}

interface LoanCalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

const CarLoanCalculator = ({
  defaultLoanAmount = 30000,
  defaultInterestRate = 5.5,
  defaultLoanTerm = 60,
  defaultDownPayment = 5000,
  onCalculate = () => {},
}: CarLoanCalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [loanTerm, setLoanTerm] = useState(defaultLoanTerm);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    if (monthlyRate === 0) {
      const calculatedMonthlyPayment = principal / numberOfPayments;
      setMonthlyPayment(calculatedMonthlyPayment);
      setTotalInterest(0);
      setTotalPayment(principal);
    } else {
      const calculatedMonthlyPayment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const calculatedTotalPayment =
        calculatedMonthlyPayment * numberOfPayments;
      const calculatedTotalInterest = calculatedTotalPayment - principal;

      setMonthlyPayment(calculatedMonthlyPayment);
      setTotalInterest(calculatedTotalInterest);
      setTotalPayment(calculatedTotalPayment);
    }

    onCalculate({
      monthlyPayment,
      totalInterest,
      totalPayment,
      loanAmount,
      interestRate,
      loanTerm,
      downPayment,
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const handleLoanAmountChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0]);
  };

  const handleLoanTermChange = (value: number[]) => {
    setLoanTerm(value[0]);
  };

  const handleDownPaymentChange = (value: number[]) => {
    setDownPayment(value[0]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-blue-800">
          <Calculator className="mr-2 h-5 w-5" />
          Car Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Car Price</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-24 h-8 text-right"
                />
              </div>
            </div>
            <Slider
              value={[loanAmount]}
              min={5000}
              max={100000}
              step={1000}
              onValueChange={handleLoanAmountChange}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatCurrency(5000)}</span>
              <span>{formatCurrency(100000)}</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <label className="text-sm font-medium">Down Payment</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-60 text-xs">
                        A higher down payment reduces your loan amount and
                        monthly payments.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-24 h-8 text-right"
                />
              </div>
            </div>
            <Slider
              value={[downPayment]}
              min={0}
              max={loanAmount / 2}
              step={500}
              onValueChange={handleDownPaymentChange}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatCurrency(0)}</span>
              <span>{formatCurrency(loanAmount / 2)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-24 h-8 text-right"
                  step="0.1"
                />
              </div>
            </div>
            <Slider
              value={[interestRate]}
              min={1}
              max={20}
              step={0.1}
              onValueChange={handleInterestRateChange}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Loan Term (months)</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-24 h-8 text-right"
                />
              </div>
            </div>
            <Slider
              value={[loanTerm]}
              min={12}
              max={84}
              step={12}
              onValueChange={handleLoanTermChange}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>12 mo</span>
              <span>84 mo</span>
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <div className="text-xs text-gray-600">Monthly Payment</div>
                <div className="text-xl font-bold text-blue-800">
                  {formatCurrency(monthlyPayment)}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-xs text-gray-600">Total Interest</div>
                <div className="text-lg font-semibold text-gray-800">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply for Financing
              </Button>
              <p className="mt-2 text-xs text-gray-500">
                This is an estimate. Actual rates and payments may vary.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarLoanCalculator;
