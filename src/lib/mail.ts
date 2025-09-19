import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "Auth System <onboarding@resend.dev>",
      to: email,
      subject: "รีเซ็ตรหัสผ่าน",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">รีเซ็ตรหัสผ่าน</h2>
          <p>คุณได้ขอรีเซ็ตรหัสผ่าน กรุณาคลิกลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่:</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">รีเซ็ตรหัสผ่าน</a>
          <p style="color: #666; font-size: 14px;">ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
          <p style="color: #666; font-size: 14px;">หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยต่ออีเมลนี้</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("ไม่สามารถส่งอีเมลได้");
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "Auth System <onboarding@resend.dev>",
      to: email,
      subject: "ยืนยันอีเมลของคุณ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">ยืนยันอีเมลของคุณ</h2>
          <p>ขอบคุณที่สมัครสมาชิก! กรุณาคลิกลิงก์ด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
          <a href="${confirmLink}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">ยืนยันอีเมล</a>
          <p style="color: #666; font-size: 14px;">ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง</p>
          <p style="color: #666; font-size: 14px;">หากคุณไม่ได้สมัครสมาชิก กรุณาเพิกเฉยต่ออีเมลนี้</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("ไม่สามารถส่งอีเมลได้");
  }
};

// เพิ่มฟังก์ชันสำหรับส่งอีเมล Two-Factor Authentication
export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "Auth System <admin@dokkoon.com>",
      to: email,
      subject: "รหัสยืนยัน Two-Factor Authentication",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">รหัสยืนยัน Two-Factor Authentication</h2>
          <p>รหัสยืนยันของคุณคือ:</p>
          <p style="font-size: 24px; font-weight: bold; color: #007bff; text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${token}</p>
          <p style="color: #666; font-size: 14px;">รหัสนี้จะหมดอายุใน 5 นาที</p>
          <p style="color: #666; font-size: 14px;">หากคุณไม่ได้พยายามเข้าสู่ระบบ กรุณาเพิกเฉยต่ออีเมลนี้</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending 2FA email:", error);
    throw new Error("ไม่สามารถส่งอีเมล 2FA ได้");
  }
};
