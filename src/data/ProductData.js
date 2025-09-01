
import SerumImg from "../assets/Serum.webp";
import HeroProductImg from "../assets/hero-product-img.jpg";
import HeroProductImg1 from "../assets/hero-product-img1.jpg";
import HeroProductImg2 from "../assets/hero-product-img2.jpg";
import MoisturizerImg from "../assets/Moisturizer.webp";
import CleanserImg from "../assets/cleanser.webp";
import SunscreenImg from "../assets/Sunscreen.webp";
import GoldMaskImg from "../assets/24K-Gold-Face-Mask.webp";
import OvernightGlowMaskImg from "../assets/Glow-Mask.webp";
import BrightEyeCreamImg from "../assets/Bright-Eye-Cream.webp";
import TonerImg from "../assets/Toner---2.webp";
import BestSellersImg from "../assets/Best-Sellers_medium.avif";
import NewArrivalsImg from "../assets/2149764841_medium.avif";
import SkincareKitsImg from "../assets/2149879959_medium.avif";

export const products = {
  "product-1": {
    id: "product-1",
    name: "Glow Serum",
    description: "Revitalizing serum for radiant skin",
    longDescription: "Our premium Glow Serum is formulated with advanced ingredients to brighten and even skin tone while providing deep hydration. Perfect for all skin types, this lightweight serum absorbs quickly and delivers visible results.",
    price: 49.99,
    comparePrice: 69.99,
    type: "serum",
    category: "skincare",
    sales: 1250,
    launchDate: "2023-01-15",
    images: [
      SerumImg,
      HeroProductImg,
      HeroProductImg1,
      HeroProductImg2
    ],
    variants: [
      {
        id: "variant-1",
        name: "30ml",
        price: 49.99,
        comparePrice: 69.99
      },
      {
        id: "variant-2", 
        name: "50ml",
        price: 79.99,
        comparePrice: 99.99
      }
    ],
    features: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Hydrates deeply",
      "Suitable for all skin types"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Vitamin C",
          "Hyaluronic Acid", 
          "Niacinamide",
          "Peptides"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply 2-3 drops to clean skin",
          "Use morning and evening",
          "Follow with moisturizer",
          "Use sunscreen during the day"
        ]
      }
    ]
  },
  "product-2": {
    id: "product-2",
    name: "Moisturizing Cream",
    description: "Intensive hydration for dry skin",
    longDescription: "Our rich moisturizing cream provides intense hydration for dry and sensitive skin. Formulated with natural ingredients, it locks in moisture and creates a protective barrier.",
    price: 39.99,
    comparePrice: 59.99,
    type: "moisturizer",
    category: "skincare",
    sales: 2100,
    launchDate: "2022-11-20",
    images: [
      MoisturizerImg,
      HeroProductImg,
      HeroProductImg1
    ],
    variants: [
      {
        id: "variant-3",
        name: "50ml",
        price: 39.99,
        comparePrice: 59.99
      }
    ],
    features: [
      "Intense hydration",
      "Suitable for sensitive skin",
      "Non-comedogenic",
      "24-hour moisture"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Shea Butter",
          "Ceramides",
          "Glycerin",
          "Aloe Vera"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply to clean skin",
          "Use morning and evening",
          "Massage gently until absorbed"
        ]
      }
    ]
  },
  "product-3": {
    id: "product-3",
    name: "Gentle Cleanser",
    description: "Mild cleansing for all skin types",
    longDescription: "Our gentle cleanser removes impurities without stripping your skin of its natural oils. Perfect for daily use, it leaves your skin feeling clean and refreshed.",
    price: 29.99,
    comparePrice: 39.99,
    type: "cleanser",
    category: "skincare",
    sales: 1800,
    launchDate: "2022-09-10",
    images: [
      CleanserImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-4",
        name: "200ml",
        price: 29.99,
        comparePrice: 39.99
      }
    ],
    features: [
      "Gentle formula",
      "Removes makeup",
      "pH balanced",
      "Fragrance-free"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Coconut Oil",
          "Glycerin",
          "Chamomile Extract",
          "Vitamin E"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Wet face with lukewarm water",
          "Apply small amount",
          "Massage gently",
          "Rinse thoroughly"
        ]
      }
    ]
  },
  "product-4": {
    id: "product-4",
    name: "Sunscreen SPF 50",
    description: "Broad spectrum protection",
    longDescription: "Our lightweight sunscreen provides broad spectrum SPF 50 protection while being gentle on your skin. Perfect for daily use under makeup.",
    price: 34.99,
    comparePrice: 44.99,
    type: "sunscreen",
    category: "skincare",
    sales: 950,
    launchDate: "2023-03-05",
    images: [
      SunscreenImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-5",
        name: "50ml",
        price: 34.99,
        comparePrice: 44.99
      }
    ],
    features: [
      "SPF 50 protection",
      "Broad spectrum",
      "Lightweight formula",
      "Non-greasy"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Zinc Oxide",
          "Titanium Dioxide",
          "Aloe Vera",
          "Vitamin E"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply 15 minutes before sun exposure",
          "Reapply every 2 hours",
          "Use daily for best protection"
        ]
      }
    ]
  },
  "product-5": {
    id: "product-5",
    name: "24K Gold Face Mask",
    description: "Luxury gold-infused mask for radiant skin",
    longDescription: "Indulge in luxury with our 24K Gold Face Mask. Infused with real gold particles, this mask brightens, firms, and revitalizes your skin for a radiant, youthful glow.",
    price: 89.99,
    comparePrice: 119.99,
    type: "mask",
    category: "skincare",
    sales: 750,
    launchDate: "2023-06-15",
    images: [
      GoldMaskImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-6",
        name: "50ml",
        price: 89.99,
        comparePrice: 119.99
      }
    ],
    features: [
      "24K gold particles",
      "Brightens skin",
      "Firms and tightens",
      "Anti-aging benefits"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "24K Gold",
          "Collagen",
          "Hyaluronic Acid",
          "Vitamin E"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply to clean skin",
          "Leave on for 15-20 minutes",
          "Rinse with warm water",
          "Use 2-3 times per week"
        ]
      }
    ]
  },
  "product-6": {
    id: "product-6",
    name: "Overnight Glow Mask",
    description: "Sleep mask for morning radiance",
    longDescription: "Wake up to glowing skin with our Overnight Glow Mask. This innovative sleep mask works while you rest, delivering intense hydration and brightening ingredients for a fresh, radiant complexion.",
    price: 54.99,
    comparePrice: 74.99,
    type: "mask",
    category: "skincare",
    sales: 680,
    launchDate: "2023-07-20",
    images: [
      OvernightGlowMaskImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-7",
        name: "50ml",
        price: 54.99,
        comparePrice: 74.99
      }
    ],
    features: [
      "Overnight treatment",
      "Deep hydration",
      "Brightening formula",
      "Non-sticky texture"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Hyaluronic Acid",
          "Vitamin C",
          "Niacinamide",
          "Peptides"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply before bedtime",
          "Leave on overnight",
          "Rinse in the morning",
          "Use 3-4 times per week"
        ]
      }
    ]
  },
  "product-7": {
    id: "product-7",
    name: "Bright Eye Cream",
    description: "Targeted treatment for under-eye area",
    longDescription: "Revitalize tired eyes with our Bright Eye Cream. This lightweight formula reduces dark circles, puffiness, and fine lines while brightening the delicate under-eye area.",
    price: 44.99,
    comparePrice: 59.99,
    type: "eye cream",
    category: "skincare",
    sales: 420,
    launchDate: "2023-08-10",
    images: [
      BrightEyeCreamImg,
      HeroProductImg1
    ],
    variants: [
      {
        id: "variant-8",
        name: "15ml",
        price: 44.99,
        comparePrice: 59.99
      }
    ],
    features: [
      "Reduces dark circles",
      "Minimizes puffiness",
      "Brightens under-eye area",
      "Gentle formula"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Caffeine",
          "Vitamin K",
          "Hyaluronic Acid",
          "Peptides"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply to under-eye area",
          "Use morning and evening",
          "Gently pat until absorbed",
          "Avoid getting in eyes"
        ]
      }
    ]
  },
  "product-8": {
    id: "product-8",
    name: "Hydrating Toner",
    description: "Refreshing toner for balanced skin",
    longDescription: "Balance and refresh your skin with our Hydrating Toner. This alcohol-free formula removes residual impurities while providing essential hydration and maintaining your skin's natural pH balance.",
    price: 24.99,
    comparePrice: 34.99,
    type: "toner",
    category: "skincare",
    sales: 890,
    launchDate: "2023-02-28",
    images: [
      TonerImg,
      HeroProductImg2
    ],
    variants: [
      {
        id: "variant-9",
        name: "200ml",
        price: 24.99,
        comparePrice: 34.99
      }
    ],
    features: [
      "Alcohol-free formula",
      "Maintains pH balance",
      "Provides hydration",
      "Refreshes skin"
    ],
    detailsSections: [
      {
        title: "Ingredients",
        items: [
          "Rose Water",
          "Glycerin",
          "Aloe Vera",
          "Chamomile"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply after cleansing",
          "Use cotton pad or hands",
          "Follow with serum",
          "Use morning and evening"
        ]
      }
    ]
  },
  "product-9": {
    id: "product-9",
    name: "Vitamin C Brightening Kit",
    description: "Complete brightening routine in one kit",
    longDescription: "Transform your skin with our Vitamin C Brightening Kit. This comprehensive set includes a cleanser, serum, and moisturizer formulated with potent Vitamin C to brighten, even skin tone, and protect against environmental damage.",
    price: 129.99,
    comparePrice: 179.99,
    type: "kit",
    category: "skincare",
    sales: 1560,
    launchDate: "2023-04-12",
    images: [
      SkincareKitsImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-10",
        name: "Complete Kit",
        price: 129.99,
        comparePrice: 179.99
      }
    ],
    features: [
      "Complete brightening routine",
      "Vitamin C formula",
      "Protects against damage",
      "Even skin tone"
    ],
    detailsSections: [
      {
        title: "Kit Contents",
        items: [
          "Vitamin C Cleanser (100ml)",
          "Vitamin C Serum (30ml)",
          "Vitamin C Moisturizer (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Cleanse with Vitamin C cleanser",
          "Apply Vitamin C serum",
          "Follow with Vitamin C moisturizer",
          "Use morning and evening"
        ]
      }
    ]
  },
  "product-10": {
    id: "product-10",
    name: "Anti-Aging Night Set",
    description: "Advanced night care for youthful skin",
    longDescription: "Wake up to younger-looking skin with our Anti-Aging Night Set. This powerful combination of retinol, peptides, and antioxidants works overnight to reduce fine lines, improve texture, and boost collagen production.",
    price: 149.99,
    comparePrice: 199.99,
    type: "kit",
    category: "skincare",
    sales: 2100,
    launchDate: "2022-12-05",
    images: [
      BestSellersImg,
      HeroProductImg1
    ],
    variants: [
      {
        id: "variant-11",
        name: "Complete Set",
        price: 149.99,
        comparePrice: 199.99
      }
    ],
    features: [
      "Advanced anti-aging formula",
      "Retinol and peptides",
      "Overnight treatment",
      "Boosts collagen"
    ],
    detailsSections: [
      {
        title: "Set Contents",
        items: [
          "Retinol Night Serum (30ml)",
          "Peptide Night Cream (50ml)",
          "Eye Treatment Gel (15ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply retinol serum first",
          "Follow with peptide cream",
          "Use eye gel around eyes",
          "Use only at night"
        ]
      }
    ]
  },
  "product-11": {
    id: "product-11",
    name: "Acne Control System",
    description: "Complete solution for clear skin",
    longDescription: "Combat breakouts with our Acne Control System. This three-step system targets acne at every stage, from prevention to treatment, helping you achieve clear, healthy skin without irritation.",
    price: 89.99,
    comparePrice: 119.99,
    type: "kit",
    category: "skincare",
    sales: 1350,
    launchDate: "2023-09-15",
    images: [
      NewArrivalsImg,
      HeroProductImg2
    ],
    variants: [
      {
        id: "variant-12",
        name: "Complete System",
        price: 89.99,
        comparePrice: 119.99
      }
    ],
    features: [
      "Three-step system",
      "Gentle on skin",
      "Prevents breakouts",
      "Reduces inflammation"
    ],
    detailsSections: [
      {
        title: "System Contents",
        items: [
          "Acne Control Cleanser (150ml)",
          "Acne Treatment Serum (30ml)",
          "Acne Control Moisturizer (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Cleanse with acne cleanser",
          "Apply treatment serum",
          "Follow with control moisturizer",
          "Use morning and evening"
        ]
      }
    ]
  },
  "product-12": {
    id: "product-12",
    name: "Hydration Boost Set",
    description: "Intensive moisture for dehydrated skin",
    longDescription: "Revive dehydrated skin with our Hydration Boost Set. This moisture-locking system combines hyaluronic acid, ceramides, and natural oils to restore your skin's moisture barrier and provide long-lasting hydration.",
    price: 109.99,
    comparePrice: 149.99,
    type: "kit",
    category: "skincare",
    sales: 980,
    launchDate: "2023-05-20",
    images: [
      MoisturizerImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-13",
        name: "Complete Set",
        price: 109.99,
        comparePrice: 149.99
      }
    ],
    features: [
      "Intensive hydration",
      "Restores moisture barrier",
      "Long-lasting results",
      "Suitable for all skin types"
    ],
    detailsSections: [
      {
        title: "Set Contents",
        items: [
          "Hydrating Cleanser (150ml)",
          "Hyaluronic Acid Serum (30ml)",
          "Moisture Lock Cream (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Start with hydrating cleanser",
          "Apply hyaluronic acid serum",
          "Finish with moisture lock cream",
          "Use morning and evening"
        ]
      }
    ]
  },
  "product-13": {
    id: "product-13",
    name: "Sensitive Skin Care Kit",
    description: "Gentle care for reactive skin",
    longDescription: "Nurture sensitive skin with our specially formulated Sensitive Skin Care Kit. Free from common irritants, this gentle system soothes, calms, and strengthens your skin's natural barrier function.",
    price: 94.99,
    comparePrice: 129.99,
    type: "kit",
    category: "skincare",
    sales: 720,
    launchDate: "2023-10-08",
    images: [
      CleanserImg,
      HeroProductImg1
    ],
    variants: [
      {
        id: "variant-14",
        name: "Complete Kit",
        price: 94.99,
        comparePrice: 129.99
      }
    ],
    features: [
      "Fragrance-free",
      "Hypoallergenic",
      "Strengthens barrier",
      "Calms irritation"
    ],
    detailsSections: [
      {
        title: "Kit Contents",
        items: [
          "Gentle Cleanser (200ml)",
          "Calming Serum (30ml)",
          "Barrier Repair Cream (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Use gentle cleanser",
          "Apply calming serum",
          "Finish with barrier cream",
          "Use as needed"
        ]
      }
    ]
  },
  "product-14": {
    id: "product-14",
    name: "Mature Skin Revival Kit",
    description: "Comprehensive care for mature skin",
    longDescription: "Turn back time with our Mature Skin Revival Kit. This advanced system combines powerful anti-aging ingredients to reduce fine lines, improve elasticity, and restore youthful radiance to mature skin.",
    price: 169.99,
    comparePrice: 229.99,
    type: "kit",
    category: "skincare",
    sales: 890,
    launchDate: "2023-01-30",
    images: [
      GoldMaskImg,
      HeroProductImg2
    ],
    variants: [
      {
        id: "variant-15",
        name: "Complete Kit",
        price: 169.99,
        comparePrice: 229.99
      }
    ],
    features: [
      "Advanced anti-aging",
      "Improves elasticity",
      "Reduces fine lines",
      "Restores radiance"
    ],
    detailsSections: [
      {
        title: "Kit Contents",
        items: [
          "Firming Serum (30ml)",
          "Elasticity Cream (50ml)",
          "Lifting Mask (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Apply firming serum",
          "Follow with elasticity cream",
          "Use lifting mask weekly",
          "Use morning and evening"
        ]
      }
    ]
  },
  "product-15": {
    id: "product-15",
    name: "Teen Skincare Starter Kit",
    description: "Essential care for teenage skin",
    longDescription: "Start your skincare journey right with our Teen Skincare Starter Kit. This gentle, age-appropriate system teaches proper skincare habits while addressing common teen skin concerns like oil control and breakouts.",
    price: 69.99,
    comparePrice: 89.99,
    type: "kit",
    category: "skincare",
    sales: 650,
    launchDate: "2023-11-12",
    images: [
      SunscreenImg,
      HeroProductImg
    ],
    variants: [
      {
        id: "variant-16",
        name: "Complete Kit",
        price: 69.99,
        comparePrice: 89.99
      }
    ],
    features: [
      "Age-appropriate formulas",
      "Teaches good habits",
      "Controls oil",
      "Prevents breakouts"
    ],
    detailsSections: [
      {
        title: "Kit Contents",
        items: [
          "Gentle Teen Cleanser (150ml)",
          "Oil Control Toner (200ml)",
          "Lightweight Moisturizer (50ml)"
        ]
      },
      {
        title: "How to Use",
        items: [
          "Cleanse morning and evening",
          "Tone to control oil",
          "Moisturize to hydrate",
          "Build routine gradually"
        ]
      }
    ]
  }
};
