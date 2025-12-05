const defaultConfig = {
  card_title: "Happy Teacher's Day! 📚",
  greeting_message: "Thank you for inspiring us every day",
  personal_note: "Your guidance has made all the difference",
  closing_text: "With gratitude and appreciation ✨",
  front_background: "#667eea",
  back_background: "#f093fb",
  text_color: "#ffffff",
  accent_color: "#ff6b6b",
  font_family: "Georgia, serif",
  font_size: 16
};

async function onConfigChange(config) {
  const cardTitle = document.getElementById('cardTitle');
  const greetingMessage = document.getElementById('greetingMessage');
  const personalNote = document.getElementById('personalNote');
  const closingText = document.getElementById('closingText');
  const cardFront = document.querySelector('.card-front');
  const cardBack = document.querySelector('.card-back');

  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontSize = config.font_size || defaultConfig.font_size;
  const frontBg = config.front_background || defaultConfig.front_background;
  const backBg = config.back_background || defaultConfig.back_background;
  const textColor = config.text_color || defaultConfig.text_color;

  document.body.style.fontFamily = `${customFont}, serif`;

  cardTitle.textContent = config.card_title || defaultConfig.card_title;
  greetingMessage.textContent = config.greeting_message || defaultConfig.greeting_message;
  personalNote.textContent = config.personal_note || defaultConfig.personal_note;
  closingText.textContent = config.closing_text || defaultConfig.closing_text;

  cardTitle.style.fontSize = `${baseFontSize * 3}px`;
  cardTitle.style.color = textColor;
  greetingMessage.style.fontSize = `${baseFontSize * 1.5}px`;
  greetingMessage.style.color = textColor;
  personalNote.style.fontSize = `${baseFontSize * 1.25}px`;
  personalNote.style.color = textColor;
  closingText.style.fontSize = `${baseFontSize * 1.125}px`;
  closingText.style.color = textColor;

  cardFront.style.background = `linear-gradient(135deg, ${frontBg} 0%, ${shadeColor(frontBg, -20)} 100%)`;
  cardBack.style.background = `linear-gradient(135deg, ${backBg} 0%, ${shadeColor(backBg, -20)} 100%)`;
}

function shadeColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

const card = document.getElementById('card');
card.addEventListener('click', function () {
  this.classList.toggle('flipped');
});

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig: defaultConfig,
    onConfigChange: onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.front_background || defaultConfig.front_background,
          set: (value) => {
            config.front_background = value;
            window.elementSdk.setConfig({ front_background: value });
          }
        },
        {
          get: () => config.back_background || defaultConfig.back_background,
          set: (value) => {
            config.back_background = value;
            window.elementSdk.setConfig({ back_background: value });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => {
            config.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["card_title", config.card_title || defaultConfig.card_title],
        ["greeting_message", config.greeting_message || defaultConfig.greeting_message],
        ["personal_note", config.personal_note || defaultConfig.personal_note],
        ["closing_text", config.closing_text || defaultConfig.closing_text]
      ])
  });

  onConfigChange(window.elementSdk.config);
} else {
  onConfigChange(defaultConfig);
}
