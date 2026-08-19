"use client";

import { useCallback } from "react";
import EarthGlobe from "./three/EarthGlobe";
import type { TravelCity } from "../data/profile";
import type { Locale } from "../i18n/types";

interface TravelGlobeWrapperProps {
  cities: TravelCity[];
  lang: Locale;
}

export default function TravelGlobeWrapper({ cities, lang }: TravelGlobeWrapperProps) {
  const handleCityClick = useCallback((city: TravelCity) => {
    window.location.href = `/travel/${city.slug}`;
  }, []);

  return (
    <EarthGlobe cities={cities} onCityClick={handleCityClick} lang={lang} />
  );
}
