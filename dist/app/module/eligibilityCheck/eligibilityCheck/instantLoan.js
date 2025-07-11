"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantLoan = void 0;
const calculateEMI_1 = require("../utils/calculateEMI");
const app_1 = require("../../../../app");
const AppError_1 = __importDefault(require("../../../error/AppError"));
const instantLoan = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tenure = Number(payload.expectedLoanTenure) } = query;
    const eligibleLoan = 15000;
    try {
        const [loans] = yield app_1.prisma.$transaction([
            app_1.prisma.instantLoan.findMany({
                include: {
                    EligibilityInstantLoan: true,
                    FeaturesInstantLoan: true,
                    FeesChargesInstantLoan: true,
                },
            }),
        ]);
        if (!loans.length) {
            throw new AppError_1.default(404, "No loans found for the given criteria.");
        }
        let adjustedMonthlyIncome = Math.min(payload.monthlyIncome || 0, 50000);
        if (payload.haveAnyRentalIncome && payload.rentalIncome) {
            adjustedMonthlyIncome += payload.rentalIncome;
        }
        if (payload.haveAnyLoan && ((_a = payload.existingLoans) === null || _a === void 0 ? void 0 : _a.length)) {
            const totalEMI = payload.existingLoans.reduce((sum, loan) => sum + (loan.emiAmountBDT || 0), 0);
            adjustedMonthlyIncome -= totalEMI;
        }
        if (payload.haveAnyCreditCard && payload.numberOfCard) {
            adjustedMonthlyIncome -= payload.numberOfCard * 2000;
        }
        const suggestedLoans = loans.map((loan) => {
            const interest = Number(loan.interestRate) || 0;
            const duration = Number(tenure) || 0;
            const monthlyEMI = (0, calculateEMI_1.calculateEMI)(eligibleLoan, interest, duration);
            const totalRepayment = monthlyEMI * duration;
            return {
                id: loan.id,
                bankName: loan.bankName,
                amount: eligibleLoan.toFixed(2),
                periodMonths: payload.tenure,
                loanType: loan.loanType,
                monthlyEMI: monthlyEMI.toFixed(2),
                totalRepayment: totalRepayment.toFixed(2),
                expectedLoanTenure: tenure,
                coverImage: loan.coverImage,
                interestRate: interest,
                processingFee: loan.processingFee,
                eligibleLoan: eligibleLoan,
                features: loan.FeaturesInstantLoan,
                feesCharges: loan.FeesChargesInstantLoan,
                eligibility: loan.EligibilityInstantLoan,
            };
        });
        console.log(suggestedLoans);
        return suggestedLoans;
    }
    catch (error) {
        console.error("Error in instantLoan function:", error);
        throw error;
    }
});
exports.instantLoan = instantLoan;
