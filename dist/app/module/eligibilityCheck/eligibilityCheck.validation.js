"use strict";
// import { z } from 'zod';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityValidationSchema = exports.eligibilitySchema = void 0;
// // ── ENUM DEFINITIONS ─────────────────────────────────────────────────────────
// const MainLoanType   = z.enum(['PERSONAL_LOAN','HOME_LOAN','CAR_LOAN','SME_LOAN','INSTANT_LOAN']);
// const Gender         = z.enum(['MALE','FEMALE','OTHER']);
// const Profession     = z.enum(['BUSINESS_OWNER','SALARIED']);
// const BusinessOwnerType = z.enum([
//   'PROPRIETOR','PARTNER','CORPORATION','LLC','COOPERATIVE','JOINT_VENTURE','FRANCHISE'
// ]);
// const VehicleType    = z.enum(['CAR_SEDAN','CAR_SUV','CAR_HATCHBACK','BIKE']);
// const ExistingLoanType = z.enum(['HOME_LOAN','PERSONAL_LOAN','CAR_LOAN','SME_LOAN','CREDIT_CARD']);
// const CardType       = z.enum(['CREDIT_CARD','DEBIT_CARD']);
// // ── SHARED SUBSCHEMAS ────────────────────────────────────────────────────────
// const ExistingLoan = z.object({
//   existingLoanType: ExistingLoanType,
//   emiAmountBDT:     z.number().nonnegative(),
//   interestRate:     z.number().nonnegative(),
// });
// // ── MAIN SCHEMA ───────────────────────────────────────────────────────────────
// export const eligibilitySchema = z
//   .object({
//     loanType:           MainLoanType,
//     gender:             Gender,
//     dateOfBirth:        z.coerce.date().max(new Date(), { message: 'dateOfBirth must be in the past' }),
//     profession:         Profession,
//     businessOwnerType:  BusinessOwnerType.optional(),
//     businessType:       z.string().optional(),
//     sharePortion:       z.number().int().min(0).max(100).optional(),
//     tradeLicenseAge:    z.number().int().nonnegative().optional(),
//     vehicleType:        VehicleType.optional(),
//     expectedLoanTenure: z.number().int().min(1),
//     monthlyIncome:      z.number().nonnegative(),
//     jobLocation:        z.string(),
//     haveAnyRentalIncome: z.boolean(),
//     selectArea:          z.string().optional(),
//     rentalIncome:        z.number().nonnegative().optional(),
//     haveAnyLoan:         z.boolean(),
//     existingLoans:       z.array(ExistingLoan).optional(),
//     haveAnyCreditCard:   z.boolean(),
//     numberOfCard:        z.number().int().min(1).optional(),
//     cardType:            CardType.optional(),
//     cardLimitBDT:        z.number().nonnegative().optional(),
//     secondaryApplicant:  z.boolean().optional(),
//     name:                z.string().min(1),
//     email:               z.string().email(),
//     phone:               z.string().regex(/^[0-9]{10,15}$/, 'phone must be 10–15 digits'),
//   })
//   .superRefine((data, ctx) => {
//     // BUSINESS fields only if BUSINESS_OWNER
//     if (data.profession === 'BUSINESS_OWNER') {
//       ;['businessOwnerType','businessType','sharePortion','tradeLicenseAge'].forEach((k) => {
//         if (data[k as keyof typeof data] === undefined) {
//           ctx.addIssue({
//             code: 'custom',
//             message: `${k} is required when profession is BUSINESS_OWNER`,
//             path: [k],
//           });
//         }
//       });
//     } else {
//       ;['businessOwnerType','businessType','sharePortion','tradeLicenseAge'].forEach((k) => {
//         if (data[k as keyof typeof data] !== undefined) {
//           ctx.addIssue({
//             code: 'custom',
//             message: `${k} must not be set when profession is SALARIED`,
//             path: [k],
//           });
//         }
//       });
//     }
//     // RENTAL-INCOME fields
//     if (data.haveAnyRentalIncome) {
//       if (!data.selectArea) {
//         ctx.addIssue({ code: 'custom', message: 'selectArea is required if haveAnyRentalIncome is true', path: ['selectArea'] });
//       }
//       if (data.rentalIncome === undefined) {
//         ctx.addIssue({ code: 'custom', message: 'rentalIncome is required if haveAnyRentalIncome is true', path: ['rentalIncome'] });
//       }
//     } else {
//       if (data.selectArea !== undefined) {
//         ctx.addIssue({ code: 'custom', message: 'selectArea must be omitted if haveAnyRentalIncome is false', path: ['selectArea'] });
//       }
//       if (data.rentalIncome !== undefined) {
//         ctx.addIssue({ code: 'custom', message: 'rentalIncome must be omitted if haveAnyRentalIncome is false', path: ['rentalIncome'] });
//       }
//     }
//     // EXISTING-LOANS fields
//     if (data.haveAnyLoan) {
//       if (!Array.isArray(data.existingLoans) || data.existingLoans.length === 0) {
//         ctx.addIssue({ code: 'custom', message: 'existingLoans must be a non-empty array if haveAnyLoan is true', path: ['existingLoans'] });
//       }
//     } else {
//       if (data.existingLoans !== undefined) {
//         ctx.addIssue({ code: 'custom', message: 'existingLoans must be omitted if haveAnyLoan is false', path: ['existingLoans'] });
//       }
//     }
//     // CREDIT-CARD fields
//     if (data.haveAnyCreditCard) {
//       ;['numberOfCard','cardType','cardLimitBDT'].forEach((k) => {
//         if (data[k as keyof typeof data] === undefined) {
//           ctx.addIssue({ code: 'custom', message: `${k} is required if haveAnyCreditCard is true`, path: [k] });
//         }  
//       });
//     } else {
//       ;['numberOfCard','cardType','cardLimitBDT'].forEach((k) => {
//         if (data[k as keyof typeof data] !== undefined) {
//           ctx.addIssue({ code: 'custom', message: `${k} must be omitted if haveAnyCreditCard is false`, path: [k] });
//         }
//       });
//     }
//     // if (data.loanType == 'INSTANT_LOAN') {
//     //   console.log(data.expectedLoanTenure, 'expectedLoanTenure')
//     //   if (data.expectedLoanTenure < 1 || data.expectedLoanTenure > 3) {
//     //     ctx.addIssue({
//     //       code: 'custom',
//     //       message: 'expectedLoanTenure must be between 1 and 3 months for INSTANT_LOAN',
//     // })}}
//   });
//  export const eligibilityValidationSchema = {
//     eligibilitySchema
//  }
const zod_1 = require("zod");
// ── ENUM DEFINITIONS ─────────────────────────────────────────────────────────
const MainLoanType = zod_1.z.enum(['PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN']);
const Gender = zod_1.z.enum(['MALE', 'FEMALE', 'OTHER']);
const Profession = zod_1.z.enum(['BUSINESS_OWNER', 'SALARIED', 'SELF_EMPLOYED']);
const BusinessOwnerType = zod_1.z.enum(['PROPRIETORSHIP', 'PARTNERSHIP', 'PUBLIC_LIMITED_COMPANY']);
const VehicleType = zod_1.z.enum(['CAR_SEDAN', 'CAR_SUV', 'CAR_HATCHBACK', 'BIKE']);
const ExistingLoanType = zod_1.z.enum(['HOME_LOAN', 'PERSONAL_LOAN', 'CAR_LOAN', 'SME_LOAN', 'CREDIT_CARD', 'OTHER']);
const CardType = zod_1.z.enum(['CREDIT_CARD', 'DEBIT_CARD']);
// ── SHARED SUBSCHEMAS ────────────────────────────────────────────────────────
const ExistingLoan = zod_1.z.object({
    existingLoanType: ExistingLoanType,
    emiAmountBDT: zod_1.z.number().int().nonnegative(),
    interestRate: zod_1.z.number().nonnegative().max(100, 'Interest rate must be <= 100%'),
});
// ── MAIN SCHEMA ───────────────────────────────────────────────────────────────
exports.eligibilitySchema = zod_1.z
    .object({
    loanType: MainLoanType,
    gender: Gender,
    dateOfBirth: zod_1.z.coerce.date().max(new Date(), { message: 'Date of birth must be in the past' }),
    profession: Profession,
    businessOwnerType: BusinessOwnerType.optional(),
    businessType: zod_1.z.string().optional(),
    sharePortion: zod_1.z.number().int().min(0).max(100).optional(),
    tradeLicenseAge: zod_1.z.number().int().nonnegative().optional(),
    vehicleType: VehicleType.optional(),
    expectedLoanTenure: zod_1.z.number().int().min(1),
    monthlyIncome: zod_1.z.number().int().nonnegative(),
    jobLocation: zod_1.z.string(),
    haveAnyRentalIncome: zod_1.z.boolean(),
    selectArea: zod_1.z.string().optional(),
    rentalIncome: zod_1.z.number().int().nonnegative().optional(),
    haveAnyLoan: zod_1.z.boolean(),
    existingLoans: zod_1.z.array(ExistingLoan).optional(),
    haveAnyCreditCard: zod_1.z.boolean(),
    numberOfCard: zod_1.z.number().int().min(1).optional(),
    cardType: CardType.optional(),
    cardLimitBDT: zod_1.z.number().int().nonnegative().optional(),
    secondaryApplicant: zod_1.z.boolean().optional(),
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().regex(/^[0-9]{10,15}$/, 'Phone must be 10–15 digits'),
})
    .superRefine((data, ctx) => {
    // BUSINESS fields only if BUSINESS_OWNER
    if (data.profession === 'BUSINESS_OWNER') {
        ;
        ['businessOwnerType', 'businessType', 'sharePortion', 'tradeLicenseAge'].forEach((k) => {
            if (data[k] === undefined) {
                ctx.addIssue({
                    code: 'custom',
                    message: `${k} is required when profession is BUSINESS_OWNER`,
                    path: [k],
                });
            }
        });
    }
    else {
        ;
        ['businessOwnerType', 'businessType', 'sharePortion', 'tradeLicenseAge'].forEach((k) => {
            if (data[k] !== undefined) {
                ctx.addIssue({
                    code: 'custom',
                    message: `${k} must not be set when profession is not BUSINESS_OWNER`,
                    path: [k],
                });
            }
        });
    }
    // RENTAL-INCOME fields
    if (data.haveAnyRentalIncome) {
        if (!data.selectArea) {
            ctx.addIssue({
                code: 'custom',
                message: 'selectArea is required if haveAnyRentalIncome is true',
                path: ['selectArea'],
            });
        }
        if (data.rentalIncome === undefined) {
            ctx.addIssue({
                code: 'custom',
                message: 'rentalIncome is required if haveAnyRentalIncome is true',
                path: ['rentalIncome'],
            });
        }
    }
    else {
        if (data.selectArea !== undefined) {
            ctx.addIssue({
                code: 'custom',
                message: 'selectArea must be omitted if haveAnyRentalIncome is false',
                path: ['selectArea'],
            });
        }
        if (data.rentalIncome !== undefined) {
            ctx.addIssue({
                code: 'custom',
                message: 'rentalIncome must be omitted if haveAnyRentalIncome is false',
                path: ['rentalIncome'],
            });
        }
    }
    // EXISTING-LOANS fields
    if (data.haveAnyLoan) {
        if (!Array.isArray(data.existingLoans) || data.existingLoans.length === 0) {
            ctx.addIssue({
                code: 'custom',
                message: 'existingLoans must be a non-empty array if haveAnyLoan is true',
                path: ['existingLoans'],
            });
        }
    }
    else {
        if (data.existingLoans !== undefined) {
            ctx.addIssue({
                code: 'custom',
                message: 'existingLoans must be omitted if haveAnyLoan is false',
                path: ['existingLoans'],
            });
        }
    }
    // CREDIT-CARD fields
    if (data.haveAnyCreditCard) {
        ;
        ['numberOfCard', 'cardType', 'cardLimitBDT'].forEach((k) => {
            if (data[k] === undefined) {
                ctx.addIssue({
                    code: 'custom',
                    message: `${k} is required if haveAnyCreditCard is true`,
                    path: [k],
                });
            }
        });
    }
    else {
        ;
        ['numberOfCard', 'cardType', 'cardLimitBDT'].forEach((k) => {
            if (data[k] !== undefined) {
                ctx.addIssue({
                    code: 'custom',
                    message: `${k} must be omitted if haveAnyCreditCard is false`,
                    path: [k],
                });
            }
        });
    }
    // INSTANT_LOAN: expectedLoanTenure restriction
    if (data.loanType === 'INSTANT_LOAN') {
        if (data.expectedLoanTenure < 1 || data.expectedLoanTenure > 3) {
            ctx.addIssue({
                code: 'custom',
                path: ['expectedLoanTenure'],
                message: 'expectedLoanTenure must be between 1 and 3 months for INSTANT_LOAN',
            });
        }
    }
});
exports.EligibilityValidationSchema = {
    eligibilitySchema: exports.eligibilitySchema,
};
