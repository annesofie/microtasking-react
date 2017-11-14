
// Eksempelrespons fra ordresystemet:
// req= "/produkter/{bodø-kommunenr}"
export const products_respons = {  
    "LeverandorMeldinger":[  
 
    ],
    "ProduktPakker":[  
       {  
          "ProduktKode":"NK18040020",
          "Beskrivelse":"Borettslagspakke",
          "Pris":910,
          "LeveringstidVirkedager":5,
          "ProduktKoder":[  
             "NK18040300",
             "NK18041350",
             "NK18041600"
          ]
       },
       {  
          "ProduktKode":"NK18040030",
          "Beskrivelse":"Meglerpakke ubebygd tomt",
          "Pris":1171,
          "LeveringstidVirkedager":5,
          "ProduktKoder":[  
             "NK18040300",
             "NK18040700",
             "NK18041350"
          ]
       },
       {  
          "ProduktKode":"NK18040042",
          "Beskrivelse":"Eiendomsmeglerpakken bebygd eiendom",
          "Pris":3011,
          "LeveringstidVirkedager":7,
          "ProduktKoder":[  
             "NK18040100",
             "NK18040101",
             "NK18040300",
             "NK18040500",
             "NK18040700",
             "NK18040900",
             "NK18041000",
             "NK18041350",
             "NK18041800",
             "NK18041802",
             "NK18041900",
             "NK18042000",
             "NK43154221",
             "NK43651103"
          ]
       },
       {  
          "ProduktKode":"NP1003",
          "Beskrivelse":"Grunnboksrapport (aktiv)",
          "Pris":82,
          "LeveringstidVirkedager":1,
          "ProduktKoder":[  
             "NP1001"
          ]
       },
       {  
          "ProduktKode":"NP1004",
          "Beskrivelse":"Matrikkelrapport",
          "Pris":157,
          "LeveringstidVirkedager":1,
          "ProduktKoder":[  
             "NP1002"
          ]
       },
       {  
          "ProduktKode":"NP1005",
          "Beskrivelse":"Matrikkel- og grunnboksrapport (pakke)",
          "Pris":199,
          "LeveringstidVirkedager":1,
          "ProduktKoder":[  
             "NP1001",
             "NP1002"
          ]
       },
       {  
          "ProduktKode":"NP1008",
          "Beskrivelse":"Matrikkel- og grunnboksrapport (pakke)",
          "Pris":199,
          "LeveringstidVirkedager":1,
          "ProduktKoder":[  
             "NP1006",
             "NP1007"
          ]
       }
    ],
    "Produkter":[  
       {  
          "ProduktKode":"NK18040100",
          "Beskrivelse":"Eiendomsinformasjon",
          "Pris":314,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040100 - Eiendomsinformasjon",
                "Detaljert":"Tomt- og adresseopplysninger fra Matrikkelen."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040101",
          "Beskrivelse":"Skattetakst",
          "Pris":178,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040101 - Skattetakst",
                "Detaljert":"Opplysninger om eiendommen er belagt med kommunal eiendomsskatt og i tilfelle hvor stor skattegrunnlaget er."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040300",
          "Beskrivelse":"Grunnkart",
          "Pris":390,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040300 - Grunnkart",
                "Detaljert":"Detaljert situasjonskart av eiendommen og nærmeste omgivelser. Baseres på kommunens grunnkartbaser, supplert med eiendomsgrenser fra eiendomskartet."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040500",
          "Beskrivelse":"Ledningskart",
          "Pris":390,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040500 - Ledningskart",
                "Detaljert":"Kart som viser kommunale ledningstraseer (vann og avløp). Vises sammen med grunnkart. Informasjon hentes fra kommunens digitale ledningskartverk."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040700",
          "Beskrivelse":"Målebrev",
          "Pris":271,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040700 - Målebrev",
                "Detaljert":"Kopi av målebrev eller midlertidig forretning hvis det finnes. Skylddeling må bestilles hos tingretten."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040702",
          "Beskrivelse":"Matrikkelbrev",
          "Pris":441,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040702 - Matrikkelbrev",
                "Detaljert":"Matrikkebrev er utskrift av eiendommens egenskaper, hjemmelsforhold, adresse, bygning(er), areal og grensepunkt ved oppgitt dato."
             }
          ]
       },
       {  
          "ProduktKode":"NK18040900",
          "Beskrivelse":"Godkjente bygningstegninger",
          "Pris":560,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18040900 - Godkjente bygningstegninger",
                "Detaljert":"Tegninger som viser bygningen slik den ble godkjent. Hentes fra byggesaksarkiv."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041000",
          "Beskrivelse":"Midlertidig brukstillatelse og ferdigattest",
          "Pris":390,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041000 - Midlertidig brukstillatelse og ferdigattest",
                "Detaljert":"Midlertidig brukstillatelse er attest som viser at bygningen kan tas i bruk i henhold til byggetillatelsen. Ferdigattest er attest som viser at bygningen er ferdigstilt i h t byggetillatelsen. Hentes fra byggesaksarkiv."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041100",
          "Beskrivelse":"Naboliste",
          "Pris":299,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041100 - Naboliste",
                "Detaljert":"Liste med navn og postadresse til naboer, gjenboere. Hentes ut fra Matrikkelen ved hjelp av Eiendomskartet."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041101",
          "Beskrivelse":"Administrative grenser",
          "Pris":248,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041101 - Administrative grenser",
                "Detaljert":"Opplysninger om hvilke administrative grenser som eiendommen er knyttet til. (Grunn-, skole-, valgkrets)."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041350",
          "Beskrivelse":"Gjeldende arealplaner med bestemmelser",
          "Pris":508,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041350 - Gjeldende arealplaner med bestemmelser",
                "Detaljert":"Utsnitt av gjeldende arealplaner med bestemmelser. (Reguleringsplan, kommunedelplan, kommuneplan)."
             },
             {  
                "Kort":"NK18041351 - Kommuneplan",
                "Detaljert":"Kommuneplan"
             },
             {  
                "Kort":"NK18041352 - Planrapport",
                "Detaljert":"Planrapport"
             }
          ]
       },
       {  
          "ProduktKode":"NK18041400",
          "Beskrivelse":"Innsendte arealplaner",
          "Pris":338,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041400 - Innsendte arealplaner",
                "Detaljert":"Kart som viser om det er levert forslag til regulering. Uttalelse fra fagansvarlig."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041600",
          "Beskrivelse":"Ortofotorapport",
          "Pris":390,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041600 - Ortofoto",
                "Detaljert":"Utsnitt av ortofoto (målestokk riktig flyfoto) i farger."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041700",
          "Beskrivelse":"Gatekart / Oversiktskart",
          "Pris":178,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041700 - Gatekart / Oversiktskart",
                "Detaljert":"Oversiktkart over eiendommens beliggenhet i forhold til omgivelsene i M 1:5000."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041800",
          "Beskrivelse":"Tilknytning til offentlig vann og kloakk samt vannmåler ",
          "Pris":408,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041800 - Tilknytning til offentlig vann og kloakk samt vannmåler",
                "Detaljert":"Opplysning om eiendommen er tilknyttet offentlig vann og kloakk, vannmåler og eventuelle pålegg."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041802",
          "Beskrivelse":"Avkjørsel til eiendom",
          "Pris":248,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041802 - Avkjørsel til eiendom",
                "Detaljert":"Opplysning om eiendommen har privat eller offentlig adkomst."
             }
          ]
       },
       {  
          "ProduktKode":"NK18041900",
          "Beskrivelse":"Kommunale eiendomsgebyrer",
          "Pris":338,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18041900 - Kommunale eiendomsgebyrer",
                "Detaljert":"Oppgave over vann-, avløps- og feiergebyrer samt eiendomsskatt oppgitt som det halvårlige beløpet som kreves inn."
             }
          ]
       },
       {  
          "ProduktKode":"NK18042000",
          "Beskrivelse":"Legalpant",
          "Pris":248,
          "LeverandorNavn":"Bodø kommune",
          "LeveringstidVirkedager":5,
          "Innhold":[  
             {  
                "Kort":"NK18042000 - Legalpant",
                "Detaljert":"Uoppgjorte kommunale avgifter."
             }
          ]
       },
       {  
          "ProduktKode":"NP1001",
          "Beskrivelse":"Grunnboksrapport (aktiv)",
          "Pris":82,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP1001 - Grunnboksrapport (aktiv)",
                "Detaljert":"Rapport over tinglyste dokumenter (hjemmel, pengeheftelser, servitutter og grunndata) på eiendom."
             }
          ]
       },
       {  
          "ProduktKode":"NP1002",
          "Beskrivelse":"Matrikkelrapport",
          "Pris":157,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP1002 - Matrikkelrapport",
                "Detaljert":"Rapport med all informasjon fra Matrikkelen som er relevant i forbindelse med taksering eller omsetning av eiendom. Inneholder detaljer om eiendommen, tinglyste eiere, adresser og bygninger."
             }
          ]
       },
       {  
          "ProduktKode":"NP1006",
          "Beskrivelse":"Grunnboksrapport (aktiv)",
          "Pris":82,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP1001 - Grunnboksrapport (aktiv)",
                "Detaljert":"Rapport over tinglyste dokumenter (hjemmel, pengeheftelser, servitutter og grunndata) på eiendom."
             }
          ]
       },
       {  
          "ProduktKode":"NP1007",
          "Beskrivelse":"Matrikkelrapport",
          "Pris":157,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP1002 - Matrikkelrapport",
                "Detaljert":"Rapport med all informasjon fra Matrikkelen som er relevant i forbindelse med taksering eller omsetning av eiendom. Inneholder detaljer om eiendommen, tinglyste eiere, adresser og bygninger."
             }
          ]
       },
       {  
          "ProduktKode":"NP1020",
          "Beskrivelse":"Risikorapport",
          "Pris":250,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP1020 - Risikorapport",
                "Detaljert":"Rapport med kart og tekstlig beskrivelse som viser om en eiendom er berørt av følgende nasjonale aktsomhetskart: steinsprang, snøskred, flomsoner, jord- og flomskred og kvikkleiresoner. Bruksområder er planlegging, konsekvensutredning og utvidet takstrapport."
             }
          ]
       },
       {  
          "ProduktKode":"NP2000",
          "Beskrivelse":"Flybilderapport for eiendom ",
          "Pris":200,
          "LeverandorNavn":"NORKART",
          "LeveringstidVirkedager":1,
          "Innhold":[  
             {  
                "Kort":"NP2000 - Flybilderapport for eiendom",
                "Detaljert":"Flybilderapport for eiendom"
             }
          ]
       },
       {  
          "ProduktKode":"NK43154221",
          "Beskrivelse":"Årsgebyr og restanser renovasjon",
          "Pris":380,
          "LeverandorNavn":"IRIS Salten IKS",
          "LeveringstidVirkedager":3,
          "Innhold":[  
             {  
                "Kort":"NK43154221 - Årsgebyr og restanser renovasjon",
                "Detaljert":"Opplysninger om gjeldende gebyrsatser og evt. restanser for renovasjon."
             }
          ]
       },
       {  
          "ProduktKode":"NK43651103",
          "Beskrivelse":"Opplysninger om piper og ildsteder",
          "Pris":262,
          "LeverandorNavn":"Salten Brann IKS",
          "LeveringstidVirkedager":7,
          "Innhold":[  
             {  
                "Kort":"NK43651103 - Opplysninger om piper og ildsteder",
                "Detaljert":"Opplysninger om pålegg eller heftelser vedrørende Pipe / ildsted på eiendommen. Dato for siste feiing /tilsyn."
             }
          ]
       }
    ]
 };