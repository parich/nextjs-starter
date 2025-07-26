// ในการใช้งานจริง คุณสามารถใช้ Resend, SendGrid, หรือ Nodemailer
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  // TODO: ส่งอีเมลจริง
  console.log(`Password reset link for ${email}: ${resetLink}`);

  // ตัวอย่างการใช้งาน Resend
  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "รีเซ็ตรหัสผ่าน",
  //   html: `<p>คลิกลิงก์นี้เพื่อรีเซ็ตรหัสผ่าน: <a href="${resetLink}">รีเซ็ตรหัสผ่าน</a></p>`
  // })
};
