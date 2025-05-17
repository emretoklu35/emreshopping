import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import campaignService from "../services/campaignService";
import Slider from "../components/ui/Slider/Slider";
import electronicsService from "../services/electronicsService";
import recommendationsService from "../services/recommendationsService";
import CampaignCard from "../components/ui/CampaignCard/CampaignCard";
import ProductCard from "../components/ui/ProductCard/ProductCard";
import ElectronicProductSlider from "../components/ui/ElectronicProductSlider/ElectronicProductSlider";

import "./HomePage.css";

/**
 * TODO:
 * 1. setup redux architecture
 * 2. move lastVisitedProducts to redux
 * 
 * https://react-redux.js.org/introduction/getting-started
 *
 * only if first two are complete
 * 3. add the redirectUrl to recommendations (check left todo)
 * 4. fix the css issue with the home page carousel (sliders - alignments)
 */

const HomePage = () => {
  const { data: campaigns, loading: campaignsLoading } = useFetch(
    campaignService.getAllCampaigns,
    []
  );
  const { data: electronics, loading: electronicsLoading } = useFetch(
    electronicsService.getAllElectronics,
    []
  );
  const { data: recommendations, loading: recommendationsLoading } = useFetch(
    recommendationsService.getAllRecommendations,
    []
  );
  console.log(electronics);
  // TODO: use redux instead react state
  // TODO: Get a redux architecture going
  const [sonGezilenUrunler, setSonGezilenUrunler] = useState([]);

  function updateSonGezilenUrunler(product) {
    setSonGezilenUrunler((prev) => [...prev, product]);
  }

  return (
    <div className="home-page">
      <section className="campaigns-section">
        <div className="section-header"></div>
        <div className="campaigns-grid">
          {campaignsLoading
            ? Array(8)
                .fill()
                .map((_, i) => (
                  <div key={i} className="campaign-skeleton"></div>
                ))
            : campaigns?.map((campaign) => (
                <div key={campaign.id} className="campaign-item">
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
        </div>
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          margin: "1px 0px",
        }}
      >
        <section style={{ width: "60%" }}>
          <Slider />
        </section>
        <section style={{ width: "40%" }}>
          <ElectronicProductSlider
            electronics={electronics}
            electronicsLoading={electronicsLoading}
            onProductClick={updateSonGezilenUrunler}
          />
        </section>
      </div>

      {/* Önerilen Ürünler */}
      <section className="section recommendations-section">
        <h2 className="section-title">Sizin İçin Önerilenler</h2>
        <div className="products-grid">
          {recommendationsLoading ? (
            <div className="loading">Öneriler yükleniyor...</div>
          ) : (
            recommendations?.map((product) => (
              <div className="product-item" key={product.id}>
                <ProductCard
                  product={product}
                  onProductClick={updateSonGezilenUrunler}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {sonGezilenUrunler.length > 0 && (
        <section className="section son-gezilen-urunler-section">
          <h2 className="section-title">Son Gezilen Ürünler</h2>
          <div className="products-grid">
            {sonGezilenUrunler.map((product) => (
              <div className="product-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
