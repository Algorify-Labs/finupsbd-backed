import { z } from 'zod';

// ── ENUM DEFINITIONS ─────────────────────────────────────────────────────────
const MainLoanType   = z.enum(['PERSONAL_LOAN','HOME_LOAN','CAR_LOAN','SME_LOAN','INSTANT_LOAN']);
const Gender         = z.enum(['MALE','FEMALE','OTHER']);
const Profession     = z.enum(['BUSINESS_OWNER','SALARIED']);
const BusinessOwnerType = z.enum([
  'PROPRIETOR','PARTNER','CORPORATION','LLC','COOPERATIVE','JOINT_VENTURE','FRANCHISE'
]);
const VehicleType    = z.enum(['CAR_SEDAN','CAR_SUV','CAR_HATCHBACK','BIKE']);
const ExistingLoanType = z.enum(['HOME_LOAN','PERSONAL_LOAN','CAR_LOAN','SME_LOAN','CREDIT_CARD']);
const CardType       = z.enum(['CREDIT_CARD','DEBIT_CARD']);

// ── SHARED SUBSCHEMAS ────────────────────────────────────────────────────────
const ExistingLoan = z.object({
  existingLoanType: ExistingLoanType,
  emiAmountBDT:     z.number().nonnegative(),
  interestRate:     z.number().nonnegative(),
});

// ── MAIN SCHEMA ───────────────────────────────────────────────────────────────
export const eligibilitySchema = z
  .object({
    loanType:           MainLoanType,
    gender:             Gender,
    dateOfBirth:        z.coerce.date().max(new Date(), { message: 'dateOfBirth must be in the past' }),

    profession:         Profession,
    businessOwnerType:  BusinessOwnerType.optional(),
    businessType:       z.string().optional(),
    sharePortion:       z.number().int().min(0).max(100).optional(),
    tradeLicenseAge:    z.number().int().nonnegative().optional(),

    vehicleType:        VehicleType.optional(),
    expectedLoanTenure: z.number().int().min(1),
    monthlyIncome:      z.number().nonnegative(),
    jobLocation:        z.string(),

    haveAnyRentalIncome: z.boolean(),
    selectArea:          z.string().optional(),
    rentalIncome:        z.number().nonnegative().optional(),

    haveAnyLoan:         z.boolean(),
    existingLoans:       z.array(ExistingLoan).optional(),

    haveAnyCreditCard:   z.boolean(),
    numberOfCard:        z.number().int().min(1).optional(),
    cardType:            CardType.optional(),
    cardLimitBDT:        z.number().nonnegative().optional(),

    secondaryApplicant:  z.boolean().optional(),

    name:                z.string().min(1),
    email:               z.string().email(),
    phone:               z.string().regex(/^[0-9]{10,15}$/, 'phone must be 10–15 digits'),
  })
  .superRefine((data, ctx) => {

    // BUSINESS fields only if BUSINESS_OWNER
    if (data.profession === 'BUSINESS_OWNER') {
      ;['businessOwnerType','businessType','sharePortion','tradeLicenseAge'].forEach((k) => {
        if (data[k as keyof typeof data] === undefined) {
          ctx.addIssue({
            code: 'custom',
            message: `${k} is required when profession is BUSINESS_OWNER`,
            path: [k],
          });
        }
      });
    } else {
      ;['businessOwnerType','businessType','sharePortion','tradeLicenseAge'].forEach((k) => {
        if (data[k as keyof typeof data] !== undefined) {
          ctx.addIssue({
            code: 'custom',
            message: `${k} must not be set when profession is SALARIED`,
            path: [k],
          });
        }
      });
    }

    // RENTAL-INCOME fields
    if (data.haveAnyRentalIncome) {
      if (!data.selectArea) {
        ctx.addIssue({ code: 'custom', message: 'selectArea is required if haveAnyRentalIncome is true', path: ['selectArea'] });
      }
      if (data.rentalIncome === undefined) {
        ctx.addIssue({ code: 'custom', message: 'rentalIncome is required if haveAnyRentalIncome is true', path: ['rentalIncome'] });
      }
    } else {
      if (data.selectArea !== undefined) {
        ctx.addIssue({ code: 'custom', message: 'selectArea must be omitted if haveAnyRentalIncome is false', path: ['selectArea'] });
      }
      if (data.rentalIncome !== undefined) {
        ctx.addIssue({ code: 'custom', message: 'rentalIncome must be omitted if haveAnyRentalIncome is false', path: ['rentalIncome'] });
      }
    }

    // EXISTING-LOANS fields
    if (data.haveAnyLoan) {
      if (!Array.isArray(data.existingLoans) || data.existingLoans.length === 0) {
        ctx.addIssue({ code: 'custom', message: 'existingLoans must be a non-empty array if haveAnyLoan is true', path: ['existingLoans'] });
      }
    } else {
      if (data.existingLoans !== undefined) {
        ctx.addIssue({ code: 'custom', message: 'existingLoans must be omitted if haveAnyLoan is false', path: ['existingLoans'] });
      }
    }

    // CREDIT-CARD fields
    if (data.haveAnyCreditCard) {
      ;['numberOfCard','cardType','cardLimitBDT'].forEach((k) => {
        if (data[k as keyof typeof data] === undefined) {
          ctx.addIssue({ code: 'custom', message: `${k} is required if haveAnyCreditCard is true`, path: [k] });
        }  
      });
    } else {
      ;['numberOfCard','cardType','cardLimitBDT'].forEach((k) => {
        if (data[k as keyof typeof data] !== undefined) {
          ctx.addIssue({ code: 'custom', message: `${k} must be omitted if haveAnyCreditCard is false`, path: [k] });
        }
      });
    }
    // if (data.loanType == 'INSTANT_LOAN') {
    //   console.log(data.expectedLoanTenure, 'expectedLoanTenure')
    //   if (data.expectedLoanTenure < 1 || data.expectedLoanTenure > 3) {
    //     ctx.addIssue({
    //       code: 'custom',
    //       message: 'expectedLoanTenure must be between 1 and 3 months for INSTANT_LOAN',
    // })}}


  });



 export const eligibilityValidationSchema = {
    eligibilitySchema
 }