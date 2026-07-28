"use client";

import { useCallback } from "react";
import EarthGlobe from "./three/EarthGlobe";
import type { TravelCity } from "../data/profile";

interface TravelGlobeWrapperProps {
  cities: TravelCity[];
}

export default function TravelGlobeWrapper({ cities }: TravelGlobeWrapperProps) {
  const handleCityClick = useCallback((city: TravelCity) => {
    window.location.href = `/travel/${encodeURIComponent(city.city)}`;
  }, []);

  return (
    <EarthGlobe cities={cities} onCityClick={handleCityClick} />
  );
}
