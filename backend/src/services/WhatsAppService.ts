// backend/src/services/WhatsAppService.ts
export const sendWhatsAppMessage = async (to: string, message: string) => {
    // Aqui você faria a integração com API real como Baileys ou Z-API
    console.log(`[WhatsApp] Enviando para ${to}: ${message}`);
    return true;
  };