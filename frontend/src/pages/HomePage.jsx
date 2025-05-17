import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVisitedProduct, clearVisited } from "../redux/visited";

import useFetch from "../hooks/useFetch";
import campaignService from "../services/campaignService";
import electronicsService from "../services/electronicsService";
import recommendationsService from "../services/recommendationsService";

import Slider from "../components/ui/Slider/Slider";
import CampaignCard from "../components/ui/CampaignCard/CampaignCard";
import ProductCard from "../components/ui/ProductCard/ProductCard";
import ElectronicProductSlider from "../components/ui/ElectronicProductSlider/ElectronicProductSlider";

import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const sonGezilenUrunler = useSelector((state) => state.visited.items);

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

  // Sadece id kullanarak ürünleri Redux'a gönder
  const updateSonGezilenUrunler = (product) => {
    console.log("🧪 Redux'a gönderilen ürün:", product);
    dispatch(addVisitedProduct(product));
  };

  return (
    <div className="home-page">
      {/* Kampanyalar */}
      <section className="campaigns-section">
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

      {/* Slider ve Elektronik Ürünler */}
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

      {/* Son Gezilen Ürünler */}
      {sonGezilenUrunler.length > 0 && (
        <section className="section son-gezilen-urunler-section">
          <div className="section-header-with-action">
            <h2 className="section-title">Son Gezilen Ürünler</h2>
            <button
              className="clear-button"
              onClick={() => dispatch(clearVisited())}
            >
              Temizle
            </button>
          </div>
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
