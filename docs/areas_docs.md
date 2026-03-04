areas (sritys) implementacija
statc pavyzdys route/areas-example

tikras route:

/rout/[..path]

hero sekcijoje title + subtitle +short

problem sekcija h2_problem_title + problem_description + problem_image, jei yra.
į li sekciją - problem items

analogiškai kitos sekcijos.

Faq title ir description: jei areas endpointe tuščia -> imam iš global

Jei areas turi children - rodome areas card sekcija, jei ne - nerodome

related services - rodome visas services įrašus, jų ten bus 2 arba 3

related posts - rodysime susijusiu articles, kol kas dar nėra logikos pagal ką filtruoti. yra pamąstymų, kad arba pagal tagus arba pagal categories, bet kol kas nieko nėra. Arba padaryti susiejimą ir parinkti konkrečius. Norėčiau pasiūlymų atsižvelgiant į seo ir našumą, taupant api užklausas.

Tarp process ir susijusios paslaugos reiki įterpti sekciją kodėl mes iš apie mane kolekcijos. visą kaip yra visuose areas.

endpointai:

https://veb.inultimo.lt/items/areas
https://veb.inultimo.lt/items/areas/50fac952-cc63-486f-a5e1-0955e12c5a50

{
"data": {
"id": "50fac952-cc63-486f-a5e1-0955e12c5a50",
"status": "published",
"sort": null,
"date_created": "2026-02-26T16:19:01.787Z",
"h1_title": "Skyrybos",
"short_description": "Trumpas aprašymas",
"description": "Trumpas aprašymas",
"label": "Santuokos nutraukimas",
"icon": "arrow-right",
"slug": "skyrybos",
"subtitle": "Teisinės paslaugos skiyboms",
"site": "3523a2f2-f7f7-427b-8081-45a13fbbb850",
"general_image": null,
"parent": null,
"full_path": "/skyrybos",
"h2_problem_title": "Skyrybos tai problema",
"problem_short": "Kurią padėsime išspręsti",
"problem_description": null,
"problem_icon": null,
"problem_image": null,
"h2_solution_title": null,
"solution_icon": null,
"solution_short": null,
"solution_description": null,
"solution_image": null,
"h2_process_title": null,
"process_icon": null,
"process_short": null,
"faq_title_h2": null,
"faq_short": null,
"faq_description": null,
"faq_icon": null,
"seo": {
"title": "Skyrybos | ",
"meta_description": "Skyrybos teisinės paslaugos nuotoliu",
"focus_keyphrase": "skyrybos",
"og_image": "",
"sitemap": {
"priority": "1.0",
"change_frequency": "weekly"
},
"no_index": false,
"no_follow": false,
"additional_fields": {}
},
"apie_mane": "efad58db-160d-4dae-8ab8-7cc63f66c81e",
"json_ld": null,
"faq_anchor": null,
"process_anchor": null,
"solution_anchor": null,
"problem_anchor": null,
"children": [
"08a8ab1b-a988-423d-8f6c-67d00b6aa831",
"d19f5266-523b-4648-bd0d-17d5151b0e0a",
"e5c9b71f-7e83-4043-b9a7-c107ab1406d4"
],
"process_step": [],
"problem_item": [],
"faq_item": [],
"solution_item": []
}
}

https://veb.inultimo.lt/items/faq_items

{
"data": [
{
"id": "cb73c4c8-80cb-4034-8ac8-117c485141f5",
"status": "published",
"sort": null,
"question": "Klausimas 1",
"answer": "Atsakymas 1 **Atsakymas** 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 Atsakymas 1 ",
"icon": null
},
{
"id": "05f23486-8572-47e9-b98e-3b331bc67ad7",
"status": "draft",
"sort": null,
"question": "Klausimas 2",
"answer": "Atsakymas 2 *Atsakymas* 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 Atsakymas 2 ",
"icon": null
}
]
}

https://veb.inultimo.lt/items/problem_items

{
"data": [
{
"id": "599ce22a-d477-434d-b7c1-a6f4c8028e23",
"status": "draft",
"sort": null,
"date_created": "2026-03-03T15:18:59.269Z",
"title_h3": "problem title-labe",
"short": "problem short",
"description": "Problem description **long**",
"icon": null
}
]
}

https://veb.inultimo.lt/items/process_steps

{
"data": [
{
"id": "4a2a8edc-d1e2-4029-bad0-cab393913a7c",
"status": "published",
"sort": null,
"date_created": "2026-03-03T15:24:14.608Z",
"title_h3": "ProcessTitle H3",
"description": "Process description",
"icon": null
}
]
}

https://veb.inultimo.lt/items/solution_items

{
"data": [
{
"id": "da344fa2-911f-4d10-9332-1f0baf86dea1",
"status": "draft",
"sort": null,
"date_created": "2026-03-03T15:22:48.052Z",
"title_h3": "Solution title",
"short": "solution short 1",
"description": "solution description",
"icon": null
}
]
}

https://veb.inultimo.lt/items/services

{
"data": [
{
"id": "803d6aac-dafb-4162-a3b0-5f96da3952ac",
"status": "published",
"sort": 1,
"apie_mane": "efad58db-160d-4dae-8ab8-7cc63f66c81e",
"json_ld": "{\n \"@context\": \"https://schema.org\",\n \"@graph\": [\n {\n \"@type\": \"Service\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#service\",\n \"name\": \"Teisinis dokumentų rengimas nuotoliu\",\n \"serviceType\": \"Legal Document Preparation\",\n \"description\": \"Profesionalus procesinių dokumentų, sutarčių ir ieškinių rengimas. Viskas vyksta el. būdu, pasirašant saugiu el. parašu.\",\n \"provider\": {\n \"@id\": \"https://tavo-domenas.lt/#organization\"\n },\n \"areaServed\": [\n { \"@type\": \"Country\", \"name\": \"Lithuania\" },\n { \"@type\": \"Country\", \"name\": \"Norway\" }\n ],\n \"hasOfferCatalog\": {\n \"@type\": \"OfferCatalog\",\n \"name\": \"Teisinės paslaugos\",\n \"itemListElement\": [\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Santuokos nutraukimo dokumentai\",\n \"description\": \"Pilnas dokumentų paketas teismui.\"\n }\n },\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Nuotolinė teisinė konsultacija\",\n \"description\": \"30-60 min. pokalbis per Zoom arba MS Teams.\"\n }\n }\n ]\n }\n },\n {\n \"@type\": \"FAQPage\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#faq\",\n \"mainEntity\": [\n {\n \"@type\": \"Question\",\n \"name\": \"Kaip vyksta dokumentų pasirašymas$1\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Visi dokumentai paruošiami PDF formatu ir pasirašomi kvalifikuotu elektroniniu parašu (Smart-ID arba Mobile-ID), todėl jums nereikia niekur vykti.\"\n }\n },\n {\n \"@type\": \"Question\",\n \"name\": \"Ar konsultacija teikiama tik darbo valandomis$2\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Konsultacijų laiką deriname individualiai, atsižvelgdami į laiko zonų skirtumus, jei gyvenate užsienyje.\"\n }\n }\n ]\n }\n ]\n}",
"title_h1": "Teisinė konsultacija",
"short_description": "Teisinės konsultacijos nuotoliniu būdu. Teisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būdu",
"subtitle": "Šeimos teisė, Skyrybos, Vaikų ir turto klausimai",
"slug": "teisine-konsultacija",
"icon": "messages-square"
},
{
"id": "12494d40-f130-4cb2-8c2d-3a29c32c4141",
"status": "published",
"sort": 2,
"apie_mane": "efad58db-160d-4dae-8ab8-7cc63f66c81e",
"json_ld": "{\n \"@context\": \"https://schema.org\",\n \"@graph\": [\n {\n \"@type\": \"Service\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#service\",\n \"name\": \"Teisinis dokumentų rengimas nuotoliu\",\n \"serviceType\": \"Legal Document Preparation\",\n \"description\": \"Profesionalus procesinių dokumentų, sutarčių ir ieškinių rengimas. Viskas vyksta el. būdu, pasirašant saugiu el. parašu.\",\n \"provider\": {\n \"@id\": \"https://tavo-domenas.lt/#organization\"\n },\n \"areaServed\": [\n { \"@type\": \"Country\", \"name\": \"Lithuania\" },\n { \"@type\": \"Country\", \"name\": \"Norway\" }\n ],\n \"hasOfferCatalog\": {\n \"@type\": \"OfferCatalog\",\n \"name\": \"Teisinės paslaugos\",\n \"itemListElement\": [\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Santuokos nutraukimo dokumentai\",\n \"description\": \"Pilnas dokumentų paketas teismui.\"\n }\n },\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Nuotolinė teisinė konsultacija\",\n \"description\": \"30-60 min. pokalbis per Zoom arba MS Teams.\"\n }\n }\n ]\n }\n },\n {\n \"@type\": \"FAQPage\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#faq\",\n \"mainEntity\": [\n {\n \"@type\": \"Question\",\n \"name\": \"Kaip vyksta dokumentų pasirašymas$1\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Visi dokumentai paruošiami PDF formatu ir pasirašomi kvalifikuotu elektroniniu parašu (Smart-ID arba Mobile-ID), todėl jums nereikia niekur vykti.\"\n }\n },\n {\n \"@type\": \"Question\",\n \"name\": \"Ar konsultacija teikiama tik darbo valandomis$2\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Konsultacijų laiką deriname individualiai, atsižvelgdami į laiko zonų skirtumus, jei gyvenate užsienyje.\"\n }\n }\n ]\n }\n ]\n}",
"title_h1": "Teisinių dokumentų rengimas",
"short_description": "Teisinių ir procesinių dokumentų rengimas Teisinių ir procesinių dokumentų rengimasTeisinių ir procesinių dokumentų rengimas Teisinių ir procesinių dokumentų rengimasTeisinių ir procesinių dokumentų rengimas",
"subtitle": "Skyrbų dokumentai ir kiti procesiniai dokumentai",
"slug": "teisiniu-dokumentu-rengimas",
"icon": "file-text"
},
{
"id": "7ae6dc0a-ecaa-43d6-8e6c-806b19fe12aa",
"status": "draft",
"sort": 3,
"apie_mane": "efad58db-160d-4dae-8ab8-7cc63f66c81e",
"json_ld": "{\n \"@context\": \"https://schema.org\",\n \"@graph\": [\n {\n \"@type\": \"Service\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#service\",\n \"name\": \"Teisinis dokumentų rengimas nuotoliu\",\n \"serviceType\": \"Legal Document Preparation\",\n \"description\": \"Profesionalus procesinių dokumentų, sutarčių ir ieškinių rengimas. Viskas vyksta el. būdu, pasirašant saugiu el. parašu.\",\n \"provider\": {\n \"@id\": \"https://tavo-domenas.lt/#organization\"\n },\n \"areaServed\": [\n { \"@type\": \"Country\", \"name\": \"Lithuania\" },\n { \"@type\": \"Country\", \"name\": \"Norway\" }\n ],\n \"hasOfferCatalog\": {\n \"@type\": \"OfferCatalog\",\n \"name\": \"Teisinės paslaugos\",\n \"itemListElement\": [\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Santuokos nutraukimo dokumentai\",\n \"description\": \"Pilnas dokumentų paketas teismui.\"\n }\n },\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Nuotolinė teisinė konsultacija\",\n \"description\": \"30-60 min. pokalbis per Zoom arba MS Teams.\"\n }\n }\n ]\n }\n },\n {\n \"@type\": \"FAQPage\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#faq\",\n \"mainEntity\": [\n {\n \"@type\": \"Question\",\n \"name\": \"Kaip vyksta dokumentų pasirašymas$1\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Visi dokumentai paruošiami PDF formatu ir pasirašomi kvalifikuotu elektroniniu parašu (Smart-ID arba Mobile-ID), todėl jums nereikia niekur vykti.\"\n }\n },\n {\n \"@type\": \"Question\",\n \"name\": \"Ar konsultacija teikiama tik darbo valandomis$2\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Konsultacijų laiką deriname individualiai, atsižvelgdami į laiko zonų skirtumus, jei gyvenate užsienyje.\"\n }\n }\n ]\n }\n ]\n}",
"title_h1": "Atstovavimas",
"short_description": "Atstovavimas teisme",
"subtitle": null,
"slug": "atstovavimas",
"icon": null
}
]
}

https://veb.inultimo.lt/items/services/803d6aac-dafb-4162-a3b0-5f96da3952ac

{
"data": {
"id": "803d6aac-dafb-4162-a3b0-5f96da3952ac",
"status": "published",
"sort": 1,
"apie_mane": "efad58db-160d-4dae-8ab8-7cc63f66c81e",
"json_ld": "{\n \"@context\": \"https://schema.org\",\n \"@graph\": [\n {\n \"@type\": \"Service\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#service\",\n \"name\": \"Teisinis dokumentų rengimas nuotoliu\",\n \"serviceType\": \"Legal Document Preparation\",\n \"description\": \"Profesionalus procesinių dokumentų, sutarčių ir ieškinių rengimas. Viskas vyksta el. būdu, pasirašant saugiu el. parašu.\",\n \"provider\": {\n \"@id\": \"https://tavo-domenas.lt/#organization\"\n },\n \"areaServed\": [\n { \"@type\": \"Country\", \"name\": \"Lithuania\" },\n { \"@type\": \"Country\", \"name\": \"Norway\" }\n ],\n \"hasOfferCatalog\": {\n \"@type\": \"OfferCatalog\",\n \"name\": \"Teisinės paslaugos\",\n \"itemListElement\": [\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Santuokos nutraukimo dokumentai\",\n \"description\": \"Pilnas dokumentų paketas teismui.\"\n }\n },\n {\n \"@type\": \"Offer\",\n \"itemOffered\": {\n \"@type\": \"Service\",\n \"name\": \"Nuotolinė teisinė konsultacija\",\n \"description\": \"30-60 min. pokalbis per Zoom arba MS Teams.\"\n }\n }\n ]\n }\n },\n {\n \"@type\": \"FAQPage\",\n \"@id\": \"https://tavo-domenas.lt/paslaugos/dokumentu-rengimas/#faq\",\n \"mainEntity\": [\n {\n \"@type\": \"Question\",\n \"name\": \"Kaip vyksta dokumentų pasirašymas$1\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Visi dokumentai paruošiami PDF formatu ir pasirašomi kvalifikuotu elektroniniu parašu (Smart-ID arba Mobile-ID), todėl jums nereikia niekur vykti.\"\n }\n },\n {\n \"@type\": \"Question\",\n \"name\": \"Ar konsultacija teikiama tik darbo valandomis$2\",\n \"acceptedAnswer\": {\n \"@type\": \"Answer\",\n \"text\": \"Konsultacijų laiką deriname individualiai, atsižvelgdami į laiko zonų skirtumus, jei gyvenate užsienyje.\"\n }\n }\n ]\n }\n ]\n}",
"title_h1": "Teisinė konsultacija",
"short_description": "Teisinės konsultacijos nuotoliniu būdu. Teisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būduTeisinės konsultacijos nuotoliniu būdu",
"subtitle": "Šeimos teisė, Skyrybos, Vaikų ir turto klausimai",
"slug": "teisine-konsultacija",
"icon": "messages-square"
}
}
