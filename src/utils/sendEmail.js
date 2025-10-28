import emailjs from "@emailjs/browser";

export const sendEmail = async (formData, context = "General") => {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        ...formData,
        context, // "Restaurant" or "Services"
        time: new Date().toLocaleString(),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("✅ Email sent:", result.status);
    return { success: true };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false };
  }
};
