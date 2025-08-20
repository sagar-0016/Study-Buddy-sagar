
import type { Flashcard } from '../types';

export const gocFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "Among CH₃⁺, CH₃CH₂⁺, and (CH₃)₃C⁺, which carbocation is most stable and why?",
        answer: "(CH₃)₃C⁺ is most stable due to +I effect and hyperconjugation from three methyl groups."
    },
    {
        question: "Why is vinyl carbocation (CH₂=CH⁺) unstable?",
        answer: "Because the positive charge is on an sp² carbon next to an sp² carbon; no resonance or hyperconjugation support."
    },
    {
        question: "Predict the major product: 2-butene reacts with HBr in the presence of peroxide.",
        answer: "Anti-Markovnikov addition occurs; product is 1-bromobutane via free radical mechanism."
    },
    {
        question: "What happens if you treat 2-methylpropene with dilute H₂SO₄?",
        answer: "Markovnikov addition of water; forms 2-methyl-2-propanol."
    },
    {
        question: "Rank in decreasing stability: benzyl carbocation, allyl carbocation, tertiary carbocation.",
        answer: "Benzyl > tertiary > allyl, due to extensive resonance in benzyl."
    },
    {
        question: "Identify the nucleophile: CH₃O⁻ + CH₃Br → ?",
        answer: "CH₃O⁻ is the nucleophile, attacks CH₃Br in SN2 to form CH₃OCH₃."
    },
    {
        question: "Why does SN1 occur faster in tertiary halides than primary?",
        answer: "Tertiary carbocation formed in SN1 is more stable due to hyperconjugation and +I effect."
    },
    {
        question: "Which is more acidic: ethanol or phenol? Why?",
        answer: "Phenol, due to resonance stabilization of phenoxide ion."
    },
    {
        question: "Does nitro group increase or decrease the acidity of benzoic acid?",
        answer: "Increases acidity by -R and -I effect, stabilizing the conjugate base."
    },
    {
        question: "Between –OH, –NH₂, –COOH, which is most activating in electrophilic aromatic substitution?",
        answer: "–OH, due to strong +M (resonance donating) effect."
    },
    {
        question: "Which has higher boiling point: alcohol or ether (same number of carbon atoms)?",
        answer: "Alcohol due to hydrogen bonding."
    },
    {
        question: "True/False: Resonance occurs only in planar molecules.",
        answer: "True. Delocalization requires overlap of p-orbitals in the same plane."
    },
    {
        question: "Which is more reactive toward EAS: benzene or toluene?",
        answer: "Toluene, due to electron-donating methyl group (activates ring)."
    },
    {
        question: "A chiral compound must have ______?",
        answer: "No plane of symmetry and at least one stereocenter."
    },
    {
        question: "Draw the mechanism: HBr addition to propene (acidic medium).",
        answer: "Step 1: protonation → carbocation formation → Br⁻ attacks carbocation → 2-bromopropane formed."
    },
    {
        question: "How many optical isomers does tartaric acid have?",
        answer: "Three: two enantiomers and one meso form (which is achiral)."
    },
    {
        question: "Which effect dominates in nitrophenol: –I or +R?",
        answer: "–I dominates, making nitrophenol more acidic."
    },
    {
        question: "Which is more basic: CH₃NH₂ or C₆H₅NH₂?",
        answer: "CH₃NH₂. In aniline, lone pair on N is delocalized into the ring, reducing basicity."
    },
    {
        question: "Why do tertiary alcohols dehydrate faster than primary ones?",
        answer: "Because the carbocation formed during dehydration is more stable in tertiary alcohols."
    },
    {
        question: "Identify electrophile: H₂SO₄ + HNO₃ mixture?",
        answer: "NO₂⁺ is the electrophile (nitration mixture)."
    },
    {
        question: "Predict: Reaction of ethene with cold, dilute KMnO₄ gives?",
        answer: "Cis-diol (syn addition of two –OH groups)."
    },
    {
        question: "What is the major product: 1-butyne + 1 mole HBr (no peroxide)?",
        answer: "2-bromobutene (Markovnikov addition)."
    },
    {
        question: "Compare basic strength: NH₃, PH₃, AsH₃.",
        answer: "NH₃ > PH₃ > AsH₃; lone pair availability decreases down the group."
    },
    {
        question: "What’s the hybridization and geometry of carbocation?",
        answer: "sp² hybridized, trigonal planar."
    },
    {
        question: "Assertion: Allyl free radicals are more stable. Reason: Due to resonance.",
        answer: "Both assertion and reason are true, and reason explains the assertion."
    },
    {
        question: "Which will be more reactive towards SN2: CH₃Br or (CH₃)₃CBr? Why?",
        answer: "CH₃Br, because SN2 needs less steric hindrance; tertiary carbon hinders backside attack."
    },
    {
        question: "Why is SN1 favored in polar protic solvents?",
        answer: "They stabilize both carbocation and leaving group through hydrogen bonding and solvation."
    },
    {
        question: "Between fluorine and iodine, which is a better leaving group and why?",
        answer: "Iodine; larger size, weaker bond, better stabilizes negative charge after leaving."
    },
    {
        question: "A compound has two chiral centers. What is the maximum number of stereoisomers?",
        answer: "4 (2ⁿ, where n = number of chiral centers)."
    },
    {
        question: "Which of the following is aromatic: cyclobutadiene, benzene, cyclooctatetraene?",
        answer: "Only benzene; follows Huckel’s rule (4n+2 π electrons), is planar and cyclic."
    },
    {
        question: "Give an example of a non-aromatic but conjugated molecule.",
        answer: "Butadiene: conjugated but not cyclic or planar, so not aromatic."
    },
    {
        question: "Predict the major product: 2-methylpropene + HBr (acidic medium).",
        answer: "2-bromo-2-methylpropane (Markovnikov addition via carbocation rearrangement)."
    },
    {
        question: "Which is more acidic: acetic acid or chloroacetic acid?",
        answer: "Chloroacetic acid; –Cl shows –I effect, stabilizing carboxylate ion."
    },
    {
        question: "Why is benzoic acid more acidic than cyclohexanecarboxylic acid?",
        answer: "Due to resonance stabilization of benzoate ion by the aromatic ring."
    },
    {
        question: "Compare nucleophilicity: OH⁻ vs H₂O.",
        answer: "OH⁻ is a stronger nucleophile (negatively charged, more electron-dense)."
    },
    {
        question: "Which will undergo SN1 faster: benzyl bromide or ethyl bromide?",
        answer: "Benzyl bromide; benzyl carbocation is resonance-stabilized."
    },
    {
        question: "What type of intermediate is formed during nitration of benzene?",
        answer: "A sigma complex (arenium ion or carbocation intermediate)."
    },
    {
        question: "Which is the correct order of carbocation stability: allyl, benzyl, methyl?",
        answer: "Benzyl > allyl > methyl; benzyl is stabilized by resonance over aromatic ring."
    },
    {
        question: "What is the hybridization of the carbon atom in a carbanion?",
        answer: "Usually sp³ (with one lone pair and three sigma bonds)."
    },
    {
        question: "Which is more stable: a primary carbanion or tertiary carbanion? Why?",
        answer: "Primary, because less alkyl groups = less electron-donating +I effect."
    },
    {
        question: "Why does H₂O act as both nucleophile and base in organic reactions?",
        answer: "It has lone pairs to donate (nucleophile) and can accept H⁺ (base)."
    },
    {
        question: "Which is more reactive in electrophilic substitution: benzene or nitrobenzene?",
        answer: "Benzene; –NO₂ is a deactivating group that reduces reactivity of the ring."
    },
    {
        question: "What makes NO₂⁺ a strong electrophile?",
        answer: "It has a positive charge and an electron-deficient nitrogen, making it highly reactive."
    },
    {
        question: "Explain: CH₃CH₂–Br reacts faster in SN2 than (CH₃)₃C–Br.",
        answer: "Less steric hindrance in CH₃CH₂–Br allows easier backside attack."
    },
    {
        question: "Predict the product: cyclohexene + cold dilute KMnO₄.",
        answer: "cis-1,2-cyclohexanediol via syn hydroxylation."
    },
    {
        question: "Which is more stable: eclipsed or staggered conformation of ethane?",
        answer: "Staggered, due to minimal torsional strain."
    },
    {
        question: "Why is cyclopropane less stable than cyclopentane?",
        answer: "High angle strain and torsional strain in cyclopropane (60° bond angles)."
    },
    {
        question: "Which has more hyperconjugative structures: propene or isobutene?",
        answer: "Isobutene; more alkyl groups = more C–H bonds for hyperconjugation."
    },
    {
        question: "Which is a stronger acid: phenol or water? Why?",
        answer: "Phenol; phenoxide ion is resonance-stabilized, water’s conjugate base (OH⁻) is less stable."
    },
    {
        question: "What is the order of basicity: CH₃NH₂ > NH₃ > C₆H₅NH₂?",
        answer: "CH₃NH₂ > NH₃ > C₆H₅NH₂; –CH₃ is electron-donating, while phenyl withdraws electrons."
    },
    {
        question: "Which has higher nucleophilicity in aqueous medium: OH⁻ or CN⁻?",
        answer: "CN⁻, because it's less solvated and more available for attack."
    },
    {
        question: "In E2 reaction, which hydrogen is eliminated?",
        answer: "Beta-hydrogen, anti-periplanar to the leaving group."
    },
    {
        question: "Why does E2 require a strong base?",
        answer: "To abstract the beta-hydrogen in a single concerted step."
    },
    {
        question: "Identify the type of reaction: dehydration of alcohol to alkene.",
        answer: "Elimination (E1 or E2 depending on conditions)."
    },
    {
        question: "Which reaction shows a carbocation intermediate: SN1 or SN2?",
        answer: "SN1; involves slow formation of carbocation."
    },
    {
        question: "What does inversion of configuration signify in SN2?",
        answer: "Backside attack leads to inverted stereochemistry (Walden inversion)."
    },
    {
        question: "Which intermediate is more stable: allylic radical or benzylic radical?",
        answer: "Benzylic radical; stabilized by resonance over aromatic ring."
    },
    {
        question: "Explain Markovnikov's rule in terms of carbocation stability.",
        answer: "Hydrogen adds to carbon with more H atoms to form a more stable carbocation."
    },
    {
        question: "Which conformer of butane has the lowest energy?",
        answer: "Anti (staggered) conformation, with CH₃ groups farthest apart."
    },
    {
        question: "Which acid is stronger: formic acid or acetic acid? Why?",
        answer: "Formic acid; lacks electron-donating –CH₃ group, so conjugate base is less destabilized."
    },
    {
        question: "In which solvent does SN2 reaction occur faster: DMSO or water?",
        answer: "DMSO; it's polar aprotic and doesn't solvate nucleophiles, allowing stronger attack."
    },
    {
        question: "Which alkyl halide gives the fastest SN1: CH₃Cl, CH₃CH₂Cl, or (CH₃)₃CCl?",
        answer: "(CH₃)₃CCl; forms the most stable tertiary carbocation."
    },
    {
        question: "What is the order of acid strength: phenol, ethanol, water?",
        answer: "Phenol > water > ethanol; phenoxide ion is resonance stabilized, ethanol's conjugate base is unstable."
    },
    {
        question: "Why does benzoic acid not show resonance involving OH bond?",
        answer: "Because the lone pair on OH is not in conjugation with the benzene ring when COOH is planar."
    },
    {
        question: "Which has more hyperconjugative structures: ethyl or isopropyl cation?",
        answer: "Isopropyl cation; more adjacent C–H bonds available for delocalization."
    },
    {
        question: "Which is more basic: NH₃ or N(CH₃)₃?",
        answer: "N(CH₃)₃; methyl groups donate electrons via +I effect, enhancing basicity."
    },
    {
        question: "What kind of stereoisomers are cis-2-butene and trans-2-butene?",
        answer: "Geometrical (cis-trans) isomers, a type of diastereomers."
    },
    {
        question: "Which form is more stable: cis-2-butene or trans-2-butene?",
        answer: "Trans-2-butene; due to less steric repulsion between methyl groups."
    },
    {
        question: "How many optically active isomers does lactic acid have?",
        answer: "2 (one chiral center → 2 enantiomers)."
    },
    {
        question: "What is the hybridization of the carbon in CH₂⁻ (carbanion)?",
        answer: "sp² (due to lone pair and two bonds) or sp³ depending on context."
    },
    {
        question: "Which reacts faster with nucleophiles: carbonyl compounds or alkenes?",
        answer: "Carbonyls; electrophilic carbon due to partial positive charge from polar C=O bond."
    },
    {
        question: "Explain: Mesomeric effect is more significant than inductive effect in conjugated systems.",
        answer: "Because it involves delocalization over π systems, which greatly affects electron density."
    },
    {
        question: "What’s the major product: 1-methylcyclohexene + HBr (peroxide)?",
        answer: "Anti-Markovnikov product: 3-bromo-1-methylcyclohexane (via radical addition)."
    },
    {
        question: "Which will be a better nucleophile in DMSO: Br⁻ or I⁻?",
        answer: "I⁻; larger, less solvated in polar aprotic solvents, hence more reactive."
    },
    {
        question: "Predict the stereochemical outcome of SN2 on a chiral center.",
        answer: "Inversion of configuration (R becomes S or vice versa)."
    },
    {
        question: "Why does SN1 result in racemization at a chiral center?",
        answer: "Planar carbocation intermediate allows attack from either side, forming both enantiomers."
    },
    {
        question: "Which is more acidic: para-nitrophenol or phenol?",
        answer: "Para-nitrophenol; –NO₂ group stabilizes phenoxide ion by –M and –I effect."
    },
    {
        question: "Name the effect: Electron donation through p-orbitals to stabilize positive charge.",
        answer: "+M (resonance donating/mesomeric) effect."
    },
    {
        question: "Which undergoes E1 faster: 2° or 3° alcohols?",
        answer: "3° alcohols; more stable carbocation intermediate during dehydration."
    },
    {
        question: "Why does allyl halide undergo both SN1 and SN2 easily?",
        answer: "Due to resonance-stabilized intermediate and low steric hindrance."
    },
    {
        question: "Which is more reactive in EAS: phenol or aniline?",
        answer: "Aniline; NH₂ group is more activating than OH due to stronger +M effect."
    },
    {
        question: "Which carbon is attacked by nucleophile in epoxide ring?",
        answer: "Less substituted carbon under basic conditions; more substituted under acidic conditions."
    },
    {
        question: "What causes benzene to be unreactive towards addition reactions?",
        answer: "Aromatic stabilization due to delocalized π electrons (Hückel rule)."
    },
    {
        question: "What kind of effect is seen in meta-directing groups?",
        answer: "–I and –M effect, withdrawing electron density from ring."
    },
    {
        question: "Which is more acidic: m-cresol or p-cresol?",
        answer: "m-cresol; OH and CH₃ groups have less stabilizing interaction in meta form, so OH effect dominates."
    },
    {
        question: "Which of the following can show optical activity: tartaric acid (meso) or lactic acid?",
        answer: "Lactic acid; meso tartaric acid is achiral due to internal symmetry."
    },
    {
        question: "What happens to the plane of polarized light in racemic mixture?",
        answer: "It remains unchanged; optical rotations cancel each other."
    },
    {
        question: "Why does conjugation lower the energy of a molecule?",
        answer: "Delocalization stabilizes electron distribution, lowering energy."
    },
    {
        question: "Which has a longer C–O bond: carbonyl or alcohol?",
        answer: "Alcohol; carbonyl has partial double bond character from resonance."
    },
    {
        question: "Predict major product: benzene + Cl₂ + AlCl₃?",
        answer: "Chlorobenzene via electrophilic aromatic substitution."
    },
    {
        question: "Which compound resists Friedel–Crafts alkylation: nitrobenzene or toluene?",
        answer: "Nitrobenzene; deactivated ring due to strong –M, –I effect of –NO₂."
    },
    {
        question: "Why is CH₃–CH=CH₂ more reactive than CH₃–CH₂–CH₃ toward Br₂ addition?",
        answer: "Alkene has π bond, which can react with Br₂ via electrophilic addition."
    },
    {
        question: "Which is more acidic: acetic acid or formic acid?",
        answer: "Formic acid; lacks +I effect of CH₃, making it more acidic."
    },
    {
        question: "Between COOH and CN, which group is more electron-withdrawing?",
        answer: "–CN; stronger –I effect due to higher electronegativity and linearity."
    },
    {
        question: "What kind of effect is shown by –OH in phenol during EAS?",
        answer: "+M effect, activates ortho and para positions."
    },
    {
        question: "Predict product: phenol + Br₂ (aqueous).",
        answer: "2,4,6-tribromophenol (highly activated ring)."
    },
    {
        question: "Which group will deactivate benzene ring more: –COOH or –NO₂?",
        answer: "–NO₂; stronger –M and –I effects."
    },
    {
        question: "In a reaction intermediate, which is more stable: enol or keto form?",
        answer: "Keto form; generally more stable due to stronger C=O bond."
    },
    {
        question: "Why is tropylium ion aromatic?",
        answer: "It’s cyclic, planar, and has 6 π electrons (follows Hückel's rule)."
    },
    {
        question: "Between enolate ion and alkoxide, which is more resonance stabilized?",
        answer: "Enolate ion; charge delocalized between O and C in resonance."
    },
    {
        question: "Why is the conjugate base of phenol stabilized, but not that of alcohol?",
        answer: "Phenoxide ion is stabilized by resonance into the aromatic ring; alkoxide ion lacks such delocalization."
    },
    {
        question: "True/False: Resonance affects basicity more than inductive effect. Explain.",
        answer: "True in most cases. Resonance can delocalize the lone pair, reducing availability for protonation, e.g., aniline vs methylamine."
    },
    {
        question: "Why does aniline act as a weaker base than methylamine?",
        answer: "Because the lone pair on nitrogen in aniline is delocalized into the benzene ring (resonance), reducing availability for bonding with H⁺."
    },
    {
        question: "Does hyperconjugation contribute to resonance structures?",
        answer: "No. Hyperconjugation is a stabilizing effect, but it’s not shown in canonical resonance structures due to lack of true delocalization."
    },
    {
        question: "Which is more acidic: ortho-nitrophenol or para-nitrophenol? Why?",
        answer: "Ortho-nitrophenol; not just due to –I/–M effects, but also due to intramolecular H-bonding that stabilizes the structure."
    },
    {
        question: "Which conformation of butane has the highest energy?",
        answer: "Eclipsed with both methyl groups together (syn-periplanar). Torsional + steric strain is highest."
    },
    {
        question: "Which has more acidic hydrogen: acetylene or ethylene?",
        answer: "Acetylene. The negative charge after deprotonation is on an sp-hybridized carbon, which holds negative charge better (more s-character)."
    },
    {
        question: "In E2, elimination occurs most effectively when...",
        answer: "...the β-H and leaving group are anti-periplanar. This allows orbital alignment for π-bond formation."
    },
    {
        question: "Why does CH₃COOH behave as acid, but CH₃CHO does not?",
        answer: "Carboxylic acids can stabilize the conjugate base via resonance. Aldehydes lack a similar acidic H and don’t ionize readily."
    },
    {
        question: "Which is more basic: pyridine or pyrrole? Why?",
        answer: "Pyridine; lone pair is on sp² N and is not involved in aromaticity, while in pyrrole, lone pair is part of the aromatic π-system."
    },
    {
        question: "Why is benzylic position reactive in free radical halogenation?",
        answer: "Benzylic radicals are resonance-stabilized over the aromatic ring."
    },
    {
        question: "Compare carbocation stability: benzyl > allyl > tertiary > secondary > primary > methyl. Justify.",
        answer: "Benzyl and allyl are stabilized via resonance; tertiary and secondary by hyperconjugation and +I effect."
    },
    {
        question: "Why do polar aprotic solvents speed up SN2?",
        answer: "They don’t form H-bonds with nucleophiles, so the nucleophile remains more reactive and available for backside attack."
    },
    {
        question: "Which is more reactive towards electrophilic substitution: anisole or phenol?",
        answer: "Anisole (–OCH₃) is less acidic, more activating due to +M and +I. Phenol is strongly activating but often reacts uncontrollably."
    },
    {
        question: "Explain meso compounds and why they are optically inactive despite having chiral centers.",
        answer: "Meso compounds have internal plane of symmetry, so their optical rotations cancel out."
    },
    {
        question: "Why is resonance delocalization not possible in nitroalkanes (R–NO₂) through the R group?",
        answer: "Because N of NO₂ is already sp² and delocalization occurs within NO₂ group only, not toward the alkyl R."
    },
    {
        question: "Why does –COOH deactivate the benzene ring in EAS but direct electrophiles to meta position?",
        answer: "–COOH is strongly electron-withdrawing via –I and –M. Meta position is least destabilized in its resonance structures during EAS."
    },
    {
        question: "Why are tertiary carbanions unstable?",
        answer: "Due to +I effects from three alkyl groups, which destabilize the negative charge."
    },
    {
        question: "Which of these cannot exhibit tautomerism: acetone, phenol, nitromethane?",
        answer: "Phenol; while it has an –OH group, keto–enol tautomerism is not significant. Acetone and nitromethane do show tautomerism."
    },
    {
        question: "Which intermediate forms in the bromination of alkanes under light?",
        answer: "Free radicals; the mechanism follows initiation → propagation → termination."
    },
    {
        question: "Is nitromethane acidic? If yes, why?",
        answer: "Yes, the anion formed after deprotonation is stabilized by resonance involving the nitro group."
    },
    {
        question: "What does the Hammond postulate state about transition states?",
        answer: "Transition state resembles the structure of the nearest stable species (reactant or intermediate)."
    },
    {
        question: "Why do tertiary alcohols undergo Lucas test quickly?",
        answer: "They form stable carbocations immediately with HCl/ZnCl₂, leading to rapid turbidity (SN1 mechanism)."
    },
    {
        question: "Why is the enolate ion more stable than alkoxide ion?",
        answer: "The enolate ion is stabilized by resonance between oxygen and alpha carbon."
    },
    {
        question: "Why is phenol more reactive in electrophilic substitution than benzene?",
        answer: "–OH group donates electrons by resonance, increasing electron density at ortho and para positions."
    }
];
