import { useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsTrash } from "react-icons/bs";

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 20px;
  z-index: 100;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: white;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    transform: scaleX(${(props) => (props.$active ? 1 : 0)});
    transition: transform 0.3s ease;
  }
`;

const SliderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    transition: all 0.5s ease;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) contrast(1.1);
    transform: scale(1.05);
    transition: all 0.8s ease;
  }

  &:hover {
    &:before {
      background: rgba(0, 0, 0, 0.1);
    }

    img {
      transform: scale(1.1);
      filter: brightness(0.85) contrast(1.15) saturate(1.2);
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  z-index: 2;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: translateY(-20px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  letter-spacing: -2px;
  transform: translateX(0);
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: translateX(20px);
  }
`;

const CardDescription = styled.p`
  color: #ffffff99;
  font-size: 18px;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
  opacity: 0.8;
  transform: translateX(0);
  transition: all 0.5s ease;

  ${Card}:hover & {
    opacity: 1;
    transform: translateX(40px);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  color: white;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
  transform: translateY(0);
  transition: transform 0.5s ease;

  &:before {
    content: "";
    width: 40px;
    height: 1px;
    background: white;
    display: block;
    transition: width 0.5s ease;
  }

  ${Card}:hover & {
    transform: translateY(-10px);

    &:before {
      width: 60px;
    }
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:after {
      font-size: 24px;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .swiper-button-next {
    right: 40px;
    &:after {
      transform: translateX(2px);
    }
    &:hover:after {
      transform: translateX(4px);
    }
    &:active:after {
      transform: translateX(1px);
    }
  }

  .swiper-button-prev {
    left: 40px;
    &:after {
      transform: translateX(-2px);
    }
    &:hover:after {
      transform: translateX(-4px);
    }
    &:active:after {
      transform: translateX(-1px);
    }
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: white;
    opacity: 0.5;
    transition: all 0.3s ease;

    &-active {
      opacity: 1;
      transform: scale(1.2);
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ProductSection = styled.section`
  background: #111;
  padding: 100px 0;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 48px;
  margin-bottom: 40px;
  font-weight: 700;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const ProductCard = styled.div`
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  color: white;
  font-size: 20px;
  margin: 0;
  height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.div`
  color: #00ff88;
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  color: #999;
  font-size: 14px;
  margin: 10px 0;
  line-height: 1.5;
  height: 63px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #00ff88;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc6a;
    transform: scale(1.02);
  }
`;

const CartButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  top: 20px;
  right: 40px;
  background: rgba(0, 255, 136, 0.2);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isOpen ? 0 : 1)};
  visibility: ${(props) => (props.isOpen ? "hidden" : "visible")};

  svg {
    font-size: 24px;
    color: #00ff88;
  }

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    transform: scale(1.1);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #00ff88;
  color: black;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const CartModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-400px")};
  width: 400px;
  height: 100vh;
  background: #1a1a1a;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 999;
  transition: right 0.3s ease;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
`;

const CartTitle = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: #00ff88;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: #222;
  border-radius: 8px;
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.h3`
  color: white;
  font-size: 16px;
  margin: 0;
`;

const CartItemPrice = styled.div`
  color: #00ff88;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 5px;

  svg {
    font-size: 18px;
  }

  &:hover {
    color: #ff0000;
  }
`;

const TotalPrice = styled.div`
  color: white;
  font-size: 20px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
`;

const CheckoutButton = styled.button`
  background: #00ff88;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc6a;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.footer`
  background: #111;
  padding: 60px 0 30px;
  color: white;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FooterColumn = styled.div`
  h3 {
    color: #00ff88;
    margin-bottom: 20px;
    font-size: 18px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        color: #999;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #00ff88;
        }
      }
    }
  }
`;

const CheckoutModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CheckoutForm = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: hidden;
`;

const CheckoutSidebar = styled.div`
  width: 300px;
  background: #222;
  padding: 40px 30px;
  border-right: 1px solid #333;
`;

const CheckoutMain = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
`;

const TabButton = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 16px 20px;
  background: ${(props) => (props.active ? "#00ff88" : "transparent")};
  border: none;
  border-radius: 12px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(props) => (props.active ? "#000" : "#fff")};
  font-weight: ${(props) => (props.active ? "600" : "400")};

  &:hover {
    background: ${(props) => (props.active ? "#00ff88" : "#333")};
  }

  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => (props.active ? "#fff" : "#333")};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    color: ${(props) => (props.active ? "#000" : "#fff")};
  }

  .step-content {
    flex: 1;

    .step-title {
      font-size: 15px;
      margin-bottom: 4px;
    }

    .step-description {
      font-size: 13px;
      color: ${(props) => (props.active ? "#000" : "#999")};
    }
  }
`;

const TabContent = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FormTitle = styled.h3`
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #333;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: #222;
    color: #fff;

    &:focus {
      outline: none;
      border-color: #00ff88;
    }

    &::placeholder {
      color: #666;
    }
  }

  input[type="checkbox"] {
    accent-color: #00ff88;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const PaymentMethod = styled.label<{ active?: boolean }>`
  border: 2px solid ${(props) => (props.active ? "#00ff88" : "#333")};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.active ? "#1a1a1a" : "#222")};

  &:hover {
    border-color: #00ff88;
  }

  input {
    width: 20px;
    height: 20px;
    accent-color: #00ff88;
  }

  img {
    height: 30px;
    object-fit: contain;
  }
`;

const OrderSummary = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #999;
  font-size: 14px;

  &.total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #333;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.primary ? "#00ff88" : "#333")};
  color: ${(props) => (props.primary ? "#000" : "#fff")};
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) => (props.primary ? "#00e676" : "#444")};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const SuccessContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: dropIn 0.5s ease;

  @keyframes dropIn {
    from {
      transform: translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s ease 0.2s both;

  svg {
    color: white;
    font-size: 40px;
    animation: checkmark 0.3s ease 0.7s both;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes checkmark {
    from {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
`;

const SuccessTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
`;

const SuccessText = styled.p`
  color: #999;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const TrackingInfo = styled.div`
  background: #222;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;

  h4 {
    color: #fff;
    margin-bottom: 10px;
    font-size: 16px;
  }

  p {
    color: #999;
    margin: 0;
    font-size: 14px;
  }
`;

const CatSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000)
  );
  const [products] = useState(() => {
    const productTypes = [
      {
        category: "Beds & Furniture",
        items: [
          {
            name: "Luxury Memory Foam Bed",
            priceRange: [49.99, 89.99],
            image:
              "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
          },
          {
            name: "Cat Tree Condo",
            priceRange: [99.99, 199.99],
            image:
              "https://images.unsplash.com/photo-1606675725390-c6b5ec6ce0b1",
          },
          {
            name: "Window Perch Hammock",
            priceRange: [24.99, 45.99],
            image:
              "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13",
          },
          {
            name: "Cozy Cave Bed",
            priceRange: [39.99, 69.99],
            image:
              "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
          },
        ],
      },
      {
        category: "Toys & Entertainment",
        items: [
          {
            name: "Interactive Laser Toy",
            priceRange: [19.99, 34.99],
            image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f",
          },
          {
            name: "Feather Wand Teaser",
            priceRange: [9.99, 19.99],
            image:
              "https://images.unsplash.com/photo-1574158622682-e40e69881006",
          },
          {
            name: "Electronic Mouse Toy",
            priceRange: [14.99, 29.99],
            image:
              "https://images.unsplash.com/photo-1615789591457-74a63395c990",
          },
          {
            name: "Puzzle Treat Dispenser",
            priceRange: [12.99, 24.99],
            image:
              "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13",
          },
        ],
      },
      {
        category: "Food & Treats",
        items: [
          {
            name: "Premium Grain-Free Kibble",
            priceRange: [29.99, 54.99],
            image:
              "https://images.unsplash.com/photo-1589924691995-400dc9ecc119",
          },
          {
            name: "Gourmet Wet Food Pack",
            priceRange: [24.99, 39.99],
            image:
              "https://images.unsplash.com/photo-1585264550248-1778be3b6368",
          },
          {
            name: "Organic Cat Treats",
            priceRange: [8.99, 16.99],
            image:
              "https://images.unsplash.com/photo-1571566882372-1598d88abd90",
          },
          {
            name: "Dental Health Snacks",
            priceRange: [11.99, 21.99],
            image:
              "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
          },
        ],
      },
      {
        category: "Grooming & Care",
        items: [
          {
            name: "Professional Grooming Kit",
            priceRange: [39.99, 79.99],
            image:
              "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf",
          },
          {
            name: "Self-Cleaning Litter Box",
            priceRange: [129.99, 199.99],
            image:
              "https://images.unsplash.com/photo-1585264550248-1778be3b6368",
          },
          {
            name: "Cat Nail Clippers",
            priceRange: [9.99, 19.99],
            image:
              "https://images.unsplash.com/photo-1574158622682-e40e69881006",
          },
          {
            name: "Natural Shampoo",
            priceRange: [14.99, 24.99],
            image:
              "https://images.unsplash.com/photo-1589924691995-400dc9ecc119",
          },
        ],
      },
    ];

    const getRandomPrice = (min: number, max: number) => {
      return Number((Math.random() * (max - min) + min).toFixed(2));
    };

    const getRandomDescription = (name: string, category: string) => {
      const adjectives = [
        "Premium",
        "High-quality",
        "Durable",
        "Comfortable",
        "Luxurious",
        "Essential",
        "Professional",
        "Natural",
      ];
      const benefits = [
        "perfect for your feline friend's daily needs",
        "designed for maximum comfort and enjoyment",
        "made with the finest materials available",
        "trusted by cat owners worldwide",
        "recommended by veterinarians",
        "ideal for cats of all ages and sizes",
      ];

      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const benefit = benefits[Math.floor(Math.random() * benefits.length)];
      return `${adj} ${category.toLowerCase()} product, ${benefit}.`;
    };

    // Generate random products
    return productTypes
      .flatMap((type) =>
        type.items.map((item) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: item.name,
          price: getRandomPrice(item.priceRange[0], item.priceRange[1]),
          description: getRandomDescription(item.name, type.category),
          image: `${item.image}?w=800&auto=format&fit=crop&q=60`,
          category: type.category,
        }))
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 6); // Random 6 products
  });

  const [cartItems, setCartItems] = useState<
    Array<{
      id: number;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }>
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.id === product.id
      );
      if (existingItem) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return prevItems.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, id: Date.now(), quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const catData = [
    {
      image: "cats/erik-jan-leusink-IbPxGLgJiMI-unsplash.jpg",
      name: "Mystic Shadow",
      description:
        "A mysterious black cat with piercing green eyes, embodying the perfect balance of grace and mystery in every graceful movement.",
    },
    {
      image: "cats/jari-hytonen-YCPkW_r_6uA-unsplash.jpg",
      name: "Snow Prince",
      description:
        "With fur as white as fresh snow and eyes that sparkle like diamonds, this majestic feline brings an air of royalty to any space.",
    },
    {
      image: "cats/kari-shea-eMzblc6JmXM-unsplash.jpg",
      name: "Cozy Dreamer",
      description:
        "This gentle soul finds peace in soft blankets and warm sunbeams, sharing comfort and tranquility with everyone around.",
    },
    {
      image: "cats/malek-dridi-0F7GRXNOG7g-unsplash.jpg",
      name: "Urban Explorer",
      description:
        "A curious adventurer who finds joy in discovering new corners of the world, always ready for the next exciting journey.",
    },
    {
      image: "cats/andriyko-podilnyk-RCfi7vgJjUY-unsplash.jpg",
      name: "Twilight Warrior",
      description:
        "In the soft glow of dusk, this magnificent creature comes alive, moving with the silent grace of a natural-born hunter.",
    },
    {
      image: "cats/pacto-visual-cWOzOnSoh6Q-unsplash.jpg",
      name: "Gentle Giant",
      description:
        "Despite the impressive size, this sweet-natured cat has a heart of gold and a purr that could melt the coldest of hearts.",
    },
    {
      image: "cats/paul-hanaoka-w2DsS-ZAP4U-unsplash.jpg",
      name: "Curious Soul",
      description:
        "Every day is a new adventure for this inquisitive feline, whose playful spirit brings joy and laughter to all who meet them.",
    },
    {
      image: "cats/mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg",
      name: "Forest Spirit",
      description:
        "Like a guardian of ancient woods, this cat carries an air of wisdom and mystery in their enchanting gaze.",
    },
    {
      image: "cats/kote-puerto-so5nsYDOdxw-unsplash.jpg",
      name: "Sunlight Seeker",
      description:
        "Finding the perfect sunbeam is an art, and this radiant feline has mastered it with elegant precision.",
    },
    {
      image: "cats/michael-sum-LEpfefQf4rU-unsplash.jpg",
      name: "Night Whispers",
      description:
        "In the quiet of night, this mysterious cat moves like a shadow, telling stories only the moon can hear.",
    },
    {
      image: "cats/manja-vitolic-gKXKBY-C-Dk-unsplash.jpg",
      name: "Serene Sage",
      description:
        "With wisdom beyond years, this peaceful soul brings calm and serenity to any room they grace with their presence.",
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <NavBar>
        <NavLink href="#">HOME</NavLink>
        <NavLink href="#" $active={true}>
          FAVORITES
        </NavLink>
        <NavLink href="#">PROFILE</NavLink>
      </NavBar>
      <CartButton onClick={() => setIsCartOpen(true)} isOpen={isCartOpen}>
        <FiShoppingCart />
        {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
      </CartButton>

      <CartModal isOpen={isCartOpen}>
        <CartContent>
          <CartTitle>
            Shopping Cart
            <CloseButton onClick={() => setIsCartOpen(false)}>
              <IoMdClose />
            </CloseButton>
          </CartTitle>
          <CartList>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <CartItemImage src={item.image} alt={item.name} />
                <CartItemInfo>
                  <CartItemName>{item.name}</CartItemName>
                  <CartItemPrice>
                    ${item.price} × {item.quantity}
                  </CartItemPrice>
                </CartItemInfo>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <BsTrash />
                </RemoveButton>
              </CartItem>
            ))}
          </CartList>
          {cartItems.length > 0 ? (
            <>
              <TotalPrice>
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </TotalPrice>
              <CheckoutButton onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Checkout
              </CheckoutButton>
            </>
          ) : (
            <CartItemName style={{ textAlign: "center", marginTop: "20px" }}>
              Your cart is empty
            </CartItemName>
          )}
        </CartContent>
      </CartModal>

      <CheckoutModal isOpen={isCheckoutOpen}>
        <CheckoutForm>
          <CloseButton
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              color: "#333",
              zIndex: 10,
            }}
            onClick={() => setIsCheckoutOpen(false)}
          >
            <IoMdClose />
          </CloseButton>

          <CheckoutSidebar>
            <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
              <div className="step-number">1</div>
              <div className="step-content">
                <div className="step-title">Customer Details</div>
                <div className="step-description">
                  Your personal information
                </div>
              </div>
            </TabButton>

            <TabButton active={activeTab === 2} onClick={() => setActiveTab(2)}>
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="step-title">Payment Method</div>
                <div className="step-description">
                  Select your payment option
                </div>
              </div>
            </TabButton>

            <TabButton active={activeTab === 3} onClick={() => setActiveTab(3)}>
              <div className="step-number">3</div>
              <div className="step-content">
                <div className="step-title">Confirmation</div>
                <div className="step-description">Review your order</div>
              </div>
            </TabButton>

            <OrderSummary>
              <SummaryItem>
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Shipping</span>
                <span>$5.50</span>
              </SummaryItem>
              <SummaryItem>
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </SummaryItem>
              <SummaryItem className="total">
                <span>Total</span>
                <span>
                  ${(getTotalPrice() + 5.5 + getTotalPrice() * 0.1).toFixed(2)}
                </span>
              </SummaryItem>
            </OrderSummary>
          </CheckoutSidebar>

          <CheckoutMain>
            <TabContent active={activeTab === 1}>
              <FormTitle>Personal Information</FormTitle>
              <FormRow>
                <FormGroup>
                  <label>First Name *</label>
                  <input type="text" placeholder="John" />
                </FormGroup>
                <FormGroup>
                  <label>Last Name *</label>
                  <input type="text" placeholder="Doe" />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>Email Address *</label>
                <input type="email" placeholder="john.doe@example.com" />
              </FormGroup>
              <FormGroup>
                <label>Phone Number *</label>
                <input type="tel" placeholder="+1 (234) 567-8900" />
              </FormGroup>
              <FormGroup>
                <label>Shipping Address *</label>
                <input type="text" placeholder="Street address" />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <label>City *</label>
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup>
                  <label>Postal Code *</label>
                  <input type="text" placeholder="12345" />
                </FormGroup>
              </FormRow>
              <ActionButton primary onClick={() => setActiveTab(2)}>
                Continue to Payment
              </ActionButton>
            </TabContent>

            <TabContent active={activeTab === 2}>
              <FormTitle>Payment Method</FormTitle>
              <PaymentMethods>
                <PaymentMethod active>
                  <input type="radio" name="payment" defaultChecked />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                  />
                </PaymentMethod>
                <PaymentMethod>
                  <input type="radio" name="payment" />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                    alt="Mastercard"
                  />
                </PaymentMethod>
                <PaymentMethod>
                  <input type="radio" name="payment" />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
                    alt="PayPal"
                  />
                </PaymentMethod>
                <PaymentMethod>
                  <input type="radio" name="payment" />
                  <span style={{ color: "#666" }}>Cash on Delivery</span>
                </PaymentMethod>
              </PaymentMethods>

              <FormGroup>
                <label>Card Number *</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <label>Expiry Date *</label>
                  <input type="text" placeholder="MM/YY" />
                </FormGroup>
                <FormGroup>
                  <label>CVC *</label>
                  <input type="text" maxLength={3} placeholder="123" />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input type="checkbox" />
                  Save card for future purchases
                </label>
              </FormGroup>
              <ActionButton primary onClick={() => setActiveTab(3)}>
                Continue to Review
              </ActionButton>
              <ActionButton onClick={() => setActiveTab(1)}>
                Back to Details
              </ActionButton>
            </TabContent>

            <TabContent active={activeTab === 3}>
              <FormTitle>Order Review</FormTitle>
              <div style={{ marginBottom: "30px" }}>
                <h4 style={{ color: "#666", marginBottom: "20px" }}>
                  Shipping To:
                </h4>
                <p style={{ color: "#333", lineHeight: "1.6" }}>
                  John Doe
                  <br />
                  123 Main Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                  <br />
                  +1 (234) 567-8900
                </p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <h4 style={{ color: "#666", marginBottom: "20px" }}>
                  Payment Method:
                </h4>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    style={{ height: "30px" }}
                  />
                  <span style={{ color: "#333" }}>•••• •••• •••• 3456</span>
                </div>
              </div>
              <ActionButton
                primary
                onClick={() => {
                  setIsSuccessModalOpen(true);
                  setIsCheckoutOpen(false);
                  setCartItems([]);
                }}
              >
                Place Order
              </ActionButton>
              <ActionButton onClick={() => setActiveTab(2)}>
                Back to Payment
              </ActionButton>
            </TabContent>
          </CheckoutMain>
        </CheckoutForm>
      </CheckoutModal>

      <SuccessModal isOpen={isSuccessModalOpen}>
        <SuccessContent>
          <SuccessIcon>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </SuccessIcon>
          <SuccessTitle>Order Placed Successfully!</SuccessTitle>
          <SuccessText>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </SuccessText>
          <TrackingInfo>
            <h4>Order Details</h4>
            <p>Order Number: #{orderNumber}</p>
            <p>
              Estimated Delivery:{" "}
              {new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </p>
          </TrackingInfo>
          <ActionButton
            primary
            onClick={() => setIsSuccessModalOpen(false)}
            style={{ marginTop: 0 }}
          >
            Continue Shopping
          </ActionButton>
        </SuccessContent>
      </SuccessModal>

      <SliderContainer ref={containerRef}>
        <StyledSwiper
          effect="fade"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          speed={1000}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {catData.map((cat, index) => (
            <SwiperSlide key={index}>
              <Card className="active">
                <ContentWrapper>
                  <CardContent>
                    <CardTitle>{cat.name}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardContent>
                </ContentWrapper>
                <ImageCounter>
                  {String(index + 1).padStart(2, "0")}/
                  {String(catData.length).padStart(2, "0")}
                </ImageCounter>
                <img src={cat.image} alt={cat.name} />
              </Card>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </SliderContainer>
      <ProductSection>
        <ProductContainer>
          <SectionTitle>Cat Care Essentials</SectionTitle>
          <ProductGrid>
            {products.map((product, index) => (
              <ProductCard key={index}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <BuyButton onClick={() => addToCart(product)}>
                    Add to Cart
                  </BuyButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        </ProductContainer>
      </ProductSection>
      <Footer>
        <FooterContent>
          <FooterColumn>
            <h3>About Us</h3>
            <ul>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Customer Care</h3>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Our Services</h3>
            <ul>
              <li>
                <a href="#">Cat Grooming</a>
              </li>
              <li>
                <a href="#">Veterinary Care</a>
              </li>
              <li>
                <a href="#">Pet Hotel</a>
              </li>
              <li>
                <a href="#">Cat Training</a>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Connect</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
            </ul>
          </FooterColumn>
        </FooterContent>
      </Footer>
    </>
  );
};

export default CatSlider;
