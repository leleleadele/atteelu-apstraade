### RISINĀTIE UZDEVUMI ###

MD1 ietvaros:
1. Realizēt izpludināšanu ar Gausa filtru (saistītie faili: `./src/transformations/convolution`);
2. Izstrādāt programmu, kas doto attēlu palielina 4 reizes, lietojot bilineāro (vai bikubisko) interpolāciju (saistītie faili: `./src/transformations/resizing`);

MD2 ietvaros:
3. Realizēt attēlu saspiešanu ar paredzēšanas metodi (lietotnē attēlots gan "encoded", gan atbilstoši "decoded" attēls, saistītie faili: `./src/transformations/predictiveCoding`);
4. Realizēt histogrammas vienmērīgošanas algoritmu (saistītie faili: `./src/transformations/equalizeHistogram`);
5. Izstrādāt programmu, kas attēlā nomaina krāsas, izmantojot HSI krāsu modeļa H komponenti (saistītie faili: `./src/transformations/changeHue`);

MD3 ietvaros:
6. Izstrādāt programmu, kas koriģē krāsas no kvēlspuldzes apgaismojuma uz apmākušās dienas gaismu (saistītie faili: `src/transformations/correctColorTemperature`).
7. Realizēt Sobela un Laplasa operatorus, pārbaudīt tos attēla robežu noteikšanai (saistītie faili: `src/transformations/edgeDetection`).
8. Realizēt adaptīvo filtrēšanu, piemēram SUSAN filtru. Pārbaudīt kā tas ietekmē robežu asumu (es gan implementēju Mediāna filtru; saistītie faili: `src/transformations/adaptiveFiltering/median.js`).
9. Realizēt adaptīvo filtrēšanu, piemēram SUSAN filtru. Pārbaudīt kā tas ietekmē robežu asumu (Susan filtrs; saistītie faili: `src/transformations/adaptiveFiltering/susan.js`).

### PALAIŠANA ###

Lietotne pieejama tīmeklī. Tad nekas nav jāinstalē, vajag tikai internetu.
https://fejas-hantele.netlify.app/

Lietotnē ir poga, caur kuru ielādēt arī savu bildi, ja nepieciešams. Jo lielāka bilde, jo pacietīgāk jāgaida transformācijas rezultātu.

Bet! Ja ir vēlme palaist lietotni lokāli, būs nepieciešams izsaukt komandu `npm i` šinī mapē, kas satur `package.json` failu, lai uzinstalētu izmantotās bibliotēkas, un tad, izmantojot `npm run dev` lapa būtu apskatāma lokāli. Sistēmā būtu jābūt instalētam `node` un `npm` tādā gadījumā.


### PROJEKTA STRUKTŪRA ###

Mapes `./pages`, `./public`, `./styles` (globālais CSS), `./src/components` (UI elementi), `./src/store` (globālā "state" pārvaldīšana) satur failus, kas veido pašu saskarni (scss stili, komponentes, kas ģenerē <canvas> elementus, u.c.), bet nav saistīti ar pašu attēlu apstrādi.

Pašas manipulācijas ar bildes pikseļiem notiek failos zem `./src/transformations` (!!!). Tur attiecīgi arī vairāk komentāru pašā kodā.
Komponente `./src/components/ImageSplit` tikai izsauc izvēlētās transformācijas funkciju, padod transformācijas funkcijai no <canvas> elementa iegūtās oriģinālās bildes ImageData ar oriģinālajām pikseļu vērtībām un renderē atgriezto, transformēto attēlu. 

MD2 ietvaros esmu pievienojusi arī histogrammas datus oriģinālajai un modificētajai bildei. Histogramma attēlota ar bibliotēkas `chart.js` diagrammas palīdzību.
Esmu arī nedaudz uzlabojusi UI kopš MD1.

MD3 ietvaros papildus tiek izmantota bibliotēka `rgb-lab` krāsu konvertēšanai no RGB uz LAB modeli un otrādi.

