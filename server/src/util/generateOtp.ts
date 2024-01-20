export default async function generateFourDigitOTP() {
    // Generate a random four-digit number
    const fourDigitOTP = Math.floor(1000 + Math.random() * 9000);
    return fourDigitOTP;
  }
  