import React from 'react';
import styled from 'styled-components';

const PricingCard = ({ plan }:{
  plan: {
    name: string,
    price: string,
    description: string,
    features: string[]
  },
  index?: number
}) => {
  return (
    <StyledWrapper>
      <div className="outer">
        <div className="dot" />
        <div className="card">
          <div className="ray" />
          <div className="card-header">
            <h3 className="plan-name">{plan.name}</h3>
            <div className="price">{plan.price}</div>
            <p className="description">{plan.description}</p>
          </div>
          <div className="card-content">
            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="bullet">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="cta-button">
              {plan.name === "Free" ? "Start Free" : "Choose Plan"}
            </button>
          </div>
          <div className="line topl" />
          <div className="line leftl" />
          <div className="line bottoml" />
          <div className="line rightl" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for trying out Pumpkin AI.",
      features: [
        "3 image uploads per month",
        "5 edit prompts per month",
        "Basic filters & presets",
        "Community support",
      ],
    },
    {
      name: "Standard",
      price: "₹447/mo",
      description: "Great for regular creators and professionals.",
      features: [
        "Unlimited image uploads",
        "100 edit prompts per month",
        "Access to advanced filters & presets",
        "Priority support",
        "Advanced settings control",
      ],
    },
    {
      name: "Premium",
      price: "₹1,323/mo",
      description: "For power users who want it all.",
      features: [
        "Unlimited image uploads",
        "Unlimited edit prompts",
        "All advanced filters & presets",
        "Full access to advanced settings",
        "Dedicated priority support",
      ],
    },
  ];

  return (
    <PricingSection>
      <div className="pricing-header">
        <h2>Choose Your Plan</h2>
        <p className="subtitle">
          Whether you`&apos;`re just getting started or need advanced tools, Pumpkin AI has a plan for you.
        </p>
      </div>
      
      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} />
        ))}
      </div>
    </PricingSection>
  );
};

const PricingSection = styled.section`
  max-width: 1200px;
  margin: 96px auto 80px;
  padding: 0 24px;
  text-align: center;

  .pricing-header {
    margin-bottom: 48px;

    h2 {
      font-size: 2.25rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 16px;
    }

    .subtitle {
      color: #9ca3af;
      max-width: 672px;
      margin: 0 auto;
      font-size: 1rem;
    }
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .pricing-header h2 {
      font-size: 1.875rem;
    }
  }
`;

const StyledWrapper = styled.div`
  .outer {
    width: 100%;
    min-height: 500px;
    border-radius: 10px;
    padding: 1px;
    background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
    position: relative;
  }

  .dot {
    width: 5px;
    aspect-ratio: 1;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px #ffffff;
    border-radius: 100px;
    z-index: 2;
    right: 10%;
    top: 10%;
    animation: moveDot 6s linear infinite;
  }

  @keyframes moveDot {
    0%,
    100% {
      top: 10%;
      right: 10%;
    }
    25% {
      top: 10%;
      right: calc(100% - 35px);
    }
    50% {
      top: calc(100% - 30px);
      right: calc(100% - 35px);
    }
    75% {
      top: calc(100% - 30px);
      right: 10%;
    }
  }

  .card {
    overflow: hidden;
    z-index: 1;
    width: 100%;
    height: 100%;
    min-height: 498px;
    border-radius: 9px;
    border: solid 1px #202222;
    background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
    display: flex;
    flex-direction: column;
    position: relative;
    color: #fff;
    padding: 32px 24px;
  }

  .ray {
    width: 220px;
    height: 45px;
    border-radius: 100px;
    position: absolute;
    background-color: #c7c7c7;
    opacity: 0.4;
    box-shadow: 0 0 50px #fff;
    filter: blur(10px);
    transform-origin: 10%;
    top: 0%;
    left: 0;
    transform: rotate(40deg);
  }

  .card-header {
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .plan-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 8px;
  }

  .price {
    font-weight: bold;
    font-size: 2.5rem;
    background: linear-gradient(45deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 8px 0;
  }

  .description {
    font-size: 0.875rem;
    color: #9ca3af;
    margin-top: 8px;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
    text-align: left;
  }

  .features li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: #d1d5db;
    font-size: 0.875rem;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .bullet {
    color: #3b82f6;
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .cta-button {
    width: 100%;
    padding: 12px 24px;
    border-radius: 6px;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    color: #fff;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    overflow: hidden;
  }

  .cta-button:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
  }

  .cta-button:active {
    transform: translateY(0);
  }

  .line {
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: #2c2c2c;
  }

  .topl {
    top: 10%;
    background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
  }

  .bottoml {
    bottom: 10%;
  }

  .leftl {
    left: 10%;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, #747474 30%, #222424 70%);
  }

  .rightl {
    right: 10%;
    width: 1px;
    height: 100%;
  }
`;

export default Pricing;