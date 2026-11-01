export const sendEmail = async (formData, context = "General") => {
  try {
    const { default: emailjs } = await import('@emailjs/browser');
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = context === 'Spa' ? (import.meta.env.VITE_EMAILJS_SPA_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID) : import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) return { success: false, reason: 'unconfigured' };
    const result = await emailjs.send(
      service,
      template,
      {
        ...formData,
        context, // "Restaurant" or "Services"
        time: new Date().toLocaleString(),
      },
      publicKey
    );

    return { success: result.status >= 200 && result.status < 300 };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false };
  }
};
