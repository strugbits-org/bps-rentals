"use client";

import { useEffect } from "react";
import LetsGetSocial from "./Common/Sections/SocialSection";
import { markPageLoaded } from "@/utils/AnimationFunctions";

// const renderTextWithDecorations = (textData) => {
//   if (!textData.decorations || textData.decorations.length === 0) {
//     return textData.text;
//   }

//   return textData.decorations.reduce((acc, decoration) => {
//     switch (decoration.type) {
//       case "ITALIC":
//         return <i>{acc}</i>;
//       case "BOLD":
//         return <b>{acc}</b>;
//       case "LINK":
//         return (
//           <a
//             href={decoration.linkData.link.url}
//             target="_blank"
//             rel="noreferrer"
//           >
//             {acc}
//           </a>
//         );
//       default:
//         return acc;
//     }
//   }, textData.text);
// };

// const renderNode = (node) => {
//   switch (node.type) {
//     case "HEADING":
//       const headingClass = "fs--30 text-center text-uppercase white-1 ";

//       return (
//         <HeadingComponent level={node.headingData.level} className={headingClass}>
//           {renderTextWithDecorations(node.nodes[0].textData)}
//         </HeadingComponent>
//       );
//     case "PARAGRAPH":
//       return (
//         <p>
//           {node.nodes.map((n, idx) => (
//             <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
//           ))}
//         </p>
//       );
//     case "ORDERED_LIST":
//       return (
//         <ol>
//           {node.nodes.map((listItem) => (
//             <li key={listItem.id}>
//               {listItem.nodes[0].nodes.map((n, idx) => (
//                 <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
//               ))}
//             </li>
//           ))}
//         </ol>
//       );
//     case "BULLETED_LIST":
//       return (
//         <ul>
//           {node.nodes.map((listItem) => (
//             <li key={listItem.id}>
//               {listItem.nodes[0].nodes.map((n, idx) => (
//                 <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
//               ))}
//             </li>
//           ))}
//         </ul>
//       );
//     case "DIVIDER":
//       return <hr />;
//     default:
//       return null;
//   }
// };
// const HeadingComponent = ({ level, children }) => {
//   const HeadingTag = `h${level}`;
//   return <HeadingTag>{children}</HeadingTag>;
// };

const PrivacyAndPolicy = () => {
  // const router = useRouter();
  // const nodes = data.content.nodes;
  // useEffect(() => {
  //   const params = [data];
  //   if (checkParameters(params)) {
  //     markPageLoaded();
  //   }
  // }, [data]);

  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <>
      <section className="section-terms-and-policy">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-11 offset-lg-3 mx-mobile-auto">
              <h1 className="title split-words" data-aos="d:loop">
                Privacy Policy
              </h1>
              <div
                className="editor"
                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
              >
                <h2>
                  Cum id quoque, ut cupiebat, audivisset, evelli iussit eam, qua
                  erat transfixus, hastam.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  quid ages tandem, si utilitas ab amicitia, ut fit saepe,
                  defecerit? Negat enim summo bono afferre incrementum diem. Duo
                  enim genera quae erant, fecit tria. Atqui pugnantibus et
                  contrariis studiis consiliisque semper utens nihil quieti
                  videre, nihil tranquilli potest. Dolor ergo, id est summum
                  malum, metuetur semper, etiamsi non aderit; Octavio fuit, cum
                  illam severitatem in eo filio adhibuit, quem in adoptionem D.
                  Duo Reges: constructio interrete. Si in ipso corpore multa
                  voluptati praeponenda sunt, ut vires, valitudo, velocitas,
                  pulchritudo, quid tandem in animis censes?
                </p>
                <p>
                  Qui bonum omne in virtute ponit, is potest dicere perfici
                  beatam vitam perfectione virtutis; Itaque primos congressus
                  copulationesque et consuetudinum instituendarum voluntates
                  fieri propter voluptatem; Si in ipso corpore multa voluptati
                  praeponenda sunt, ut vires, valitudo, velocitas, pulchritudo,
                  quid tandem in animis censes? Quia nec honesto quic quam
                  honestius nec turpi turpius. Quis contra in illa aetate
                  pudorem, constantiam, etiamsi sua nihil intersit, non tamen
                  diligat? Atque ut a corpore ordiar, videsne ut, si quae in
                  membris prava aut debilitata aut inminuta sint, occultent
                  homines? Ergo instituto veterum, quo etiam Stoici utuntur,
                  hinc capiamus exordium. Hoc dictum in una re latissime patet,
                  ut in omnibus factis re, non teste moveamur.
                  <a href="http://loripsum.net/" target="_blank">
                    Quid autem habent admirationis, cum prope accesseris?
                  </a>
                  An vero displicuit ea, quae tributa est animi virtutibus tanta
                  praestantia? Non prorsus, inquit, omnisque, qui sine dolore
                  sint, in voluptate, et ea quidem summa, esse dico. Itaque illa
                  non dico me expetere, sed legere, nec optare, sed sumere,
                  contraria autem non fugere, sed quasi secernere.
                </p>
                <p>
                  Quid loquor de nobis, qui ad laudem et ad decus nati,
                  suscepti, instituti sumus?
                  <a href="http://loripsum.net/" target="_blank">
                    Teneo, inquit, finem illi videri nihil dolere.
                  </a>
                  Stulti autem malorum memoria torquentur, sapientes bona
                  praeterita grata recordatione renovata delectant.
                  <i>Bork</i> Effluit igitur voluptas corporis et prima quaeque
                  avolat saepiusque relinquit causam paenitendi quam recordandi.
                  Facile pateremur, qui etiam nunc agendi aliquid discendique
                  causa prope contra naturam vígillas suscipere soleamus. Haec
                  qui audierit, ut ridere non curet, discedet tamen nihilo
                  firmior ad dolorem ferendum, quam venerat. Aut haec tibi,
                  Torquate, sunt vituperanda aut patrocinium voluptatis
                  repudiandum.
                </p>
                <h3>Bonum negas esse divitias, praeposìtum esse dicis?</h3>
                <p>
                  Cur tantas regiones barbarorum pedibus obiit, tot maria
                  transmisit?
                  <a href="http://loripsum.net/" target="_blank">
                    Expressa vero in iis aetatibus, quae iam confirmatae sunt.
                  </a>
                  Haec et tu ita posuisti, et verba vestra sunt.
                  <i>Si quidem, inquit, tollerem, sed relinquo.</i>
                  <mark>
                    Quodsi ipsam honestatem undique pertectam atque absolutam.
                  </mark>
                  Fortes viri voluptatumne calculis subductis proelium ineunt,
                  sanguinem pro patria profundunt, an quodam animi ardore atque
                  impetu concitati? De qua Epicurus quidem ita dicit, omnium
                  rerum, quas ad beate vivendum sapientia comparaverit, nihil
                  esse maius amicitia, nihil uberius, nihil iucundius. Mihi
                  vero, inquit, placet agi subtilius et, ut ipse dixisti,
                  pressius. Saepe ab Aristotele, a Theophrasto mirabiliter est
                  laudata per se ipsa rerum scientia; Sed in rebus apertissimis
                  nimium longi sumus.
                </p>
                <ol>
                  <li>
                    Eorum enim omnium multa praetermittentium, dum eligant
                    aliquid, quod sequantur, quasi curta sententia;
                  </li>
                  <li>
                    Non ego tecum iam ita iocabor, ut isdem his de rebus, cum L.
                  </li>
                  <li>
                    Diodorus, eius auditor, adiungit ad honestatem vacuitatem
                    doloris.
                  </li>
                </ol>
                <ul>
                  <li>
                    Docent enim nos, ut scis, dialectici, si ea, quae rem
                    aliquam sequantur, falsa sint, falsam illam ipsam esse, quam
                    sequantur.
                  </li>
                  <li>
                    Quodsi ipsam honestatem undique pertectam atque absolutam.
                  </li>
                  <li>
                    Quae enim adhuc protulisti, popularia sunt, ego autem a te
                    elegantiora desidero.
                  </li>
                  <li>Sed ad bona praeterita redeamus.</li>
                  <li>
                    Animadverti, ínquam, te isto modo paulo ante ponere, et scio
                    ab Antiocho nostro dici sic solere;
                  </li>
                  <li>
                    Audio equidem philosophi vocem, Epicure, sed quid tibi
                    dicendum sit oblitus es.
                  </li>
                  <li>
                    Mihi vero, inquit, placet agi subtilius et, ut ipse dixisti,
                    pressius.
                  </li>
                </ul>
                <h2>
                  Cum id quoque, ut cupiebat, audivisset, evelli iussit eam, qua
                  erat transfixus, hastam.
                </h2>
                <blockquote cite="http://loripsum.net">
                  Ut bacillum aliud est inflexum et incurvatum de industria,
                  aliud ita natum, sic ferarum natura non est illa quidem
                  depravata mala disciplina, sed natura sua.
                </blockquote>
                <dl>
                  <dt>
                    <dfn>An potest cupiditas finiri?</dfn>
                  </dt>
                  <dd>
                    Habent enim et bene longam et satis litigiosam
                    disputationem.
                  </dd>
                  <dt>
                    <dfn>Bork</dfn>
                  </dt>
                  <dd>
                    Non dolere, inquam, istud quam vim habeat postea videro;
                  </dd>
                  <dt>
                    <dfn>Bork</dfn>
                  </dt>
                  <dd>Animum autem reliquis rebus ita perfecit, ut corpus;</dd>
                  <dt>
                    <dfn>Bork</dfn>
                  </dt>
                  <dd>
                    Non igitur de improbo, sed de callido improbo quaerimus,
                    qualis Q.
                  </dd>
                </dl>
                <p>
                  Ex quo, id quod omnes expetunt, beate vivendi ratio inveniri
                  et comparari potest. Aliud igitur esse censet gaudere, aliud
                  non dolere. Hanc in motu voluptatem -sic enim has suaves et
                  quasi dulces voluptates appellat-interdum ita extenuat, ut M.
                  Sin tantum modo ad indicia veteris memoriae cognoscenda,
                  curiosorum. Nam memini etiam quae nolo, oblivisci non possum
                  quae volo.
                  <i>Mihi enim satis est, ipsis non satis.</i>
                  <mark>Sed quid sentiat, non videtis.</mark>
                </p>
                <p>
                  Atque hoc dabitis, ut opinor, si modo sit aliquid esse beatum,
                  id oportere totum poni in potestate sapientis. Quoniamque non
                  dubium est quin in iis, quae media dicimus, sit aliud
                  sumendum, aliud reiciendum, quicquid ita fit aut dicitur, omne
                  officio continetur. Sed non alienum est, quo facilius vis
                  verbi intellegatur, rationem huius verbi faciendi Zenonis
                  exponere. Decius, princeps in ea familia consulatus, cum se
                  devoverat et equo admisso in mediam aciem Latinorum irruebat,
                  aliquid de voluptatibus suis cogitabat? Nihil est enim, de quo
                  aliter tu sentias atque ego, modo commutatis verbis ipsas res
                  conferamus.
                  <b>De hominibus dici non necesse est.</b> Atqui perspicuum est
                  hominem e corpore animoque constare, cum primae sint animi
                  partes, secundae corporis. Nec mihi illud dixeris: Haec enim
                  ipsa mihi sunt voluptati, et erant illa Torquatis. Quae cum
                  praeponunt, ut sit aliqua rerum selectio, naturam videntur
                  sequi;
                  <a href="http://loripsum.net/" target="_blank">
                    Eaedem enim utilitates poterunt eas labefactare atque
                    pervertere.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LetsGetSocial />
    </>
  );
};

export default PrivacyAndPolicy;
