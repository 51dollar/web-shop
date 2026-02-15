export interface FiltersDTO {
  priceRange: {
    min: number;
    max: number;
  };

  storage: number[];
  colors: string[];

  specifications: {
    ram: number[];
    os: string[];
    processor: string[];
    displaySize: number[];
    displayType: number[];
    batteryRange: {
      min: number;
      max: number;
    };
    releaseYearRange: {
      min: number;
      max: number;
    };
  };
}
