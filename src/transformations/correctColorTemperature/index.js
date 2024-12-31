// metodes no 'rgb-lab' bibliotēkas RGB <-> LAB krāsu modeļu konvertēšanai
import { rgb2lab, lab2rgb } from "rgb-lab";

const adjustWhiteBalance = (imageData) => {
  const data = imageData.data;

  // ejam cauri katram pikselim bildē
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    //rgb2lab metode atgriež masīvu ar LAB vērtībām, t.i. [L, a, b] formā
    const lab = rgb2lab([r, g, b]);

    // Tā kā kvēlspuldzes gaisma ir oranžīga, un oranžs == sarkans + dzeltens,
    // tad mans risinājums ir mazināt sarkanumu un dzeltenumu attēlā
    // 1.7 koeficients tika atrasts "uz aci" eksperimentējot, un, šķiet, līdzinās arī 10.KrasuKorigesana mācību materiālā minētajiem papildreizinātājiem

    // lab[1] atbilst "a" (zaļš <-> sarkans) vērtībai.
    // Samazinu sarkanumu jeb palielinu zaļganumu bildē
    lab[1] = lab[1] / 1.7;

    // lab[2] atbilst "b" (zils <-> dzeltens) vērtībai.
    // Samazinu dzeltenumu jeb palielinu zilganumu bildē
    lab[2] = lab[2] / 1.7;

    // Pārvēršam LAB vērtības atpakaļ uz RGB modeli
    // (lab2rgb metode atgriež masīvu [r, g, b] formā)
    const changed = lab2rgb(lab);

    // piemērojam iegūtās RGB vērtības izvadāmajam attēlam
    data[i] = changed[0];
    data[i + 1] = changed[1];
    data[i + 2] = changed[2];
  }

  return imageData;
};

export default adjustWhiteBalance;
