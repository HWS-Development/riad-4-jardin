// src/utils/sendRestaurantEmail.js
import { Resend } from "resend";

export async function sendRestaurantEmail(formData) {
  const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Riad 4 Jardins <onboarding@resend.dev>", // Replace with your verified sender domain later
      to: "badrbkbadrbk@gmail.com",
      subject: `🍽️ Nouvelle demande depuis le site – ${formData.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif, Arial; font-size: 12px;">
          <div>Une nouvelle demande a été reçue depuis la page Restaurant.</div>
          <div
            style="margin-top:20px; padding:15px 0; border-width:1px 0; border-style:dashed; border-color:lightgrey;"
          >
            <table role="presentation">
              <tr>
                <td style="vertical-align:top;">
                  <div
                    style="padding:6px 10px; margin:0 10px; background-color:#f0f8ff; border-radius:5px; font-size:26px;"
                    role="img"
                  >🍴</div>
                </td>
                <td style="vertical-align:top;">
                  <div style="color:#2c3e50; font-size:16px;">
                    <strong>${formData.name}</strong>
                  </div>
                  <div style="color:#999; font-size:13px;">${formData.phone}</div>
                  <p style="font-size:15px; color:#2c3e50;">${formData.message || "(aucun message)"}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Resend email error:", err);
    return false;
  }
}
