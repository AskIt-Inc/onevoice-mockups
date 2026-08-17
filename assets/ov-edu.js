/* =============================================================================
   ov-edu.js — the education corpus and its shared components.
   Used by onevoice-learn, onevoice-publications and onevoice-learn-article.

   WHY THIS FILE EXISTS
   Blocking decision 3 was resolved on 2026-08-17: `education` splits into
   `education` (patient-facing) and `publication` (academic). Two indexes and one
   detail template now read the same corpus. Copying the records and the row
   markup into three pages is how two indexes drift apart within a release, so
   both live here once — the same argument ov-kit.js makes about chrome.

   THE DATA IS REAL.
   Every record below is a published node measured out of the local Drupal
   database on 2026-08-17 (574 published `education` nodes, 414 of them on the
   amyloidosis domain). Titles, sources, authors, DOIs, years, body lengths and
   tags are as stored — including their defects, which are the point:

     - `doi: 'July 9th 2024'` on the carpal-tunnel record is a real value in a
       real DOI field. The citation builder rejects it rather than printing it.
     - `authors: 'Nori, Mukund, Schmitt'` is "Last, First" pairs stored in one
       string, so it is unknowable whether that is two authors or four.
     - `src` is sometimes a journal (Circulation), sometimes a database
       (ScienceDirect, PubMed Central), sometimes a bare URL, sometimes absent.
       That is why the citation says "Source", never "Journal".
     - One record has no source at all ("A Guide to Communication and Stress").

   `depth` is DERIVED, not authored: a body under ~300 words is a curated
   pointer to somebody else's page, not an article. 64% of the corpus is.
   See internal-pages/05-education-listing.md §1.4.

   NO REVIEWER DATA EXISTS. There is no reviewer field on any content type in
   the database, so `reviewer` below is a PROPOSED field, and every record
   carrying one is flagged `reviewerProposed:true` — the pages label it at the
   point of use and never let the label separate from the claim. Names reused
   from the existing mockups, which are already labelled fictional site-wide.
   See internal-pages/06-education-detail.md §4.
   ============================================================================= */
window.OV_EDU = (function(){

  /* ===========================================================================
     THE CONFIG SEAM — blocking decision 3.
     The client asked that either outcome stay a config change, not a redesign.
     `split:true`  — two indexes, each rendering its own scope, cross-link panel on.
     `split:false` — one index rendering both scopes, the cross-link panel becomes
                     a URL-addressable ?audience= filter, citation fields suppressed
                     unless audience==='professional'.
     Nothing below this object branches on the decision; the pages ask it.
     Not exposed as a UI control — the review sees the decided design.
     =========================================================================== */
  var MODEL = {
    split: true,
    scopes: {
      education: {
        key:'education', label:'Patient information', audience:'patient',
        page:'onevoice-learn.mockup.html', route:'/trusted-resources',
        h1:'Understanding {name}',
        /* Structurally absent from the patient view — there is no citation slot
           to populate, so "never show a DOI to a patient" cannot regress. */
        citation:false
      },
      publication: {
        key:'publication', label:'Research and publications', audience:'professional',
        page:'onevoice-publications.mockup.html', route:'/publications',
        h1:'{name} research and publications',
        citation:true
      }
    }
  };

  /* Records per community. Three of the four launch communities have NO
     education content at all — 414 of 414 domain-scoped published nodes are
     amyloidosis — so the designed empty state is the common case, not an edge
     case. Same situation as the Spotlight index. */
  var DATA = {
    amyloidosis: {
  /* ---- education (patient-facing) — real published nodes, amyloidosis domain ---- */
  education: [
    {t:'Carpal Tunnel Syndrome May Triple Your Risk of Developing Stiff Heart Syndrome', slug:'carpal-tunnel-syndrome-may-triple-your-risk-of-d', srcUrl:'https://www.verywellhealth.com/carpal-tunnel-risk-of-stiff-heart-syndrome-8673860', host:'verywellhealth.com', words:574, depth:'article', year:'2024', doi:'July 9th 2024', teaser:'According to a recent study, carpal tunnel syndrome might be an early sign of transthyretin amyloid cardiomyopathy (ATTR-CM), a type of cardiac amyloidosis known as "stiff heart syndrome." The…', tags:['Clinical trials','Neurology','Peripheral Neuropathy']},
    {t:'When Chronic Illness Joins Your Marriage', slug:'when-chronic-illness-joins-your-marriage', src:'Grace Is Sufficient', words:439, depth:'article', year:'2024', feat:'CAREGIVER SUPPORT', teaser:'Maybe someday I\'ll write a post directed at the spouse of someone with a chronic illness and you\'ll be able to show it to your spouse and say "see, told ya...." but today isn\'t that day. Today is…', tags:['Feelings and Experiences','Counseling','Daily Living','Lifestyle']},
    {t:'Consensus recommendations on holistic care in hereditary ATTR amyloidosis: an international Delphi survey of patient advocates and multidisciplinary healthcare professionals', slug:'consensus-recommendations-on-holistic-care-in-he', srcUrl:'https://bmjopen.bmj.com', host:'bmjopen.bmj.com', words:501, depth:'article', year:'2024', teaser:'Full Article hATTR Holistic Care Consensus Reccomendations BMJ Abstract Background Hereditary transthyretin-mediated amyloidosis is a rare, progressive and potentially life-limiting multisystem…'},
    {t:'AA Amyloidosis FAQs', slug:'aa-amyloidosis-faqs', src:'Amyloidosis Foundation', words:322, depth:'article', teaser:'Why is it called AA amyloidosis? In the past, AA amyloidosis was referred to as "Secondary" or "Inflammatory" amyloidosis. These are no longer accepted names for this form of amyloidosis, which is…', tags:['Autoimmune (AA) amyloidosis/Secondary','Educational Support']},
    {t:'How Did Transthyretin Amyloid Cardiomyopathy Progress in Patients Who Took Placebo in the Study ATTR-ACT? A Plain Language Summary', slug:'how-did-transthyretin-amyloid-cardiomyopathy-pro', src:'Future Cardiology', words:461, depth:'article', year:'2022', doi:'10.2217/fca-2021-0150', teaser:'What Is This Plain Language Summary About? This plain language summary describes some results of a study called ATTR-ACT. This was the first large study to include people with wild-type and…'},
    {t:'Caregiver Stress and Caregiver Burnout', slug:'caregiver-stress-and-caregiver-burnout', srcUrl:'https://www.helpguide.org/family/caregiving/caregiver-stress-and-burnout', host:'helpguide.org', words:32, depth:'reference', year:'2025', feat:'CAREGIVER SUPPORT', teaser:'The demands of caregiving can be exhausting and overwhelming. But there are steps you can take to rein in stress and regain a sense of balance, joy, and hope in your life.', tags:['Caregiver stress','Burnout symptoms','Emotional exhaustion','Support systems']},
    {t:'Treatment of AA Amyloidosis', slug:'treatment-of-aa-amyloidosis', src:'amyloidosis.org.uk: Amyloidosis Patient Information Site', words:98, depth:'reference', teaser:'Principles of treatment Treatment of all types of amyloidosis is currently based on the following principles: Reducing the supply of amyloid forming precursor proteins. Supporting the function of…', tags:['Autoimmune (AA) amyloidosis/Secondary','Disease Management','Diet/Supplements/Nutrition']},
    {t:'AA Amyloidosis', slug:'aa-amyloidosis', src:'Cleveland Clinic', words:64, depth:'reference', year:'2022', teaser:'AA amyloidosis, or secondary amyloidosis, is one type of the rare disorder amyloidosis. This disorder happens when proteins in your body mutate, changing form and gathering on your organs and…', tags:['Autoimmune (AA) amyloidosis/Secondary','Educational Support','Diagnosis','Disease Management']},
    {t:'Long-term survival in people with transthyretin amyloid cardiomyopathy who took tafamidis: a plain language summary', slug:'long-term-survival-in-people-with-transthyretin', src:'Future Cardiology', words:193, depth:'reference', year:'2023', doi:'10.2217/fca-2022-0096', teaser:'What is this plain language summary about? This summary presents the results from an ongoing, long-term extension study that followed an earlier study called ATTR-ACT. People who took part in this…', tags:['Clinical trials','Cardiomyopathy','Tafamidis']},
    {t:'AL Amyloidosis Matters: Coping With Emotions', slug:'al-amyloidosis-matters-coping-with-emotions', src:'Myeloma UK', words:64, depth:'reference', year:'2018', teaser:'In this edition we hear from John Hicks and his experience of being a carer to his wife Joyce for the last 6 years. We also have an update from Gary Mines, who was previously featured in AL…', tags:['Quality of Life','Resources/Patient Support','Coping/Self-Care']},
    {t:'Genetic Testing and Counseling for hATTR Amyloidosis', slug:'genetic-testing-and-counseling-for-hattr-amyloid', src:'American Heart Association, Inc.', words:147, depth:'reference', year:'2022', teaser:'Genetic counseling gives you information about how genetic conditions might affect you or your family. A genetic counselor will educate you on the process and potential results, as well as the…'},
    {t:'A Guide to Communication and Stress', slug:'a-guide-to-communication-and-stress', words:100, depth:'reference', teaser:'When we are experiencing extreme stress, our ability to communicate diminishes massively. We experience lack of clarity, confusion, brain fog, and \'rabbit in the headlight\' syndrome. All of which…'},
    {t:'Living With Amyloidosis', slug:'living-with-amyloidosis', src:'MyAmyloidosisTeam', words:144, depth:'reference', year:'2022', teaser:'Although life with amyloidosis can present a variety of challenges, people diagnosed with the condition can experience productive and fulfilling lives by proactively managing their disease. To enjoy…'},
    {t:'Non-Liver Transplant Therapies for ATTR Amyloidosis 2022', slug:'non-liver-transplant-therapies-for-attr-amyloido', src:'Amyloidosis Support Groups', words:83, depth:'reference', year:'2022', feat:'NEWLY PUBLISHED', teaser:'Non-Liver Transplant Therapies for ATTR Amyloidosis 2022 lists different medications and therapies for treating ATTR Amyloidosis, a genetic disorder characterized by abnormal deposits of a protein…', tags:['Wild-type ATTR (ATTRwt)/Systemic senile amyloidosis']},
    {t:'Therapy for AL Amyloidosis 2022', slug:'therapy-for-al-amyloidosis-2022', src:'Amyloidosis Support Groups', words:108, depth:'reference', year:'2022', feat:'NEWLY PUBLISHED', teaser:'Antibodies (Plasma Cells) Therapy for AL Amyloidosis 2022 lists different medications and therapies for treating AL amyloidosis, a blood disorder characterized by abnormal deposits of a protein…', tags:['AL amyloidosis']},
    {t:'Stay Safe and Healthy in Winter', slug:'stay-safe-and-healthy-in-winter', src:'National Center for Environmental Health', words:70, depth:'reference', feat:'NEWLY PUBLISHED', teaser:'Winter storms and cold temperatures can be dangerous. Stay safe and healthy by planning ahead. Prepare your home and vehicles. Prepare for power outages and outdoor activity. Check on older adults.…'}
  ],
  /* ---- publication (academic) — real published nodes, amyloidosis domain ---- */
  publication: [
    {t:'Atrial Fibrillation/Flutter in Transthyretin Cardiac Amyloidosis', slug:'atrial-fibrillation-flutter-in-transthyretin-car', kind:'paper', srcUrl:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12800393/', host:'pmc.ncbi.nlm.nih.gov', words:1332, depth:'article', year:'2025', teaser:'Atrial fibrillation/flutter (AF) is common in transthyretin cardiac amyloidosis (ATTR-CA). The CHARGE-AF score has not been validated in ATTR-CA. The Columbia staging system is prognostic for…'},
    {t:'Predictive Modeling to Assess Pretest Probability of Transthyretin Gene Variants Based on Demographic Information', slug:'predictive-modeling-to-assess-pretest-probabilit', kind:'paper', src:'Circulation: Heart Failure', words:300, depth:'article', year:'2023', doi:'10.1161/CIRCHEARTFAILURE.122.009908', authors:'Joshua Saef, Trejeeve Martyn, Lauren Ives', more:5, teaser:'Background: Transthyretin amyloid cardiomyopathy (ATTR-CM) is a morbid condition, though recent advances in diagnosis and therapy stand to change its natural history. Patients\' TTR genotype may guide…'},
    {t:'Linking Changes in Quality of Life to Haematologic Response and Survival in Systemic Immunoglobulin Light-Chain Amyloidosis', slug:'linking-changes-in-quality-of-life-to-haematolog', kind:'paper', src:'British Journal of Haematology', words:250, depth:'reference', year:'2023', doi:'10.1111/bjh.18645', authors:'Oliver Cohen, Regina Rendas-Baum, Kristen McCausland', more:11, teaser:'This study reports health-related quality of life (HRQL) among newly-diagnosed immunoglobulin light-chain (AL) patients (n = 914) treated with a bortezomib-based regimen and its association with…'},
    {t:'Expert Consensus on Multidisciplinary Care for Cardiac Amyloidosis: 2023 ACC Report', slug:'expert-consensus-on-multidisciplinary-care-for-c', kind:'paper', src:'Journal of the American College of Cardiology', words:312, depth:'article', year:'2023', doi:'10.1016/j.jacc.2022.11.022', authors:'Michelle M. Kittleson, Frederick L. Ruberg, Amrut V. Ambardekar', more:9, teaser:'The American College of Cardiology (ACC) has a long history of developing documents (eg, decision pathways, health policy statements, appropriate use criteria) to provide members with guidance on…', tags:['Cardiac Amyloidosis']},
    {t:'Impact of Earlier Diagnosis in Cardiac ATTR Amyloidosis Over the Course of 20 Years', slug:'impact-of-earlier-diagnosis-in-cardiac-attr-amyl', kind:'paper', src:'Circulation', words:469, depth:'article', year:'2022', doi:'10.1161/CIRCULATIONAHA.122.060852', authors:'Adam Ioannou, Rishi K. Patel, Yousuf Razvi', more:11, teaser:'Background: Diagnostic and therapeutic advances have led to much greater awareness of transthyretin cardiac amyloidosis (ATTR-CA). We aimed to characterize changes in the clinical phenotype of…'},
    {t:'Current Approaches to the Diagnosis and Management of Amyloidosis', slug:'current-approaches-to-the-diagnosis-and-manageme', kind:'paper', src:'Internal Medicine Journal', words:303, depth:'article', year:'2022', doi:'10.1111/imj.15974', authors:'Mark S. Taylor, Hasib Sidiqi, James Hare', more:12, teaser:'Amyloidosis is a collection of diseases caused by the misfolding of proteins that aggregate into insoluble amyloid fibrils and deposit in tissues. While these fibrils may aggregate to form…'},
    {t:'Efficacy and Safety of Vutrisiran for Patients With Hereditary Transthyretin-Mediated Amyloidosis With Polyneuropathy: A Randomized Clinical Trial', slug:'efficacy-and-safety-of-vutrisiran-for-patients-w', kind:'paper', src:'Amyloid: The Official Journal of the International Society of Amyloidosis', words:267, depth:'reference', year:'2022', doi:'10.1080/13506129.2022.2091985', authors:'David Adams, Ivailo L. Tournev, Mark S. Taylor', more:11, teaser:'Background: The study objective was to assess the effect of vutrisiran, an RNA interference therapeutic that reduces transthyretin (TTR) production, in patients with hereditary transthyretin (ATTRv)…'},
    {t:'Survival Benefit of Birtamimab in Mayo Stage IV AL Amyloidosis in the Phase 3 VITAL Study Consistent After Adjustment for Key Baseline Variables', slug:'survival-benefit-of-birtamimab-in-mayo-stage-iv', kind:'paper', src:'Blood', words:231, depth:'reference', year:'2022', doi:'10.1182/blood-2022-159801', authors:'Morie A. Gertz, Yuying Jin, Ansgar Conrad', more:1, teaser:'Amyloid light chain (AL) amyloidosis - a progressive disorder caused by misfolded light chains produced by plasma cells - is associated with high mortality, poor quality of life, and increased…'},
    {t:'RNA-Targeting and Gene Editing Therapies for Transthyretin Amyloidosis', slug:'rna-targeting-and-gene-editing-therapies-for-tra', kind:'abstract', src:'Nature Reviews Cardiology', words:261, depth:'reference', year:'2022', doi:'10.1038/s41569-022-00683-z', authors:'Alberto Aimo, Vincenzo Castiglione, Claudio Rapezzi', more:7, teaser:'Transthyretin (TTR) is a tetrameric protein synthesized mostly by the liver and secreted into the plasma. TTR molecules can misfold and form amyloid fibrils in the heart and peripheral nerves, either…'},
    {t:'Breast Amyloidosis: A Case Report and Literature Review', slug:'breast-amyloidosis-a-case-report-and-literature', kind:'paper', src:'Journal of the Belgian Society of Radiology', words:128, depth:'reference', year:'2022', doi:'10.5334/jbsr.2988', authors:'Anne-Sofie De Crem, Koen Van de Vijver, Pieter De Visschere', more:2, teaser:'Amyloidosis is an uncommon disorder characterized by extracellular accumulation of misfolded proteins in tissues. We report a unique case of localized breast amyloidosis in an asymptomatic…'},
    {t:'The Patient Voice: Development and Results of a Pilot Patient Experience Data Survey', slug:'the-patient-voice-development-and-results-of-a-p', kind:'abstract', src:'International Studies Association', words:502, depth:'article', year:'2022', authors:'Nori, Mukund, Schmitt', more:4, teaser:'Background Amyloidosis is a rare, systemic disease that is characterized by a variable pattern of nonspecific symptoms and affected organs. These characteristics of amyloidosis are common among rare…'},
    {t:'Real-World Patient, Advocate, and Caregiver Perspectives on Amyloidosis: Awareness, Knowledge Gaps, and Psychosocial Impact', slug:'real-world-patient-advocate-and-caregiver-perspe', kind:'abstract', src:'International Studies Association', words:522, depth:'article', year:'2022', authors:'Nori, Mukund, Schmitt', more:9, teaser:'Background All types of amyloidosis are rare, progressive, and potentially fatal disorders that are difficult to diagnose and treat. Correct diagnosis of amyloidosis is often delayed due to the…'},
    {t:'Sex Differences in Wild-Type Transthyretin Amyloidosis: An Analysis From the Transthyretin Amyloidosis Outcomes Survey (THAOS)', slug:'sex-differences-in-wild-type-transthyretin-amylo', kind:'paper', src:'Cardiology and Therapy', words:292, depth:'reference', year:'2022', doi:'10.1007/s40119-022-00265-7', authors:'Courtney M Campbell, Samantha LoRusso, Angela Dispenzieri', more:10, teaser:'Introduction: Wild-type transthyretin amyloidosis (ATTRwt amyloidosis) is a progressive disease resulting from the accumulation of wild-type transthyretin (TTR) amyloid fibrils, and is diagnosed…'},
    {t:'Correlation Between 24-Hour Urine Protein and Random Urine Protein-Creatinine Ratio in Amyloid Light-Chain Amyloidosis', slug:'correlation-between-24-hour-urine-protein-and-ra', kind:'paper', src:'Kidney Medicine', words:306, depth:'article', year:'2022', doi:'10.1016/j.xkme.2022.100427', authors:'Lisa Mendelson, Vaishali Sanchorawala, Lawreen Connors', more:4, teaser:'Rationale & Objective: Test the feasibility of replacing 24-hour urine collection with a single voided urinary protein-creatinine ratio (UPCR) in patients with amyloid light-chain (AL) amyloidosis.…'}
  ]

    },
    scd: { education: [], publication: [] },
    ph:  { education: [], publication: [] },
    mg:  { education: [], publication: [] }
  };

  /* --------------------------------------------------------------------------
     A REVIEWER THAT DOES NOT EXIST YET.
     The reviewed-by block is the stated trust anchor of the site, and there is
     no field behind it. Rather than fabricate, three records carry a PROPOSED
     reviewer, flagged so the page can label it, and everything else renders the
     honest current state: no reviewer, block hidden.
     Names are the ones already used across the mockups and already labelled
     fictional site-wide; the link closes the same loop the news article closes.
     -------------------------------------------------------------------------- */
  var PROPOSED_REVIEW = {
    'aa-amyloidosis-faqs':
      { by:'Dr A. Okafor, MD', role:'Consultant cardiologist', on:'2026-06-14', onLabel:'14 June 2026' },
    'genetic-testing-and-counseling-for-hattr-amyloid':
      { by:'Dr L. Haugen, PhD', role:'Genetic counselor', on:'2026-05-02', onLabel:'2 May 2026' },
    'how-did-transthyretin-amyloid-cardiomyopathy-pro':
      { by:'Dr A. Okafor, MD', role:'Consultant cardiologist', on:'2026-07-09', onLabel:'9 July 2026' }
  };


  /* --------------------------------------------------------------------------
     REAL BODIES for the records the detail page demonstrates. Taken verbatim
     from node__body and sanitized (scripts, inline handlers and presentational
     attributes removed); no sentence was written for the mockup.
     Two defects visible here are the reason the ToC is built the way it is:
       - heading levels are inconsistent across the corpus — h2, h3, h4, or none
         at all. 'AA Amyloidosis FAQs' uses h4. A ToC that queries h2 finds
         nothing on most records, which is how a ToC silently renders empty.
       - most bodies carry no headings whatsoever, so no ToC is possible and
         none should be shown.
     -------------------------------------------------------------------------- */
  var BODIES = {
    'a-guide-to-communication-and-stress':
      '<p>When we are experiencing extreme stress, our ability to communicate diminishes massively. We experience lack of clarity, confusion, brain fog, and \'rabbit in the headlight\' syndrome. All of which make it very difficult to communicate effectively during times of stress. Whether we need to express our emotional state or have difficult conversations, when we experience stress, we find it difficult to articulate ourselves. Also, many people are concerned about appearing weak or unable to cope, which becomes another barrier to asking for help when their mental/emotional state is compromised.</p>',
    'aa-amyloidosis':
      '<p>AA amyloidosis, or secondary amyloidosis, is one type of the rare disorder amyloidosis. This disorder happens when proteins in your body mutate, changing form and gathering on your organs and tissues. AA amyloidosis happens because you have a chronic inflammatory condition or disease. Healthcare providers treat AA amyloidosis by controlling the underlying disease or condition.</p>',
    'aa-amyloidosis-faqs':
      '<h4>Why is it called AA amyloidosis?</h4> <p>In the past, AA amyloidosis was referred to as "Secondary" or "Inflammatory" amyloidosis. These are no longer accepted names for this form of amyloidosis, which is usually caused by a complication of chronic inflammation or chronic infection. If a patient has chronic inflammation or chronic infection due to a number of possible conditions or diseases, this inflammation can often trigger an increased production of the SAA (Serum Amyloid A) protein in the body. When inflammation goes on for a very long period of time, a small portion of the SAA protein, called AA protein, will separate from SAA. This AA amyloid protein can then misfold, causing amyloid fibrils that clog and interfere with tissue and organ function.</p> <p>Since systemic amyloidoses are referred to with a capital A (for amyloid) followed by an abbreviation for the fibril protein, the second "A" in AA amyloidosis stands for the fragment AA protein of Serum Amyloid A (SAA).</p> <h4>What is SAA protein?</h4> <p>SAA stands for Serum Amyloid A protein. The progression and severity of AA amyloidosis relates to the production and quantity of the SAA protein that is produced in that patient. One medical dictionary definition defines it as: "A high-molecular-weight protein synthesized in the liver; it is an acute phase protein and circulates in association with HDL lipoprotein. It is the precursor to AA amyloid and accumulates in inflammation."</p> <p>In simpler terms, even though SAA is mainly produced in the liver, it circulates in the blood and is composed of different forms of proteins. These different forms of proteins assume several roles in the body, including carrying cholesterol to some organs and signaling germ-fighting cells (immune cells) to travel to areas of infection or inflammation. Therefore, an increase in SAA protein in the body is often a response to a disease or condition.</p>',
    'atrial-fibrillation-flutter-in-transthyretin-car':
      '<p>Atrial fibrillation/flutter (AF) is common in transthyretin cardiac amyloidosis (ATTR-CA). The CHARGE-AF score has not been validated in ATTR-CA. The Columbia staging system is prognostic for survival, but its utility in predicting incident AF is unknown.</p><h3>Objectives</h3><p>The authors aim to determine the predictors of prevalence and incidence of AF and the effect of tafamidis.</p><h3>Methods</h3><p>This is a retrospective cohort study of 419 patients with ATTR-CA. AF was ascertained from review of electrocardiograms, extended rhythm, device interrogations, and charted history. Binary logistic regression assessed for factors associated with prevalent AF. Cox regression time-to-event analysis assessed for factors associated with incident AF.</p><h3>Results</h3><p>AF was present in 58% (n = 244) of ATTR-CA at baseline. On multivariable logistic regression, higher Columbia score (OR: 1.48; 95% CI: 1.25-1.75) and higher left atrial volume index (LAVI) (OR: 1.05; 95% CI: 1.02-1.08) were associated with prevalent AF, whereas hereditary amyloid transthyretin (ATTRv) (OR: 0.19; 95% CI: 0.07-0.55) was protective (all <em>P</em> &lt; 0.05). AF developed in 71 (41%) subjects without prior AF, over a median follow-up 2 years. On Cox regression, higher Columbia score (HR: 1.18; 95% CI: 1.01-1.38; <em>P</em> = 0.035) was associated with new onset AF, whereas CHARGE-AF and LAVI were not. ATTRv (HR: 0.44; 95% CI: 0.23-0.87; <em>P</em> = 0.017) and tafamidis (HR: 0.54; 95% CI: 0.30-0.95; <em>P</em> = 0.034) were protective.</p><h3>Conclusions</h3><p>More than half of the ATTR-CA patients have AF, which was associated with wild-type amyloid transthyretin, greater Columbia stage, and increased LAVI. About half of the ATTR-CA individuals developed AF after 2 years, which was predicted by the Columbia score, but not the CHARGE-AF score. ATTRv and tafamidis were protective against incident AF.</p>&nbsp;',
    'genetic-testing-and-counseling-for-hattr-amyloid':
      '<p>Genetic counseling gives you information about how genetic conditions might affect you or your family. A genetic counselor will educate you on the process and potential results, as well as the potential risks and uncertainties related to testing. Counseling is also critical after genetic testing so the counselor can explain the results and potential consequences for your health and the health of your family members, including children.</p> <p>Genetic counselors can also advise and support patients on the best ways to communicate the news of any genetic variants they may discover to other family members. Although privacy laws restrict the ability of health care professionals to disseminate information directly to potentially affected relatives, they can provide written letters that explain the genetic findings, which you can give to your family members.</p> <p> </p>',
    'predictive-modeling-to-assess-pretest-probabilit':
      '<p><strong>Background:</strong><br /> Transthyretin amyloid cardiomyopathy (ATTR-CM) is a morbid condition, though recent advances in diagnosis and therapy stand to change its natural history. Patients\' TTR genotype may guide family screening as more treatments and preventive strategies become available. An efficient, intuitive means of determining pretest genetic risk may better inform patients/clinicians when pursuing genetic testing.</p> <p><strong>Methods:</strong><br /> This is a cohort study of 767 consecutive patients diagnosed with ATTR-CM who underwent genetic testing. Classification and regression trees (CART) analysis created a decision tree assessing likelihood of carrying a pathologic TTR gene variant. Age, sex, and race were used as independent variables. Logistic regression was also performed to model probability of pathologic TTR genotype. The primary outcome was the decision tree\'s accuracy in 2 separate institutions\' ATTR-CM registry.</p> <p><strong>Results:</strong><br /> In our study cohort, 208 patients (27.1%) had ATTRv. Race has served most efficiently as the root node followed by age and sex in a CART algorithm, and showed 88.2% accuracy (75.3% sensitivity, 93.9% specificity) in the validation cohort. The odds of having a TTR gene variant were greater in Black patients compared with non-Black patients (OR, 34.6 [95% CI, 20.5-58.3]; P <p><strong>Conclusions:</strong><br /> This CART algorithm incorporating age, sex, and race was able to determine which patients with ATTR-CM have pathogenic TTR mutations with high specificity. Non-Black patients diagnosed at age 69 years or older with ATTR-CM have a low likelihood to have ATTRv.</p>'
  };

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* Records are decorated once, on read, so no page recomputes derived fields. */
  function records(slug, scopeKey){
    var byTenant = DATA[slug] || { education: [], publication: [] };
    var list = (scopeKey ? (byTenant[scopeKey] || [])
                         : (byTenant.education || []).concat(byTenant.publication || []));
    return list.map(function(r){
      var out = {}; for (var k in r) out[k] = r[k];
      out.scope   = scopeKey || ((byTenant.publication || []).indexOf(r) > -1 ? 'publication' : 'education');
      out.review  = PROPOSED_REVIEW[r.slug] || null;
      out.external = !!(r.host || r.srcUrl);
      /* Publisher label: the name where we have one, the host where we only
         have a URL, and honestly nothing where the record has neither. */
      out.publisher = r.src || r.host || '';
      out.readMins = Math.max(1, Math.round((r.words || 0) / 200));
      out.body = BODIES[r.slug] || '';
      return out;
    });
  }

  function find(slug){
    var all = [];
    for (var t in DATA) all = all.concat(records(t, 'education'), records(t, 'publication'));
    for (var i = 0; i < all.length; i++) if (all[i].slug === slug) return all[i];
    return null;
  }

  /* --------------------------------------------------------------------------
     CITATION — assembles only what is known.
     `source` is a mix of journal, database and URL, so the label is "Source".
     A DOI is only printed when it IS a DOI: one stored value is the string
     "July 9th 2024" and one is a full URL. Printing either would publish a
     broken citation that looks authoritative.
     -------------------------------------------------------------------------- */
  var DOI_RE = /^10\.\d{4,9}\/\S+$/;

  function normalizeDoi(v){
    if (!v) return '';
    var d = String(v).trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/[.,;]+$/, '');
    return DOI_RE.test(d) ? d : '';
  }

  function citationString(r){
    var bits = [];
    if (r.authors) bits.push(r.authors + (r.more ? ', et al.' : ''));
    bits.push(r.t + '.');
    if (r.publisher) bits.push(r.publisher + '.');
    if (r.year) bits.push(r.year + '.');
    var d = normalizeDoi(r.doi);
    if (d) bits.push('https://doi.org/' + d);
    return bits.join(' ');
  }

  /* -------------------------------------------------------------------- chips */
  function chip(text, cls){
    return '<span class="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ' + cls + '">' +
           esc(text) + '</span>';
  }

  var EXT_SVG = '<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

  /* The handover line. 64% of the corpus lives on somebody else's site, so a
     reader must know that before clicking, and know where to. A row that hides
     it is the listing mishandling the reader, not the link. */
  function destination(r){
    if (!r.external) return '';
    return '<span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500">' +
             EXT_SVG + 'Opens at ' + esc(r.host || r.publisher) +
           '</span>';
  }

  function href(r){ return 'onevoice-learn-article.mockup.html?a=' + encodeURIComponent(r.slug); }

  /* ---------------------------------------------------------------------------
     ROW — one component, both indexes. It does not branch on the split; it
     branches on `citation`, which is scope config. That is what makes
     MODEL.split reversible without touching markup.
     --------------------------------------------------------------------------- */
  function row(r, scope){
    var showCite = scope.citation;
    var d = normalizeDoi(r.doi);

    var meta = [];
    if (showCite && r.authors) {
      meta.push('<span class="text-ink-600">' + esc(r.authors) +
                (r.more ? ' <span class="text-ink-400">and ' + r.more + ' others</span>' : '') + '</span>');
    }
    if (r.publisher) meta.push('<span class="text-ink-500">' + esc(r.publisher) + '</span>');
    if (r.year)      meta.push('<time class="text-ink-500 tabular-nums" datetime="' + esc(r.year) + '">' + esc(r.year) + '</time>');
    /* Reading time is only honest for something we host and is meaningless for
       a pointer, so it appears on hosted patient articles only. */
    if (!showCite && r.depth === 'article') meta.push('<span class="text-ink-500">' + r.readMins + ' min read</span>');

    var tags = (r.tags || []).slice(0, 3).map(function(tag){
      return '<a href="' + scope.page + '?topic=' + encodeURIComponent(tag) + '" ' +
             'class="inline-flex items-center min-h-[30px] px-2.5 rounded-full bg-white border border-ink-200 ' +
             'text-[12.5px] text-ink-600 hover:border-accent-400 hover:text-accent-700">' + esc(tag) + '</a>';
    }).join('');

    return '<li class="group py-5">' +
      '<div class="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px]">' +
        (r.depth === 'reference'
          ? chip('Reference', 'bg-ink-100 text-ink-600 border border-ink-200')
          : chip(showCite ? 'Paper' : 'Article', 'bg-accent-50 text-accent-800')) +
        (r.feat ? chip(r.feat.toLowerCase() === 'newly published' ? 'Newly published' : r.feat,
                       'bg-accent-600 text-white') : '') +
        destination(r) +
      '</div>' +
      '<h3 class="mt-2 text-[18px] sm:text-[19.5px] font-semibold leading-snug text-ink-900">' +
        '<a href="' + href(r) + '" class="hover:text-accent-800 hover:underline underline-offset-2">' + esc(r.t) + '</a></h3>' +
      (r.teaser ? '<p class="mt-1.5 text-[15px] leading-relaxed text-ink-600 max-w-[68ch]">' + esc(r.teaser) + '</p>' : '') +
      (meta.length ? '<p class="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px]">' +
        meta.join('<span class="text-ink-300" aria-hidden="true">·</span>') + '</p>' : '') +
      (showCite && d
        ? '<p class="mt-2 text-[13px]"><a href="https://doi.org/' + esc(d) + '" target="_blank" rel="noopener noreferrer" ' +
          'class="inline-flex items-center gap-1.5 font-medium text-accent-700 hover:underline break-all">' +
          'doi.org/' + esc(d) + EXT_SVG + '<span class="sr-only">(opens in a new tab)</span></a></p>'
        : '') +
      (tags ? '<div class="mt-3 flex flex-wrap gap-1.5">' + tags + '</div>' : '') +
    '</li>';
  }

  return {
    MODEL: MODEL,
    scope: function(k){ return MODEL.scopes[k]; },
    records: records,
    find: find,
    row: row,
    esc: esc,
    chip: chip,
    href: href,
    destination: destination,
    normalizeDoi: normalizeDoi,
    citationString: citationString,
    BODIES: BODIES,
    EXT_SVG: EXT_SVG
  };
})();
