import { prisma } from '../../../app';
import { passwordHash } from '../../utils/passwordHash';
import sendEmail from '../../utils/sendEmail';
import { TUser } from '../user/user.interface';

const signUp = async (payload: TUser) => {
  payload.password = await passwordHash(payload.password);

  //   const pin = crypto.randomBytes(3).toString('hex'); // 6-digit PIN
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const pinExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  payload.pin = pin;
  payload.pinExpiry = pinExpiry;
 const result = await prisma.user.create({data: payload})
console.log(result);
  const MailSubject = 'Your PIN for Verification';
  const MailText = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">Your Verification PIN Code</h2>
      <p style="font-size: 16px; color: #555;">Hello ${payload?.name}</p>
      <p style="font-size: 16px; color: #555;">Your PIN code for verification is:</p>
      <h2 style="color: #007BFF; font-size: 36px; font-weight: bold; text-align: center; margin: 20px 0;">${result?.pin}</h2>
      <p style="font-size: 16px; color: #555;"><strong>🔒 Security Note:</strong> This PIN is valid for <strong>15 minutes</strong> only. Please do not share it with anyone.</p>
      <p style="font-size: 16px; color: #555;">If you did not request this PIN, please ignore this email or contact our support team immediately.</p>
      <p style="font-size: 16px; color: #555;">Thank you,</p>
      <p style="font-size: 16px; color: #555; font-weight: bold;">PinUpsDB</p>
    </div>
  </div>
`;
 await sendEmail(payload?.email, MailSubject, MailText);
 


 return "Send Your pin Check your email! Thank you"
};

const validatePin = async (payload: {email: string, pin: string}) => {
    const {email, pin} = payload

    const user = prisma.user.findUnique({where:{email}})
   
    if (!user) {
        throw new Error("User not found")
      }
    
      const currentTime = new Date();
      if (user?.pinExpiry < currentTime) {
        throw new Error('PIN has expired')
      }
    
      if (user?.pin !== pin) {
        throw new Error('Invalid PIN')
        // return { success: false, message: 'Invalid PIN' };
      }

     await prisma.user.update({
        where: {email},
        data: {pin}
    })

    return 'PIN validated successfully'
}

export const AuthServices = {
  signUp,
  validatePin
};
