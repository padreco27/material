const products = [
  // Cimento e Argamassas
  {
    id: 1,
    name: "Cimento CP II-F 32 50kg",
    code: "CTL-1001",
    category: "cimento-e-argamassas",
    brand: "Votoran",
    price: 34.90,
    unit: "saco",
    availability: true,
    rating: 4.8,
    reviewsCount: 142,
    shortDescription: "Cimento Portland composto, ideal para obras em geral, rebocos e concreto.",
    description: "O Cimento CP II-F 32 Votoran é um cimento Portland composto com filer, que oferece excelente trabalhabilidade, resistência e durabilidade. É o cimento mais versátil do mercado, recomendado para praticamente todas as etapas da obra, desde a fundação até o acabamento fino.",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Tipo": "CP II-F 32 (Composto com Filer)",
      "Peso": "50 kg",
      "Norma": "NBR 16697",
      "Tempo de Cura Inicial": "Cerca de 5 horas",
      "Indicação": "Reboco, concreto convencional, assentamento de tijolos, contrapiso."
    },
    applications: [
      "Preparação de argamassas de assentamento e revestimento.",
      "Concreto estrutural e não estrutural.",
      "Estruturas de fundação e lajes.",
      "Pequenos reparos e calçadas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video placeholder format
    relatedIds: [2, 3, 4]
  },
  {
    id: 2,
    name: "Cimento CP III-35 RS 50kg",
    code: "CTL-1002",
    category: "cimento-e-argamassas",
    brand: "LafargeHolcim",
    price: 32.50,
    unit: "saco",
    availability: true,
    rating: 4.7,
    reviewsCount: 88,
    shortDescription: "Cimento de alto-forno com alta durabilidade e alta resistência a sulfatos.",
    description: "O Cimento Portland de Alto-Forno CP III-35 RS é ideal para obras expostas a meios agressivos, como esgotos, águas marinhas e solos sulfatados. Oferece baixo calor de hidratação, maior impermeabilidade e excelente ganho de resistência a longo prazo.",
    images: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Tipo": "CP III-35 RS (Alto-Forno Resistente a Sulfatos)",
      "Peso": "50 kg",
      "Norma": "NBR 16697",
      "Resistência Mínima (28 dias)": "35 MPa",
      "Indicação": "Obras marítimas, saneamento, fundações profundas, barragens."
    },
    applications: [
      "Concretos de alta durabilidade e baixa porosidade.",
      "Fundações e estruturas enterradas.",
      "Argamassas industriais.",
      "Pavimentos de concreto."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [1, 3]
  },
  {
    id: 3,
    name: "Argamassa AC1 Cinza 20kg",
    code: "CTL-1003",
    category: "cimento-e-argamassas",
    brand: "Quartzolit",
    price: 13.90,
    unit: "saco",
    availability: true,
    rating: 4.6,
    reviewsCount: 115,
    shortDescription: "Argamassa colante para assentamento de cerâmicas em áreas internas.",
    description: "A Argamassa AC1 Quartzolit é ideal para o assentamento de revestimentos cerâmicos em pisos e paredes de áreas internas. Possui excelente aderência e trabalhabilidade, facilitando a aplicação e garantindo um resultado firme e seguro para pisos de formato até 60x60 cm.",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Classificação": "AC-I NBR 14081",
      "Peso": "20 kg",
      "Consumo Médio": "4 a 7.5 kg/m²",
      "Tempo em Aberto": "≥ 15 minutos",
      "Cor": "Cinza"
    },
    applications: [
      "Assentamento de cerâmicas internas em pisos.",
      "Assentamento de cerâmicas internas em paredes.",
      "Áreas residenciais e comerciais cobertas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [1, 4, 5]
  },
  {
    id: 4,
    name: "Argamassa AC2 Cinza 20kg",
    code: "CTL-1004",
    category: "cimento-e-argamassas",
    brand: "Quartzolit",
    price: 21.90,
    unit: "saco",
    availability: true,
    rating: 4.8,
    reviewsCount: 97,
    shortDescription: "Argamassa colante para áreas externas e internas, fachadas e garagens.",
    description: "A Argamassa AC2 Quartzolit é uma argamassa colante industrializada de alta aderência e flexibilidade. É indicada para o assentamento de cerâmicas em pisos e paredes de áreas externas e internas, além de piscinas residenciais não aquecidas, garagens e fachadas.",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Classificação": "AC-II NBR 14081",
      "Peso": "20 kg",
      "Consumo Médio": "4.5 a 8 kg/m²",
      "Tempo para Tráfego Leve": "72 horas",
      "Cor": "Cinza"
    },
    applications: [
      "Assentamento de pisos cerâmicos em áreas externas.",
      "Assentamento de paredes em fachadas de prédios.",
      "Pisos de alto tráfego (garagens e calçadas comerciais).",
      "Paredes de banheiros, cozinhas e lavanderias."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [3, 5, 26]
  },
  {
    id: 5,
    name: "Rejunte Flexível Impermeável 1kg",
    code: "CTL-1005",
    category: "cimento-e-argamassas",
    brand: "Quartzolit",
    price: 8.50,
    unit: "unidade",
    availability: true,
    rating: 4.5,
    reviewsCount: 160,
    shortDescription: "Rejunte cimentício colorido, flexível e resinado com proteção contra fungos.",
    description: "O Rejunte Flexível Quartzolit é um produto resinado, impermeável e de fácil limpeza. Indicado para juntas de 2 a 10 mm em pisos e paredes, áreas internas e externas. Sua fórmula contém aditivos que evitam o surgimento de mofo e fungos, garantindo cores vivas por muito mais tempo.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Espessura da Junta": "2 a 10 mm",
      "Peso": "1 kg",
      "Tempo de Liberação": "24 horas",
      "Indicação": "Cerâmicas, porcelanatos, pedras naturais.",
      "Resistência a Fungos": "Sim (Antifungo)"
    },
    applications: [
      "Rejuntamento de pisos e paredes internas e externas.",
      "Acabamento de juntas em áreas molhadas (banheiros e cozinhas).",
      "Indicado para cerâmicas esmaltadas ou rústicas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [3, 4, 27]
  },

  // Estrutural
  {
    id: 6,
    name: "Tijolo Baiano 8 Furos 9x19x19cm",
    code: "CTL-2001",
    category: "estrutural",
    brand: "Cerâmica Sul",
    price: 0.95,
    unit: "milheiro",
    unitPrice: 0.95,
    availability: true,
    rating: 4.4,
    reviewsCount: 210,
    shortDescription: "Tijolo cerâmico de vedação de excelente qualidade física e térmica.",
    description: "O Tijolo Cerâmico Baiano de 8 furos é o mais utilizado na alvenaria de vedação no Brasil. Com ranhuras que facilitam a aderência da argamassa, oferece ótimo isolamento térmico e acústico para as paredes internas e externas da sua residência ou galpão.",
    images: [
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Dimensões": "9 x 19 x 19 cm (Largura x Altura x Comprimento)",
      "Peso Unitário": "Cerca de 1.8 kg",
      "Rendimento": "25 peças por m²",
      "Função": "Alvenaria de vedação (não estrutural)",
      "Quantidade mínima": "Pacote com 100 ou Milheiro (1000 peças)"
    },
    applications: [
      "Construção de paredes divisórias internas.",
      "Paredes externas de fechamento de estruturas de concreto armado.",
      "Muros divisórios."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [7, 8, 10]
  },
  {
    id: 7,
    name: "Bloco de Concreto Estrutural 14x19x39cm",
    code: "CTL-2002",
    category: "estrutural",
    brand: "Pedreira Ideal",
    price: 3.40,
    unit: "unidade",
    availability: true,
    rating: 4.6,
    reviewsCount: 95,
    shortDescription: "Bloco de concreto classe A de alta resistência para alvenaria estrutural.",
    description: "Bloco de concreto classe A produzido sob rígido controle de qualidade. Possui faces perfeitamente planas e cantos vivos, economizando argamassa de revestimento. Desenvolvido para alvenaria estrutural, suporta cargas elevadas eliminando a necessidade de pilares em sobrados ou casas térreas.",
    images: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Dimensões": "14 x 19 x 39 cm",
      "Resistência Mínima": "4.5 MPa",
      "Rendimento": "12.5 peças por m²",
      "Peso Unitário": "Cerca de 11.5 kg",
      "Norma": "NBR 6136"
    },
    applications: [
      "Alvenaria estrutural autoportante.",
      "Muros de arrimo de grande porte.",
      "Galpões industriais e comerciais."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [6, 8, 9]
  },
  {
    id: 8,
    name: "Canaleta de Concreto 14x19x39cm",
    code: "CTL-2003",
    category: "estrutural",
    brand: "Pedreira Ideal",
    price: 3.80,
    unit: "unidade",
    availability: true,
    rating: 4.5,
    reviewsCount: 78,
    shortDescription: "Canaleta em 'U' de concreto para vigas de respaldo e vergas.",
    description: "A Canaleta de Concreto em formato de 'U' serve como fôrma perdida para a concretagem de vigas de respaldo, vergas sobre portas/janelas e contravergas. Facilita o processo de armação de ferro e concretagem, conferindo altíssima resistência estrutural ao conjunto da parede.",
    images: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Dimensões": "14 x 19 x 39 cm",
      "Formato": "Canaleta U",
      "Peso Unitário": "Cerca de 9.5 kg",
      "Material": "Cimento, areia, brita pedrisco e água",
      "Norma": "NBR 6136"
    },
    applications: [
      "Confecção de vergas sobre aberturas de portas e janelas.",
      "Confecção de contravergas sob aberturas de janelas.",
      "Cintamento de respaldo de paredes estruturais."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [7, 9, 10]
  },
  {
    id: 9,
    name: "Laje Treliçada H8 EPS (Isopor) m²",
    code: "CTL-2004",
    category: "estrutural",
    brand: "Lajes Forte",
    price: 49.90,
    unit: "m²",
    availability: true,
    rating: 4.9,
    reviewsCount: 65,
    shortDescription: "Laje treliçada leve com enchimento de placas de EPS (Isopor). Preço por m².",
    description: "A Laje Treliçada H8 com EPS é a solução ideal para construções residenciais e comerciais de pequeno porte. Extremamente leve e fácil de montar, proporciona excelente isolamento térmico e acústico, além de reduzir o peso próprio da estrutura sobre as fundações e reduzir o consumo de escoramento.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Altura da Laje H": "8 cm (Treliça + Base)",
      "Espessura da Capa": "4 a 5 cm de concreto recomendado",
      "Enchimento": "Placas de EPS (Poliestireno Expandido)",
      "Carga Admissível": "Recomendado para residências (150 kgf/m²)",
      "Vão Livre Máximo": "Até 4.5 metros"
    },
    applications: [
      "Lajes de forro residenciais.",
      "Lajes de piso residenciais e escritórios.",
      "Obras que requerem isolamento térmico avançado."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [1, 10, 15]
  },
  {
    id: 10,
    name: "Coluna Pronta Armada 3/8' (10mm) 3 Metros",
    code: "CTL-2005",
    category: "estrutural",
    brand: "Gerdau",
    price: 98.90,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 110,
    shortDescription: "Coluna de aço pronta soldada para vigas e colunas. Praticidade na obra.",
    description: "A Coluna Pronta de Aço Gerdau (também conhecida como baldrame ou coluna armada) é fabricada com vergalhões de aço CA-50 de 10mm e estribos CA-60 de 5mm, espaçados a cada 20cm. Já vem pronta para uso, otimizando o cronograma da obra e reduzindo o desperdício de arames e aço.",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Bitola do Ferro Principal": "10.0 mm (3/8')",
      "Bitola do Estribo": "5.0 mm",
      "Espaçamento Estribos": "A cada 20 cm",
      "Dimensão da Seção": "7 x 14 cm",
      "Comprimento": "3 metros"
    },
    applications: [
      "Fundações de baldrames.",
      "Execução de pilares (colunas verticais).",
      "Vigas aéreas de travamento.",
      "Vergas e cintamentos de muros."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [11, 14, 15]
  },

  // Ferragens
  {
    id: 11,
    name: "Vergalhão Gerdau CA-50 10mm (3/8') Barra 12m",
    code: "CTL-3001",
    category: "ferragens",
    brand: "Gerdau",
    price: 68.50,
    unit: "barra",
    availability: true,
    rating: 4.9,
    reviewsCount: 185,
    shortDescription: "Vergalhão de aço nervurado CA-50 para estruturas de concreto armado.",
    description: "O Vergalhão CA-50 Gerdau possui nervuras que garantem alta aderência do aço ao concreto. Com excelente capacidade de dobra e soldabilidade, é o aço padrão utilizado em vigas, lajes, pilares, fundações e sapatas de residências de alto padrão e prédios comerciais.",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Norma": "NBR 7480",
      "Bitola": "10.0 mm (3/8')",
      "Comprimento da Barra": "12 metros (dobrada para transporte)",
      "Categoria": "CA-50 (Nervurado)",
      "Peso Teórico": "0.617 kg/m"
    },
    applications: [
      "Armação de sapatas e blocos de fundação.",
      "Montagem de vigas estruturais e baldrames.",
      "Armadura complementar de lajes maciças.",
      "Pilares de concreto armado."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [10, 12, 15]
  },
  {
    id: 12,
    name: "Arame Recozido Gerdau BWG 18 Rolo 1kg",
    code: "CTL-3002",
    category: "ferragens",
    brand: "Gerdau",
    price: 19.90,
    unit: "rolo",
    availability: true,
    rating: 4.7,
    reviewsCount: 154,
    shortDescription: "Arame recozido macio para amarração de ferragens e vergalhões.",
    description: "O Arame Recozido Gerdau é produzido com baixo teor de carbono, passando por tratamento térmico que confere grande flexibilidade e ductilidade. É extremamente macio e resistente, ideal para realizar amarrações rápidas e firmes de vergalhões na montagem de ferragens de obra.",
    images: [
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Espessura (BWG)": "18",
      "Diâmetro Nominal": "1.24 mm",
      "Peso do Rolo": "1 kg",
      "Material": "Aço de baixo teor de carbono recozido",
      "Rendimento Aprox.": "100 metros por rolo"
    },
    applications: [
      "Amarração de vergalhões CA-50/CA-60.",
      "Fixação de espaçadores plásticos.",
      "Amarrar formas de madeira para pilares e vigas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [10, 11, 13]
  },
  {
    id: 13,
    name: "Arame Galvanizado Gerdau 14 BWG Rolo 1kg",
    code: "CTL-3003",
    category: "ferragens",
    brand: "Gerdau",
    price: 24.90,
    unit: "rolo",
    availability: true,
    rating: 4.6,
    reviewsCount: 68,
    shortDescription: "Arame com camada de zinco para alta resistência à oxidação em cercas e amarras.",
    description: "O Arame Galvanizado Gerdau passa por um banho de zinco (galvanização a quente) que confere excelente resistência contra corrosão gerada pelas intempéries. Indicado para amarrações externas, fixação de forros de gesso cartonado, alambrados de proteção e confecção de telas artesanais.",
    images: [
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Espessura (BWG)": "14",
      "Diâmetro Nominal": "2.11 mm",
      "Peso do Rolo": "1 kg",
      "Camada de Zinco": "Capa protetora padrão leve",
      "Resistência à Tração": "Moderada"
    },
    applications: [
      "Instalação e alinhamento de forros de gesso.",
      "Amarrar telas de alambrados industriais e residenciais.",
      "Uso agropecuário em parreiras de frutas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [12, 14]
  },
  {
    id: 14,
    name: "Tela Soldada Nervurada Q92 Gerdau 2x3m",
    code: "CTL-3004",
    category: "ferragens",
    brand: "Gerdau",
    price: 92.00,
    unit: "peça",
    availability: true,
    rating: 4.8,
    reviewsCount: 42,
    shortDescription: "Tela soldada de aço de alta resistência para pisos de garagem e calçadas.",
    description: "A Tela de Aço Soldada Q92 é confeccionada em aço CA-60 nervurado, soldada por eletrofusão em todos os pontos de cruzamento. É recomendada para a armação de concreto em lajes de piso, contrapisos, garagens residenciais e calçadas públicas, prevenindo trincas e rachaduras indesejadas.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Malha da Tela": "15 x 15 cm",
      "Bitola do Aço": "4.2 mm",
      "Dimensão da Peça": "2.0 x 3.0 metros",
      "Área de Cobertura": "6.0 m²",
      "Tipo de Malha": "Quadrada Q92"
    },
    applications: [
      "Armadura para calçadas públicas residenciais.",
      "Contrapiso com tráfego leve de veículos (garagens domésticas).",
      "Lajes pré-moldadas de forro e piso."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [1, 9, 11]
  },
  {
    id: 15,
    name: "Treliça de Aço Gerdau H8 6 Metros",
    code: "CTL-3005",
    category: "ferragens",
    brand: "Gerdau",
    price: 36.90,
    unit: "barra",
    availability: true,
    rating: 4.8,
    reviewsCount: 82,
    shortDescription: "Treliça H8 de aço nervurado para confecção de vigotas e lajes.",
    description: "A Treliça de Aço Gerdau H8 é uma estrutura eletrossoldada tridimensional que confere excelente rigidez para vigotas de lajes pré-moldadas. Garante grande capacidade de vencer vãos com menor consumo de concreto e madeira para escoras, oferecendo estabilidade superior à laje.",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Altura Total H": "8 cm",
      "Comprimento da Barra": "6 metros",
      "Aço Superior": "6.0 mm",
      "Diagonais (Sinuoso)": "4.2 mm",
      "Aço Inferior": "5.0 mm"
    },
    applications: [
      "Fabricação de vigotas treliçadas para laje H8.",
      "Espaçador de armaduras em lajes maciças duplas.",
      "Estruturação de placas pré-moldadas de concreto."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [9, 10, 11]
  },

  // Hidráulica
  {
    id: 16,
    name: "Tubo PVC Soldável Marrom 25mm 6m",
    code: "CTL-4001",
    category: "hidraulica",
    brand: "Tigre",
    price: 24.50,
    unit: "barra",
    availability: true,
    rating: 4.9,
    reviewsCount: 224,
    shortDescription: "Tubo de PVC soldável marrom para condução de água fria potável sob pressão.",
    description: "O Tubo de PVC Soldável Tigre de 25mm (equivalente a 3/4') é fabricado em PVC rígido de alto desempenho. Desenvolvido para condução de água fria em instalações hidráulicas residenciais, comerciais ou industriais de forma durável e segura, suportando até 7,5 kgf/cm² a 20°C.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Diâmetro Externo": "25 mm (3/4')",
      "Comprimento da Barra": "6 metros",
      "Material": "PVC Rígido Marrom",
      "Norma": "NBR 5648",
      "Classe de Pressão": "PN 750 (75 mca)"
    },
    applications: [
      "Instalações internas de água fria em banheiros, cozinhas e lavanderias.",
      "Redes principais de distribuição de água residencial.",
      "Sistemas de irrigação doméstica e de jardins."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [17, 18, 19]
  },
  {
    id: 17,
    name: "Joelho 90 Graus Soldável 25mm",
    code: "CTL-4002",
    category: "hidraulica",
    brand: "Tigre",
    price: 1.20,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 310,
    shortDescription: "Joelho de 90° de PVC soldável marrom para conexões e curvas hidráulicas.",
    description: "Joelho de 90° (cotovelo) Tigre de 25mm para mudanças de direção na tubulação de água fria. Fabricado com junta soldável por meio de adesivo plástico para PVC, garantindo estanqueidade perfeita e sem risco de vazamento quando instalado corretamente.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Diâmetro Nominal": "25 mm",
      "Ângulo de Curva": "90 graus",
      "Material": "PVC Marrom Rígido",
      "Tipo de Acoplamento": "Soldável (adesivo/cola)",
      "Norma": "NBR 5648"
    },
    applications: [
      "Mudança de direção vertical ou horizontal de tubos de 25mm.",
      "Conexão de saídas de ramais de torneiras e registros.",
      "Estruturas hidráulicas de encanamento em geral."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [16, 19]
  },
  {
    id: 18,
    name: "Caixa d'Água Polietileno 1000 Litros",
    code: "CTL-4003",
    category: "hidraulica",
    brand: "Fortlev",
    price: 389.00,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 118,
    shortDescription: "Caixa d'água de polietileno azul de alta densidade com tampa de rosca segura.",
    description: "A Caixa d'Água Fortlev de 1000 Litros possui superfícies internas perfeitamente lisas que facilitam a limpeza periódica. É fabricada com polietileno 100% virgem e proteção anti-UV, garantindo durabilidade máxima da estrutura da caixa e qualidade superior para o armazenamento de água fria.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Capacidade Volumétrica": "1.000 Litros",
      "Material": "Polietileno de alta densidade",
      "Diâmetro da Base": "Cerca de 1.40 m",
      "Altura Total (com tampa)": "0.95 m",
      "Fechamento": "Tampa com sistema de rosca de 1/4 de volta"
    },
    applications: [
      "Armazenamento residencial de água potável fria.",
      "Instalação no forro de casas térreas ou sobrados.",
      "Sistemas de captação de água de chuva (não potável)."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [16, 19, 20]
  },
  {
    id: 19,
    name: "Registro de Pressão Metal Deca 3/4'",
    code: "CTL-4004",
    category: "hidraulica",
    brand: "Deca",
    price: 79.90,
    unit: "unidade",
    availability: true,
    rating: 4.7,
    reviewsCount: 84,
    shortDescription: "Registro de pressão de latão de alta durabilidade para controle do chuveiro.",
    description: "O Registro de Pressão Deca 3/4' possui corpo robusto em liga de cobre (bronze e latão) resistente a corrosões químicas e mecânicas. Projetado para regular o fluxo de água de chuveiros e banheiras com precisão, proporcionando vedação macia e alta longevidade.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Bitola de Conexão": "3/4' (DN 20)",
      "Material": "Liga de cobre, plásticos de engenharia e elastômeros",
      "Rosca de Entrada": "Interna BSP",
      "Mecanismo de Fechamento": "Gaxeta tradicional de alta vedação",
      "Classe de Pressão": "2 a 40 mca"
    },
    applications: [
      "Instalação hidráulica de chuveiros internos e externos.",
      "Controle de banheiras.",
      "Pontos de lavagem que demandam ajuste de vazão fina."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [16, 17, 18]
  },
  {
    id: 20,
    name: "Bomba Periférica Autoaspirante Dancor 1/2 CV",
    code: "CTL-4005",
    category: "hidraulica",
    brand: "Dancor",
    price: 298.00,
    unit: "unidade",
    availability: true,
    rating: 4.5,
    reviewsCount: 52,
    shortDescription: "Bomba d'água elétrica periférica ideal para elevar água para caixas d'água.",
    description: "A Bomba Periférica Dancor AP-2 de 1/2 CV foi projetada para bombeamento de água isenta de sólidos em residências, pequenas irrigações e abastecimento de reservatórios. Possui protetor térmico integrado no motor e rotor em bronze para maior vida útil contra travamentos por oxidação.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Potência do Motor": "1/2 CV (0.37 kW)",
      "Tensão Elétrica": "Bivolt selecionável (127V / 220V)",
      "Sucção Máxima": "Até 8 metros",
      "Altura Manométrica Máx.": "32 mca (metros de coluna d'água)",
      "Vazão Máxima": "2.400 Litros por hora (2.4 m³/h)"
    },
    applications: [
      "Elevação de água de cisternas para caixas d'água elevadas.",
      "Aumento da pressão de água de redes domésticas.",
      "Sistemas de rega automática de canteiros e hortas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [16, 18]
  },

  // Elétrica
  {
    id: 21,
    name: "Cabo Flexível Sil 2.5mm² Rolo 100m",
    code: "CTL-5001",
    category: "elétrica",
    brand: "Sil",
    price: 159.90,
    unit: "rolo",
    availability: true,
    rating: 4.9,
    reviewsCount: 388,
    shortDescription: "Fio elétrico flexível de cobre 2.5mm² indicado para tomadas e circuitos.",
    description: "O Cabo Flexível Sil 2.5mm² é composto por fios de cobre eletrolítico puro e isolação de PVC antichama (BWF). É o cabo mais comum de obras elétricas prediais, ideal para circuitos de tomadas de uso geral (TUGs) de cozinhas, quartos, salas, e de sistemas de iluminação forte.",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Seção Nominal": "2.5 mm²",
      "Comprimento do Rolo": "100 metros",
      "Tensão Máxima de Trabalho": "750V",
      "Classe de Flexibilidade": "Classe 4 (Fácil de passar no conduíte)",
      "Cores Disponíveis": "Preto, Azul, Verde, Vermelho, Amarelo, Branco"
    },
    applications: [
      "Fiação elétrica interna residencial em tomadas de 10A.",
      "Circuitos de iluminação em geral.",
      "Instalações comerciais em eletrodutos e canaletas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [22, 23, 24]
  },
  {
    id: 22,
    name: "Disjuntor Bipolar DIN Siemens 20A",
    code: "CTL-5002",
    category: "elétrica",
    brand: "Siemens",
    price: 36.90,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 145,
    shortDescription: "Disjuntor termomagnético bipolar DIN para proteção contra sobrecargas.",
    description: "O Disjuntor Bipolar Siemens DIN 5SY4220-7 oferece proteção confiável contra sobrecorrentes e curtos-circuitos em instalações elétricas bifásicas. Com disparo rápido e mecanismo termomagnético robusto, é o disjuntor padrão do mercado residencial brasileiro.",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Número de Polos": "2 Polos (Bipolar)",
      "Corrente Nominal": "20A",
      "Curva de Disparo": "Curva C (cargas indutivas leves)",
      "Padrão de Fixação": "Trilho DIN (35 mm)",
      "Capacidade de Ruptura": "3 kA (NBR NM 60898)"
    },
    applications: [
      "Proteção de circuitos bifásicos de tomadas 127V/220V.",
      "Proteção de ar condicionado de médio porte.",
      "Quadros de distribuição de energia residenciais."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [21, 25]
  },
  {
    id: 23,
    name: "Tomada 2P+T 10A Pial Plus Branca",
    code: "CTL-5003",
    category: "elétrica",
    brand: "Legrand",
    price: 11.50,
    unit: "unidade",
    availability: true,
    rating: 4.7,
    reviewsCount: 204,
    shortDescription: "Tomada de embutir 3 pinos 10A com design minimalista moderno.",
    description: "A Tomada Pial Plus+ Legrand possui traços finos e acabamento brilhante que combinam com qualquer ambiente arquitetônico. Sistema modular prático e seguro, em conformidade com o padrão brasileiro de 3 pinos (2 polos + terra). Excelente encaixe de plugs.",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Corrente Máxima": "10A",
      "Tensão": "Até 250V",
      "Configuração": "2P+T (Fase + Neutro + Terra)",
      "Cor": "Branco alto brilho",
      "Tamanho da Placa": "4x2 polegadas"
    },
    applications: [
      "Tomadas de salas, quartos e escritórios para aparelhos cotidianos (TV, computador).",
      "Instalação embutida em caixas de alvenaria ou drywall."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [21, 24]
  },
  {
    id: 24,
    name: "Interruptor Simples Pial Plus 4x2",
    code: "CTL-5004",
    category: "elétrica",
    brand: "Legrand",
    price: 9.90,
    unit: "unidade",
    availability: true,
    rating: 4.6,
    reviewsCount: 182,
    shortDescription: "Interruptor simples com placa 4x2. Design moderno e toque macio.",
    description: "Módulo interruptor simples Pial Plus com placa 4x2 em termoplástico de alta resistência elétrica. Garante mais de 40.000 cliques sob carga nominal sem fadiga nos contatos internos de prata, proporcionando acionamento seguro de lâmpadas LED e eletrônicas.",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Tipo de Acionamento": "Tecla simples basculante",
      "Capacidade": "10A em 250V",
      "Cor": "Branco satinado",
      "Composição": "Placa 4x2 + Suporte + Módulo",
      "Norma": "NBR NM 60669-1"
    },
    applications: [
      "Acionamento de lâmpadas simples em dormitórios, banheiros e garagens.",
      "Instalações elétricas domésticas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [23, 21]
  },
  {
    id: 25,
    name: "Quadro de Distribuição Tigre 16 Disjuntores",
    code: "CTL-5005",
    category: "elétrica",
    brand: "Tigre",
    price: 84.90,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 76,
    shortDescription: "Quadro de embutir de PVC resistente para disjuntores DIN com porta fumê.",
    description: "Quadro de distribuição elétrica Tigre para instalação embutida de até 16 disjuntores monopolares DIN ou 8 bipolares. Confeccionado em PVC autoextinguível (não propaga chama) e com tampa protetora fumê translúcida que embeleza a parede da sala ou corredor.",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Capacidade Disjuntores": "Até 16 disjuntores DIN",
      "Tipo de Instalação": "Embutir na alvenaria",
      "Material": "PVC antichama e tampa PS fumê",
      "Acessórios inclusos": "Trilho de fixação de aço e adesivos identificadores",
      "Grau de Proteção": "IP 40"
    },
    applications: [
      "Quadro elétrico principal para residências de médio porte.",
      "Quadro de circuitos secundários para pavimentos superiores."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [21, 22]
  },

  // Acabamento
  {
    id: 26,
    name: "Porcelanato Bianco Polido 80x80cm Retificado",
    code: "CTL-6001",
    category: "acabamento",
    brand: "Portobello",
    price: 89.90,
    unit: "m²",
    availability: true,
    rating: 4.9,
    reviewsCount: 94,
    shortDescription: "Porcelanato polido retificado de alto brilho e junta de assentamento de 1.5mm.",
    description: "O Porcelanato Bianco Polido da Portobello é sinônimo de luxo e sofisticação. Com bordas retificadas milimetricamente, permite a instalação com juntas quase invisíveis de 1.5mm, gerando amplitude visual em salas, halls e dormitórios internos residenciais.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Medidas": "80 x 80 cm",
      "Acabamento Superficial": "Polido de alto brilho",
      "Borda": "Retificada (corte reto)",
      "Junta Mínima": "1.5 mm",
      "Espessura": "9.5 mm",
      "Caixa Contém": "1.92 m²"
    },
    applications: [
      "Revestimento de pisos internos residenciais de tráfego moderado.",
      "Paredes de salas e banheiros.",
      "Halls de entrada comerciais."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [4, 5, 27]
  },
  {
    id: 27,
    name: "Revestimento Metrô White 10x20cm",
    code: "CTL-6002",
    category: "acabamento",
    brand: "Eliane",
    price: 52.00,
    unit: "m²",
    availability: true,
    rating: 4.8,
    reviewsCount: 135,
    shortDescription: "Plaqueta cerâmica bisotada estilo metrô de Londres para paredes.",
    description: "O Revestimento Metrô White da Eliane é inspirado nas estações de metrô de Londres e Nova Iorque. Com formato retangular 10x20cm e bordas chanfradas (bisotê), proporciona um visual retrô e geométrico muito requisitado por arquitetos para paredes de cozinhas e lavabos.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Medidas": "10 x 20 cm",
      "Formato": "Retangular com Bisotê",
      "Acabamento": "Esmaltado Brilhante",
      "Junta Recomendada": "2 mm",
      "Local de Uso": "Exclusivo para paredes internas (Monoporosa)"
    },
    applications: [
      "Revestimento de paredes internas de banheiros.",
      "Paredes atrás de pias de cozinha (backsplash).",
      "Bares e cafeterias com decoração retrô."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [5, 26, 28]
  },
  {
    id: 28,
    name: "Rodapé Poliestireno Branco 10cm x 2.4m",
    code: "CTL-6003",
    category: "acabamento",
    brand: "Santa Luzia",
    price: 38.50,
    unit: "barra",
    availability: true,
    rating: 4.7,
    reviewsCount: 88,
    shortDescription: "Rodapé de poliestireno reciclado à prova d'água e resistente a cupins.",
    description: "O Rodapé de Poliestireno da Santa Luzia é ecológico, leve e durável. Não mofa, não apodrece, não deforma e é imune a cupins. Já vem pré-pintado de branco, podendo ser instalado diretamente com cola silicone. Possui canal traseiro para fiação.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Altura": "10 cm",
      "Espessura": "16 mm",
      "Comprimento da Barra": "2.40 metros",
      "Material": "Poliestireno reciclado (isopor de alta densidade)",
      "Cor": "Branco (pode ser repintado)"
    },
    applications: [
      "Acabamento de transição de paredes para pisos vinílicos, laminados ou porcelanatos.",
      "Uso em cômodos residenciais secos ou úmidos (banheiros e cozinhas)."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [26, 27]
  },
  {
    id: 29,
    name: "Rejunte Acrílico Bicomponente Prático 1kg",
    code: "CTL-6004",
    category: "acabamento",
    brand: "Quartzolit",
    price: 29.90,
    unit: "unidade",
    availability: true,
    rating: 4.7,
    reviewsCount: 64,
    shortDescription: "Rejunte acrílico extra liso com alta impermeabilidade para porcelanatos.",
    description: "O Rejunte Acrílico Quartzolit é ideal para quem busca acabamento extra liso em porcelanatos e cerâmicas finas. Já vem pronto para uso (basta misturar as bisnagas inclusas), é totalmente impermeável, resistente a manchas e não racha devido à sua elasticidade.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Tipo": "Acrílico impermeável",
      "Espessura de Junta": "1 a 5 mm",
      "Peso da Embalagem": "1 kg",
      "Locais de Uso": "Áreas internas e externas, pisos e paredes",
      "Textura": "Lisa e brilhante"
    },
    applications: [
      "Rejuntamento de porcelanatos retificados com juntas estreitas.",
      "Áreas internas secas e molhadas como banheiros e cozinhas.",
      "Acabamentos de pastilhas de vidro."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [5, 26, 27]
  },
  {
    id: 30,
    name: "Piso Cerâmico Esmaltado 60x60cm PEI 4",
    code: "CTL-6005",
    category: "acabamento",
    brand: "Lef Pisos",
    price: 26.90,
    unit: "m²",
    availability: true,
    rating: 4.5,
    reviewsCount: 120,
    shortDescription: "Piso cerâmico de alta resistência à abrasão, ideal para garagens cobertas.",
    description: "Piso cerâmico clássico com acabamento esmaltado acetinado. Classificação PEI 4, garantindo excelente resistência ao desgaste por tráfego de pessoas e veículos leves. Excelente opção econômica com ótima durabilidade e facilidade de limpeza.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Medidas": "60 x 60 cm",
      "Classificação PEI": "4 (Tráfego de pessoas alto)",
      "Acabamento": "Acetinado fosco",
      "Borda": "Bold (cantos levemente arredondados)",
      "Caixa Contém": "2.20 m²"
    },
    applications: [
      "Pisos de salas de jantar e cozinhas domésticas.",
      "Garagens residenciais cobertas.",
      "Varandas e áreas externas de lazer cobertas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [3, 4, 26]
  },

  // Ferramentas
  {
    id: 31,
    name: "Furadeira de Impacto Bosch GSB 550 RE 550W",
    code: "CTL-7001",
    category: "ferramentas",
    brand: "Bosch",
    price: 249.00,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 295,
    shortDescription: "Furadeira de impacto elétrica 550W com velocidade reversível.",
    description: "A Furadeira de Impacto Bosch GSB 550 RE é uma ferramenta profissional de alta performance e compacta. Com motor potente de 550W, conta com velocidade reversível e gatilho eletrônico para controle preciso no início de furos. Perfura alvenaria, madeira e metais com facilidade.",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Potência Nominal": "550 W",
      "Mandril": "13 mm (1/2')",
      "Rotações sem carga": "0 - 3100 rpm",
      "Função Impacto": "Sim, botão seletor lateral",
      "Tensão": "220V ou 110V (selecionar no orçamento)"
    },
    applications: [
      "Perfurações em paredes de alvenaria e blocos de concreto.",
      "Perfurações de precisão em chapas metálicas ou ferrosas.",
      "Uso em marcenaria leve (móveis e madeiras macias).",
      "Instalação de buchas e fixação de quadros."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [32, 33, 35]
  },
  {
    id: 32,
    name: "Parafusadeira/Furadeira Dewalt 12V Bateria Max",
    code: "CTL-7002",
    category: "ferramentas",
    brand: "Dewalt",
    price: 489.00,
    unit: "unidade",
    availability: true,
    rating: 4.9,
    reviewsCount: 168,
    shortDescription: "Parafusadeira a bateria de íon de lítio 12V com mandril de 3/8'.",
    description: "A Parafusadeira sem fio Dewalt DCD700C2 é leve, compacta e ergonômica. Possui mandril de aperto rápido de 3/8', duas velocidades mecânicas e 15 posições de torque para ajustes finos em parafusamentos repetitivos. Acompanha maleta plástica e carregador bivolt.",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Tensão da Bateria": "12V Lítio MAX",
      "Torque Máximo": "24 Nm",
      "Velocidades": "0-400 e 0-1500 RPM",
      "Mandril": "3/8' (10mm) Aperto Rápido",
      "Luz de LED Integrada": "Sim, para iluminar o local de trabalho"
    },
    applications: [
      "Montagem profissional de móveis planejados.",
      "Instalação de painéis elétricos e canaletas plásticas.",
      "Perfuração rápida em madeiras finas e plásticos rígidos.",
      "Fixação de chapas de drywall."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [31, 35, 36]
  },
  {
    id: 33,
    name: "Esmerilhadeira Angular Bosch GWS 700 710W",
    code: "CTL-7003",
    category: "ferramentas",
    brand: "Bosch",
    price: 279.00,
    unit: "unidade",
    availability: true,
    rating: 4.8,
    reviewsCount: 112,
    shortDescription: "Esmerilhadeira elétrica 710W para corte e desbaste de metais.",
    description: "A Esmerilhadeira GWS 700 da Bosch é projetada para cortes precisos, desbastes, lixamentos e acabamentos em superfícies metálicas e tijolos. Possui corpo super fino com empunhadura ergonômica, facilitando o manuseio por longos períodos sem fadigar o operador.",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Potência": "710 W",
      "Diâmetro do Disco": "115 mm (4.1/2')",
      "Eixo de Rotação": "M14",
      "Rotações": "11.000 rpm",
      "Peso Líquido": "1.7 kg"
    },
    applications: [
      "Corte e desbaste de vergalhões de ferro CA-50.",
      "Lixamento de superfícies metálicas soldadas.",
      "Corte de revestimentos cerâmicos (com disco diamantado)."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [11, 31, 34]
  },
  {
    id: 34,
    name: "Martelo de Unha Tramontina Pro 27mm",
    code: "CTL-7004",
    category: "ferramentas",
    brand: "Tramontina",
    price: 39.90,
    unit: "unidade",
    availability: true,
    rating: 4.6,
    reviewsCount: 220,
    shortDescription: "Martelo de unha de aço forjado com cabo de fibra de vidro emborrachado.",
    description: "Martelo de unha profissional fabricado em aço carbono forjado de alta qualidade, temperado por indução na face de impacto. Cabo em fibra de vidro de alta resistência mecânica com revestimento emborrachado macio (antideslizante) para amortecimento de vibrações.",
    images: [
      "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Diâmetro da Cabeça": "27 mm",
      "Material da Cabeça": "Aço carbono forjado polido",
      "Material do Cabo": "Fibra de vidro com borracha",
      "Peso": "Cerca de 650g",
      "Função da Unha": "Extração de pregos de caixarias"
    },
    applications: [
      "Montagem de fôrmas de madeira para fundações e baldrames.",
      "Fixação de pregos em caibros e ripas de telhado.",
      "Extração de pregos tortos e pequenos trabalhos manuais."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [31, 35, 36]
  },
  {
    id: 35,
    name: "Trena Métrica Stanley Grip 5 Metros",
    code: "CTL-7005",
    category: "ferramentas",
    brand: "Stanley",
    price: 29.90,
    unit: "unidade",
    availability: true,
    rating: 4.7,
    reviewsCount: 195,
    shortDescription: "Trena métrica de bolso 5 metros com revestimento emborrachado anti-impacto.",
    description: "A Trena Stanley Grip de 5m possui corpo em plástico ABS revestido com borracha anti-impacto antiderrapante. Sua fita metálica possui pintura polimerizada anti-risco de alta durabilidade e gancho com ajuste de folga para medições internas e externas exatas.",
    images: [
      "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Comprimento da Fita": "5 metros (16 pés)",
      "Largura da Fita": "19 mm (3/4')",
      "Material da Fita": "Aço carbono com tratamento anticorrosão",
      "Travamento": "Botão de trava deslizante superior",
      "Marcação": "Milímetros e polegadas"
    },
    applications: [
      "Medições gerais de áreas, paredes e vigas de obras.",
      "Verificação de alinhamento e distâncias para cortes de tubos e madeiras."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [32, 34, 36]
  },
  {
    id: 36,
    name: "Nível de Alumínio Stanley 12 Polegadas",
    code: "CTL-7006",
    category: "ferramentas",
    brand: "Stanley",
    price: 34.50,
    unit: "unidade",
    availability: true,
    rating: 4.7,
    reviewsCount: 84,
    shortDescription: "Nível metálico de alumínio com 3 bolhas de alta precisão de leitura.",
    description: "Nível profissional Stanley confeccionado em liga de alumínio perfilada de extrema rigidez estrutural. Possui 3 bolhas de visualização rápida em acrílico resistente a impactos (horizontal, vertical e 45 graus) e base plana fresada para máxima precisão.",
    images: [
      "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Comprimento": "30 cm (12 polegadas)",
      "Material do Perfil": "Alumínio leve anodizado",
      "Número de Ampolas (Bolhas)": "3 (0°, 45° e 90°)",
      "Base Magnética": "Não",
      "Precisão": "1.0 mm por metro"
    },
    applications: [
      "Nivelamento de assentamento de tijolos e blocos de concreto.",
      "Verificação de nível em pisos cerâmicos e porcelanatos.",
      "Instalação perfeitamente horizontal de prateleiras e portas."
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    relatedIds: [6, 26, 35]
  }
];
